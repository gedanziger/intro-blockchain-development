const Payout = artifacts.require("Payout");
const Whitelist = artifacts.require("Whitelist");
module.exports = function(deployer) {
	return deployer.then(() => {
	    return deployContracts(deployer)
	})
};
async function deployContracts(deployer) {
  await deployer.deploy(Payout, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
  await deployer.deploy(Whitelist);
}
