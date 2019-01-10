App = {
	web3Provider: null,
	contracts: [],
	account: '0x0',
	loading: false,
	tokenPrice: 1000000000000000,
	tokenSold: 0,
	tokenAvailable: 750000,

	init: function() {
		console.log("App initialized...");
		return App.initWeb3();
	},

	initWeb3: function() {
		if(typeof web3 !== 'undefined'){
			// If a web3 instance is already provided by Meta Mask
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
			console.log("connected..");
		} else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
			web3 = new Web3(App.web3Provider);
		}
		return App.initContracts();
	},	

	initContracts: function() {
		App.contracts.DappToken = web3.eth.contract([
		{
			"constant": false,
			"inputs": [
				{
					"name": "_spender",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_from",
					"type": "address"
				},
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"name": "_initialSupply",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "_from",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "_to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "_spender",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "standard",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]);
		App.contracts.DappTokenSale = web3.eth.contract([
		{
			"constant": false,
			"inputs": [
				{
					"name": "_numberOfTokens",
					"type": "uint256"
				}
			],
			"name": "buyTokens",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "endSale",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"name": "_tokenContract",
					"type": "address"
				},
				{
					"name": "_tokenPrice",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "_buyer",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "Sell",
			"type": "event"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "tokenContract",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "tokenPrice",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "tokenSold",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]); 
		App.contracts.tokenInstance = App.contracts.DappToken.at("0xc0f08b284626e310195e2cc0c44e4af412ddf453");
		App.contracts.tokenSaleInstance = App.contracts.DappTokenSale.at("0x17e05dd499ac2a5e689c8aeae9983643e0580253");
		console.log("Dapp Token Address: ", App.contracts.tokenInstance.address);
		console.log("Dapp Token Sale Address: ", App.contracts.tokenSaleInstance.address);
		App.contracts.tokenInstance.name(function(error, result){
			if(!error)
				console.log("Token Name: ", JSON.stringify(result));
			else
				console.error(error);
		});
		App.contracts.tokenSaleInstance.tokenPrice(function(error, result){
			if(!error)
				console.log("Dapp Token Price: ", JSON.stringify(result));
			else
				console.error(error);
		});
		App.listenForEvents();
		return App.render();
	},

	listenForEvents: function() {
		console.log("listening...");
		App.contracts.tokenSaleInstance.Sell({}, {
			fromBlock: 0,
			toBlock: 'latest',
		}).watch(function(error, result){
			if(!error) {
				console.log("Event Triggered", result);
				App.render();
			} else {
				console.error(error);
			}
		});
	},

	render: function() {
		if(App.loading){
			return;
		}
		App.loading = true;

		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();

		web3.eth.getCoinbase(function(err, account){
			if(err === null){
				App.account = account;
				$("#accountAddress").html("Your Account: "+ account);
			}
		})

		var progressPercent;
		
		App.contracts.tokenSaleInstance.tokenPrice(function(error, result){
			if(!error) {
				App.tokenPrice = JSON.stringify(result);
				App.tokenPrice = JSON.parse(App.tokenPrice);
				$(".token-price").html(web3.fromWei(App.tokenPrice, "ether"));
			}
			else
				console.error(error);
		});
		App.contracts.tokenSaleInstance.tokenSold(function(error, result){
			if(!error) {
				App.tokenSold = JSON.stringify(result);
				App.tokenSold = JSON.parse(App.tokenSold);
				$(".tokens-sold").html(App.tokenSold);
				$(".tokens-available").html(App.tokenAvailable);
				progressPercent = Math.ceil((App.tokenSold / App.tokenAvailable) * 100);
				$("#progress").html(progressPercent+"%");
				$("#progressBar").css('width', progressPercent*6, '%');
			}
			else
				console.error(error);
		});
		
		web3.eth.getCoinbase(function(err, account){
			if(err === null){
				App.contracts.tokenInstance.balanceOf(account, function(error, result){
					if(!error){
						$(".dapp-balance").html(JSON.stringify(result));
						App.loading = false;
						loader.hide();
						content.show();
					} else {
						console.error(error);
					}
				})
			}
		})
	},

	buyTokens: function() {
		$("#content").hide();
		$("#loader").show();

		var numberOfTokens = $("#numberOfTokens").val();
		App.contracts.tokenSaleInstance.tokenPrice(function(error, result){
			if(!error) {
				App.tokenPrice = JSON.stringify(result);
				App.tokenPrice = JSON.parse(App.tokenPrice);
				//console.log(tokenPrice);
				web3.eth.getCoinbase(function(err, account){
					if(err == null){
						App.contracts.tokenSaleInstance.buyTokens(numberOfTokens, {
							from: account,
							value: numberOfTokens * App.tokenPrice,
							gas: 500000
						}, function(error, result){
							if(!error){
								console.log("Token Bought...");
								console.log(App.tokenPrice);
								$("form").trigger("reset");
								// Wait for Sell Event
							}
							else {
								console.error(error);
							}
						});
					}
				});
			}
			else {
				console.error(error);
			}
		});
	}
}

$(function() {
	$(window).load(function(){
		App.init();
	})
});