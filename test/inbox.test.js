require('events').EventEmitter.defaultMaxListeners = 0;
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const Express = require('express');
const app = Express();
const { interface: interfaceContract, bytecode } = require('../compile.js');


let accounts;
let credits;
const INITIAL_PRICE = "10000";
const SETPRICE_VALUE = "1000";

app.get('/api/currentCreditPrice', async (req, res) => {
    res.status(200).send(await credits.methods.CURRENT_CREDIT_PRICE().call());
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

beforeEach(async () => {
    // Fetch all the accounts
    accounts = await web3.eth.getAccounts();
    // Use one of them to deploy a contract
    credits = await new web3.eth.Contract(JSON.parse(interfaceContract))
        .deploy({ data: bytecode, arguments:[INITIAL_PRICE]})
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(credits.options.address);
    });

    it('has a default credit price', async () => {
        const price = await credits.methods.CURRENT_CREDIT_PRICE().call();
        assert.strictEqual(String(price), INITIAL_PRICE);
    });


    it('can change price property', async () => {
        await credits.methods.setCreditPrice(SETPRICE_VALUE).send({from: accounts[0]});
        const price = await credits.methods.CURRENT_CREDIT_PRICE().call();
        assert.strictEqual(price, SETPRICE_VALUE);
    });

    it('should ', () => {

    });
});