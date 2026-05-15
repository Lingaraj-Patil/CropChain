# CROPCHAIN: NFT BASED AGRICULTURAL TRACEABILITY SYSTEM


-----------------------------------------------------------------

COVER PAGE

Visvesvaraya Technological University (VTU)

Mini Project Synopsis / Report

Project Title: CROPCHAIN: NFT BASED AGRICULTURAL TRACEABILITY SYSTEM

Degree: Bachelor of Engineering in Computer Science and Engineering

Academic Year: 2025–2026

Submitted by:

- Kumar Vaibhav – 1MV23CS074
- Lingaraj Patil – 1MV23CS080
- P Chethan Kumar Reddy – 1MV23CS104

Guide:

Mrs. Kavyashree
Assistant Professor
Department of Computer Science and Engineering
Sir M Visvesvaraya Institute of Technology (SIR MVIT)

Department of Computer Science and Engineering
Sir M Visvesvaraya Institute of Technology (SIR MVIT)

-----------------------------------------------------------------

CERTIFICATE

This is to certify that the project report titled “CROPCHAIN: NFT BASED AGRICULTURAL TRACEABILITY SYSTEM” submitted by Kumar Vaibhav (1MV23CS074), Lingaraj Patil (1MV23CS080) and P Chethan Kumar Reddy (1MV23CS104) in partial fulfillment of the requirements for the award of the degree of Bachelor of Engineering in Computer Science and Engineering, Visvesvaraya Technological University, Belgaum for the academic year 2025–2026, under the guidance of Mrs. Kavyashree, Assistant Professor, Department of Computer Science and Engineering, Sir M Visvesvaraya Institute of Technology, is a bonafide record of the work carried out by them.

The project work, to the best of our knowledge, conforms to the prescribed standards and academic requirements and is fit for evaluation by the university.

Guide: ____________________  Date: __________

Head of Department: __________  Date: __________

Principal: ___________________  Date: __________

-----------------------------------------------------------------

TABLE OF CONTENTS

1. COVER PAGE ............................................................. 1
2. CERTIFICATE ............................................................ 2
3. TABLE OF CONTENTS ...................................................... 3
4. ABSTRACT ............................................................... 4
5. INTRODUCTION .......................................................... 5
   5.1 Background ........................................................ 5
   5.2 Motivation ........................................................ 5
   5.3 Scope ............................................................. 6
6. PROBLEM STATEMENT ...................................................... 7
7. IMPLEMENTATION ........................................................ 8
   7.1 Concept .......................................................... 8
   7.2 Algorithm ......................................................... 9
   7.3 System Architecture .............................................. 10
   7.4 Modules ........................................................ 11
8. SYSTEM REQUIREMENT SPECIFICATION .................................... 13
   8.1 Functional Requirements ......................................... 13
   8.2 Non-Functional Requirements ..................................... 13
   8.3 Software Requirements ........................................... 14
   8.4 Hardware Requirements ........................................... 14
9. CONCLUSION ........................................................... 15
10. FUTURE ENHANCEMENT ................................................... 16
11. REFERENCES .......................................................... 17

(End of Table of Contents)

-----------------------------------------------------------------

## ABSTRACT

Agricultural supply chains worldwide suffer from opacity, forgery of origin claims, and unfair pricing due to multiple intermediaries. Smallholder farmers often receive a fraction of the final retail price while consumers lack reliable provenance information. Modern consumers demand transparency about the origin, cultivation practices, and handling of agricultural products. CropChain addresses these challenges by combining blockchain technology with non-fungible tokens (NFTs) to create an immutable, transparent, and auditable record of crop provenance. The project implements a full-stack solution where each crop batch is represented by an NFT minted on the Solana blockchain. Metadata about the crop—such as farmer details, farm location, cultivation practices, harvest date, and quality attributes—are stored in a MongoDB-backed API and referenced by an on-chain metadata URI.

Farmers use a React.js frontend to register, record crop events (seeded, growing, harvested, packed, delivered), and mint NFTs after preparing standard metadata. Wallet interactions are performed through the Phantom Wallet. The backend, built with Node.js and Express.js, handles authentication (JWT), data persistence in MongoDB, and provides a public metadata endpoint that conforms to token-metadata formats required by Solana and explorer services.

