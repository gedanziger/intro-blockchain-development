# Intro to Blockchain Development

### Class 20 - Other Blockchains & Consensus

We've reviewed some basic blockchain implementations, now we will look into some alternative consensus mechanisms. 

Reading & Videos:

- [DPOS - Dan Larimer](https://steemit.com/dpos/@dantheman/dpos-consensus-algorithm-this-missing-white-paper) - Dan Larimer (author of graphene chains bitshares, eos and steem) posting about consensus in DPOS
- [Hackernoon: Traditional vs Delegated Proof of Stake](https://hackernoon.com/the-difference-between-traditional-and-delegated-proof-of-stake-36a3e3f25f7d) - A comparison between traditional and delegated proof of stake solutions
- [Tendermint](https://tendermint.com/docs/introduction/introduction.html) - A short article on tendermint consensus

### Practical Byzantine Fault Tolerance

A proof of stake system offers some efficiency improvements and financial incentives outside of a simple proof of work system to mine cryptocurrencies. However, it often doesn't solve scaling challenges fully. It is difficult to validate a set of data fully across an entire network at the levels required by some modern applications. To mitigate this, a select set of high performance nodes perform validation on behalf of the network, and share data to other parties.

### Tendermint

Tendermint is an implementation of a dBFT blockchain. It can use a cryptocurrency optionally, or be used simply as a database. You can check a very popular implemenation of it in the Smart Cosmos network. A rough diagram of the implementation can be seen below:

![Tendermint Consensus](https://tendermint.com/docs/assets/img/tm-transaction-flow.258ca020.png)

Blocks go through a series of pre-processing and eventually commit transactions to a block. The rest of the blockchain structure remains intact, but the only parties that have write permission on blocks can produce new data in them. A block is proposed in the process:

1. Block proposer candidate for the current round is selected
2. Block proposer sends out a block holding the proposed transactions
3. Each node indicates that it is ready to participate in the voting process
4. Each node votes to accept the block (need 2/3 of votes to pass the voting round)
5. If all validators vote yes, a new block is broadcast and added to the chain

This process allows block producers to circulate large blocks quickly, and not worry about checking approval outside of validators quickly. While bitcoin (at lecture time) processes far under 10 transactions per second and Ethereum under 20, DPOS systems promise thousands or tens of thousands of transactions per second, rivaling modern credit card processing networks in instances.

##### Fault Tolerance

These systems could be succeptible to byzantine faults, but in most cases it would take a very large amount of bad actors on the network. It would take over 1/3 of nodes acting in bad faith to cause a byzantine fault in a dBFT network to cause an error due to a byzantine fault.

### DPOS

Building on a tendermint-based system, validator nodes can be elected based on a comination of:

1. Amount of cryptocurrency staked
2. Amount of votes received from the community

Through a combination of financial incentives to continue producing blocks and earning block rewards, block proposer or witness nodes have a financial incentive to continue to act in good faith.

A set of dBFT blockchains promoted by Dan Larimer following an architecture called Graphene follows this. The first, Bitshares, allows for simple defining of assets and a decentralized exchange with listing/making/taking orders. This evolved first to Steem - a social network built on the blockchain. Instead of sending simple transactions, posts in social media were sent, and likes/comments were sent onto the blockchain as operations. The higher throughput of dBFT blockchains enabled this (all of a social network sharing 20 transactions per second wouldn't realistically make sense). 

A final blockchain he has produced is called EOS, which implements Ethereum's smart contracts, steem's witness system and a written constitution for governence rules to create an attempt at a scalable shared compute network. This has had the largest fundraise to date of a blockchain project, with a total fundraise amount in the billions.