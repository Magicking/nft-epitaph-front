import { derived } from 'svelte/store';
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
export const GraveyardStore1 = derived([provider, signerAddress, contracts], ([$provider, $signerAddress, $contracts], set) => {
	if (!$provider || !$contracts.rge || !$signerAddress) return set([]);

	provider.subscribe(async (provider) => {
		if (!provider) return;

		provider.on('block', async (_block) => {
			if ($contracts.rge) {
                let ret = [];
                const totalSupply = await $contracts.rge.totalSupply();
                console.log("totalSupply", totalSupply-1);
                // Fetch last 5 tokenURI
                const min = totalSupply-6 < 0 ? 0 : totalSupply-6;
                const max = totalSupply;
                for (let i = min; i < max; i++) {
                    const tokenURI = await $contracts.rge.tokenURI(i);
                    const stripb64h = tokenURI.replace(/^data:\w+\/\w+;base64,/, '');
                    const uri = JSON.parse(atob(stripb64h)).image;
                    ret.push({"tokenId": i,
                              "datauri": uri});
                }
				set(ret);
			}
		});
	});
});