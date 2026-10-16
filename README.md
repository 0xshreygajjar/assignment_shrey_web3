# shrey-api-test

A minimal Express server with one endpoint, `GET /shreyApiTest`, that reads live
data from the **USDC smart contract on Ethereum mainnet** using
[ethers.js](https://docs.ethers.org/v6/) and a public RPC provider, then prints
the result to the console and returns it as JSON.

## What it fetches

From the USDC contract (`0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`):

- `name()`, `symbol()`, `decimals()`
- `totalSupply()`
- `balanceOf(<holder>)` for `vitalik.eth` (`0xd8dA...6045`) by default
- the current block number

## Run

```bash
npm install
npm start
```

Then in another terminal:

```bash
curl http://localhost:3000/shreyApiTest
```

The fetched data is printed in the server's console and returned as JSON.

## Configuration (optional)

| Variable         | Default                                | Purpose                      |
| ---------------- | -------------------------------------- | ---------------------------- |
| `PORT`           | `3000`                                 | HTTP port                    |
| `RPC_URL`        | `https://ethereum-rpc.publicnode.com`  | Any Ethereum mainnet RPC     |
| `HOLDER_ADDRESS` | `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` | Address to read USDC balance for |

Example with Alchemy/Infura:

```bash
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/<key> npm start
```

## Project layout

```
src/server/server.js   # Express app + contract read logic
```
