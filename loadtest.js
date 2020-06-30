const loadtest = require('loadtest');

function statusCallback(error, result, latency) {
  if (!result) return
  console.log('Current latency %j, result %j, error %j', latency, result, error);
  console.log('----');
  console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
  console.log('Request loadtest() instance index: ', result.instanceIndex);
}

let c = 0;
const options = {
  url: 'http://67.205.172.109:8089/signup',
  maxRequests: 500,
  concurrency: 100,
  method: 'POST',
  statusCallback,
  requestGenerator: (params, options, client, callback) => {
    const message = 'nome=teste+usuario&cpfcnpj=00357357086&email=teste10' + c++ + '%40adwd.com.br&password=8HV%5El1ARQYX2teN&retype=8HV%5El1ARQYX2teN';
    options.headers['Content-Length'] = message.length;
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    const request = client(options, callback);
    request.write(message);
    return request;
  }
};
loadtest.loadTest(options, function (error, result) {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log('Tests run successfully');
});
