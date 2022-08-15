const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { INITIAL_SUPPLY, DECIMALS } = require("../../helper.hardhat.config");

describe("MyToken", async function () {
  let myToken, deployer;

  const total_supply = ethers.utils.parseUnits(
    INITIAL_SUPPLY.toString(),
    DECIMALS
  );

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    myToken = await ethers.getContract("MyToken", deployer);
  });

  describe("constructor", async function () {
    it("Has initial supply set", async function () {
      const response = await myToken.totalSupply();
      expect(response).to.equal(total_supply);
    });
  });
});