By leveraging Solana's low-fee and high-throughput network, CropChain ensures that minting and verification operations are fast and cost-effective. Consumers and stakeholders can verify the authenticity and lifecycle of crops by querying the NFT metadata or visiting Solana Explorer links. The system enhances trust, reduces fraud, and enables fairer pricing mechanisms through transparent provenance. This project demonstrates how blockchain-native digital representations (NFTs) can be applied to real-world traceability problems in agriculture.

Keywords: Blockchain, NFT, Solana, Traceability, Agriculture, MongoDB, Phantom Wallet, JWT, React.js, Express.js

-----------------------------------------------------------------

## INTRODUCTION

### 1. Background

Agriculture forms the backbone of many economies and supports millions of livelihoods. Despite technological advancements, agricultural supply chains often remain fragmented and opaque. Tracking the lifecycle of produce from farm to fork is a non-trivial challenge—information about cultivation, harvest, handling, and transport is dispersed across multiple stakeholders and recorded in disparate systems, if recorded at all. Consequently, this opacity allows mislabeling, false organic claims, and manipulation by intermediaries.

Digital technologies have the potential to transform agriculture by improving traceability, enabling provenance verification, and empowering stakeholders with trustworthy records. Blockchain technology, with its properties of immutability, decentralization, and verifiable audit trails, presents an attractive foundation for building such systems.

### 2. Motivation

The motivation for CropChain stems from the need to provide a simple, verifiable, and tamper-resistant record of crop provenance that is accessible to all stakeholders. Key motivating factors include:

- Consumer demand for provenance and quality information.
- Need to protect farmers from fraudulent practices and to ensure fair compensation.
- Regulatory requirements for food traceability and safety.
- Possibility of leveraging NFTs as unique digital certificates representing crop batches.
- Solana’s low transaction fees and high throughput make it practical for frequent interactions.

### 3. Scope of the Project

CropChain is designed as a proof-of-concept full-stack application that demonstrates NFT-based traceability for agricultural produce. The core scope includes:

- Farmer and consumer interfaces (web-based) using React.js.
- Secure user authentication and role-based access (JWT) on the backend (Node.js/Express.js).
- MongoDB for off-chain data storage of crop metadata and lifecycle events.
- Integration with Phantom Wallet for transaction signing by farmers.
- NFT minting on Solana with properly formatted metadata accessible to Solana Explorer.
- Public verification endpoints allowing consumers to inspect provenance and lifecycle events.

Out of scope for this mini project: industrial-scale IoT sensor integration, enforcement of legal supply chain contracts, full marketplace implementations, and Solana mainnet deployment.

-----------------------------------------------------------------

## PROBLEM STATEMENT

### Existing System Limitations

Traditional agricultural supply chains exhibit several limitations:

- Lack of end-to-end traceability: Data about cultivation, harvest, and transport is often siloed and unavailable to end consumers.
- Fraud and mislabeling: Products are sometimes misrepresented (e.g., claiming organic origin), causing consumer deception.
- Heavy reliance on intermediaries: Multiple intermediaries increase opacity and reduce farmer share of the value chain.
- Weak auditability: Records stored in centralized databases can be altered, and historical proof may be unreliable.
- Consumer trust issues: Consumers cannot independently verify origin, handling, or quality claims.
- Farmer pricing issues: Farmers lack transparent mechanisms to claim fair pricing and demonstrate compliance.

### Need for Solution

There is a need for a system that provides:

- Immutable and tamper-proof records for crop provenance.
- Decentralized verification mechanisms that consumers and stakeholders can use without trusting a single central authority.
- Transparent lifecycle tracking to ensure accountability and improve trust.
- A practical, low-cost blockchain integration enabling frequent usage by farmers.

### Formal Problem Statement

Design and implement a blockchain-integrated agricultural traceability system that allows farmers to register crops, record lifecycle events, mint NFTs representing crop batches, and enable consumers to verify provenance and lifecycle information. The system must ensure immutability, accessibility of provenance data, secure interactions (wallet-based signing), and cost-effective operations suited for frequent use in real agricultural workflows.

