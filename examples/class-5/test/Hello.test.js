const Hello = artifacts.require("Hello");
contract('Hello ', async(accounts) => {
	let helloInstance = null;
	beforeEach(async function () {
    	helloInstance = await Hello.new();
  	});
  	describe('Hello Mousebelt', function () {
		it('should return Hello', async () => {
			const res = await helloInstance.sayHello.call();
			console.log('\t',res);
		});
	})
});