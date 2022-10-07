import Web3 from 'web3';
import store from '@/store';
// import { AbiItem } from 'web3-utils';
// import { ContractOptions } from 'web3-eth-contract';
import * as crypto from 'crypto';
/**
 * Provides a web3 instance using our own private provider httpProver
 */

const algorithm = 'aes-256-cbc';
let key;
let initVector;
const getSelectedConfig = () => {
  let chain = store.state.chains.selected;
  const lschains = localStorage.getItem('chains');
  if (lschains) {
    chain = JSON.parse(lschains)[chain.chain_name];
  }
  if (!chain.sdk_version) {
    chain.sdk_version = '0.33';
  }

  return chain;
};

const provider = getSelectedConfig().provider;

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
  const web3 = new Web3(provider || '');
  return web3;
};

if (typeof window !== 'undefined') {
  window.web3 = new Web3(provider || '');
}

const getContract = (abi, address, contractOptions) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(abi, address, contractOptions);
};

const STATUS_CODE = {
  GORLI: {
    PROVIDER: 'https://ethereum-goerli-rpc.allthatnode.com/'
  },
  KLAYTN: {
    PROVIDER: 'https://klaytn-api.fingerlabs.io/'
  },
  BAOBAB: {
    PROVIDER: 'https://public-en.kaikas.io/v1/baobab/'
  },
  ETHEREUM: {
    PROVIDER: 'https://mainnet.infura.io/v3/'
  }
};

export { getWeb3, getContract, decryptRequest, STATUS_CODE };
