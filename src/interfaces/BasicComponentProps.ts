import { InfoAccount } from './InfoAccount.type';

/**
 * @name BasicComponentProps
 *
 * @description This interface contains the props for the BasicComponent component.
 */

export interface BasicComponentProps {
	account: InfoAccount;
	isConnected: boolean;
}
