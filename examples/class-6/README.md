# Class6-Examples

1. Add an address as a constructor param, save this to a `paymentAddress`.
2. Add a variable called `instantSendEth`, set the default to be false.
3. Add a method withdraw callable by the `paymentAddress` only. This lets the payment address withdraw eth (put a comment next to the lines checking a permission. We will deploy once with it off to show how without this check, funds could be stolen, then switch it on to illustrate permissions).
4. Add a main payable method. It checks `instantSendEth`. If `instantSendEth` is true, then it sends money directly to `paymentAddress`. If `instantSendEth` is false, it doesn't. Each transaction should increase the payments counter.
5. Add an additional contract `Whitelist`. If a user sends a signed message that saying "I love MouseBelt!", run ecrecover to verify their signature to their address. If it is a match, add their address to a whitelist contract.
6. Show an example of calling another contract from our demo contract. Update the payment method to call this contract with the msg.sender, and see if they are on the whitelist. If they are, let the transaction through. If not, return the user their money.


# Installation
1. install truffle

`sudo npm install -g truffle@4.1.14`

2. install packages

`npm install`

3.  install testrpc

`npm install -g ethereumjs-testrpc`

# Test
- Run Testrpc
`testrpc`
- Get truffle accounts
`truffle dev`
- Compile contract
`truffle compile`
- Unit Test
`truffle test`