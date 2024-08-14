import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export const getTransactionStatus = async (
	provider: Web3Provider | null,
	transactionHash: string,
): Promise<string> => {
	try {
		const receipt = await provider?.getTransactionReceipt(transactionHash);

		if (!receipt) {
			return 'PENDING'; // Si el recibo no existe, la transacción está pendiente
		}

		if (receipt.status === 1) {
			return 'MINTED'; // Transacción exitosa
		} else if (receipt.status === 0) {
			return 'ERROR'; // Transacción fallida
		} else {
			return 'unknown'; // Estado desconocido (esto no debería ocurrir en condiciones normales)
		}
	} catch (error) {
		console.error('Error fetching transaction status:', error);
		return 'error'; // En caso de error al obtener el recibo
	}
};
