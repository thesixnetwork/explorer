import Web3 from 'web3';
// import { AbiItem } from 'web3-utils';
// import { ContractOptions } from 'web3-eth-contract';
import * as crypto from 'crypto';
/**
 * Provides a web3 instance using our own private provider httpProver
 */

const algorithm = 'aes-256-cbc';
let key;
let initVector;
export const configKey = (_key, _initVector) => {
  key = _key;
  initVector = _initVector;
};

const decryptRequest = text => {
  checkInitStage();
  const decipher = crypto.createDecipheriv(algorithm, key, initVector);

  let decrypted = decipher.update(text, 'hex', 'utf8');

  decrypted += decipher.final('utf8');

  return decrypted;
};

const checkInitStage = () => {
  if (!key || !initVector) {
    throw Error('Please init key and init vector');
  }
};

const getWeb3 = () => {
  const web3 = new Web3("https://klaytn-api.fingerlabs.io/" || '');
  return web3;
};

if (typeof window !== 'undefined') {
  window.web3 = new Web3("https://klaytn-api.fingerlabs.io/" || '');
}

const getContract = (abi, address, contractOptions) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(abi, address, contractOptions);
};

export { getWeb3, getContract, decryptRequest };
