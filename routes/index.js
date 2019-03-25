const express = require('express');
const request = require("request");
const web3 = require('../web3');
const router = express.Router();

const {SwarmClient} = require('@erebos/swarm-node');
const vendor = require('../vendor');


const client = new SwarmClient({
    http: 'https://swarm-gateways.net'
});
/**
 * @api {post} /sendEvent Send an event to the smart proxy, where it gets uploaded to swarm, returns an access hash, and saves the access hash to a Smart Contract.
 * @apiName PostSendEvent
 * @apiGroup Swarm
 * @apiVersion 1.0.0
 *
 * @apiParam {Boolean} eventStatus Whether a human was detected or not.
 * @apiParam {String} eventData Further information about the event.
 * @apiParam {String} deviceId A unique identifier for the device. MUST be an ethereum account address.
 * @apiParamExample {json} Request-Example:
 * { "eventStatus": true, "eventData": "Suspicious individuals detected", "deviceId": "0x7AAF1FD79329c3Ba3fEab3FBbfdA0eb9C01344Ae" }
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {String} data Returned access hash to the saved data.
 *
 * @apiSuccessExample {json} Success-Response:
 *  {"result": "OK", "data": "55df7gs7n9bv8ktg805bnm436v9gm74yld54"}
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {"result": "INTERNAL SERVER ERROR"}
 */
router.post('/sendEvent', async (req, res) => {
    const eventStatus = Boolean(req.body.eventStatus);
    const eventData = req.body.eventData;
    const eventDeviceAddress = req.body.deviceId;
    const accounts = await web3.eth.getAccounts();
    const eventObject = {
        eventStatus: eventStatus,
        eventData: eventData
    };

    client.bzz.uploadFile(JSON.stringify(eventObject), {contentType: 'text/plain'})
        .then(async (hash) => {
            //console.log(accounts);
            let blockdata = await vendor.methods.set_device_data(eventDeviceAddress, hash).send({from: accounts[0]});
            res.status(200).send({result: 'OK', data: hash})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({result: 'INTERNAL SERVER ERROR'})
        });
});

/**
 * @api {get} /isDevicePresent Whether a particular device is present in the Smart Contract data or not.
 * @apiName GetDevicePresent
 * @apiGroup Blockchain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} deviceId A unique identifier for the device. MUST be an ethereum account address.
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {Boolean} data Whether the device is present or not.
 *
 * @apiSuccessExample {json} Success-Response:
 * {"result": "OK", "data": true}
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/isDevicePresent', async (req, res) => {
    const deviceId = req.query.deviceId;
    try {
        const returnedData = await vendor.methods.is_device_present(deviceId).call();
        res.status(200).send({
            response: 'OK',
            data: returnedData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            response: 'INTERNAL SERVER ERROR'
        });
    }

});

/**
 * @api {get} /getSavedEvent Returns the data stored on Swarm
 * @apiName GetSavedEvent
 * @apiGroup Swarm
 * @apiVersion 1.0.0
 *
 * @apiParam {String} accessHash The access hash associated with uploaded data to Swarm.
 *
 * @apiSuccess {Boolean} eventStatus Whether a human was detected or not.
 * @apiSuccess {String} eventData Further information about the event.
 * @apiSuccess {String} result Request result.
 *
 * @apiSuccessExample {json} Success-Response:
 * { "eventStatus": true, "eventData": "wauu terorist", "result": "OK" }
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/getSavedEvent', (req, res) => {
    const accessHash = req.query.accessHash;

    client.bzz.download(accessHash, {contentType: 'text/plain'})
        .then((promise) => {
            console.log(promise.url);
            request({url: promise.url, json: true}, (err, response, body) => {
                body.result = 'OK';
                res.status(200).send(body);
            });

        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({response: 'INTERNAL SERVER ERROR'});
        })
});

/**
 * @api {get} /getDeviceCount Returns the number of devices on the Blockchain
 * @apiName GetDeviceCount
 * @apiGroup Blockchain
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {Number} data Number of devices present in the Smart Contract data
 *
 * @apiSuccessExample {json} Success-Response:
 * { "result": "OK", "data": 4 }
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/getDeviceCount', async (req, res) => {
    try {
        const returnedData = await vendor.methods.get_device_count().call();
        res.status(200).send({
            result: 'OK',
            data: returnedData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: 'INTERNAL SERVER ERROR',
        });
    }
});

/**
 * @api {get} /getDeviceAtIndex Returns the deviceID of the device at a particular index
 * @apiName GetDeviceAtIndex
 * @apiGroup Blockchain
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} index The index of the device whose ID is to be returned
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {String} data deviceID of the device at the specified index.
 *
 * @apiSuccessExample {json} Success-Response:
 * { "result": "OK", "data": "0x7AAF1FD79329c3Ba3fEab3FBbfdA0eb9C01344Ae }
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/getDeviceAtIndex', async (req, res) => {
    const index = req.query.index;
    try {
        const returnedData = await vendor.methods.get_device_at_index(index).call();
        res.status(200).send({
            result: 'OK',
            data: returnedData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: 'INTERNAL SERVER ERROR',
        });
    }
});


/**
 * @api {get} /getDeviceTimeStamp Returns all event timestamps for a particular device
 * @apiName GetDeviceTimeStamp
 * @apiGroup Blockchain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} deviceId The ID of the device whose timestamps are to be fetched. MUST be an ethereum account hash.
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {String[]} data Timestamps associated with the device. (Array of Strings)
 *
 * @apiSuccessExample {json} Success-Response:
 * {"result":"OK","data":["1553360429","1553362664","1553379044","1553397089","1553421704"]}
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/getDeviceTimeStamp', async (req, res) => {
    const deviceId = req.query.id;
    try {
        const returnedData = await vendor.methods.get_device_timestamps(deviceId).call();
        res.status(200).send({
            result: 'OK',
            data: returnedData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: 'INTERNAL SERVER ERROR',
        });
    }
});

/**
 * @api {get} /getDeviceData Returns access hash of event data associated with the saved device at the given timestamp.
 * @apiName GetDeviceData
 * @apiGroup Blockchain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} deviceId The ID of the device whose timestamps are to be fetched. MUST be an ethereum account hash.
 * @apiParam {Number} time The timestamp of the event, MUST be present in the list returned from GetDeviceTimeStamp.
 *
 * @apiSuccess {String} result Request result.
 * @apiSuccess {String} data Access hash of event data associated with the saved device at the given timestamp.
 *
 * @apiSuccessExample {json} Success-Response:
 * {"result":"OK","data":"1f0c7c1ea08a40dea7ebeb709c3a892363e850c961cd2588680a287b474f25d4"}
 *
 * @apiError INTERNAL SERVER ERROR There was some or the other error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {"result": "INTERNAL SERVER ERROR"}
 */
router.get('/getDeviceData', async (req, res) => {
    const deviceId = req.query.deviceId;
    const timeStamp = req.query.time;
    try {
        const returnedData = await vendor.methods.get_device_data(deviceId, timeStamp).call();
        res.status(200).send({
            result: 'OK',
            data: returnedData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: 'INTERNAL SERVER ERROR',
        });
    }
});

module.exports = router;
