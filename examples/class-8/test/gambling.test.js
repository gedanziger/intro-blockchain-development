const Gambling = artifacts.require("Gambling");
const { assertRevert } = require('./helper/assertRevert');
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Gambling', async(accounts) => {
	let gamblingInstance = null;
	const fundAmount = 10 ** 18;

	const validGambleAmount = 10 ** 17;
	const invalidGambleAmount = (0.5 * fundAmount + 100);
	console.log(accounts);
	const ownerAccount = accounts[0];
	const gamblerAccount = accounts[1];
	const strangerAccount = accounts[2];

	beforeEach(async function () {
    	gamblingInstance = await Gambling.new({from: ownerAccount});
  	});

	describe('Load Fund', function () {
		it('Reverts - load fund by stranger', async function () {
			try {
				await assertRevert(await gamblingInstance.load_funds({ from: strangerAccount, value: fundAmount }));
			} catch (err) {
				console.log(err);
			}
		});

		it('Success - load fund by owner', async function () {
			try {
				const res = await gamblingInstance.load_funds({ from: ownerAccount, value: fundAmount });
				console.log('\t', res.logs[0]);
			} catch (err) {
				console.log(err);
			}
		});
	});

	describe('\n\nGet Balance', function () {
		it('Returns current contract balance', async function () {
			try {
				await gamblingInstance.load_funds({ from: ownerAccount, value: fundAmount });
				const resBalance = await gamblingInstance.get_balance();
				resBalance.should.be.bignumber.equal(fundAmount);
				console.log('\tContract Balance: ', resBalance.toNumber());
			} catch (err) {
				console.log(err);
			}
		});
	});

	describe('\n\nGambling', function () {
		it('Reverts - current contract balance is less then amount paid x2', async function () {
			try {
				await gamblingInstance.load_funds({ from: ownerAccount, value: fundAmount });
				console.log('\tContract Balance:', fundAmount, 'Invest amount:', invalidGambleAmount);
				await assertRevert(await gamblingInstance.send(invalidGambleAmount , { from: gamblerAccount }));
			} catch (err) {
				console.log(err);
			}
		});
		

		it('Success - current contract balance is same as amount paid x2', async function () {
			try {
				console.log(gamblingInstance.address);
				const res = await gamblingInstance.load_funds({ from: ownerAccount, value: fundAmount });
				console.log(res);
				const res2 = await gamblingInstance.send(validGambleAmount, {from: ownerAccount});
				if (res2.logs) {
					res2.logs.forEach(log => {
						console.log(log.args);
					})
				}
			} catch (err) {
				console.log(err);
			}
		});
	});

	describe('\n\nWithdraw', function () {
		it('Success', async function () {
			try {
				await gamblingInstance.load_funds({ from: ownerAccount, value: fundAmount });
				console.log(gamblerAccount)
				// const res = await gamblingInstance.send(validGambleAmount , { from: gamblerAccount });
				const res = await gamblingInstance.gamble( {from: gamblerAccount, value: validGambleAmount });
				console.log(res.logs[0])
				const {logs} = await gamblingInstance.withdraw_funds({ from: gamblerAccount });
				console.log(logs[0]);
			} catch (err) {
				console.log(err);
			}
		});
	}); 


})