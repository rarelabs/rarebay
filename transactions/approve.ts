import { Address } from "thirdweb";
import Token from "../types/token";
import { useGlobalContract as getContract } from '../lib/tokenContext';
import { approve as thirdwebApprove } from "thirdweb/extensions/erc20";

type ApproveOptions = {
	token: Token,
	amount: any,
	spender: any
}

export default function approve(options: ApproveOptions) {
	const contract = getContract({
		address: options.token.address
	});

	return thirdwebApprove({
		contract,
		spender: options.spender,
		amountWei: options.amount
	});
}
