# Intro to Blockchain Development

### Class 18 - Blockchain & Contract Security - Notable Incidents

It is very difficult to attack a blockchain at the protocol level. Generally, most attacks happen at the the level of a user, wallet or exchange. We'll run over some: 

Reading & Videos:

- [Parity Hack](https://www.parity.io/security-alert-2/) - Short article about exchange and parity hacks
- [Verge Hacks](https://blog.theabacus.io/the-verge-hack-explained-7942f63a3017) - Short article about the verge blockchain getting attacked

### Parity Hack

While bitcoin multisignature wallets are built directly at the transaction level, Ethereum implements them through smart contracts. A transaction can require that specific parties all sign it to be broadcast out from the smart contract, with each party submitting their approval through a contract call. Parity maintains a popular library used for this that was referenced by many smart contracts actively deployed.

A deployed parity wallet had 2 components: 

1. A lightweight wallet deployed by a user on demand, when they wanted to create a multisignature wallet
2. The parity library, which was called by the lightweight wallet to implement multisignature behavior

A developer with the username `devops199` managed call a function on the library contract, converting the library to a multisignature wallet. This would not have been bad on its own, but there is a function in the multisignature wallet to kill the contract. This ended up killing the library-converted-to-wallet, killing each other multisignature wallet relying on the code. He left a (now famous) issue in the GitHub repository here.

All of the funds remaining in those multisignature wallets were frozen, since the functions to send/receive money from them were deleted. The amounts are stuck in the contract addresses and inaccessible now. 

##### How can we learn from it

In this situation, we deal with a library vulnerability similar to the one we had in the copay wallet. Only in this instance, the code was not deployed maliciously by Parity. The smart contract had not been properly tested to find a vulnerability in the form of a function with default visiblity (remember in Solidity our default is public). To mitigate risks like this, we can do the following:

1. Use shared libraries that have undergone smart contract audits wherever possible. As audits are generally a good practice for deploying your own contracts used by many users, avoid compromising and using libraries that haven't passed them.
2. Test all public functions extensively - if a function can change the state, you should be comfortable knowing who is calling it and how it can interact with other contracts.

### 51% Attacks

In proof-of-work blockchains, the longest correct chain is the one that fills the consensus mechanism. We saw before how someone who controlled more than half of the mining power could perform double spend attacks on the network. While this have never been successfully executed in the bitcoin network, it has happened frequently to some cryptocurrencies with lower miner adoption.

However, Bitcoin has come close once. A single mining pool on the bitcoin network at one point controlled over 50% of the computational power (in hashes per second, sometimes called hashpower). The members of the network decided to split up their mining volume, to avoid the chance that bitcoin could get subjected to such an attack. As an extra incentive to avoid mining power centralization, investors might decide to sell bitcoin in the event of a 51% attack, driving the price down. This creates a financial motivating factor to keep the bitcoin network distributed.

Some other smaller blockchains have been the subjects of these types of attacks frequently. Since mining hardware often becomes specialized in the form of ASICs, a smaller blockchain that shares the same work function in a proof-of-work algorithm might be at risk if some of the miners from the larger chain work in concert. For example, to attack the blockchain Bitcoin Cash (which split from bitcoin over a dispute about block sizes and the segregated witness update in transactions), it would only take a small percentage of the Bitcoin mining network to switch to mining Bitcoin Cash in concert to execute a 51% attack.

#### Verge

Verge was attacked in a 51% attack repeatedly. Due to a combination of factors including a large window for timestamps to submit inside (telling the network how to adjust the difficulty) and split work functions in mining, it was an effective target. Verge employs a collection of success conditions to meet in its proof-of-work algorithm:

* Scrypt
* X17
* Lyra2rev2
* myr-groestl
* blake2s

Each of these mining algorithms is meant to represent a fifth of the block rewards, balanced out by difficulty. This is in an effort to keep mining fair all miners. However, to perform a 51% attack using a shared algorithm (scrypt in this instance), it took a much smaller proportion. An attacker was able to perform the 51% attack with under 10% of the hash power.

#### Ethereum Classic

Ethereum classic split from ethereum after the creators sought to remedy the DAO hack (remember our payable function). This network is very similar to Ethereum right after the hack, but then the two networks started to gain their own history. However, they share the exact same mining algorithm. Since ethereum classic has only a tiny percentage of ethereum's miners backing it, just a small amount of them switching over or renting virtual servers in a cloud system can attack it.

This happened in early 2019, and many exchanges stopped processing ETC transactions shortly after to avoid the risk of fund loss.

##### How we can learn from this

There are a few different parties at risk in an attack on a consensus mechanism - foremost are merchants and exchanges. The 51% attack can be carried out against an entire network, but these two are most likely to fall victim to the "blank checks" a bad actor can write. As an exchange owner, the best course of action is to:

1. Wait for the network to be fully consistent before allowing a user to trade a balance or mark a deposit processed. A good way to do this is through suspending deposits in the event of a 51% attack.
2. Avoid withdrawals or trading, or you risk spending funds you do not own. Keep a procedure in place to completely disable at-risk components of your system.

As a protocol owner, you have a few concerns as well:

1. Avoid following proof-of-work on another user's chain with orders of magnitude more hash power than you control
2. Do not change your difficulty to quickly. Slowing this process down means that a bad actor stands much less to lose by compromising your blockchain.