# Intro to Blockchain Development

### Class 12 - Applications and Other Private Blockchains 

Previously, we dug into Hyperledger Composer a bit more and wrote some chaincode. Now, we'll look at applications and see how the industry is currently trying to implement it. Note that some of the reading will have marketing content, we do not promote any of these solutions specifically, just offer examples of problems the industry is currently trying to solve. If you wish to avoid this, you can skip it and check notes below. Topics are:



1. Advanced Hyperledger Composer and Fabric 
2. Business Applications of Private Blockchains
   1. Supply Chain
   2. Agriculture
   3. Identity Management
   4. Certification & Audit
   5. Banking & Trade
3. Other Private/Permissioned Blockchains
4. Open Discussion & Prepare for Projects



Reading & Videos:

- [Blockchain Technology for Supply Chains](https://www.mckinsey.com/business-functions/operations/our-insights/blockchain-technology-for-supply-chainsa-must-or-a-maybe) - Here is an analysis of private blockchains for a supply chain application by McKinsey (a large consulting firm). They point out slow adoption but note the promising aspects.
- [The Impact of Digitial Identity](https://blockchainatberkeley.blog/the-impact-of-digital-identity-9eed5b0c3016) - This is an article from Blockchain at Berkeley that outlines how digital identity is managed, and how a blockchain can help. While this doesn't necessarily have to be a private blockchain, many solutions are looking to a private network to do this.
- [IBM Blockchain for Supply Chain](https://www.ibm.com/blockchain/industries/supply-chain) - This is IBM's website outlining possible returns of blockchain for supply chain applications in businesses.

### Advanced Hyperledger Composer & Fabric

Previously, we deployed a Hyperledger Composer business network successfully, added models and queries to it. Now, we'll look at handling these situations within Hyperledger Composer:

* Handling updates to a live business network
* Adding additional peers and organizations to our network
* Interacting with other business networks

Additionally, we have been interacting with Fabric through Composer only, as it is an abstraction above it to simplify development. To get more control over particular components, all components we have worked on so far could be implemented directly into Fabric. This way, a user gains low-level control over how each interface is implemented. An orderer could be implemented in Kafka, or an entirely different software package. Another possible step in transaction validation could check with an external source before committing to the blockchain.

### Business Applications of Private Blockchains

In public blockchains like Bitcoin we were solely focused on how to make transfer of value publicly auditable, and in Ethereum allowing any party to validate a public state. In these applications, it could be that digital assets are hidden and only shared between a few parties, or that a few parties can write the state of a digital asset, and others can view it. There are many possibilities getting explored across industries at the time of the lecture.

#### Supply Chain

A private ledger in a supply chain context can allow multiple companies exchange assets to record and validate the exchanges on a shared database. Audit partners can be added to the chain to help verify and make sure a record of where an asset started, where it ended up and who monitored the transfer exists.

#### Agriculture

In agriculture, the supply chain example is especially interesting. Many food items travel long distances, and in the event of disease or other problems, it can be very difficult to track back to the origin. A blockchain system from growers to distributors can help quickly track and recall bad batches of food.

#### Identity

Identity is constantly investigated in the constext of blockchains. The Blockchain at Berkeley article breaks out some possile applications of a blockchain system to this, using a private key to very simply handle digital signatures granting verification or authorization. Different parties can each authorize a participant or wallet for particular actions, or endorse it on the network.

The private blockchain aspect allows users to limit who is able to see aspects of their identity simply through ACL rules.

#### Certification & Audit

Users can often earn certifications denoting expertise, assets can be certified after passing different levels of tests. A shared ledger makes this very difficult to fake, and if certifications are proven to be given out falsely, it can be traced back to an auditor.

#### Banking & Trade

In banking and trade applications, some institutions may want to share and validate information about specific individuals. For example, maybe 5 banks want to share risk-related information about an individual outside of their credit score, to help reduce bad actors in a network. Additionally, banks could easily define and share assets between each other, showing the flow of funds in the shared ledger.

### Other Private/Permissioned Blockchains

Outside of the projects incubaded by Hyperledger, there are a multitude of other private/permissioned blockchains. 

#### Corda

R3's [Corda](https://www.r3.com/corda-platform/) is an early private blockchain geared heavily towards the financial services industry. Similar to fabric, the consensus method is left as "pluggable", where it can be implemented in any manner that the end user chooses. Smart contracts can be implemented in Java or Kotlin.

#### Quorum

JP Morgan's [Quorum](https://www.jpmorgan.com/global/Quorum) is a fork of Ethereum with enhancements for encryption, permissioned access and privacy.

### Open Discussion & Prep for Projects

The last section of the class will be left open for students to discuss working together on a project in the last stage of the course. Projects can involve blockchains in any aspect, whether it is building out your own protocol, forking a protocol, building a utility, implementing smart contracts on a public ledger, or working with a private blockchain. 

