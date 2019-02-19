const DataTypes = artifacts.require("DataTypes");
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('DataTypes ', async(accounts) => {
	let datatypesInstance = null;
	beforeEach(async function () {
    	datatypesInstance = await DataTypes.new();
  	});
	
	it('should retrun numPayments value 0', async () => {
		const res = await datatypesInstance.numPayments.call();
		res.should.be.bignumber.equal(0);
		console.log('\t',res.toNumber());
	});

	describe('String Test', function () {
		
		it('should returns original string ', async function () {
			const res = await datatypesInstance.getString.call();
			console.log('\t', res);
		});

		it('should returns new string ', async function () {
			const _testString = "This is new string ";
			await datatypesInstance.setString(_testString);		

			const res = await datatypesInstance.getString.call();
			console.log('\t', res);
		});
	});

	describe('Uint256 Test', function () {
		
		it('should returns original value ', async function () {
			const res = await datatypesInstance.getUint.call();
			console.log('\t', res.toNumber());
		});
		
		it('should returns new value', async function () {
			const _newVal = 2;
			await datatypesInstance.setUint(_newVal);
			const res = await datatypesInstance.getUint.call();
			console.log('\t', res.toNumber());			
		});
	});

	describe('Array Test', function () {
		it('should return array value ', async function () {
			const value = 111;
			await datatypesInstance.pushArray(value);
			const res = await datatypesInstance.getArray.call();
			const resArray = res.map(r => r.toNumber());
			console.log('\t', `[${res.join(',')}]` );
		});
	});

	describe('Mapping Test', function () {
		it('should return student accounts', async function () {
			const studentAcc = accounts[1];
			const age = 28;
			const fName = "Gong";
			const lName = "Zhu";
			await datatypesInstance.setStudent(studentAcc, age, fName, lName);
			const res = await datatypesInstance.getStudents.call();
			console.log('\t', res);
		});
		it('should return student for selected account', async function () {
			const studentAcc = accounts[1];
			const age = 28;
			const fName = "Gong";
			const lName = "Zhu";
			await datatypesInstance.setStudent(studentAcc, age, fName, lName);
			const res = await datatypesInstance.getStudent.call(studentAcc);
			console.log('\t', res);
		});
		it('should return students count', async function () {
			const studentAcc = accounts[1];
			const age = 28;
			const fName = "Gong";
			const lName = "Zhu";
			await datatypesInstance.setStudent(studentAcc, age, fName, lName);
			const res = await datatypesInstance.countStudents.call();
			console.log('\t', res.toNumber());
		});
	});

	describe('Enum Test', function () {
		it('should return default enum ', async function () {
			const res = await datatypesInstance.getDefaultChoice.call();
			console.log('\t', res.toNumber());
		});
		it('should return enum ', async function () {
			const choice = 1;
			await datatypesInstance.setChoice(choice);
			const res = await datatypesInstance.getChoice.call();
			console.log('\t', res.toNumber());
		});
	});
})

