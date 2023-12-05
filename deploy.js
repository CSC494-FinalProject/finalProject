const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');
const provider = new HDWalletProvider(
    'Your unique charcters',
    "Your API"
);
const web3 = new Web3(provider);
const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    payroll = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gasPrice: 8000000000, gas: 4700000 });
    console.log('Contract deployed to', payroll.options.address);
    provider.engine.stop();
};
deploy();