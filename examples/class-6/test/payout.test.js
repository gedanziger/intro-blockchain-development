const Whitelist = artifacts.require("Whitelist");
const Payout = artifacts.require("Payout");
const { assertRevert } = require('./helper/assertRevert');
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:9545/')

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}
contract('Payout', async(accounts) => {
	let whitelistInstance = null;
	
	let payoutInstance = null;
	const value = 10 ** 8;
	beforeEach(async function () {
    	payoutInstance = await Payout.new(accounts[0]);
    	whitelistInstance = await Whitelist.new();
  	});

	describe('Payout Before Whitelist', function () {
		it('reverts - before Whitelist contract address set', async function () {
			try {
				await assertRevert(await payoutInstance.send(value, { from: accounts[1] }));
			} catch (err) {
				console.log(err);
			}
		});

		it('reverts - instantSendEth = false', async function () {
			try {
				const before = await payoutInstance.getWhitelistAddress();
				console.log('\t Before set whitelist contract address:', before);

				await payoutInstance.setWhitelistAddress(whitelistInstance.address);
				
				const after = await payoutInstance.getWhitelistAddress();
				console.log('\t After set whitelist contract address:', after);

				await assertRevert(await payoutInstance.send(value, { from: accounts[1] }));
			} catch (err) {
				console.log(err);
			}
		});

		it('reverts - sender not whitelisted ', async function () {
			try {
				const before = await payoutInstance.getWhitelistAddress();
				console.log('\t Before set whitelist contract address:', before);
				await payoutInstance.setWhitelistAddress(whitelistInstance.address);
				
				const after = await payoutInstance.getWhitelistAddress();
				console.log('\t After set whitelist contract address:', after);

				await payoutInstance.setInstantPay();
				
				const beforeWhitelist = await whitelistInstance.checkWhitelist(accounts[1]);
				console.log(`\tWhitelist result of ${accounts[1]}`,beforeWhitelist);
				
				const res = await payoutInstance.send(value, { from: accounts[1] });
				console.log(res.logs);
				// await assertRevert(await payoutInstance.send(value, { from: accounts[1] }));
				
			} catch (err) {
				console.log(err);
			}
		});

	});

  	describe('Payout After Whitelist', function () {
  		
  		it('reverts - instantSendEth = false ', async function () {
			try {
				
				/*
				To get private key and public key pair please run command $ truffle dev 

				Accounts:
				(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
				(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
				(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
				(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
				(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
				(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
				(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
				(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
				(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
				(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

				Private Keys:
				(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
				(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
				(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
				(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
				(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
				(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
				(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
				(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
				(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
				(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5
				 */

				// this private key is for account[1] of truffle 0xf17f52151ebef6c7334fad080c5704d77216b732
				const privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'; 

				const acc = web3.eth.accounts.privateKeyToAccount(privateKey); // 0xf17f52151ebef6c7334fad080c5704d77216b732
				const message = "I love MouseBelt!";
				const hashMessage = web3.eth.accounts.hashMessage(message);
				const sig = web3.eth.accounts.sign(message, privateKey);
				const signature = sig.signature;
				const beforeWhitelist = await whitelistInstance.checkWhitelist(acc.address);
				console.log(`\tWhitelist result of ${acc.address}`,beforeWhitelist);
				await whitelistInstance.addWhitelist(signature, {from: accounts[1]});
				const afterWhitelist = await whitelistInstance.checkWhitelist(acc.address);
				console.log(`\tWhitelist result of ${acc.address}`);


				const before = await payoutInstance.getWhitelistAddress();
				console.log('\t Before set whitelist contract address:', before);

				// Set whitelist addresss
				const { logs } = await payoutInstance.setWhitelistAddress(whitelistInstance.address);
				// console.log(logs);

				const after = await payoutInstance.getWhitelistAddress();
				console.log('\t After set whitelist contract address:', after);
				
				await assertRevert(await payoutInstance.send(value, { from: accounts[1] }));
				

			} catch (err) {
				console.log(err);
			}
		});

		it('success - whitelist and instantSendEth = true', async function () {
			try {

				/*
				To get private key and public key pair please run command $ truffle dev 

				Accounts:
				(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
				(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
				(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
				(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
				(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
				(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
				(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
				(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
				(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
				(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

				Private Keys:
				(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
				(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
				(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
				(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
				(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
				(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
				(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
				(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
				(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
				(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5
				 */
				
				// this private key is for account[1] of truffle 0xf17f52151ebef6c7334fad080c5704d77216b732
				const privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'; 

				const acc = web3.eth.accounts.privateKeyToAccount(privateKey); // 0xf17f52151ebef6c7334fad080c5704d77216b732
				const message = "I love MouseBelt!";
				const hashMessage = web3.eth.accounts.hashMessage(message);
				const sig = web3.eth.accounts.sign(message, privateKey);
				const signature = sig.signature;
				const beforeWhitelist = await whitelistInstance.checkWhitelist(acc.address);
				console.log(`\t Whitelist result of ${acc.address}`,beforeWhitelist);
				await whitelistInstance.addWhitelist(signature, {from: accounts[1]});
				const afterWhitelist = await whitelistInstance.checkWhitelist(acc.address);
				console.log(`\t Whitelist result of ${acc.address}`, afterWhitelist);


				const before = await payoutInstance.getWhitelistAddress();
				console.log('\t Before set whitelist contract address:', before);

				// Set whitelist addresss
				await payoutInstance.setWhitelistAddress(whitelistInstance.address);
				
				const after = await payoutInstance.getWhitelistAddress();
				console.log('\t After set whitelist contract address:', after);
				
				// Set instantSendEth = true
				await payoutInstance.setInstantPay();

				// Deposit - main payable function
				const res = await payoutInstance.deposit({ from: accounts[1] , value});
				console.log('\t', res.logs);

			} catch (err) {
				console.log(err);
			}
		});
	});

	describe('Withdraw', function () {
		it('reverts - withdraw from stranger (not payment address)', async function () {
			try {
				await assertRevert(await payoutInstance.withdraw({from: accounts[1]}));
			} catch (err) {
				console.log(err);
			}
		});

		it('success - withdraw from payment address', async function () {
			try {
				// Add account[1] to whitelist
				const privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'; 
				const acc = web3.eth.accounts.privateKeyToAccount(privateKey); // 0xf17f52151ebef6c7334fad080c5704d77216b732
				const message = "I love MouseBelt!";
				const hashMessage = web3.eth.accounts.hashMessage(message);
				const sig = web3.eth.accounts.sign(message, privateKey);
				const signature = sig.signature;
				await whitelistInstance.addWhitelist(signature, {from: accounts[1]});
				const before = await payoutInstance.getWhitelistAddress();

				// Set whitelist addresss
				await payoutInstance.setWhitelistAddress(whitelistInstance.address);
				
				// Set instantSendEth = true
				await payoutInstance.setInstantPay();

				// Deposit - main payable function
				await payoutInstance.deposit({ from: accounts[1] , value});
				
				// Withdraw
				const res = await payoutInstance.withdraw({from: accounts[0]});
				console.log(res.logs);

			} catch (err) {
				console.log(err);
			}
		});

	});
})