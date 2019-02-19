const Hello = artifacts.require("Hello.sol");
const DataTypes = artifacts.require("DataTypes.sol");
const Class = artifacts.require("Class");
const EnglishClass = artifacts.require("EnglishClass");
const BlockchainClass = artifacts.require("BlockchainClass");
module.exports = function(deployer) {
	return deployer.then(() => {
	    return deployContracts(deployer)
	})
};
async function deployContracts(deployer) {
  await deployer.deploy(Hello);
  await deployer.deploy(DataTypes);
  await deployer.deploy(Class);
  await deployer.deploy(EnglishClass);
  await deployer.deploy(BlockchainClass);
}
