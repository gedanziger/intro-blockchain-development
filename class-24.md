# Intro to Blockchain Development

### Class 24 - Current Blockchain Research - Cryptography

Another component currently investigated by blockchains are alternative cryptographic schemes. These can be used to increase privacy, enhance security or other benefits. 

Reading & Videos:

- [Shor's Algorithm, Grover's Algorithm and the Blockchain](https://codeburst.io/quantum-threat-to-blockchains-shors-and-grover-s-algorithms-9b01941bed01) - Overview of quantum attacks to the blockchain.
- [CryptoNote](https://cryptonote.org/inside/) - Graphical breakdown of CryptoNote and its use of ring signatures. The most popular implementation of this scheme is currently Monero
- [What are zk-SNARKS (introduction by Zcash)](https://z.cash/technology/zksnarks/) - This is a short series of posts detailing how zero knowledge proofs work in the context of Zcash

### Privacy Concerns

The structure of a blockchain gives makes transactions open and verifiable which has driven the usage seen before. However, not all users wish their transactions to be open and verifiable. In bitcoin, the method of change addresses gives some degree of obscurity to transactions - a user could deny owning the change address a transaction was sent to. By design, the entire payment history, including current balances, is available for any to verify. This means that someone holding millions of dollars worth of cryptocurrency could have their address identified, possibly opening them up to physical harm or extortion by bad actors. It also disincentivizes some sensitive transactions - such as buying guns, drugs or other illegal transactions.

##### Ring Signatures

One way to avoid this is to use a ring signature. Instead of a signing the transaction with a single private key matched to a public key, collections of public keys are formed into rings.

![Ring Signature](https://cryptonote.org/img/cn02.png)

In a ring signature, it can be verified that one member of the ring sent the transaction, without fully revealing which member did the sending.

##### One-time Addresses

Using a point multiplication along the curve from the base point of the address, the holder of a private key can generate a one-time public key. To do this, they use keys twice the length of those in bitcoin, and only use part for the public address, and the other portion to help generate a one-time address. 

These one-time addresses are exposed to use for receiving funds, so a third-party verifier cannot prove which public key was sent the funds.

##### Masking Amounts

Amounts in Monero and cryptonote coins are additionally masked, adding a third layer of protection. By obscuring:

- Who is sending funds
- Which address is receiving
- Amount sent

It becomes extremely difficult to compromise the privacy of a user. The combination of these 3 methods gives users close to anonymous transactions, so they can buy drugs more easily.

##### zk-SNARKS

Zero knowledge cryptography has also been actively researched to provide an additional layer of privacy in cryptocurrency. In a zero knowledge system, we can consider the interaction between two parties: a prover (who makes some claim), and a verifier (who checks a claim). The following conditions should apply:

1. A verifier or prover can prove that a particular statement is true, without any information beyond the statement an inputs (we can represent these in a circuit)
2. No interaction is needed between the prover and verifier to check this claim (non-interactivity)
3. It is computationally unfeasable to fake the proof of a false statement
4. A proof verifies that not only is the statement is true, but also the inputs demonstrate knowledge of why they are true

zk SNARK is short for *Zero-Knowledge Succinct Non-interactive ARgument of Knowledge*, referencing the above properties. While we can investigate zkSNARKS and the math behind them in greater depth in the future (an additional class after this curriculum), we will cover why this type of system is useful.