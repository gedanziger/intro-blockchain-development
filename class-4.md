# Intro to Blockchain Development

### Class 4 - Look at Ethereum

The focus of this topic is to take a deeper look at Ethereum:

1. What is Ethereum?
2. What does verifiable code mean - Smart Contracts
3. Why are smart contracts important?
4. How does Ethereum implement it?
5. Different Networks and Getting Started with Ethereum

Reading & Videos:

- [Mastering Ethereum Chapter 1](https://github.com/ethereumbook/ethereumbook/blob/develop/01what-is.asciidoc) - Great quick intro to Ethereum
- [Mastering Ethereum Chapter 2](https://github.com/ethereumbook/ethereumbook/blob/develop/02intro.asciidoc) - Next section of Ethereum Intro
- [Mastering Ethereum Chapter 3](https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc) - Clients to the Ethereum network

### What is Ethereum?

Ethereum another widely-used cryptocurrency earlier. While the main goal of bitcoin was to serve as a means of payment and digital currency, Ethereum is primarily an experiment in a shared, decentralized computer powered by a cryptocurrency. It uses similar concepts of public key cryptography, digital signatures, transactions, blocks and a consensus mechanism that power a blockchain. However, it introduces a new concept of a blockchain-based virtual machine, verifiable code execution and a smart contract that open up many new posibilities.

### Smart Contracts

While cryptocurrencies have signed transactions that another party can verify, Ethereum makes use of a signed set of instructions that reflect a change to a shared state on the Ethereum virtual machine. In short, Ethereum allows many parties to verify the same pattern of changes to a program in code, and replicate those changes on any machine. This lets users run a program in a predictable manner on any computer, not just their own. {For example, ...}

The sets of instructions to execute are sent through transactions, in a similar manner to bitcoin. In Ethereum, this lets a user define much more complicated logic than through the scripting language signed to bitcoin transactions. The Ethereum Virtual Machine (EVM) that runs these programs is [Turing](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf) [complete](https://en.wikipedia.org/wiki/Turing_completeness), so we can represent any set of states or write a program on it if necessary.

### Why are smart contracts important?

Smart contracts are important because they let users define much more complicated logic than a simple bitcoin transaction. It could issue a new share in a company, define rules around a IPO or public security offering, grant specific rules for a payment's release, all on the same distriuted ledger as a payment. These sets of instructions often represent agreements between parties, so while they are just decentralized programs, the term smart contract became popular to describe them.

Smart contracts let users define arbitrary logic for others to verify, then share it to the world in a manner that doesn't just involve trust from one party. Rather than trusting the result of code that he/she can't verify directly, Ethereum allows that person to verify their code execution by running on their own computer, then comparing the result to the blockchain.

### How does Ethereum Implement it?

Ethereum uses the EVM to run sets of instructions. State on the blockchain is mutated through each set of transactions, but the transaction history itself cannot change. While syncing to the current state of the network, a computer is able to verify all compute operations from the past, and ensure that the code follows the publicly agreed upon logic. Each transaction modifying the state of the network is submitted through a transaction, and the miners compensated accordingly. There is a base price established for each operation, and the gas price is established by the amount a user would want to pay as a multiple of that base price.


### Networks and getting started with Ethereum

There are many different networks to choose from. Different individuals are constantly trying to improve the network, and leave reference implementations in a test state to compare with the main network. This main network is referred to as a "mainnet", while all of the different test networks are referred to as a "testnet". Developers often create applications first on a testnet because ether there has no value. It is often easily mined or given away for free to newcomers.

#### 1. Installing geth

##### 1) Installing from go-ethereum source code

To get started with ethereum, download a client. The most popular and recommended version is the Go implementation of Ethereum (go-ethereum or geth). You can find it in the repository [here](https://github.com/ethereum/go-ethereum).

##### 2) Installing from PPA

```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum

```
#### 2. Run geth as a service in background

1. Goto   /etc/systemd 
2. Create a file geth.service
```
[Unit]
Description=Geth
[Service]
Type=simple
User=root
Restart=always
ExecStart=/usr/bin/geth --testnet --networkid=3 --verbosity 3 --syncmode=fast --datadir=/opt/.ethereum --rpccorsdomain="*" --cache=1024 --rpc --rpcaddr=0.0.0.0 --rpcport=8545 --rpcapi eth,personal,net,web3
[Install]
WantedBy=default.target
```
3. Run geth as a service
```bash
$ systemctl --user enable geth.service
$ systemctl --user start geth.service
```