const networkConfig = {
  4: {
    name: "rinkeby",
  },
  1: {
    name: "ethereum",
  },
  137: {
    name: "polygon",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 18;
const INITIAL_SUPPLY = 10000;

module.exports = {
  networkConfig,
  developmentChains,
  INITIAL_SUPPLY,
  DECIMALS,
};
