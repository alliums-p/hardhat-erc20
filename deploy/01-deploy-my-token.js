const { verify } = require("../utils/verify.js");
const { ethers, network } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
  DECIMALS,
} = require("../helper.hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = [ethers.utils.parseUnits(INITIAL_SUPPLY.toString(), DECIMALS)];

  const myToken = await deploy("MyToken", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(myToken.address);

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
    await verify(myToken.address);
  }

  log("=========== Deployed ============");
};

module.exports.tags = ["all", "mytoken"];
