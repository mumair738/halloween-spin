import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from 'wagmi/chains';
import { createAppKit } from '@reown/appkit/react';

// Your WalletConnect Project ID
export const projectId: string = '7e98fa9b8b69bf3625843b3394754245';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Configure custom Base network with block explorer
export const baseNetwork = {
  ...base,
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org"
    }
  }
};

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: [baseNetwork]
});

// Create AppKit modal
createAppKit({
  networks: [baseNetwork],
  projectId,
  metadata: {
    name: 'Helloween Spin-to-Win',
    description: 'Spin the wheel and win tokens on Base! 🎃',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#ff6b35',
    '--w3m-border-radius-master': '8px'
  }
});

export const config = wagmiAdapter.wagmiConfig;