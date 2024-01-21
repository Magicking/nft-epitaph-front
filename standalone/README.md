# NFT-EPITAPH-FRONT

### Update

The `src/lib/rge.abi.json` file has the ABI of the smart-contract that needs
to be updated when the [nft-epitaph-contracts](https://github.com/Magicking/nft-epitaph-contracts) specification changes (e.g: `forge build`).
The `src/lib/rge.conf.json` file has the configuration (e.g: address) of the smart-contract for attachment to the front-end.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
