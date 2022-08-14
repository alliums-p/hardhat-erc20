const { verify } = require("../utils/verify.js");
const { network } = require("hardhat");
const { developmentChains } = require("../helper.hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const myToken = await deploy("MyToken", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
    await verify(myToken.address);
  }

  log("=========== Deployed ============");
};

module.exports.tags = ["all", "mytoken"];
