# Threshold tBTC minting portal. 💱

This platform allows you to efficiently mint Bitcoin on the Arbitrum network. Leverage Arbitrum’s scalability and low transaction fees to optimize your Bitcoin transactions. Our portal provides a streamlined experience for those looking to bridge Bitcoin into the Arbitrum ecosystem quickly and securely.

## How to start 💪

-   Clone repository with
    `git clone https://github.com/Unknown-Gravity/tbtc-arb-front.git`

-   install all the packages with
    `yarn`

> If you encounter an error installing the packages, just erase yarn.lock file and try again the yarn command

> Important: Please note that for now, the SDK must be installed locally within the project. However, after the official release, you will need to update your package.json to reflect the new package location and version. Make sure to adjust accordingly to stay up-to-date with the latest changes.

## Env file ❗

To get started, please copy the code block below into your project. Make sure to replace the placeholder RPC URLs with your own. This step is crucial for ensuring that your application connects to the correct network endpoints.

```
GENERATE_SOURCEMAP=false

# API Keys and Endpoints
REACT_APP_API_KEY='<YOUR_DUNE_API_KEY>' #Dune API Key

# RPC Endpoints
REACT_APP_ETH_SEPOLIA_RPC='<YOUR_ETH_SEPOLIA_RPC>'
REACT_APP_ETH_MAINNET_RPC='<YOUR_ETH_MAINNET_RPC>'

# API URLs
COINGECKO_API_URL='https://api.coingecko.com/api/v3/simple/price'

# Explorer URLs
REACT_APP_BTC_EXPLORER='https://blockstream.info/testnet/address/'
REACT_APP_ARB_EXPLORER='https://sepolia.arbiscan.io/address/'

# IPFS Loyalty Program Endpoints
REACT_APP_IPFS_RETRIEVER_URL='<YOUR_IPFS_RETRIEVER_URL>'
REACT_APP_LOYALTY_PROGRAM_API_URL='<YOUR_LOYALTY_PROGRAM_API_URL>'

REACT_APP_CHAINID=421614
```

## Start the project 👌

Run `yarn start` and a window will automatically open to with the project. You can also open http://localhost:3000/

### Home page

<picture>
   <img src="./public/home.png">
</picture>

# Build Project 🏗️

Run `yarn build`
