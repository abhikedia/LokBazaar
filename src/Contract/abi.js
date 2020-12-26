import Portis from '@portis/web3';
import Web3 from 'web3';

const Node = {
	nodeUrl: 'https://rpc-mumbai.matic.today',
	chainId: 80001,
};
const portis = new Portis('50420890-9e26-4e1d-8d95-1c02d245342d', Node);
const web3 = new Web3(portis.provider);

const myContractAbi = [
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "_qid",
				"type": "bytes"
			}
		],
		"name": "customerSignup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "_qid",
				"type": "bytes"
			}
		],
		"name": "sellerSignup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "customerRegistrationCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getCustomerqid",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			}
		],
		"name": "getSellerqid",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellerRegistrationCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const myContractAddress = "0x995F845b4CC7B7524E9AAef8A6e1c4f698F05fd7";
const contract = new web3.eth.Contract(myContractAbi, myContractAddress);

export default contract