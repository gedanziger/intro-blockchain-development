# Intro to Blockchain Development

### Class 19 - Other Blockchains & Consensus

We've reviewed some basic blockchain implementations, now we will look into some alternative consensus mechanisms. 

Reading & Videos:

- [Hackernoon on Consensus Mechanisms](https://hackernoon.com/different-blockchain-consensus-mechanisms-d19ea6c3bcd6) - Short article on consensus mechanisms
- [Hackernoon on Proof of Stake](https://hackernoon.com/what-is-proof-of-stake-8e0433018256) - A deeper dive into proof of stake

### Other Consensus Mechanisms

We have investiagated proof of work and a m-of-n signatures as a consensus mechanism with a central orderer to agree on correctness and order of data in the past. However, these are not the only possible consensus mechanisms. There are a multitude to choose from - with many resulting in the creation of new cryptocurrencies/blockchains or testnets. Some of the most popular, and the first ones we will focus on, are Proof of Stake and Delegated Proof of Stake / DBFT.

Each of these consensus mechanisms offer some unique advantages and disadvantages from proof of work, so when implementing one of them in a blockchain, a developer should carefully consider the advantages and drawbacks of each. Discussions in forums and social media can get very heated and heavily emphasize which consensus mechanism is used, so it is important to remember specifically their purpose when studying them. A consensus mechanism ensures that all parties can agree on correct set of data in a shared ledger, nothing more.

### Proof Of Stake

Proof of work offers effective security, as there is constant competition to mine the next block, creating an arms race of mining hardware to accumulate the most cryptocurrency. Each block is mined through some work function, meeting an acceptance condition that all parties can agree upon. Miners are each motivated out of self interest for a chance in getting the next block reward. This system is very effective, but also burns a tremendous amount of energy. A siginficant percentage of the world's energy consumption is now dedicated to mining Bitcoin. This computation is a functionally useless calculation - incrementing a nonce and hashing again. 

Proof of Stake offers a different solution. Instead of of competing for the right to create a new block through computational power, a staker puts up their own tokens for a chance to create a new block and earn its rewards.

### Storage-Based Consensus

Instead of staking just currency, a miner can also calculate nonces/hashes based on available storage space in a system called "proof of capacity". This has greater complexity in hard drive space than CPU power, so it emphasizes hard drive space rather than CPU power. Another one is called "Proof of Spacetime", used by filecoin. This requires miners to proove that they have specific files stored by hash or storage space available, becoming a distributed type of document store.