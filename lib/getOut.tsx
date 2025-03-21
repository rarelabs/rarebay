import React from "react";

interface SwapCalculatorProps {
  inputAmount: number; // User input amount (token0)
  reserveIn: bigint; // Reserve of input token
  reserveOut: bigint; // Reserve of output token
  totalFee: bigint; // Last total fee from the contract (assumed in basis points)
}

const SwapCalculator: React.FC<SwapCalculatorProps> = ({
  inputAmount,
  reserveIn,
  reserveOut,
  totalFee,
}) => {
  // Function to compute output amount
  const getAmountOut = (
    amountIn: number,
    reserveIn: bigint,
    reserveOut: bigint,
    totalFee: bigint
  ): number => {
    if (!amountIn || amountIn <= 0 || reserveIn <= BigInt(0) || reserveOut <= BigInt(0))
      return 0;

    // Convert BigInt to Number (Assuming reasonable reserve sizes)
    const reserveInNum = Number(reserveIn);
    const reserveOutNum = Number(reserveOut);
    const feePercent = Number(totalFee) / 1e4; // Convert basis points (10000 = 100%)

    // Apply the swap formula
    const amountInWithFee = amountIn * (1 - feePercent);
    return (reserveOutNum * amountInWithFee) / (reserveInNum + amountInWithFee);
  };

  const outputAmount = getAmountOut(inputAmount, reserveIn, reserveOut, totalFee);

  return outputAmount.toFixed(6);
};

export default SwapCalculator;
