

import { WalletConnectModal } from '@walletconnect/modal'
import { mainnet, polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet, } from 'viem/chains'
const projectId = process.env.WEB3MODAL_PROJECT_ID || '1234567890'

const modal = new WalletConnectModal({
    projectId: projectId,
    
    themeVariables: {
      '--wcm-font-family': 'Roboto, sans-serif',
      '--wcm-accent-color': '#ea7411'
    }
  })