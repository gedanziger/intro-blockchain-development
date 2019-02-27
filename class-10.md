# Intro to Blockchain Development

### Class 10 - Private Blockchains

So far, we've explored Bitcoin and Ethereum extensively and got to look at smart contracts and public blockchains. This emphasizes public access and verifiability of data, with no barriers to participate in a distributed financial/compute network. However, there are a few more closed-off applications of blockchains. Next, we'll be looking at how private blockchains work through diving into the Hyperledger project. Our topics will include the following:

1. Private Blockchains
2. Permissioned Access
3. Hyperledger Foundation
4. Getting Started with Hyperledger Fabric & Composer

Reading & Videos:

- [Building a Blockchain for Business](https://www.youtube.com/watch?v=EKa5Gh9whgU&t=4s)* - This is a 3-minute video released by IBM about permissioned blockchains and their applications in business
- [Compare Private and Public Blockchains](https://medium.com/coinbundle/for-beginners-compare-public-and-private-blockchains-1b048d2d89c3)* - This is a very short article by Coinbundle comparing private and public blockchains
- [Comparison of Ethereum, Hyperledger Fabric and Corda ](https://medium.com/@philippsandner/comparison-of-ethereum-hyperledger-fabric-and-corda-21c1bb9442f6) - This is a medium post that breaks out the differences between two hyperledger projects pretty simple

### Private Blockchains

In a public blockchain, we have an encironment where anyone can join or interact. A private blockchain takes a far different approach, where rules govern which users can connect to the network, what data they can read, and how they can manipulate a shared state or ledger. 

At a first glance, this might appear to disagree with many of the principles and reasons for forming a distributed ledger in the first place. These public networks were peer-to-peer with any party contributing transactions to lower barriers to entry and validate a shared state for themselves. In fact, many outspoken proponents of public networks and advocates of the censorship-resistant properties discourage the use of private blockchains. However, just because a network isn't free and open for all parties to use does not mean that it has no benefits over a fully centralized system.

In a private blockchain, the other components of a blockchain still apply. All of the data is cryptographically signed, so it may be verified against the publisher to see that the party who submitted a transaction is able to update this data. In fact, this concept simply builds on permission to send currency in existing cryptocurrency systems. For example, in Bitcoin a user is only able to send a transaction that has UTXOs they have authorized themself. They can't transact using another user's unspent balance. A permissioned blockchain might restrict access from just transactions to manipulating the chain state at all (instead of not committing another user's balance, a user might not be able to transact at all unless they are approved).

### Permissioned Access

Permissioned access in a private blockchain can involve restrictions at multiple points of access. While many centralized applications might restrict by a particular session or authentication token, blockchains have the option to additionally leverage the address used for signing/verify to aid this process. Rather than just authenticating users, a blockchain will also have to authenticate nodes that have access to the data. A user might be allowed to query a subset of data from the node through some interface (maybe a REST or RPC API), but any node accessing data will have to validate it against the history of the network, in order to know it is valid. Because of this, nodes are often one of the major points of concern. A poorly-acting node in the network could access data, then give it out to the end users of the application. Private blockchains often have a way to authenticate nodes directly to handle this. In Hyperledger Fabric (HLF) we refer to each node as a peer, and define how to authenticate them in shared rules in a business network. We'll explore these business networks further as we setup a project at the end of the lecture.

### Hyperledger Project

As development on private blockchains started to gather public interest, the Linux Foundation eventually endorsed it. Along with support from a few corporate partners including IBM, the [Hyperledger project](https://www.hyperledger.org/) was started. In the same manner that the [Apache Foundation](https://www.apache.org/foundation/) incubates popular open-source repositories in order to maintain production usage, the Hyperledger project offers the same services to blockchain open-source projects.

At the lecture date, the one of the most popular software packages to come from the Hyperledger project is  Hyperledger Fabric - a permissioned blockchain targeted at private deployments. In fact, when many people say that they want to "build on hyperledger", they are referring to Hyperledger Fabric or Composer (an abstraction layer on top of Fabric).

### Getting Started with Hyperledger Fabric & Composer

While HLF is the underlying private blockchain we are using for today's lecture, we'll be interacting with it using Composer. Composer gives a simple way to define shared objects in chaincode, rules to access them, queries to mutate or retrieve data and generates a REST API around it. To work with Composer, we'll be using JavaScript (NodeJS particularly). If you are running it locally, note that it is a bit picky as to the version of JS you are using. It is preferable to install the specific version or use [nvm](https://github.com/creationix/nvm) to do it for you.

For the purpose of the class, we'll run through a tutorial at the [Composer playground](https://composer-playground.mybluemix.net).


