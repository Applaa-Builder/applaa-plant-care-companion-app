# Applaa Plant Care Companion (Expo + Expo Router)

A React Native app built with Expo SDK 54 and Expo Router. Track your plants, view care guides, and identify plants. The app supports fully offline/mock mode (no APIs required).

## Requirements

- Node 18+
- npm 9+
- Expo Go (SDK 54) on your device or a development build

## Getting Started

1) Install dependencies

```
npm install
```

2) Start the dev server

```
npm run start
```

3) Open on device

- Scan the QR with Expo Go (Android) or Camera (iOS), or press `a` to open Android emulator, `w` for web.

## Mock Mode (no APIs)

The app is configured to run without any backend:

- `lib/trpc.ts` uses a mock link when `EXPO_PUBLIC_RORK_API_BASE_URL` is not set.
- Built-in mock data are in `mocks/` and the state is stored locally via `zustand` + `AsyncStorage`.

If you later add an API, set:

```
EXPO_PUBLIC_RORK_API_BASE_URL=https://your.api
```

## Scripts

- `npm run start` – start Metro (LAN)
- `npm run start-web` – start web

## Project Structure

- `app/` – Expo Router routes and screens
- `components/` – UI components
- `mocks/` – mock data sources
- `store/` – Zustand state (persisted)
- `backend/` – placeholder TRPC router and Hono server (optional)

## Troubleshooting

- Ensure your Expo Go matches SDK 54.
- If you see version suggestions in the terminal, run `npx expo install` or `npm install` (we’ve pinned expected versions).
