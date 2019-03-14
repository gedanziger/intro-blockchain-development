# Intro to Blockchain Development

### Class 16 - Exchange Security -  Notable Incidents

It is very difficult to attack a blockchain at the protocol level. Generally, most attacks happen at the the level of a user, wallet or exchange. We'll run over some: 

Reading & Videos:

* [Mt Gox Hack](https://blockonomi.com/mt-gox-hack/) - History of the mt gox hack

### Mt Gox

Mt Gox was one of the largest cryptocurrency exchanges in the world at the time, operating out of Japan. Its creator had originally envisioned the site to trade online playing cards, but then switched it to cryptocurrency after finding out about bitcoin. It served a large amount of volume, at its peak representing almost 70% of bitcoin related transactions. The exchange was hacked twice - once in 2011 and again in 2014.

In the first hack, a user gained access to an admin level account. The exchange had measures to prevent higher dollar value withdrawals, so the attacker first assigned themself a large amount of bitcoin, and sold it for a very low price. Due to supply/demand on the exchange, this dropped the average bitcoin price very low, and allowed them to make a large withdrawal. They were able to withdraw over 2000 bitcoin from the exchange before it was detected and stopped.

It became apparent that Mt Gox was hacked again in 2014, when some withdrawals from the site started to slow down. In this incident, both hot cryptocurrency wallets on servers as well as cold storage were compromised with some cryptocurrency lost. An estimated 744,400 BTC was lost, likely over long periods of time from multiple wallets.

##### How we can learn from it

The first attack could have been mitigated by restricting access to admin accounts and the database. A compromised computer with access to an admin account was used to perform the attack, so any way to restrict access to admin accounts can be helpful when handling the administration of private keys. It is advisable to do the following:

1. In the event of employee change or external audit, maintain a specific process for rotating credentials and device access to a database.
2. Monitor the devices with access to your system. Log IPs that are using admin calls, and restrict accounts to specific points of access whenever reasonable.

In the second attack, a large amount of funds held in wallets were compromised, likely in small chunks over time. Even internal account balances should be audited periodically, so discrepancies can be addressed in a timely manner.

1. Keep a regular practice of auditing cold storage amounts and hot wallet balances
2. Keep cold storage wallets offline, and store as much of a balance as possible in them


### Cryptopia

In more recent history, Cryptopia, a New Zealand based exchange, was hacked in January of 2019. Instead of a slow hack over a longer period of time, this was performed quickly. Over $16M worth of cryptocurrency was stolen from hot wallets on the platform and transferred out. As of the course time, over $3M was liquidated through decentralized exchanges, through an attempt was made to liquidate some through the centralized exchange Binance. You can see the transaction where funds were stolen [here](https://mousexplore.mousebelt.com/eth/transaction/0x8a7c2b34f23eee02401e7c3fa1ea2ce8d3132e7ca3811d673ca35898c9535aae). Thousands of addresses all sent funds simultaneously, so it was likely not a single cold storage wallet that was compromised, but a multitude of wallets shared on a single server. The most common configuration for this in an exchange is a hot wallet, so it is possible that no cold storage was used at all.

##### What we can learn from it

Always use cold storage for a centralized applications, when the use case permits it. Keeping funds segregated from the internet drastically limits the chances of a compromise.

### BitPay

The BitPay hack was an not an issue of the platform security, but in communications tools the team used. Attackers were able to execute a phishing scam on the CFO of the company and collect his email password. Then, they impersonated him to send requests to the CEO requesting funds sent out. Almost $2m was stolen in this manner.

##### What we can learn from it

Even the best security practices can be compromised by human error. When a team member is requesting money, it is best to have a standard practice for the request. For large sums of money, confirm it over a second medium of communication.

Additionally, keep a good password security practices. All employees, even ops and people talking to those handling funds, should observe the following:

1. Use strong passwords and do not reuse them between accounts
2. Use multifactor authentication whenever possible (TOTP is better than SMS)
3. Be vigilant for strange behavior when requesting credentials or funds. If gives a strange request, make a habit to double check with them


### BitGrail

A large amount of the cryptocurrency Nano ($170M worth at the time of the hack) was stolen on the BitGrail exchange a Hack incident in early 2018. An attacker was able to steal the funds held when discovering an exploit on the withdrawals page. It has been reported that the only validation performed was client side, so users could withdraw larger amounts than their balance by modifying javascript in their browsers to remove client side checks. Afterwards, they could withdraw a larger amount than their balance. An attacker was able to withdraw the overwhelming majority of NANO held on the exchange (17 million of the holdings, with 4 million remaining on the exchange).

##### What we can learn from it

1. Client side validation should be used only for user experience. It is not trustworthy, as a bad actor can send a different request than you are expecting to receive.
2. Cold storage should always be used. An application shouldn't have to send or receive 80% of funds out to users at a time. Only as many funds as an exchange is willing to risk should be held in hot wallets.
3. Reasonable checks should be put in place on withdrawals. Withdrawal limits & large transactions outside of normal behavior should not process immediately in the system, and instead require some human review or a longer time to clear.