-----------------------------------------------------------------

## IMPLEMENTATION

This section explains the conceptual approach, algorithms, architecture, and modular design of CropChain.

### 4.1 Concept

CropChain uses NFTs as unique, cryptographically verifiable digital certificates for crop batches. Each crop record includes descriptive metadata (crop name, variety, farm location, cultivation practices, harvest date), lifecycle events (seeded, growing, harvested, packed, delivered), and an image. The metadata is stored off-chain in MongoDB and exposed via a public metadata endpoint. The NFT minted on Solana references this metadata URI, enabling explorers and wallets to display the original metadata.

Key design goals:

- Practicality: Minimize on-chain footprint to reduce costs by keeping heavy data off-chain and referencing it via secure URIs.
- Verifiability: Ensure the link between the on-chain NFT and off-chain metadata is immutable via transaction records.
- Accessibility: Provide straightforward web interfaces for farmers and consumers.
- Interoperability: Ensure metadata format conforms to Solana Token Metadata standards.

### 4.2 Algorithm

The following algorithm outlines the core workflows of CropChain.

Algorithm: CropChain Core Workflows

1. User registration and authentication
   - Input: name, email, password, role (farmer/consumer)
   - Process: Validate input → Hash password with bcrypt → Store user in MongoDB
   - Output: User account and JWT for authenticated sessions

2. Wallet connection (Farmer)
   - Input: User clicks "Connect Wallet"
   - Process: Use Phantom Wallet Adapter to request connection → Get public key
   - Output: Wallet address associated with farmer profile (optional)

3. Crop creation and metadata preparation
   - Input: Crop details (name, type, location, image, attributes)
   - Process: Validate input → Store metadata in MongoDB → Generate metadata URI
   - Output: Crop resource ID and public metadata URI

4. NFT minting on Solana
   - Input: metadata URI, nftName, nftSymbol (provided by farmer)
   - Process:
     a. Build Metaplex/Token Metadata instruction payload referencing metadata URI
     b. Request Phantom Wallet to sign transaction
     c. Submit transaction to Solana Devnet RPC
     d. Wait for confirmation and record transaction signature and mint address
   - Output: mintAddress, transactionHash, updated crop record

5. Crop lifecycle update
   - Input: Event (seeded, growing, harvested, packed, delivered), optional notes
   - Process: Validate → Append event to CropTimeline collection with timestamp and metadata
   - Output: Updated timeline for the crop

6. Consumer verification
   - Input: Crop ID or scan action
   - Process: Fetch crop data from API → Display lifecycle, farmer, and NFT details → Provide Solana Explorer links
   - Output: Verification report displayed to consumer

7. Blockchain verification (optional advanced step)
   - Input: mintAddress or transactionHash
   - Process: Query Solana Explorer or node → Verify on-chain metadata account vs off-chain metadata URI
   - Output: Confirmation of on-chain linkage and metadata integrity

### 4.3 System Architecture

CropChain uses a three-tier architecture:

- Presentation Layer: React.js frontend (user interface) hosted as a static site (Vercel). Uses Tailwind CSS for styling and Framer Motion for smooth animations.
- Application Layer: Node.js + Express.js backend exposing RESTful endpoints for authentication, crop CRUD operations, metadata serving, and lifecycle updates. Implements JWT-based authentication and Zod-based input validation.
- Data Layer & Blockchain: MongoDB stores all off-chain metadata, user profiles, and timelines. Solana blockchain (Devnet) stores NFT mint records and token metadata accounts that reference off-chain metadata URIs.

Architecture Diagram: [Insert Architecture Diagram Here]

Flow Explanation:

1. A farmer logs into the frontend and optionally connects their Phantom Wallet.
2. The farmer creates a crop record; the frontend uploads metadata to the backend.
3. The backend stores the metadata in MongoDB and returns a metadata URI.
4. When minting, the frontend calls the Solana minting flow (Metaplex SDK) referencing the metadata URI. The farmer signs the transaction via Phantom.
5. On confirmation, the mint address and transaction hash are saved to MongoDB and displayed in the UI.
6. Consumers can view crop details and verify metadata via the public metadata endpoint or Solana Explorer.

