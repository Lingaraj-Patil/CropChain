import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import type { WalletAdapter } from '@solana/wallet-adapter-base';
import { Connection } from '@solana/web3.js';
import type { WalletContextState } from '@solana/wallet-adapter-react';

export const SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER || 'devnet';
export const SOLANA_RPC_URL = SOLANA_CLUSTER === 'devnet'
  ? 'https://api.devnet.solana.com'
  : SOLANA_CLUSTER;

export const createConnection = () => new Connection(SOLANA_RPC_URL, 'confirmed');

export interface MintCropInput {
  wallet: WalletContextState;
  name: string;
  symbol: string;
  metadataUri: string;
  sellerFeeBasisPoints?: number;
}

export const mintCropNft = async ({
  wallet,
  name,
  symbol,
  metadataUri,
  sellerFeeBasisPoints = 0,
}: MintCropInput) => {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Please connect Phantom Wallet first');
  }

  if (!metadataUri.startsWith('http://') && !metadataUri.startsWith('https://')) {
    throw new Error('Metadata URI must be a public HTTP URL for Solana Explorer');
  }

  const connection = createConnection();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet as unknown as WalletAdapter));

  /**
   * This writes Metaplex Token Metadata on-chain and points to our public
   * backend metadata endpoint. Explorer reads this URI to resolve NFT details.
   */
  const { nft, response } = await metaplex.nfts().create({
    uri: metadataUri,
    name,
    symbol,
    sellerFeeBasisPoints,
  });

  const transactionHash = response.signature;
  const mintAddress = nft.address.toBase58();

  return {
    mintAddress,
    transactionHash,
    explorerUrl: `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`,
    transactionUrl: transactionHash ? `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet` : null,
  };
};
