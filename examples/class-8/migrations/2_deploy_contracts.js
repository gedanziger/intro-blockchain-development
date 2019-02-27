const Gambling = artifacts.require("Gambling");
module.exports = function(deployer) {
	return deployer.then(() => {
	    return deployContracts(deployer)
	})
};
async function deployContracts(deployer) {
  await deployer.deploy(Gambling);
}
