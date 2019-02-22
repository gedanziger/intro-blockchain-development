module.exports = {
  migrations_directory: './migrations',
  // compilers: {
  //   solc: {
  //     version: "0.5.0",    // Fetch exact version from solc-bin (default: truffle's version)
  //     settings: {          // See the solidity docs for advice about optimization and evmVersion
  //      optimizer: {
  //        enabled: false,
  //        runs: 200
  //      }
  //     }
  //   }
  // },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas:4600000
    },
    ropsten: {
     host:"localhost",
     port: 8546,
     network_id: '*',
     gas: 4600000
    }
  }
};