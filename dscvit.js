require('events').EventEmitter.defaultMaxListeners = 0;
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const Express = require('express');
const app = Express();
const bodyparser = require('body-parser');
const { interface: interfaceContract, bytecode } = require('./compile.js');


let accounts;
let credits;
const INITIAL_PRICE = "10000";
const SETPRICE_VALUE = "1000";
async function runOnce() {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // Use one of them to deploy a contract
    credits = await new web3.eth.Contract(JSON.parse(interfaceContract))
        .deploy({data: bytecode, arguments: [INITIAL_PRICE]})
        .send({from: accounts[0], gas: '1000000'});
}

runOnce();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Get current credit price
app.get('/api/currentCreditPrice', async (req, res) => {
    res.status(200).send(
        {
            currentPrice: await credits.methods.CURRENT_CREDIT_PRICE().call()
        }
    );
});

// get current customer balance
app.get('/api/currentCreditBalance', async (req, res) => {
    res.status(200).send({
        currentBalance: await credits.methods.getBalance().call({from: req.query.custAcct})
    });
});

app.post('/api/purchaseCredits', async (req, res) => {
    const currentCreditPrice = await credits.methods.CURRENT_CREDIT_PRICE().call();
    const payableAmount = currentCreditPrice*req.body.creditAmount;
    await credits.methods.purchaseCredits(req.body.creditAmount).send({from: req.body.custAcct, value: payableAmount});
    res.status(201).send({
        success: true,
        message: "Purchased credits successfully.",
        currentBalance: await credits.methods.getBalance().call({from: req.query.custAcct})
    })
});

//set new credit price

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});