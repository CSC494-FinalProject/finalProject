const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'ContinuousPayrollSystem.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

let input = {
    language: "Solidity",
    sources: {
        [contractPath]: {
            content: contractSource,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["abi", "evm.bytecode"],
            },
        },
    },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

const outputDir = 'compiled';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const contractName = 'ContinuousPayrollSystem';
const bytecode = compiledContract.contracts[contractPath][contractName].evm.bytecode.object;
const abi = compiledContract.contracts[contractPath][contractName].abi;

fs.writeFileSync(path.join(outputDir, 'ContinuousPayrollSystemByteCode.json'), bytecode, 'utf8'); // No need to stringify bytecode
fs.writeFileSync(path.join(outputDir, 'ContinuousPayrollSystemABI.json'), JSON.stringify(abi), 'utf8');

console.log('Contract compiled successfully.');

module.exports = { abi, bytecode };