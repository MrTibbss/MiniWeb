import BrowserShell from "@/components/BrowserShell";

export default function Home() {
  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">MiniWeb</p>
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">A slick Rainbow-style in-app browser</h1>
        <p className="text-white/70">
          Browse Farcaster frames, connect an EVM wallet with WalletConnect, and kick off Farcaster identity linking in one
          minimal surface.
        </p>
      </div>
      <BrowserShell />
    </main>
  );
}
