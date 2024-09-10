/**
 * @type {User}
 *
 * @description This type defines the structure of a user.
 *
 * @property {number} id The id of the user.
 * @property {string} nick The nick of the user.
 * @property {string} email The email of the user.
 * @property {string} password The password of the user.
 * @property {string} publicWalletKey The public wallet key of the user.
 */

export type User = {
	id: number;
	nick: string;
	email: string;
	password: string;
	publicWalletKey: string;
};
