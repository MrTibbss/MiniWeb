import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { base, mainnet, optimism } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const safeProjectId = projectId ?? "00000000000000000000000000000000"; // placeholder keeps config from throwing
export const hasProjectId = Boolean(projectId);

const metadata = {
  name: "MiniWeb",
  description: "Mini in-app style browser with WalletConnect + Farcaster",
  url: "https://miniweb.local",
  icons: ["https://raw.githubusercontent.com/walletconnect/walletconnect-assets/master/Icon/Blue%20(Default)/Icon.png"]
};

export const chains = [base, mainnet, optimism] as const;

// defaultWagmiConfig handles the Wagmi + Web3Modal wiring with sensible defaults.
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: safeProjectId,
  metadata
});
