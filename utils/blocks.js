import Web3 from "web3";

/**
 * Get the latest block number from the Core DAO RPC.
 * @returns {Promise<number>} The latest block number as a number.
 */
export async function getLatestBlockNumber() {
  try {
    const rpcUrl = "https://rpc.coredao.org"; // Core DAO RPC URL
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    const blockNumber = await web3.eth.getBlockNumber();
    return Number(blockNumber); // Ensure it's a number
  } catch (error) {
    console.error("Failed to fetch the latest block number:", error);
    throw error; // Re-throw the error for further handling
  }
}
