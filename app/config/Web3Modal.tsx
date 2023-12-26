"use client";

import { createWeb3Modal, defaultWagmiConfig, useWeb3ModalTheme, } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet, } from 'viem/chains'
import { useTheme } from 'next-themes';
const metadata = {
  name: 'VimCord',
  description: 'VimCord Socialize Dapp',
  url: '/',
  icons: ['/favicon.ico']
}
const projectId = process.env.WEB3MODAL_PROJECT_ID || '1234567890'
const chains = [polygon, mainnet, polygonZkEvm, polygonZkEvmTestnet, polygonMumbai,]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata, })

const featuredWalletIds = [
  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
  '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'

]
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: polygon,
  featuredWalletIds:[
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'
  ],
})

export function Web3Modal({ children }) {
  const { theme } = useTheme();
  const { themeMode, themeVariables, setThemeMode, setThemeVariables, } = useWeb3ModalTheme()
  setThemeMode(theme === 'dark' ? 'dark' : 'light')

  return <WagmiConfig config={wagmiConfig} > {children}</WagmiConfig>;
}