### 4.4 Modules

The system consists of the following modules:

1. Authentication Module
   - Responsibilities: User registration, login, password hashing (bcrypt), JWT generation and verification, role-based access control.
   - Key Endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/user/profile`.

2. Farmer Dashboard
   - Responsibilities: Create and manage crops, upload images, prepare NFT metadata, mint NFTs, view mint history and transaction details.
   - Key Features: Crop creation form, NFT preview, minting flow, timeline editor, copyable crop ID for verification.
   - Placeholders: [Insert Dashboard Screenshot Here]

3. Consumer Dashboard
   - Responsibilities: Verify crops by ID, view crop timelines, inspect NFT details and Solana Explorer links, search by attributes.
   - Key Features: Verification page supporting query parameter pre-fill, timeline view, metadata display, image preview.

4. Blockchain Module
   - Responsibilities: Wallet integration (Phantom), Solana RPC interactions, NFT minting via Metaplex SDK, construction of on-chain metadata accounts referencing off-chain URIs.
   - Key Interfaces: `lib/solana.ts` (metaplex wallet integration), metadata endpoint for explorers.
   - Placeholders: [Insert NFT Minting Screenshot Here]

5. Crop Lifecycle Module
   - Responsibilities: Record lifecycle events (seeded → growing → harvested → packed → delivered), store timestamps, allow notes and geo-location, present timeline in UI.
   - Data Model: `CropTimeline` collection with fields: `crop`, `status`, `timestamp`, `description`, `location`.

6. Metadata Service
   - Responsibilities: Provide a Solana-compatible JSON metadata payload via `GET /api/metadata/:cropId`, set cache headers for explorer performance, include image, attributes, properties.

7. Administrative Module (Future/Optional)
   - Responsibilities: Manage users, review flagged crops, moderate content, analytics dashboard for adoption metrics.


-----------------------------------------------------------------

## SYSTEM REQUIREMENT SPECIFICATION

### 8.1 Functional Requirements

- FR1: User Registration: System shall allow users to register as `farmer` or `consumer`.
- FR2: Authentication: System shall provide secure login with JWT-based sessions.
- FR3: Wallet Integration: Farmers shall be able to connect Phantom Wallet for signing transactions.
- FR4: Crop Creation: Farmers shall create crop records with metadata and images.
- FR5: Metadata Storage: System shall persist crop metadata in MongoDB and expose a public metadata URI.
- FR6: NFT Minting: System shall allow farmers to mint NFTs on Solana Devnet referencing metadata URI.
- FR7: Lifecycle Events: Farmers shall append lifecycle events to crop timelines.
- FR8: Verification: Consumers shall verify crop provenance using crop ID or NFT mint address.
- FR9: Role-based Access: System shall enforce permissions for farmers, consumers, and admins.
- FR10: Search & Filter: Consumers shall search crops by name, type, or location.

### 8.2 Non-Functional Requirements

- NFR1: Security: Passwords hashed with bcrypt, JWT secrets protected, no secrets in client code.
- NFR2: Performance: NFT minting and metadata queries should have acceptable latencies (minting depends on Solana network).
- NFR3: Scalability: Backend designed with stateless APIs; suitable for serverless deployment (Vercel).
- NFR4: Availability: API should be highly available through cloud deployment and robust database connectivity.
- NFR5: Usability: UI should be responsive and accessible on typical modern browsers.
- NFR6: Maintainability: Codebase documented and modular with unit/integration testability.
- NFR7: Interoperability: Metadata format compatible with Solana Explorer and wallet displays.

### 8.3 Software Requirements

- Frontend: React.js (v18+) with TypeScript (recommended), Vite for bundling
- Backend: Node.js (v18+), Express.js
- Database: MongoDB (Atlas or local)
- Blockchain: Solana Devnet, Solana Web3.js, Metaplex JS SDK
- Wallet: Phantom Wallet (browser extension)
- Styling: Tailwind CSS, Framer Motion
- Deployment: Vercel (frontend and serverless backend)
- Additional: Axios, Zod (validation), bcryptjs (password hashing), jsonwebtoken (JWT)

### 8.4 Hardware Requirements

- Development Machine: 8 GB RAM, 4-core CPU, 20 GB free disk, macOS/Windows/Linux
- Recommended for local testing: Docker for MongoDB or MongoDB local instance
- Network: Stable internet connection for Solana Devnet interactions

-----------------------------------------------------------------

## CONCLUSION

CropChain demonstrates a practical approach to solving real-world traceability challenges in agricultural supply chains using blockchain-native digital assets. By representing crop batches as NFTs on Solana and linking them to rich off-chain metadata stored in MongoDB, the system provides an immutable provenance record, enabling consumers to independently verify origin, harvest practices, and lifecycle events. The architecture balances on-chain immutability with off-chain storage efficiency, using Solana for low-cost minting and MongoDB for rich metadata persistence.

The project enhances transparency, reduces opportunities for fraud, and empowers farmers by providing verifiable credentials for their produce. The use of wallet-based signing ensures that only authorized stakeholders initiate minting, and the public metadata endpoint supports wide interoperability with explorers and wallet interfaces. As a VTU mini project, CropChain illustrates how emerging blockchain primitives like NFTs can be applied to socially valuable domains such as sustainable agriculture and fair trade.

-----------------------------------------------------------------

## FUTURE ENHANCEMENT

The following enhancements can extend the value and adoption of CropChain:

1. AI-based Crop Analysis: Integrate machine learning models to predict crop health, detect anomalies from images, and recommend interventions.
2. QR Code & Mobile Scanning: Generate QR codes for physical packaging to enable mobile verification by consumers without manual ID entry.
3. IoT Integration: Add sensor feeds (moisture, temperature) to automatically append lifecycle events and enrich metadata.
4. Mobile App Support: Build native or PWA mobile apps for farmers and consumers to increase accessibility.
5. Government & Certification Integration: Provide channels for regulators and certification agencies to attest to organic or quality claims.
6. Marketplace Integration: Enable peer-to-peer or B2B marketplaces where NFTs represent tradeable provenance-backed lots.
7. Real-time Monitoring & Alerts: Add event-driven notifications (SMS/email) for critical lifecycle events.
8. Multi-language Support: Internationalize the UI for broader adoption.
9. Payment & Microfinance: Integrate payment rails enabling direct farmer settlement and microloan services tied to verified provenance.

-----------------------------------------------------------------

## REFERENCES

1. Nakamoto, S., "Bitcoin: A Peer-to-Peer Electronic Cash System", 2008.
2. Wood, G., "Ethereum: A Secure Decentralised Generalised Transaction Ledger", 2014.
3. Metaplex Foundation, "Metaplex JavaScript SDK Documentation". https://docs.metaplex.com/
4. Solana Labs, "Solana Documentation". https://docs.solana.com/
5. MongoDB, "MongoDB Manual". https://docs.mongodb.com/
6. React Documentation, "React – A JavaScript library for building user interfaces". https://react.dev/
7. Express.js Documentation, "Express - Node.js web application framework". https://expressjs.com/
8. Tailwind CSS, "Utility-first CSS framework". https://tailwindcss.com/
9. Phantom Wallet Docs, "Phantom Developer Documentation". https://docs.phantom.app/
10. Zod, "TypeScript-first schema validation". https://github.com/colinhacks/zod
11. Framer Motion, "Animation library for React". https://www.framer.com/motion/
12. Scholarly article: Aung, M. M., Chang, Y. S., "Traceability in a food supply chain: Safety and quality perspectives", Food Control, 2014.
13. Scholarly article: Kamble, S. S., Gunasekaran, A., Gawankar, S. A., "Achieving sustainable performance in a data-driven agriculture supply chain: A review for blockchain adoption", International Journal of Production Research, 2019.


-----------------------------------------------------------------

Appendix

- [Insert Architecture Diagram Here]
- [Insert Dashboard Screenshot Here]
- [Insert NFT Minting Screenshot Here]

(End of Document)
