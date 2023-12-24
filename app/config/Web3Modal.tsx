"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet, } from 'viem/chains'


const projectId = process.env.WEB3MODAL_PROJECT_ID || '1234567890'


const metadata = {
  name: 'VimCord',
  description: 'VimCord Socialize Dapp',
  url: '/',
  icons: ['/favicon.ico']
}
const themeVariables = {
  "--w3m-font-family": "Roboto, sans-serif",
  "--w3m-accent-color": "#ea7411",
  "--wcm-z-index":"100"
}

const chains = [polygon, mainnet, polygonZkEvm, polygonZkEvmTestnet, polygonMumbai,]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata, })


createWeb3Modal({ wagmiConfig, projectId, chains, defaultChain: polygon ,themeVariables})

export function Web3Modal({ children }) {

  return <WagmiConfig config={wagmiConfig} >{children}</WagmiConfig>;
}


