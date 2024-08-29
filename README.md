# Threshold tBTC minting portal.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This platform allows you to efficiently mint Bitcoin on the Arbitrum network. Leverage Arbitrum’s scalability and low transaction fees to optimize your Bitcoin transactions. Our portal provides a streamlined experience for those looking to bridge Bitcoin into the Arbitrum ecosystem quickly and securely.

## How to start

-   Clone repository
    ´git clone https://github.com/Unknown-Gravity/tbtc-arb-front.git´

-   install all the packages
    ´yarn´

> If you encounter an error installing the packages, just erase yarn.lock file and try again the yarn command

> Important: Please note that for now, the SDK must be installed locally within the project. However, after the official release, you will need to update your package.json to reflect the new package location and version. Make sure to adjust accordingly to stay up-to-date with the latest changes.

### Env file

´

# General Configuration

REACT_API_ROUTE='http://localhost:3333'
GENERATE_SOURCEMAP=false

# API Keys and Endpoints

REACT_APP_API_KEY='bRZv5V7XLoVjdEtbF9MWxjrwLVnfaipN'

# RPC Endpoints

REACT_APP_ETH_RPC='https://go.getblock.io/15037027e0e9491e9fc275c993f14328'
REACT_APP_ETH_MAINNET_RPC='https://go.getblock.io/54800df3e763479c9d61bff9c05b2386'

# API URLs

COINGECKO_API_URL='https://api.coingecko.com/api/v3/simple/price'

# Explorer URLs

REACT_APP_BTC_EXPLORER='https://blockstream.info/testnet/address/'
REACT_APP_ARB_EXPLORER='https://sepolia.arbiscan.io/address/'

# IPFS Loyalty Program Endpoints

REACT_APP_IPFS_RETRIEVER_URL='https://blush-mad-ox-324.mypinata.cloud/ipfs/'
REACT_APP_LOYALTY_PROGRAM_API_URL='https://thresholdtlp.com/api/latest-cids'

REACT_APP_CHAINID=421614
´
