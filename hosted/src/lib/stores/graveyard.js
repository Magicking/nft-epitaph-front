import { writable } from 'svelte/store';
import { ethers } from 'ethers';
import { provider, signer, signerAddress, contracts } from 'svelte-ethers-store';
function atob(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = '';
    let i = 0;

    while (i < input.length) {
        const encoded1 = chars.indexOf(input[i++]);
        const encoded2 = chars.indexOf(input[i++]);
        const encoded3 = chars.indexOf(input[i++]);
        const encoded4 = chars.indexOf(input[i++]);

        const decoded1 = (encoded1 << 2) | (encoded2 >> 4);
        const decoded2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        const decoded3 = ((encoded3 & 3) << 6) | encoded4;

        str += String.fromCharCode(decoded1);
        if (encoded3 !== 64) str += String.fromCharCode(decoded2);
        if (encoded4 !== 64) str += String.fromCharCode(decoded3);
    }

    return str;
}

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export const GraveyardStore1 = writable({});
export const TotalSupply = writable(0);

function loadNFT(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`/public/json/rge-${id}.json`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			data['id'] = id;
			console.log(data);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}

export async function LoadGraveyardStore() {
	try {
        const response = await fetch('/public/json/collection.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
		console.log(data);
		TotalSupply.set(data['totalSupply']);
		console.log(TotalSupply);
		for (let i = 0; i < data['totalSupply']; i++) {
			const nft = await loadNFT(i);
			GraveyardStore1.update((store) => {
				store[i] = nft;
				return store;
			}
			);
		}
		console.log(GraveyardStore1);
    } catch (error) {
        console.error('Error loading the JSON data: ', error);
    }
}
