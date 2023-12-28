import { AccountAddress, Chain } from '@web3-onboard/common';
import type { SecondaryTokenBalances, WalletState } from './types';
declare function updateBalances(addresses?: string[]): Promise<void>;
export declare const updateSecondaryTokens: (wallet: WalletState, account: AccountAddress, chain: Chain) => Promise<SecondaryTokenBalances[]>;
export default updateBalances;
