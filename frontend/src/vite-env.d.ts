/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL?: string;
	readonly VITE_SOLANA_CLUSTER?: string;
	readonly VITE_PHANTOM_APP_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
