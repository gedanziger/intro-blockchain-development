const Class = artifacts.require("Class");
const BlockchainClass = artifacts.require("BlockchainClass");
const EnglishClass = artifacts.require("EnglishClass");
const { assertRevert } = require('./helper/assertRevert');
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Class', async(accounts) => {
	let classInstance = null;
	beforeEach(async function () {
    	classInstance = await Class.new();
  	});

  	describe('Public', function () {
		it('should returns original students ', async function () {
			const res = await classInstance.getStudents.call();
			console.log('\t', res.toNumber());
		});

		it('should returns new students ', async function () {
			const students = 20;
			await classInstance.setStudents(students);		
			const res = await classInstance.getStudents.call();
			res.should.be.bignumber.equal(students);
			console.log('\t', res.toNumber());
		});

		it('should returns added students ', async function () {
			let defaultStudnets = await classInstance.getStudents.call();
			defaultStudnets = defaultStudnets.toNumber();
			const add = 5;
			await classInstance.addStudents(add);		
			const res = await classInstance.getStudents.call();
			res.should.be.bignumber.equal(defaultStudnets + add + 1);
			console.log('\t', res.toNumber());
		});

	});
	describe('External', function () {
		it('should returns added teachers', async function () {
			const defaultTeachers = 5;
			const add = 5;
			res = await classInstance.addTeachers(add);		
			res.should.be.bignumber.equal(defaultTeachers + add);
			console.log('\t', res.toNumber());
		});
	})
})

contract('EnglishClass', async(accounts) => {
	let eClassInstance = null;
	beforeEach(async function () {
    	eClassInstance = await EnglishClass.new();
  	});
  	describe('Only public function access allowed', function () {
		it('should returns students ', async function () {
			const res = await eClassInstance.readData();		
			console.log('\t', res.toNumber());
		});
	});
})

contract('BlockchainClass', async(accounts) => {
	let bClassInstance = null;
	beforeEach(async function () {
    	bClassInstance = await BlockchainClass.new();
  	});
  	describe('Internal function access allowed', function () {
		it('should returns students + teachers ', async function () {
			const res = await bClassInstance.readTotal();		
			console.log('\t', res.toNumber());
		});
	});
})