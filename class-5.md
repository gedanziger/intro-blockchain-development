# Intro to Blockchain Development

### Class 4 - Look at Ethereum

Now we will explore Solidity and Smart Contracts a bit more:

1. What tools do people use to write smart contracts?
2. Geth, Truffle, remix, metamask and infura
3. Deploying a basic contract

Reading & Videos:

- [Mastering Ethereum Chapter 6](https://github.com/ethereumbook/ethereumbook/blob/develop/06transactions.asciidoc) - Intro to Ethereum Transactions
- [Mastering Ethereum Chapter 7](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc) - Intro to Solidity and Smart Contracts

### What tools do people use to write smart contracts?

Most development of smart contracts across blockchains at the time of this course is in solidity. This is largely because Ethereum is the first smart contract system and had a lot of community support. There simply isn't the breadth of developer tools, learning resources and everything that goes along with development on its competitors. 

Generally, a user will start out testing on a local node, move to a testnet to view the contract in an environment with multiple users, and finally, once very confident in the contracts, deploy them to a mainnet. To do this, we will use some basic tools called Geth, Truffle and Remix

### Development Environment

Geth, which we saw before, is just a node of the ethereum blockchain we can run locally. It has a particular service that we will talk to for handling each of the specific functions, referred to as web3. This is a play on expanding web 2.0, a receent upate to standard internet technologies.

[Remix](https://remix.ethereum.org) is a popular web-based IDE for solidity and smart contracts. While working on new code, you can configure your project through there, handle deployment to a local node, testnet and more.

[Truffle](https://truffleframework.com/docs/truffle/overview) - Truffle is a testing framework for solidity. As the smart contracts are immutable, we'll need to run extensive tests before we can deploy it.

[Metamask](https://metamask.io/) - Metamask is an in-browser chrome extension that helps call contracts and run tests.

[Infura](https://infura.io/) - Instead of setting up a node locally and waiting to sync on a new environment, you can also use infura. This is a very simple way to get data from the testnet or mainnet on ethereum, and submit transactions. Keep in mind that it is a bit unreliable for production applications, however.

### Deploying a basic contract

A contract will be released at the time of the class that we will run through and deploy, to elaborate more on solidity code.
