const path = require("path");

var HDWalletProvider = require('truffle-hdwallet-provider')
var mnemonic = "carpet indicate peanut place flavor say weekend circle very stuff leader speak";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten: {
      provider: function(){
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/964313fc17484404a133ce404e91a0da")
      },
      network_id: 3,
      gas: 4500000
    },
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};
