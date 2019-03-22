# Intro to Blockchain Development

### Class 21 - Alternative Consensus Mechanisms

It is very difficult to attack a blockchain at the protocol level. Generally, most attacks happen at the the level of a user, wallet or exchange. We'll run over some: 

Reading & Videos:

- [Ripple Consensus Whitepaper](https://ripple.com/files/ripple_consensus_whitepaper.pdf) - Whitepaper about ripple's consensus mechanism
- [IOTA Whitepaper](https://assets.ctfassets.net/r1dr6vzfxhev/2t4uxvsIqk0EUau6g2sw0g/45eae33637ca92f85dd9f4a3a218e1ec/iota1_4_3.pdf) - IOTA's whitepaper outlining how a DAG works
- [Basic Explaination of a DAG](https://stackoverflow.com/questions/2283757/can-someone-explain-in-simple-terms-to-me-what-a-directed-acyclic-graph-is) - Helpful StackOverflow example explaining the subject

### Going Beyond Blocks

Instead of finding different ways to optimize how data is persisted in blocks, work functions, block sizes and block production rates, we can also look for room to optimize in how data is stored and validated. Instead of batching transactions into blocks and tracking the previous block in a linked list, we can add transactions asynchronously. Instead of validating all transactions previously in each block, a block can just validate a few that came before it. Eventually, as a transaction has been represented enough by the network, it can reach consensus.

#### Graphs

A graph can be represented any number of ways, in an array, in binary formats, in databases or any number of representations. A graph will have:

* Verticies/Points (Points in the graph)
* Edges (Directed or un-directed connections between those points)

![DAG](https://cdn-images-1.medium.com/max/800/1*zzw_G4qNuVQaWXjXDYPjgg.png)

We define a cycle in a graph if any vertex can be traced back to itself through a collection of edges, following their direction. A graph is said to be acyclic if no such combination of edges or verticies exists to fulfill this property. A very directed acyclic graph is a linked list, our traditional blockchain structure. Even if there are multiple chains branching from a point, cycles will not occur in this.

![Blockchain](https://cdn-images-1.medium.com/max/800/1*srYXHCUC-FKvFcGCPMisrw.png)

#### Taking advantage of a DAG

We can use this structure to avoid validating all transactions in real time and waiting to accumulate them into blocks and distribute through the network. In IOTA, this is done by forcing each transaction to conform two previous transactions (detailed more [here](https://vxcompany.com/2018/05/23/iota-deepdive-1-consensus-on-the-tangle/)). In this structure, each transaction validates the existence of a previous transaction, and transactions afterwards further assert that the previous transaction exists. A transaction reaches a point of being fully consistent when it has enough references that have all validated it (both direct and indirect) to achieve a satisfactory degree of interaction for the application.

In it's current state, IOTA has a set of training wheels on through the form of an orderer. While all transactions could theoretically be validated asynchronously through the DAG structure (called "the tangle" in IOTA), it makes use of a Zookeeper instance to force order/consistency on the network. To avoid a single transaction to be submitted once with a few references older in the chain, then again with many references right after (effectively trying to double spend), the network is using a ordering service commonly employed by distributed databases. There are plans, however, to remove this in the future.

### Ripple

In the Ripple blockchain, a set of transactions are all proposed for eventual candidacy in a block. Instead of taking turns signing off on blocks, all transactions are aggregated to a single pool, and those that receive 80% of votes are selected for a block. This system tolerates a 20% rate of bad actors occurring in the system and issuing byzantine faulty data.

### Masternodes

Dash and PivX don't necessarily have a distinctly different consensus mechanism from the others, however there are extra network effects in the form of masternodes. A masternode is often setup by paying in cryptocurrency and putting up a stake, and taking extra responsibilities in the network in accordance with that stake. The staked amount of tokens can be subject to forfeiture if the masternode fails to perform network duties in some instances. To compensate for this, the masternode is then eligible for some percentage of the block rewards.

In Dash, a masternode is eligible for a percentage of the block rewards, if it performs some network duties around privacy and instant transactions. In "Instant Send", a transaction reaches consensus around 10 masternodes in lieu of the entire network. This allows for irreversible transactions faster than the normal confirmation time, allowing more rapid payment remittance (significantly less than bitcoin or regular dash). The other is Private Send, where transactions are mixed with each other, until it is difficult to find their source.