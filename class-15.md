# Intro to Blockchain Development

### Class 15 - Exchanges 

Many users don't always hold cryptocurrency inside a wallet or linked to a single address. In many instances, they purchase on an exchange, or in a system where one party takes custody of cryptocurrency for many users. 

Reading & Videos:

- [Hot vs. Cold Wallets](https://youtu.be/Aji_E9sw0AE)* - An Andreas Antonopoulos talk about hot and cold wallets

### Intro To Exchanges

While it is possible to get cryptocurrency by through the transaction fee or mining reward in a block, the majority of Bitcoin and Ethereum users do not perform mining themselves. Additionally, many miners make payments to electricity companies using fiat currencies like the renminbi or sometimes the dollar. Many miners need to sell holdings of cryptocurrency wish to sell their holdings, while many end users who wish to transact or invest purchase it. This results in a marketplace where users need to transact between traditional fiat currencies and cryptocurrencies.

In many markets, exchanges exist to service these types of transactions. In the US, there is the New York Stock Exchange (NYSE) where people exchange ownership shares of companies for US Dollars and back. Currency traders also do this, when travellers wish to trade their currencies for a local currency, they can find a company to perform the exchange. At a larger scale, traders get matched up directly in a forex, where orders are opened and filled between the traders. Commodities exchanges exist as well, allowing people to buy gold, oil and agricultural goods with fiat currencies. A cryptocurrency exchange is very similar to this.

Cryptocurrency exchanges are very similar to this. In a cryptocurrency exchange, a user exchanges fiat currencies or cryptocurrencies for fiat currencies or cryptocurrencies held by other users. They can be implemented in a number of ways however, some very different from a standard forex. Most cryptocurrency exchanges can be broken down into centralized or decentralized/peer-to-peer.

### Centralized Exchanges

In a centralized exchange, instead of using a locking or contract mechanism to ensure a fair exchange of one cryptocurrency for another, all currencies are deposited with a trusted third party (the exchange). Once deposited in the exchange, each swap is not recorded on the blockchain. Instead, they are generally handled inside of a database, showing the effective holdings of a user in different currencies. At the lecture time, some popular centralized exchanges include Coinbase, Binance and OkEx. 

Centralized exchanges will create a new address (either random or derived from a shared seed for a user) that can be used to handle an incoming deposit. Once it detects a deposit into a temporary deposit address, it will transfer the money into a master wallet to hold inside the exchange, and credit the user's balance. Thinking back to the CAP theorem, this is an instance where we want to enforce CP behavior. The exchange could remain available and credit all transactions to allow processing / trading of money instantly, but then are at risk if no longer consistent. Once the transaction has undergone sufficient confirmations that the exchange believes it is not reversable, then the user can trade and withdraw their money.

Additionally, a centralized exchange will distinguish between hot and cold wallets. To mitigate possible attacks, some funds are kept in "cold storage" wallets disconnected from the internet. These wallets often require physical intervention to send a transaction from, and are secured through physical and procedure-based security to avoid compromises. This helps to mitigate an attack where a user could hack a server, discover the private key and withdraw the money held by all users. In many exchanges, only a small percentage of funds are held inside the wallets handling day-to-day deposits and withdrawals ("hot wallets"). 

### Decentralized Exchanges

Another type of exchange is the decentralized exchange. In a decentralized exchange, instead of a single party escrowing funds and matching all users, each user will pair up with other users directly. Some of these pair up users while the exchange or a trusted third party temporarily escrows funds, in the event of a dispute. Some popular exchanges that follow this method include Localbitcoins. Another way is through smart contract. Instead of relying on a party to hold funds while a swap is getting performed, a contract can be defined to do it instead.

We briefly investigated a smart contract to do a swap in the previous week, looking in part at how a recursion attack could be used against one of them. Decentralized exchanges are subject to these types of problems, but in general there are far fewer points where they could malfunction or lose funds to a hack than their centralized counterparts.
