export const abi = [
  {
    inputs: [
      {
        internalType: 'contract ClearingHouse',
        name: '_clearingHouse',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'clearingHouse',
    outputs: [
      {
        internalType: 'contract ClearingHouse',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: '_amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_trader',
        type: 'address'
      }
    ],
    name: 'getFreeCollateral',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: '_amm',
        type: 'address'
      }
    ],
    name: 'getFundingRates',
    outputs: [
      {
        internalType: 'int256',
        name: 'fundingRateLong',
        type: 'int256'
      },
      {
        internalType: 'int256',
        name: 'fundingRateShort',
        type: 'int256'
      },
      {
        internalType: 'int256',
        name: 'fundingPayment',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: 'amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'trader',
        type: 'address'
      },
      {
        internalType: 'int256',
        name: 'deltaMargin',
        type: 'int256'
      }
    ],
    name: 'getMarginAdjustmentEstimation',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'positionSize',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'openMargin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'margin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'unrealizedPnl',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'fundingPayment',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'marginRatio',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'liquidationPrice',
            type: 'int256'
          },
          {
            internalType: 'uint256',
            name: 'openLeverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'leverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'openNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'positionNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'avgEntryPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isLiquidatable',
            type: 'bool'
          }
        ],
        internalType: 'struct ClearingHouseViewer.PositionInfo',
        name: 'positionInfo',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: '_amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_trader',
        type: 'address'
      }
    ],
    name: 'getMarginRatio',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: 'amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'trader',
        type: 'address'
      },
      {
        internalType: 'enum IClearingHouse.Side',
        name: 'side',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'leverage',
        type: 'uint256'
      }
    ],
    name: 'getOpenPositionEstimation',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'int256',
                name: 'positionSize',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'openMargin',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'margin',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'unrealizedPnl',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'fundingPayment',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'marginRatio',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'liquidationPrice',
                type: 'int256'
              },
              {
                internalType: 'uint256',
                name: 'openLeverage',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'leverage',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'openNotional',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'positionNotional',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'avgEntryPrice',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'spotPrice',
                type: 'uint256'
              },
              {
                internalType: 'bool',
                name: 'isLiquidatable',
                type: 'bool'
              }
            ],
            internalType: 'struct ClearingHouseViewer.PositionInfo',
            name: 'positionInfo',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'exchangedQuoteAssetAmount',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'badDebt',
                type: 'uint256'
              },
              {
                internalType: 'int256',
                name: 'exchangedPositionSize',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'realizedPnl',
                type: 'int256'
              },
              {
                internalType: 'int256',
                name: 'marginToVault',
                type: 'int256'
              },
              {
                internalType: 'uint256',
                name: 'spreadFee',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'tollFee',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'entryPrice',
                type: 'uint256'
              },
              {
                internalType: 'int256',
                name: 'priceImpact',
                type: 'int256'
              }
            ],
            internalType: 'struct ClearingHouseViewer.TxSummary',
            name: 'txSummary',
            type: 'tuple'
          }
        ],
        internalType: 'struct ClearingHouseViewer.OpenPositionEstResp',
        name: 'positionEst',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_quoteToken',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_trader',
        type: 'address'
      }
    ],
    name: 'getPersonalBalanceWithFundingPayment',
    outputs: [
      {
        internalType: 'int256',
        name: 'margin',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: '_amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_trader',
        type: 'address'
      }
    ],
    name: 'getPersonalPositionWithFundingPayment',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'size',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'margin',
            type: 'int256'
          },
          {
            internalType: 'uint256',
            name: 'openNotional',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'lastUpdatedCumulativePremiumFraction',
            type: 'int256'
          },
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256'
          }
        ],
        internalType: 'struct IClearingHouse.Position',
        name: 'position',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: 'amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'trader',
        type: 'address'
      }
    ],
    name: 'getTraderPositionInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'positionSize',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'openMargin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'margin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'unrealizedPnl',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'fundingPayment',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'marginRatio',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'liquidationPrice',
            type: 'int256'
          },
          {
            internalType: 'uint256',
            name: 'openLeverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'leverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'openNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'positionNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'avgEntryPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isLiquidatable',
            type: 'bool'
          }
        ],
        internalType: 'struct ClearingHouseViewer.PositionInfo',
        name: 'positionInfo',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: 'amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'trader',
        type: 'address'
      }
    ],
    name: 'getTraderPositionInfoWithoutPriceImpact',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'positionSize',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'openMargin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'margin',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'unrealizedPnl',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'fundingPayment',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'marginRatio',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'liquidationPrice',
            type: 'int256'
          },
          {
            internalType: 'uint256',
            name: 'openLeverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'leverage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'openNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'positionNotional',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'avgEntryPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isLiquidatable',
            type: 'bool'
          }
        ],
        internalType: 'struct ClearingHouseViewer.PositionInfo',
        name: 'positionInfo',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAmm',
        name: '_amm',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_trader',
        type: 'address'
      },
      {
        internalType: 'enum ClearingHouse.PnlCalcOption',
        name: '_pnlCalcOption',
        type: 'uint8'
      }
    ],
    name: 'getUnrealizedPnl',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;
