import { Address } from 'thirdweb';

type Token = {
  address: Address,
  symbol: string,
  decimals: number,
  image: string
  name: string
}

export default Token;

