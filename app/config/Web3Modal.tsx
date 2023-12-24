"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { mainnet,polygon,polygonMumbai,polygonZkEvm,polygonZkEvmTestnet, } from 'viem/chains'


const projectId = process.env.WEB3MODAL || "";


const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, polygon,polygonZkEvm,polygonZkEvmTestnet,polygonMumbai,]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })


createWeb3Modal({ wagmiConfig, projectId,chains, defaultChain: polygon })

export function Web3Modal({ children }) {
  
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}



