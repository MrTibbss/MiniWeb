"use client";

import { FormEvent, useMemo, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Link2,
  LogIn,
  RotateCw,
  Sparkles,
  Wallet
} from "lucide-react";
import { useAccount } from "wagmi";
import { hasProjectId } from "@/lib/wallet";

// Use an embed-friendly default so the shell never appears blank on first load.
const DEFAULT_URL = "https://www.wikipedia.org";

const normalizeUrl = (raw: string) => {
  if (!raw) return DEFAULT_URL;
  const trimmed = raw.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
};

const truncateAddress = (addr?: string) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
};

const buildFarcasterConnectUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_FARCASTER_REDIRECT_URI;
  if (!clientId || !redirectUri) return "";
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "identity",
    state: "miniweb"
  });
  return `https://app.neynar.com/connect?${params.toString()}`;
};

export default function BrowserShell() {
  const { open } = useWeb3Modal();
  const { address, isConnected, chain } = useAccount();

  const [entry, setEntry] = useState(DEFAULT_URL);
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [cursor, setCursor] = useState(0);
  const [frameKey, setFrameKey] = useState(0);

  const currentUrl = history[cursor] ?? DEFAULT_URL;

  const canGoBack = cursor > 0;
  const canGoForward = cursor < history.length - 1;

  const farcasterConnectUrl = useMemo(buildFarcasterConnectUrl, []);
  const hasFarcasterConfig = Boolean(farcasterConnectUrl);

  const goTo = (url: string) => {
    const next = normalizeUrl(url);
    const nextHistory = history.slice(0, cursor + 1);
    nextHistory.push(next);
    setHistory(nextHistory);
    setCursor(nextHistory.length - 1);
    setEntry(next);
  };

  const handleNavigate = (direction: "back" | "forward") => {
    if (direction === "back" && canGoBack) {
      setCursor(cursor - 1);
    }
    if (direction === "forward" && canGoForward) {
      setCursor(cursor + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goTo(entry);
  };

  const handleReload = () => setFrameKey(frameKey + 1);

  const handleFarcasterConnect = () => {
    if (!farcasterConnectUrl) {
      window.alert("Set NEXT_PUBLIC_NEYNAR_CLIENT_ID and NEXT_PUBLIC_FARCASTER_REDIRECT_URI to enable Farcaster connect.");
      return;
    }
    window.open(farcasterConnectUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-outline/60 bg-card/70 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accentMuted text-surface shadow-glow">
            <Globe2 size={20} />
          </div>
          <div className="leading-tight">
            <p className="text-white">MiniWeb</p>
            <p className="text-xs text-white/60">Clean, slick, Rainbow-style browsing</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          {isConnected ? (
            <span className="rounded-full border border-outline/70 bg-white/5 px-3 py-1">
              {truncateAddress(address)} {chain?.name ? `· ${chain.name}` : ""}
            </span>
          ) : (
            <span className="rounded-full border border-outline/70 bg-white/5 px-3 py-1">Disconnected</span>
          )}
          <button
            type="button"
            onClick={() => {
              if (!hasProjectId) {
                window.alert("Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to enable WalletConnect.");
                return;
              }
              open();
            }}
            disabled={!hasProjectId}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-surface transition hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Wallet size={16} />
            {isConnected ? "Switch" : "Connect"}
          </button>
          <button
            type="button"
            onClick={handleFarcasterConnect}
            className="inline-flex items-center gap-2 rounded-full border border-accent/80 bg-accent/20 px-3 py-1 text-sm font-medium text-accent transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <Sparkles size={16} />
            Farcaster
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-outline/70 bg-card/80 p-4 shadow-soft backdrop-blur-2xl">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-outline/80 bg-white/5 px-3 py-2">
          <button
            type="button"
            aria-label="Back"
            onClick={() => handleNavigate("back")}
            disabled={!canGoBack}
            className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Forward"
            onClick={() => handleNavigate("forward")}
            disabled={!canGoForward}
            className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            aria-label="Reload"
            onClick={handleReload}
            className="rounded-xl p-2 text-white/70 transition hover:bg-white/10"
          >
            <RotateCw size={18} />
          </button>
          <div className="mx-2 h-6 w-px bg-outline" />
          <Link2 size={18} className="text-accent" />
          <input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Paste a URL or Farcaster frame"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accentMuted px-4 py-2 text-sm font-semibold text-surface shadow-glow transition hover:-translate-y-0.5"
          >
            <Globe2 size={16} />
            Go
          </button>
        </form>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
          <span className="text-white/50">Try:</span>
          {[
            "https://www.wikipedia.org",
            "https://codesandbox.io",
            "https://beta.openai.com",
            "https://example.org"
          ].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => goTo(preset)}
              className="rounded-full border border-outline/60 bg-white/5 px-3 py-1 text-white/70 transition hover:border-accent/60 hover:text-white"
            >
              {preset.replace(/^https:\/\//, "")}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2 overflow-hidden rounded-2xl border border-outline/80 bg-black/30 shadow-inner">
            <div className="flex items-center justify-between bg-outline/40 px-3 py-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-2">
                <Globe2 size={14} /> Live view
              </span>
              <span className="truncate text-white/50">{currentUrl}</span>
            </div>
            <iframe
              key={frameKey}
              src={currentUrl}
              title="MiniWeb browser"
              className="h-[480px] w-full border-0 bg-black/60"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
            <div className="border-t border-outline/60 bg-card/60 px-3 py-2 text-xs text-white/60">
              If the view is blank, the site likely blocks iframes (X-Frame-Options/CSP). Try another HTTPS URL or open in a
              new tab.
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-outline/60 bg-white/5 p-4 text-sm text-white/80">
            <div className="flex items-start gap-3 rounded-xl border border-outline/60 bg-outline/30 p-3">
              <Wallet size={18} className="text-accent" />
              <div>
                <p className="font-medium text-white">WalletConnect</p>
                <p className="text-white/60">Connect an EVM wallet to browse frames that request signatures on Base or Mainnet.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-outline/60 bg-outline/30 p-3">
              <Sparkles size={18} className="text-accent" />
              <div>
                <p className="font-medium text-white">Farcaster identity</p>
                <p className="text-white/60">
                  {hasFarcasterConfig
                    ? "Launch the Farcaster sign-in flow to pair your fid with this session."
                    : "Add NEXT_PUBLIC_NEYNAR_CLIENT_ID and NEXT_PUBLIC_FARCASTER_REDIRECT_URI to enable the connect button."}
                </p>
                {hasFarcasterConfig ? (
                  <button
                    type="button"
                    onClick={handleFarcasterConnect}
                    className="mt-2 inline-flex items-center gap-2 rounded-lg border border-accent/70 px-3 py-2 text-accent transition hover:bg-accent/10"
                  >
                    <LogIn size={16} /> Start connect
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-outline/60 bg-outline/30 p-3">
              <Globe2 size={18} className="text-accent" />
              <div>
                <p className="font-medium text-white">Tips</p>
                <ul className="list-disc pl-4 text-white/60">
                  <li>Use https:// links for the cleanest sandboxed experience.</li>
                  <li>Frames that need wallet signatures will open the WalletConnect modal.</li>
                  <li>You can paste Warpcast frame URLs directly into the bar.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
