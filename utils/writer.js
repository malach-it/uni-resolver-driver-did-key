var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

export const respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

export const writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  if (arg1 && arg1.payload && arg1.code) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if (arg2) {
    payload = arg1;
    code = arg2;
  }
  else if(arg1) {
    if (Number.isInteger(arg1)) {
      code = arg1;
    } else {
      payload = arg1;
    }
  }

  if (!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if (code === 200) {
    response.writeHead(code, {'Content-Type': 'application/did+ld+json'});
  } else if (code) {
    response.writeHead(code);
  }
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.end(payload);
}
