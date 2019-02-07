# Intro to Blockchain Development

### Class 3 - A Look at Bitcoin

In this class, we'll dive further into how bitcoin works and learn its history:

1. A Brief History
2. Structure of Bitcoin
3. Establishing Consensus
4. Bitcoins Scripting & Transaction System
5. Incentives - Mining Fees & Block Rewards
6. Wallets & Transactions

Reading & Videos:

- [Mastering Bitcoin Chapters 2,](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch02.asciidoc) [3](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch03.asciidoc) [& 4](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04.asciidoc) - A deeper dive into bitcoin. Covers Bitcoin core, transactions, keys, and addresses.*
- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) - The original Bitcoin whitepaper, written by Satoshi Nakamoto.

### A Brief History of Bitcoin
Development of a first draft of bitcoin was finished by Satoshi Nakamoto in 2008, with the whitepaper published in 2009. Major groundwork in public key cryptography however, was established along with drafts for cryptocurrencies as early as 1980s by David Chaum, the NSA and other individuals. It wasn't until early 2000s that parts of the proof of concept used in bitcoin were developed, such as [Hashcash](http://www.hashcash.org/papers/hashcash.pdf) or [list second proof of concept here](). Bitcoin was a very revolutionary concept to bring to fruition, but it was built on a solid base of previous work. It was the first digital currency to see any amount of wide adoption.

Since its inception, the {which network? crypto? bitcoin?} network has gone through numerous changes, as does any emerging technology. Many users lost early private keys and the community proposed a better method to back them up. Additionally, new updates were proposed for {more efficient}{in what way?} transactions, {different op codes and other concepts}{vague.} proposed by the bitcoin community. Recently (as of the date in the class), developers are working on scaling up bitcoin transactions by batching high volume transactions and flushing them periodically to the blockchain.

### Structure of Bitcoin

Bitcoin follows a fairly standard blockchain structure. A more in-depth version can be seen in the bitcoin whitepaper and the *Mastering Bitcoin* reading material, but we can run through a short form of it here as well.

##### Addresses
Bitcoin uses [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) to encrypt and decrypt messages sent between different users over a network. Each user is represented by a collection of keypairs. Any given user may hold and generate one or more messages on their own without connecting to the network. They can then use their private key to [sign](https://searchsecurity.techtarget.com/definition/digital-signature) the message, which can be verified against its public counterpart. This allows anyone to verify that a particular message comes from a particular origin. A [hashed form](https://blockgeeks.com/guides/what-is-hashing/) of the public key is referred to as the "**address**", which others use to send funds on the network.

##### Transactions
Rather than keeping a single numeric amount of the user's current balance, Bitcoin works by computing it from the sum of amounts sent into the address, minus the amounts out. All of these payment amounts are held within signed messages called **transactions**.

The 4 main components to this are:

1. The hashes of previous transactions to include as inputs
2. How many previous transactions are specified
3. A set of output addresses to designate where bitcoin will be sent, and the values in satoshi sent to each (1 BTC = 100,000,000 Satoshi)"
4. How many output addresses are specified

For each of the inputs, there must be a matching signature from a private key specified in the transaction. A user receiving one of these transactions may spend it by signing it with the private key specified as a recipient. There is also some additional information included in the transaction:

- A version number (this is left as 1 currently)
- (optional) A flag to indicate whether witnesses are used (Read more on Segregated Witness or SegWit [here](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki))
- (optional) A list of witnesses used for each input (empty if SegWit isn't used)
- (optional) A timelock specifying the block at which the transaction is valid

In short, this message takes some amount of transactions that a user owns, then specifies where the money will be sent next. For it to be meaningful, the transaction should be signed by the matching private key. For example, if a user sent out a message sending Satoshi's unspent bitcoin to themself, it would not be meaningful. They do not own his bitcoin because they cannot produce a signture from his private keys.

##### Blocks
So far, addresses have established a way to create and prove identity, and transactions have established a way to communicate changes and broadcast transfer of coin values. The next step is to create a public ledger of this data. To hold the public ledger, we will use what's called a **block**.

In the bitcoin blockchain, all blocks have two main parts:

1. A "header" containing descriptive data about the block:
    - prev_hash (256-bit hash of the previous block header)
    - tx_root (256-bit hash based on all of the transactions in the block)
    - [nonce](https://en.bitcoin.it/wiki/Nonce) (32-bit number (starts at 0))
    - timestamp
    - [other descriptive data](https://en.bitcoin.it/wiki/Block_hashing_algorithm)

2. A collection of transactions made of the data types above.

Each block contains a hash (tx_root as seen in diagram below) of all of the transactions contained inside it. Rather than referencing each transaction, which is rather space intensive, we make use of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). This data structure uses hashes to abbreviate data in a tree structure.

![alt text](https://upload.wikimedia.org/wikipedia/commons/7/7a/Bitcoin_Block_Data.png "Bitcoin Block Data - Credit to Matthäus Wander for creation of this image under Creative Commons 3.0 License")

All of the information inside the block are hashed together, generating a new block and hash abbreviating it. This generated hash is referred to in the next block, creating a linked list of block headers that all contain references to previously linked transactions. Using this, all transactions can be proven to have been broadcast out onto the blockchain (sometimes said as "on-chain"), where any user can verify them.

This also establishes an order among all data added to the blockchain - each transaction is confirmed into a block, where it takes up one index into blockchain. However, there are many ways to compose a block given different transactions and different nonces. To get around this issue, bitcoin implements a consensus mechanism to determine the valid chain to follow.

##### Consensus

Since many possible solutions could all contain valid sets of signed messages, bitcoin implements a consensus mechanism between different computers running the software (nodes). A chain is valid if:
1. All transaction data in it is valid
2. The chain is the longest possible valid chain
3. All blocks in the chain meet a validity condition on the block hash, as determined by Hashcash

Meeting a condition for valid data is simple - any node can check from the signature whether a transaction is valid, and whether the total output amount is greater than the total input amount. There are also a few other conditions enforced by the chain (to avoid spam, DOS and other attacks). This alone doesn't stop multiple correct versions from existing, though. To address this problem between different users, we use Proof of Work. 

Bitcoins implementation in particular uses Hashcash, which relies on random outputs from hashes. For a block hash to be valid, it must meet a specific amount of leading `0` characters. All of the inputs the block hash is created from are fed into the hashcash algorithm. If the output is a hash with the correct amount of leading 0 characters in it, the acceptance criteria are met and the block is valid. If not, the nonce is changed and hashed again. This process is deliberately wasteful of CPU resources, so a user will have to keep calculating hashes to find a successful candidate. Since it costs money to buy and operate processors, it require some monetary investment to perform. To motivate users to devote computers to calculations, bitcoin bribes users to perform these calculations with an amount devoted to the user that first successfully calculates the block.

The chain with the most blocks that meet this acceptance criteria is considered correct. Miners can choose to follow other chains at an increasing economic disadvantage as time goes on. Because of the economic incentives, this system creates a distributed consensus mechanism that could result in correct data on any of the participants' computers.
