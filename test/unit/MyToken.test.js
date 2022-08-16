const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { INITIAL_SUPPLY, DECIMALS } = require("../../helper.hardhat.config");

describe("MyToken", async function () {
  let myToken, deployer, guestAddress;

  const total_supply = ethers.utils.parseUnits(
    INITIAL_SUPPLY.toString(),
    DECIMALS
  );

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    myToken = await ethers.getContract("MyToken", deployer);
    guestAddress = (await getNamedAccounts()).guest;
  });

  describe("constructor", async function () {
    it("Has initial supply set", async function () {
      const response = await myToken.totalSupply();
      expect(response).to.equal(total_supply);
    });
    it("Has correct name and symbol set", async function () {
      const name = (await myToken.name()).toString();
      assert.equal(name, "MyToken");

      const symbol = (await myToken.symbol()).toString();
      assert.equal(symbol, "MT");
    });
  });

  describe("mint", async function () {
    it("must not mint tokens after contract initialization", async function () {
      try {
        const response = await myToken._mint(deployer, total_supply);
        console.log(response);
        assert(false);
      } catch (err) {
        assert(err);
      }
    });
  });

  describe("transfer", async function () {
    it("should transfer successfully to an address", async function () {
      const sendAmt = ethers.utils.parseEther("100");
      await myToken.transfer(guestAddress, sendAmt);
      const guestBalance = await myToken.balanceOf(guestAddress);
      expect(guestBalance).to.equal(sendAmt);
    });
    describe("allowances", async function () {
      const allowanceAmt = ethers.utils.parseEther("100");
      beforeEach(async () => {
        guestToken = await ethers.getContract("MyToken", guestAddress);
      });
      it("does not allow unapproved transfers", async function () {
        await expect(
          guestToken.transferFrom(deployer, guestAddress, allowanceAmt)
        ).to.be.revertedWith("ERC20: insufficient allowance");
      });
      it("allows transfer of approved amount of tokens", async function () {
        const sendAmt = ethers.utils.parseEther("50");
        await myToken.approve(guestAddress, allowanceAmt);
        await guestToken.transferFrom(deployer, guestAddress, sendAmt);
        expect(await myToken.balanceOf(guestAddress)).to.equal(sendAmt);
      });
      it("wont allow transfer of more than allowance", async function () {
        const sendAmt = ethers.utils.parseEther("150");
        await myToken.approve(guestAddress, allowanceAmt);
        await expect(
          guestToken.transferFrom(deployer, guestAddress, sendAmt)
        ).to.be.revertedWith("ERC20: insufficient allowance");
      });
      it("makes sure allowance amount is correct", async function () {
        await myToken.approve(guestAddress, allowanceAmt);
        const allowance = await myToken.allowance(deployer, guestAddress);
        expect(allowance).to.equal(allowanceAmt);
      });
    });
  });
});
