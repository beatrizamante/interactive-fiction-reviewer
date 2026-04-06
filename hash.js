import crypto from 'node:crypto';

function gerarChave(tamanho = 64) {
	return crypto.randomBytes(tamanho).toString('hex');
}

console.log(gerarChave());
