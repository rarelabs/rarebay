import { defineChain } from "thirdweb"

export default defineChain({
    id: 1116,
    name: "CORE",
    rpc: "http://rpc.coredao.rg",
    nativeCurrency: {
        name: "CORE",
        symbol: "CORE",
        decimals: 18,
    },
});
