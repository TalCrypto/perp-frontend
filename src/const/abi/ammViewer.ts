export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_amm',
        type: 'address'
      }
    ],
    name: 'getAmmStates',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'canLowerK',
            type: 'bool'
          },
          {
            internalType: 'uint8',
            name: 'repegFlag',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'initMarginRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'maintenanceMarginRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidationFeeRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'partialLiquidationRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'tradeLimitRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'fluctuationLimitRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'txFeeRatio',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quoteAssetReserve',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'baseAssetReserve',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'longPositionSize',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'shortPositionSize',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'twapInterval',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'fundingPeriod',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'priceFeed',
            type: 'address'
          },
          {
            internalType: 'bytes32',
            name: 'priceFeedKey',
            type: 'bytes32'
          },
          {
            internalType: 'string',
            name: 'quoteAssetSymbol',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'baseAssetSymbol',
            type: 'string'
          }
        ],
        internalType: 'struct AmmReader.AmmStates',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;
