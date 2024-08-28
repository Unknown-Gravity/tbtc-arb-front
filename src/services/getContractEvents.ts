import { ethers } from 'ethers';
import { L2BitcoinDepositor } from '../contracts/L2BitcoinDepositor';
import { InfoAccount } from '../interfaces/InfoAccount.type';

// Dirección del contrato
const contractAddress = '0x992500f42A48371c2c9f91EE6165ba8F9dfB1692';

// ABI del contrato que incluye el evento `DepositInitialized`
const contractAbi = L2BitcoinDepositor;

export const getContractEvents = async (account: InfoAccount) => {};
