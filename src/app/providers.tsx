"use client";

import { Web3Modal } from "@web3modal/wagmi/react";
import type { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { chains, projectId, wagmiConfig } from "@/lib/wallet";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      {projectId ? (
        <Web3Modal projectId={projectId} wagmiConfig={wagmiConfig} defaultChain={chains[0]} />
      ) : null}
    </WagmiConfig>
  );
}
