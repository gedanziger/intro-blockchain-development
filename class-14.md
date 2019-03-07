# Intro to Blockchain Development

### Class 14 - Wallets 

We'll jump back to how cryptocurrency wallets are implemented, to give a better idea for users.

Reading & Videos:

- [Mastering Bitcoin Chapter 5](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc)* - A deeper look at how a wallet works in bitcoin



### Intro To Wallets

We looked before briefly at how funds are stored in a wallet, different community proposals to enhance storage of funds, and how SPV worked to rapidly verify transactions. Now, we will dig a bit farther into the process, and explore how to interact with transactions at a programmatic level as well.

To start with, we'll be using [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib). You can install it using:

```bash
npm install bitcoinjs-lib
```

There are some packages in other languages, but this one is built out pretty well and easy to follow. There are some python libraries as well ([bit](https://github.com/ofek/bit), [python-bitcoinlib](https://github.com/petertodd/python-bitcoinlib)).


We can remember that a wallet is a collection of one or more addresses. These can be derived at random or deterministically from a shared starting point. 

#### Creating a Random Bitcoin Keypair

First, let's include a couple dependancies:

```javascript
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
```

If we want to create a new random address, we can use the following process:

```javascript
const keyPair = bitcoin.ECPair.makeRandom()
```

This generates a new keypair, without using a starting point or shared secret. We could call this function repeatedly and end up with multiple keypairs, all unrelated to each other. This method would be very useful for some single-use addresses, but is much more difficult to backup and restore. A user would have to make sure to backup each time a new address was created in this method, to avoid data loss.

It is also good to recall that a keypair is not equivalent to an address. To get a bitcoin address and private key, we will need to extract some data from this keypair object first. First, getting a private key:

```javascript
const private = key.toWIF() // A console.log of this would show the private key
```

 Here, we are printing the key in WIF (Wallet Input Format). This is not the raw key, but uses the checksum, prefix and encoding similar to how we encoded an address. You can read through the process step-by-step in the [bitcoin wiki](https://en.bitcoin.it/wiki/Wallet_import_format).

We can also generate an address from the public key:

```javascript
const address = keyPair.pub.getAddress() // A console.log of this would show the address
```

We can call `address.toString()` or to get out our string form of a bitcoin address. This is what we share to other users to receive bitcoin, verify messages against and other operations on the bitcoin network.

#### Creating a Mnemonic & Deterministic Keypair

Before creating a deterministic wallet, we'll first need to create a mnemonic. We can use the library [bip39](https://github.com/bitcoinjs/bip39) for this. This mnemonic just maps to [a word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) 2048 words long, and the combination of words map to a seed. You can create it with the following code:

```javascript
let phrase = bip39.generateMnemonic()
// A console.log of this will give our 12 word mnemonic
```

From the address, we can start to derive down a specific derivation path. These are laid out in BIP 32/44. For bitcoin, we will derive down the path `m/44'/0'/0'/0/0`, then  `m/44'/0'/0'/0/1`,  `m/44'/0'/0'/0/2`, and so on. This structure will always give the same sequence of addresses from a particular starting seed & private key.

```javascript
let masterNode = bitcoin.HDNode.fromSeedBuffer(seedBuffer)

let account0 = masterNode.derivePath("m/44'/0'/0'")

let xpubString = account0.neutered().toBase58()

let key0 = account0.derivePath("0/0").keyPair
let key0FromXpub = account0.neutered().derivePath("0/0").keyPair

let address0 = key0.getAddress()
let address0FromXpub = key0FromXpub.getAddress()
```

