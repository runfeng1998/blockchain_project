'use strict';
const chalk = require('chalk');

const FLAGS = require('./interfaces/base').FLAGS;
const yargs = require('yargs/yargs');
const fs = require('fs');
const path = require('path');
const utils = require('../api/common/utils');
const utils2 = require('../api/common/web3lib/utils')
const { ContractsDir, ContractsOutputDir } = require('./constant');
const isArray = require('isarray');
const getAbi = require('./interfaces/base').getAbi;
const Configuration = require('../api/common/configuration').Configuration;
Configuration.setConfig(path.join(__dirname, './conf/config.json'));

const Web3jService = require('../api/web3j/web3jService').Web3jService;

var web3 = new Web3jService();

var finance_contract = "0x904bd98ecab083c1ffef23df5fd2da915a2ed611"
var hello_contract = "0xfa5d3d4704ccafeaebe43fdba6ced9bef468c44e"

module.exports = {
    add_company: function (name, id, score, addr) {
        return web3.sendRawTransaction(finance_contract, 'add_company(string,uint256,uint256,address)', [name, id, score, addr])
            .then(
                result => {
                    console.log('add_company')
                    let type = ["uint"];
                    let output = result.output;
                    let res = utils2.decodeParams(type, output);
                    console.log(res);
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    },

    // add_company('C', 1, 1000, '0xfa5d3d4704ccafeaebe43fdba6ced9bef468c441')
    // add_company('D', 1, 1000, '0xfa5d3d4704ccafeaebe43fdba6ced9bef468c442')

    query: function (name) {
        return web3.sendRawTransaction(finance_contract, 'query(string)', [name])
            .then(
                result => {
                    // console.log(result);
                    console.log('begin query', name);
                    let type = ["uint"];
                    let output = result.output;
                    let res = utils2.decodeParams(type, output)[0];
                    console.log(res);
                    return res;
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    },

    // query('C');
    // query('D');

    transaction: function (from_name, to_name, owe_money) {
        return web3.sendRawTransaction(finance_contract, 'transaction(string,string,uint256)', [from_name, to_name, owe_money])
            .then(
                result => {
                    // console.log('transaction');
                    // console.log(result);
                    let type = ["string"];
                    let output = result.output;
                    let res = utils2.decodeParams(type, output)[0];
                    console.log(res);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    },

    // transaction('A', 'B', 1);


    finance_bank: function (name, owe_money) {
        return web3.sendRawTransaction(finance_contract, 'finance_bank(string,uint256)', [name, owe_money])
            .then(
                result => {
                    console.log('finance_bank');
                    // console.log(result);
                    let type = ["string", 'uint', 'uint'];
                    let output = result.output;
                    let res = utils2.decodeParams(type, output);
                    console.log(res);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    },
    // finance_bank('A', 7);

    return_money: function (from_name, to_name, owe_money) {
        return web3.sendRawTransaction(finance_contract, 'return_money(string,string,uint256)', [from_name, to_name, owe_money])
            .then(
                result => {
                    console.log('return_money');
                    // console.log(result);
                    let type = ["string"];
                    let output = result.output;
                    let res = utils2.decodeParams(type, output);
                    console.log(res);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    }
    // return_money('B', 'A', 3);

};
