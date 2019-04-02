# Intro to Blockchain Development

### Class 22 - Introduction to Frontend Development in Blockchain



### UI/UX Caveats
- What are some common UI/UX caveats in blockchain apps?
  - Blockchain is _not instant_! Everything takes time.
    - Displaying for users the latest updated time for each updateable element
    - Allowing users to refresh the data themselves
  - Viewing transactions and blocks by navigating with a hash address
    - Copying hash addresses into their clipboard with a button click
    - Allowing hash addresses to be links
  - Transactions with status codes
    - Complete/Pending/Error: What do the status codes mean? Easiest way to communicate this is with color.
  - Every transaction requires a fee from the customer
    - Gas cost UI should be more visible than others and explicitly explained
  - KYC (Know your customer) process can be a barrier to entry for most users
    - Pre-screening users for blacklisted countries can minimize steps for users
    - Minimize steps for KYC or communicate clearly the number of steps to illustrate that the user is making progress through the process
  - Onboarding process / Account creation
    - Since these apps may not use traditional user-created passwords, the UI should explain to the user that the generated secret key _cannot_ be recovered and must be copied or saved securely elsewhere.
    - Allow user to copy the secret key into their clipboard with a button click
    - Provide for the user a confirmation screen where they can familiarize with using a secret key to log in

## Building the App

### Existing Frameworks?
- [Truffle](https://medium.com/@rossbulat/introduction-to-the-truffle-suite-and-dapp-development-pipeline-1b33bb8228d4) 
- [Drizzle](https://medium.com/@rossbulat/drizzle-for-react-introduction-and-dapp-integration-breakdown-4176ddb759f9) package - Truffle's frontend toolkit for Ethereum-based dapps. Automatically syncs chain data to Redux store

### Other Resources 
- [momentjs](http://momentjs.com/docs/#/displaying/fromnow/) - Date/time parser useful for displaying transaction update times.
- [dayjs](https://github.com/iamkun/dayjs) as momentjs alternative
- [clipboard.js](https://github.com/zenorocha/clipboard.js) - Copies any string to the user's clipboard. Useful for copying hash addresses.
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) - React version of clipboard-js
- [Truffle Framework](https://truffleframework.com) - Truffle + Ganache + Drizzle as full suite
- [MouseKYC](https://github.com/norestlabs/mousekyc-fe) - Sample KYC flow implementation example
- [Veriff](https://veriff.me) - Verification process made easy for KYC process
- [MouseUtility Mnemonic Tool](https://github.com/norestlabs/mouseutility-mnemonic) - Mnemonic generation + copy to clipboard example
- [bitcoinjs/bip39](https://github.com/bitcoinjs/bip39) - Mnemonic code for generating deterministic keys
- [cryptojs](https://github.com/brix/crypto-js) - Encryption/decryption tool