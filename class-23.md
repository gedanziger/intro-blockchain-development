# Intro to Blockchain Development

### Class 23 - Current Blockchain Research - Sidechains & Scaling

We've covered most of the common topics in blockchain, now we'll look at the actively researched ones. One big area of research is how to expand the transactions per second in a blockchain. Currently, bitcoin handles under 10 transactions per second and Ethereum under 20. At peak times, the Visa credit card network handles tens of thousands (~40,000) transactions per second. For cryptocurrencies to replace centralized payment mechanisms, one question to answer is scale.

While delegation can help increase transactions speed, it comes at the cost of increased centralization of a database (though there is some debate as to whether this is important).

Reading & Videos:

- [Authoritative Guide to Sharding](https://medium.com/nearprotocol/the-authoritative-guide-to-blockchain-sharding-part-1-1b53ed31e060) - Good overview to sharding a blockchain. There is a bit of marketing message at the end from Near protocol, so keep that in mind when reading.
- [Lighthouse](<https://github.com/sigp/lighthouse>) - An ethereum client currently working on sharding
- [Lightning Network Paper](https://lightning.network/lightning-network-paper.pdf) - This is the paper detailing how the lightning network works on bitcoin

### Scaling

The structure of a blockchain like bitcoin, ethereum or even a DPOS chain makes scalability difficult. In bitcoin, each party tries to keep a full set of the database or tries to mine based on hashes of it. Even in delegated proof of stake networks like EOS, all witness nodes try to validate all blocks. This differs from some distributed databases (thinking back to lecture 2 digging into blockchain fundamentals). A common strategy is to split up data for faster processing, or holding more data overall. Pruning can solve some of this, discarding unncecessary or stale data, but verifying the full history (without relying on hashes for stale data) is still a challenge.

Some active topics in blockchain research and development involve splitting up data into more manageable chunks, but still trying to take on the verifiablity of a blockchain. Many of these solutions are only starting to launch, and still in early stages (as of the date of the lecture). Some of the popular areas of research include:

* Sharding
* Sidechains
* Channels / "Lightning Network"

### Sharding

In a sharded database, each node doesn't have to hold all of the content. For example, if I have the 4 servers (call them server A, B, C, D) and 8 pieces of data (data 1,2,3, … 8). In a sharded database, I might write data 1 to server A & server C, then data 2 to server B & server D (or any number of write configurations). Each hardware device has its own capacity for writes, so the write capacity of a distributed database can sometime surpass the write capacity of a single hardware device (or the total amount of data stored).

In Bitcoin or Ethereum at the current time, we don't take advantage of this. Each computer maintains the full database (In the above example, server A holds data 1-8, as well as B, C & D). All of them maintain the state of the blockchain, so to interfere with any part of the blockchain, it would take over 50% of the processing power.

In a sharded blockchain, each node maintains only some of the data. There are numerous strategies in how the shards maintain state, splitting off specific contracts or dapps, splitting data randomly and other strategies. Sharded blockchains also have to deal with possible bad actors. In a sharded proof of work chain, any single shard could be compromised by a majority of bad actors. Others try to elect representatives such as a DPOS strategy to maintain data. A long-standing production solution has yet to be implemented (at the time of the lecture) and it is an area of strong interest.

### Sidechains

Another strategy to handle scaling is a sidechain. While an asset can be defined securely in a very decentralized manner on a blockchain, it has to share the transactional capacity of that blockchain with each other asset or smart contract defined there. This can result in high gas fees or slow confirmation times exchanged for the increased security on the network.

A way around this is to define a copy or alternative blockchain that represents the asset, but reserved only for the asset. In LoomX (specialized towards video games), assets are defined on the ethereum mainnet and on a LoomX sidechain. They can be transferred rapidly and with very high volume in the sidechain, but traded openly on many exchanges or in many wallets with confidence on the Ethereum network. However, one network won't pick up the change in the asset on the other automatically, so it makes use of a token bridge to transfer it.

In the token bridge, assets are exchanged through a smart contract or deposit/withdraw address. They are locked or burned on one network, then made available on the second network (and vice versa). This allows a user to effectively move their assets in and out of the sidechain, selectively gaining the benefit of either. Sidechains exist on other popular protocols, offering users the ability to move their tokens into blockchains with greater transactional throughput, different computational functionality (like smart contracts) and other use cases.

### Lightning

Another solution is handling transactions off of the mainchain through a channel. The most popular implementation of this is Bitcoin's Lightning Network, and other implementations have called this channel-based payments system by the same name.

In the lightning network, some amount of cryptocurrency is locked up in a payment channel (using a similar mechanism to the timelock from the bitcoin transaction. You can see more info in week #1, lecture #3).