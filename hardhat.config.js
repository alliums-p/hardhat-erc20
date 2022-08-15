require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

// Links and Keys from .env file
const RINKEBY_RPC_URL = process.env.ALCHEMY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API = process.env.ETHERSCAN_API || "";
const COINMARKETCAP_API = process.env.COINMARKETCAP_API || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      timeout: 400000,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      timeout: 400000,
      blockConfirmations: 1,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API,
    },
    customChains: [
      {
        network: "rinkeby",
        chainId: 4,
        urls: {
          apiURL: "https://api-rinkeby.etherscan.io/api",
          browserURL: "https://rinkeby.etherscan.io",
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API,
    // token: "MATIC", // specify different token for different blockchain
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
