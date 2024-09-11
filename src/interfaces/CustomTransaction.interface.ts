/**
 * @name CustomTransaction
 *
 * @description This interface contains the properties for the CustomTransaction object.
 */

export interface CustomTransaction {
	hash: string;
	value: number;
	status: string;
	date: Date;
	isError: string;
	blockExplorer: string;
	timeStamp: number;
	link: string;
	address: string;
}
