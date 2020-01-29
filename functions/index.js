const functions = require('firebase-functions');
const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const fetch = require('node-fetch');
const methods = require('./methods');

const { Headers } = fetch;

const url = 'http://18.212.21.97:9500';

const harmony = new Harmony(url, {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const headers = new Headers({
  accept: 'application/json',
  'Content-type': 'application/json',
});

const jsonrpc = '2.0';

const id = 0;

const hmy_query = (method, params = []) =>
  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id: 0, method, params }),
  }).then(resp => resp.json());

exports['stake'] = functions.https.onRequest(async (request, response) => {
  const result = await hmy_query(methods.GetActiveValidatorAddresses);
  console.log(result);
  response.send('Hello from Firebase!');
});
