# Intro to Blockchain Development

### Class 6 - Solidity Functions

Now we will dig a bit deeper into Solidity development:

1. More Solidity Funtions
2. Expanding Our Sample Application3
3. Weekly Assignment

Reading & Videos:

- [Mastering Ethereum - Web3](https://github.com/ethereumbook/ethereumbook/blob/develop/appdx-web3js-tutorial.asciidoc) - Learn about calling contract methods with JavaScript
- [Mastering Ethereum - Opcodes](https://github.com/ethereumbook/ethereumbook/blob/develop/appdx-evm-opcodes-gas.asciidoc) - Opcodes that will be used in today's lecture
- [Mastering Ethereum - Tools](https://github.com/ethereumbook/ethereumbook/blob/develop/appdx-dev-tools.asciidoc) - More on Ethereum's dev tools

### More Solidity Functions

- Payable functions  - These give the way for a contract to handle incoming Ether. It's very common to use these in crowdsales, gambling applications and more.
- Sign/verify - These functions help users to recreate those verify operations from public key cryptography.
- Hash (Keccak) - This lets a user perform their own sha3 hash
- Calling another contract - Methods to link contracts together, and call existing contracts on the blockchain

### Expanding our Sample Application

The sample application will be updated proceeding the class with more examples to follow from.

### Weekly Assignment

Create your own basic contract that reacts to a payment. Make sure to add some sort of validation on an incoming payment, rejecting it if some condition is not met. Try to use each form of validation function that you know so far in solidity, and add a unit test for it.

Afterwards, deploy your contract to the ropsten or rinkeby testnet and post the contract address in the MouseBelt University forum.
