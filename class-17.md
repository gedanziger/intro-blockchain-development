# Intro to Blockchain Development

### Class 17 - Wallet  - Notable Incidents

Attacks can also happen at the user or code level, rather than at the level of a custodial fund manager. In these incidents, bad actors compromise the 

Reading & Videos:

- [BitPay Wallet Hack](https://github.com/bitpay/copay/issues/9346) - Issue describing the dependency in BitPay that was hacked
- [Electrum Wallet Hack](https://github.com/spesmilo/electrum/issues/4968) - Issue describing the Electrum wallet hack

### BitPay Wallet Hack

Copay and the BitPay wallet are popular open source wallet maintained by the payment processing service BitPay. The service maintains numerous tools for the bitcoin community, such as the explorer called insight. The wallet is non-custodial wallet implemented in JavaScript that allows users to generate address from a BIP39 mnemonic and manage their private keys directly on device. Since a third party can't be compromised, it is generally thought of as a more secure than an exchange.

However, the wallet was attacked in 2018 through a dependency. It uses npm (if unfamiliar, remember the package manager we used with Hyperledger Fabric) to load up JavaScript packages for common modules. One of these dependencies called `event-stream` was able to attack part of the application that had access to the user's private key. The malicious package then sent the private keys to a server, so an attacker could steal the bitcoin held inside. This malicious version of `event-stream` was pushed into the package manager when a new user took over the project from its previous creator.

##### What can we learn from it

There are now some better tools to mitigate dependency based attacks. The best way to stop it is stay vigilant over dependencies and make sure code referenced by your core application is trustworthy. Some general good practices include:

1. Fixing the version of your dependancies to one you trust
2. Add a dependency analysis tool (some are available for free on GitHub now) to check your packages for known vulnerabilities

### Electrum Wallet Hack

The Electrum wallet is another popular open source bitcoin wallet implemented in python. It is paired with the Electrum server, an open source extension of the bitcoin node that enables fast lookup of wallet balances. Wallets on Electrum are hierarchical deterministic, and managed client side. Similar to copay, it is thought of as a fairly secure wallet option. However, a vulnerability in how text was displayed allowed a bad actor to execute a phishing attack that collected hundreds of bitcoin.

The Electrum wallet discovers copies of the electrum server that can be hosted by any party. It is a very decentralized wallet and difficult to take down, as the servers are hosted by different users with many copies in existence, giving users the option to discover and connect to the server of their choice. A bad actor was able to exploit this by returning a error message that rendered with a fake upgrade link, instead of the proper message. 



![alt text](https://user-images.githubusercontent.com/29142493/50359293-8780b500-055c-11e9-8cfd-83b342edeffb.png "Image of a phishing message sent from the Electrum software")



The fake upgrade link was disguised, and unless the user looked in the url bar to find that it didn't line up with the site they expected, they might miss it. When downloading the new software update, their keys were collected and bitcoin was transferred to the bad actor's account instead.

The attacker created more copies of his bad actor electrum server software that was discovered by an increasing amount of clients through a p2p discovery process similar to bitcoin. Eventually, a significant amount of bitcoin was lost to this attack, and the team discovered and mitigated it. They pushed a fix to the client that did not render rich text, so instead of the error message above, a user would see the raw HTML.

##### What we can learn from it

1. Our first lesson is that we cannot trust all users of our software to behave in an honest way. Some percent of users might perform bad behavior on a peer to peer network, so clients should be able to tolerate some bad messages sent from a server that you do not own.
2. Handling arbitrary messages can be dangerous or complicated. It is often easier to send some response codes and match to pre-defined messages in the client. If something is out of the ordinary, it could be a phishing attack.