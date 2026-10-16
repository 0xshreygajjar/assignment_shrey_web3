import express from "express";
import { ethers } from "ethers";
import ERC20_ABI from "../abi/ERC20.ts";

const PORT = process.env.PORT || 3000;

// Public Ethereum mainnet RPC. Override with RPC_URL (e.g. an Infura/Alchemy URL).
const RPC_URL = process.env.RPC_URL || "https://ethereum-rpc.publicnode.com";

// USDC (Circle) on Ethereum mainnet.
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// Address whose USDC balance we read. Override with HOLDER_ADDRESS.
const HOLDER_ADDRESS =
  process.env.HOLDER_ADDRESS || "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik.eth

// Minimal ERC-20 ABI: only the read-only functions we call.

const provider = new ethers.JsonRpcProvider(RPC_URL);
const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

async function fetchUsdcData() {
  const [name, symbol, decimals, totalSupply, balance, blockNumber] =
    await Promise.all([
      usdc.name(),
      usdc.symbol(),
      usdc.decimals(),
      usdc.totalSupply(),
      usdc.balanceOf(HOLDER_ADDRESS),
      provider.getBlockNumber(),
    ]);

  return {
    network: "ethereum-mainnet",
    rpcUrl: RPC_URL,
    blockNumber,
    contract: {
      address: USDC_ADDRESS,
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatUnits(totalSupply, decimals),
    },
    holder: {
      address: HOLDER_ADDRESS,
      balance: ethers.formatUnits(balance, decimals),
    },
  };
}

const app = express();

app.get("/shreyApiTest", async (req, res) => {
  console.log(`\n[shreyApiTest] GET ${req.originalUrl} - fetching USDC data...`);
  try {
    const data = await fetchUsdcData();
    console.log("[shreyApiTest] Result:");
    console.log(JSON.stringify(data, null, 2));
    res.json({ ok: true, data });
  } catch (err) {
    console.error("[shreyApiTest] Error:", err.message);
    res.status(502).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Try: curl http://localhost:${PORT}/shreyApiTest`);
});
