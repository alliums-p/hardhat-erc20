const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("MyToken", deployer);
  console.log("Calling Contract...");
  const transactionResponse = await fundMe.totalSupply();
  console.log("Found!", transactionResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
