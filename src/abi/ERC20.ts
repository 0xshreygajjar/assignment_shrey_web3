// Minimal ERC-20 ABI: only the read-only functions the API calls.
// Note: USDC is a proxy contract, so use the standard ERC-20 ABI here,
// not the proxy's own ABI (upgradeTo, admin, implementation, ...).
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

export default ERC20_ABI;
