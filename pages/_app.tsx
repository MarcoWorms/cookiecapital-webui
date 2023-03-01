import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme, midnightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { fantom, optimism } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import NoSSR from 'react-no-ssr';


const { chains, provider, webSocketProvider } = configureChains(
  [
    fantom,
    // optimism,
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<NoSSR>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme()}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</NoSSR>
  );
}

export default MyApp;
