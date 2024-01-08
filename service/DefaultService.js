'use strict';

const didKey = require('@transmute/did-key.js');

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = function(identifier,accept) {
  return new Promise(function(resolve, reject) {
    didKey.resolve(identifier)
    .then(function(didDocument) {
      if (didDocument) {
        resolve(didDocument);
      } else {
        resolve(404);
      }
    })
    .catch(function (response) {
      resolve({code:500, payload:''+response});
    });
  });
}
