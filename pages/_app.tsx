import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletProvider } from '@cosmos-kit/react';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import theme from '../config/theme';
import { wallets } from '@cosmos-kit/keplr';

import { SignerOptions } from '@cosmos-kit/core';
import { chains, assets } from 'chain-registry';
import { Chain, AssetList } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { getSigningCosmosClientOptions } from 'osmojs';

import { Quantico } from '@next/font/google';
import Navbar from '../components/navbar';

import { localosmosis, localosmosisAssets } from '../config/localosmosis';
// import { celeswasm, celeswasmAssets } from '../config/celeswasm';
// import { assets, chains } from 'chain-registry';

const courier = Quantico({
  subsets: ['latin'],
  weight: ['400'],
});

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    stargate: (_chain: Chain) => {
      return getSigningCosmosClientOptions();
    },
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        // case 'celeswasm':
        //   return {
        //     gasPrice: GasPrice.fromString('0.0025uwasm'),
        //   };
        case 'localosmosis':
          return {
    gasPrice: GasPrice.fromString('0.0025uosmo'),
          };
      }
    },
  };

  const { colorMode } = useColorMode();
  const bgColor = { light: 'green', dark: 'gray.900' };

  return (
    <>
      <Box>
        <main className={courier.className}>
          <ChakraProvider theme={theme}>
            <WalletProvider
              chains={[...chains, localosmosis]}
              assetLists={[...assets, localosmosisAssets]}
              // chains={[...chains, celeswasm]}
              // assetLists={[...assets, celeswasmAssets]}
              wallets={wallets}
              signerOptions={signerOptions}
              endpointOptions={{
                // celeswasm: {
                //   rpc: ['https://rpc-mocha.pops.one/'],
                //   rest: ['http://localhost:26659']
                // },
                   localosmosis: {
                  rpc: ['http://47.242.123.146:26657'],
                     rest: ['http://47.242.123.146:1317']
                },
              }}
            >
              <Navbar />
              <Component {...pageProps} />
            </WalletProvider>
          </ChakraProvider>
        </main>
      </Box>
    </>
  );
}

export default CreateCosmosApp;

// shit
