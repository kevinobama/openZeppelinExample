Steps to deploy a contract using MetaMask and Truffle
Deploy smart contract on Ropsten network with MetaMask & Truffle. Two solutions to start with, one is to run your own geth node which consumes lot of cpu from your machine. In my MacBook Pro, running a geth node for 15 minutes will drain the full battery and the other solution is to connect with a public node like infura(https://infura.io/)
Solution 1: With you own node
You can easily deploy on the ropsten network if you own a full node running on your machine.
i. Run geth
$ geth --fast --cache=1048 --testnet --unlock "0xmyaddress" --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr localhost --rpcport 8545
ii. In truffle.js, add the following configure for the ropsten network
module.exports = {
  networks: {
    localhost: {
      host: "localhost", 
      port: 8545,
      network_id: "*" 
    },  
    ropsten: {
      host: "localhost",
      port: 8545,
      gas: 4700000,
      gasPrice: 1000000000,
      network_id: "3"
    }
  }
};
iii. Deploy on the ropsten network
$ truffle migrate --network ropsten
Solution 2: With a public node like Infura
i. Install the needed libraries
Navigate into the project folder and run the following command:
npm install truffle-hdwallet-provider --save
ii. In truffle.js, Add the following code to unlock your Metamask account and configure the Infura Ropsten node as entry point by providing the mnemonic phrase (Metamask / Settings / Reveal Seed Words)
var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "XXXXXX";
var mnemonic = "twelve words you can find in metamask/settings/reveal seed words";
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
  }
};
iii. Deploy on the ropsten network

truffle migrate --network ropsten
---------------------------------------------
truffle deploy --network ropsten

⚠️  Important ⚠️
If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.


Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x46a2c3bbfef2125c10881ffb1a2cd0c0baa9ff05cc23b0f660241983cd110a8a
   > Blocks: 1            Seconds: 21
   > contract address:    0x4EA991074979074361baD52F1491b02588AA6577
   > account:             0x0D369a4Af04BC6a6df0A2D76219EE10db6355840
   > balance:             5.79483539249597365
   > gas used:            207901
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00415802 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00415802 ETH


1_alipay_migration.js
=====================

   Deploying 'Alipay'
   ------------------
   > transaction hash:    0x2e4c027f2d124bfc70dcad3c0734820e5cad1a584bb38f275ebd6aaaa235fd66
   > Blocks: 1            Seconds: 17
   > contract address:    0x8dfD61A2e6eFe3768CEa866a8013fF510AcE18E2
   > account:             0x0D369a4Af04BC6a6df0A2D76219EE10db6355840
   > balance:             5.78823363249597365
   > gas used:            330088
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00660176 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00660176 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01075978 ETH

➜  truffle console --network ropsten
truffle(ropsten)> Alipay.deployed().then(function(instance){return instance });




Adding different networks to the configuration
First, you will need a HD Wallet-enabled Web3 provider. Run the installation command:
npm install truffle-hdwallet-provider
Open truffle.js file on your favorite text editor. I am using (and highly recommending) Sublime Text (+ Solidity highlighting plugin for developing smart contracts).
First, include the required module:
var HDWalletProvider = require(“truffle-hdwallet-provider”);
Then, you need to declare your mnemonic phrases. You can use default Ganache phrases, but I would not recommend that, as everyone has access to these accounts and you can not use it for Ethereum mainnet (for obvious reason). What I would recommend is to add a Metamask extension to your browser and create an account there. Please make sure to backup your phrases somewhere safe and then add it to the configuration file:
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"; // replace with your own phrases
Note: it is not recommended to leave it as a plain text in the final production version, but we will cover that later.
Next, add a configuration for different networks. Add a comma in module.exports after the development network and declare a configuration for other networks (do not forget to replace your-api-key with the actual API keys from Infura):
ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/your-api-key");
      },
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/your-api-key");
      },
      network_id: 4
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/your-api-key");
      },
      network_id: 42
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/your-api-key");
      },
      network_id: 1
    }
Also, for each network I like to explicitly declare gas limit and price (put it after network_id):
gasPrice: 20000000000, // 20 GWEI
gas: 3716887 // gas limit, set any number you want
This is optional, but it is very useful when you are deploying to the main network, as it makes sure you are not overpaying and the transaction will be provided with a reasonable amount of gas. To test how much gas the deployment costs, I use Remix IDE.
Here is the final truffle.js file:
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
 ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/your-api-key");
      },
      network_id: 3,
      gasPrice: 20000000000,
      gas: 3716887
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/your-api-key");
      },
      network_id: 4,
      gasPrice: 20000000000,
      gas: 3716887
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/your-api-key");
      },
      network_id: 42,
      gasPrice: 20000000000,
      gas: 3716887
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/your-api-key");
      },
      network_id: 1,
      gasPrice: 20000000000, // 20 GWEI
      gas: 3716887    // gas limit, set any number you want
    }
  }
};
Now you are ready to deploy your DApp to any of these networks!
Deploying to different networks
To deploy your contracts on Ropsten, run:
truffle migrate --network ropsten
Rinkeby:
truffle migrate --network rinkeby
Kovan:
truffle migrate --network kovan
Main network:
truffle migrate --network main
Make sure you have some Ether on every network. If you get “Network up to date” message, add reset flag, for example:
truffle migrate --reset --network ropsten
If you get “exceeds block gas limit” message, try to adjust the gas limit (as I mentioned earlier, you can use Remix to see how much gas is needed for deployment).
If you do not specify a network, the default one is development. You can track your transactions on Etherscan.
Bonus: storing mnemonic in a separate place
Maybe you are working with a team using git and have your project uploaded online or at some point you are planning to open source it. Storing your mnemonic online is not the safest option, as if someone knows it, they have access to all your funds on these accounts.
A simple solution is to add mnemonic as an environment variable and replace hard-coded values:
var mnemonic = process.env.MNEMONIC;
Find a way to add environment variable to your OS (it may differ in Windows, Linux and Mac) and enjoy the safer way to access your mnemonic phrases.