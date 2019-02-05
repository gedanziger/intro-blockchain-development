  # Intro to Blockchain Development

### Class 1 - Blockchain Fundamentals 1

The focus of this topic is to explore blockchains from basic standpoints, answering a few basic questions:

1. What is a blockchain & cryptocurrency?
2. What problems inspired a blockchain?
3. What components go into one?

Programming experience is strongly recommended, as the course moves on. For the first week, it will be a basic overview, but in future weeks there will be some more programming-heavy topics.

Throughout the course, we'll be referencing articles from the internet. Some are available as well in print sources. If you would like to purchase a print copy of [Mastering Bitcoin](https://www.amazon.com/Mastering-Bitcoin-Programming-Open-Blockchain/dp/1491954388), though it can be found [for free on GitHub](https://github.com/bitcoinbook/bitcoinbook). [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) first edition will be used as well, and can be found on Amazon if interested.

For each week, I'll have some reading to do before the class. It's all optional, but it will be easier to follow along with the class if you do it. If you just want to read the one most important article each lecture, I put a star next to it.



Reading & Videos:

- [Introduction to Bitcoin - Andreas Antonopoulos](https://www.youtube.com/watch?v=l1si5ZWLgy0) - This is 40 minute talk by Andreas Antonopoulos that runs through fundamentals of how a blockchain works, and how bitcoin is implemented.
- [Goldman Sachs Walkthrough](https://www.goldmansachs.com/insights/pages/blockchain/index.html) - A animated slideshow from Goldman Sachs that goes over the basics of a blockchain, runs on desktop
- [Mastering Bitcoin Chapter 1](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch01.asciidoc) - This is a brief overview of bitcoin, the problems that it tries to address, and breaks down the currency from the ledger *



### What is a Blockchain & A Cryptocurrency?

A cryptocurrency is a type of virtual currency based around public key cryptography. Instead of relying on a central figure, such as a bank or banking network, to verify the authenticity of a transaction, users can verify them using a digital signature. These transactions are held inside of a distributed, peer to peer system called a blockchain (named after the method used to store data & verify order). These components work together with a consensus mechanism and set of validation rules to create a way for anyone to accept and verify a transaction, without relying on another source.

A blockchain can exist without a cryptocurrency, though in the case for Bitcoin, the cryptocurrency provides motivation to the network. Rewards are given to users that help to maintain the network through digital currency issued at a decaying rate. A user is able to determine the amount of effort required to mine (be awarded) the cryptocurrency, and can equate a value to it.

The most popular & widely used cryptocurrency is Bitcoin, which launched its network in 2009. This course will focus primarily on Bitcoin and Ethereum due to the amount of content & learning resources written for them. Since then, many other cryptocurrencies have been created, and any student is encouraged to reach out and learn more about them.



### Problems Addressed

Trust, verifiability and distributed access have always been topics of interest in data storage. While a blockchain-based system can solve those, it also offers a good way to track shared quantities between people. Early research in them started with online money implementations. 

Additionally, within a financial system in particular, there is always an issue of trust. People keep all assets in custody of other parties (a bank, a fund, or some other financial institution). They must trust that the party is holding all of their funds, and will allow them to access them. Sometimes, a financial institution can default (as they did in the US financial crashes of 1929 and 2008). A blockchain system of verifying every user's balance by signatures and public keys allows a user to verify all of their funds are present.

Additionally, in a traditional financial system, there can be many barriers to access. The only way a person has of transmitting funds to another party, outside of engaging a third party to hold funds, is through cash. Cryptocurrencies offer an "E-Cash" (incidentially also the name of an early cryptocurrency) solution. Users can send money, authorized by only themself, to another party. This can make sending payments to parties across borders simpler, when many solution are expensive or complicated.

Finally, verifiable data allows all parties to verify the transaction history or holdings of a quantity. It has been proposed to help in supply chain applications, where multiple parties want to audit the current location or holdings of a good. In securities or equities holdings in a company, it also offers a clear and transparent way to verify share holdings in a tokenized company.

### Components

In his book, Antonopoulos asserts that a bitcoin is composed of:

1. **Bitcoin Protocol** - A decentralized peer-to-peer network
2. **Blockchain** - A public transaction ledger
3. **Independent Transaction Rules** - A set of rules for independent transaction validation and currency issuance
4. **Decentralized Consensus Rules** - A mechanism for reaching global decentralized consensus on the valid blockchain

While we will be digging a bit more into each of these in the future, we can start with a brief overview of these components.

**Protocol** 

All transactions are exchanged in a peer-to-peer manner, so users don't connect to a centralized system. Outside of popular blockchain implementations, some widely-known p2p networks include BitTorrent, InterPlanetary File System (IPFS), and previously parts of the streaming app Spotify. In a network like this, a set of peer computers will discover each other within a network, and often report the location of other peers to connect to. This can give users the option to submit to the network from any peer, rather than just a single centralized web portal.

**Blockchain**

A blockchain works by storing sets of verifiabile data that is summarized by a hash (though often using a data structure called a Merkle Tree to abbreviate many hashes). This hash lets a user have a short representation of many different transactions, which are all collected into a single "block" of data. 

In a header of this, it refers to the previous block of data, ending up with a linked list that contains each of these blocks. Any data in this chain of blocks, or blockchain, can be verified to reference the previous data. It allows any participant in the system to audit previous transactions, in the case of bitcoin.

This blockchain structure allows any party verify the entire history and current state of a dataset, giving a framework to use bitcoin in. However, it also relies on valid & agreed upon data held within each block, and a way to determine which blockchain is the correct one.

**Independent Transaction Rules**

The next issue facing a cryptocurrency like system is to avoid a forgery, once the data is inside the block. A party shouldn't be able to send more money than they own, and shouldn't be able to send another party's money. Most blockchain systems answer this using some common public key cryptographic principles.

By using a digital signature scheme (covered more in the next class), every transaction can be verified back to its owner through a verification operation on it. Once this transaction is received into another node running the blockchain software, it will can then check weather the owner of the transaction actually has access to those funds, and weather they have sufficient funds to send. Since any party can perform this verification operation, this ensures that only valid datat will be held within each block.

**Decentralized Consensus Rules**

One major issue with the blockchain approach is that many different blockchains can exist, all valid by the above rules. There can be different sets of possible transactions that fit into blocks, resulting in different sets of truth for someone's available funds, balance and state of the blockchain. This is not ideal, so an additional consensus mechanism is applied to get all parties to agree about the correct state of the blockchain. This is referred to as a consensus mechanism, and is often a point of contention among different blockchain. A very common debate is "Proof of Work" vs "Proof of Stake" vs "Delegated Proof of Stake" or any other number of ways to reach an agreement on data.

Using one such consensus mechanism, a single correct chain is established that all parties agree to use and follow for correct transactional data.
