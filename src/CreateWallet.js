//imports
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//define the network to use: test
const network = bitcoin.networks.testnet
// PRODUCTION: network MAIN -> bitcoin
//const network = bitcoin.networks.bitcoin

//derivação 
const path = `m/49'/1'/0'/0`

let mnemonic = bip39.generateMnemonic()
const seed =  bip39.mnemonicToSeedSync(mnemonic)

//wallet root
let root = bip32.fromSeed(seed,network)

//create account
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddr = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: node.network,
}).address

console.log("Carteira gerada:")
//console.log("Rede: ",network)
console.log("Endereço     : ",btcAddr)
console.log("Chave privada: ",node.toWIF())
console.log("Seed         : ",mnemonic,"\n")

/*
Carteira gerada:
Endereço  mjtFniEC5Te41eQDdi7xExRQLp3thsgX3V
Chave privada:  cSeWSPP6HTwbmJ2Z6cp3wBsUQwVn3jTdCqz9k49iQ1Dqd76jsrvd
Seed:  silly rather window peace visual trophy friend prefer maple report into brass 
*/