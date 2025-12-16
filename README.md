# MiniWeb

Sleek in-app style browser inspired by Rainbow. Browse Farcaster frames, open arbitrary URLs, and connect an EVM wallet via WalletConnect. Includes a Farcaster connect trigger (via Neynar) so you can pair your fid with the session.

## Quickstart

1. Install deps: `npm install`
2. Create `.env.local` with:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_NEYNAR_CLIENT_ID=your_neynar_client_id
NEXT_PUBLIC_FARCASTER_REDIRECT_URI=http://localhost:3000/api/farcaster/callback
```

3. Run dev server: `npm run dev`
4. Visit http://localhost:3000 and paste a URL (Warpcast frame URLs work well). Click **Connect** to open the WalletConnect modal. Click **Farcaster** to start the fid connect flow (requires the Neynar values above).

## Scripts

- `npm run dev` – start Next.js dev server
- `npm run build` – production build
- `npm run start` – run the compiled app
- `npm run lint` – lint with ESLint
- `npm run format` – Prettier format all files

## Notes

- WalletConnect requires a valid `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (create at https://cloud.walletconnect.com/).
- The Farcaster connect button opens the Neynar consent page. You must supply `NEXT_PUBLIC_NEYNAR_CLIENT_ID` and a redirect URI you control. If omitted, the app will prompt you to set them.
- The embedded view is sandboxed via `iframe`. Some sites may restrict embedding with `X-Frame-Options` / CSP.
