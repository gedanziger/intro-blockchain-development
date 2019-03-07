const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')

// Let's define a helper function to make getting addresses a bit easier:
function getAddress (node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}
  


const keyPair = bitcoin.ECPair.makeRandom()

const private = keyPair.toWIF()
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

console.log(`Here's our private key in WIF Format: ${private}`)

let phrase = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeed(phrase)
console.log(`Our seed phrase is: ${phrase}`)

let masterNode = bip32.fromSeed(seed)

let account0 = masterNode.derivePath("m/44'/0'/0'")

let xpubString = account0.neutered().toBase58()

let key0 = account0.derivePath("0/0")
let key0FromXpub = account0.neutered().derivePath("0/0")

let address0 = getAddress(key0)
let address0FromXpub = getAddress(key0FromXpub)
console.log(`Our first derived key is ${key0.toWIF()}`)
console.log(`first hard derived address ${address0}`)