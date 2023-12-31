export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxHoldingBaseAsset",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "openInterestNotionalCap",
        "type": "uint256"
      }
    ],
    "name": "CapChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "int256",
        "name": "rateLong",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "rateShort",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "underlyingPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fundingPayment",
        "type": "int256"
      }
    ],
    "name": "FundingRateUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "priceFeed",
        "type": "address"
      }
    ],
    "name": "PriceFeedUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quoteAssetReserve",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "baseAssetReserve",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ReserveSnapshotted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quoteAssetReserve",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "baseAssetReserve",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "totalPositionSize",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "cumulativeNotional",
        "type": "int256"
      }
    ],
    "name": "ReservesAdjusted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "settlementPrice",
        "type": "uint256"
      }
    ],
    "name": "Shutdown",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum IAmm.Dir",
        "name": "dirOfQuote",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quoteAssetAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "baseAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "SwapInput",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum IAmm.Dir",
        "name": "dirOfQuote",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quoteAssetAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "baseAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "SwapOutput",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_ORACLE_SPREAD_RATIO",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_NUM_REPEG_FLAG",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetReserve",
        "type": "uint256"
      }
    ],
    "name": "adjust",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "adjustable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseAssetReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quoteAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "calcFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "canLowerK",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fluctuationLimitRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundingBufferPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundingCostCoverRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundingPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundingRevenueTakeRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBaseAssetDelta",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfBase",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "getBasePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfBase",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quoteAssetPoolAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetPoolAmount",
        "type": "uint256"
      }
    ],
    "name": "getBasePriceWithReserves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfBase",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "getBaseTwap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCumulativeNotional",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "_budget",
        "type": "int256"
      }
    ],
    "name": "getFormulaicUpdateKResult",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isAdjustable",
        "type": "bool"
      },
      {
        "internalType": "int256",
        "name": "cost",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "newQuoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newBaseAssetReserve",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cap",
        "type": "uint256"
      }
    ],
    "name": "getFundingPaymentEstimation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "notPayable",
        "type": "bool"
      },
      {
        "internalType": "int256",
        "name": "premiumFractionLong",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "premiumFractionShort",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "fundingPayment",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "underlyingPrice",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetReserve",
        "type": "uint256"
      }
    ],
    "name": "getMaxKDecreaseRevenue",
    "outputs": [
      {
        "internalType": "int256",
        "name": "revenue",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfQuote",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_quoteAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "getQuotePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfQuote",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_quoteAssetAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quoteAssetPoolAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetPoolAmount",
        "type": "uint256"
      }
    ],
    "name": "getQuotePriceWithReserves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfQuote",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_quoteAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "getQuoteTwap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSettlementPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSpotPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_intervalInSeconds",
        "type": "uint256"
      }
    ],
    "name": "getTwapPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUnderlyingPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_intervalInSeconds",
        "type": "uint256"
      }
    ],
    "name": "getUnderlyingTwapPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalShutdown",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "initMarginRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tradeLimitRatio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fundingPeriod",
        "type": "uint256"
      },
      {
        "internalType": "contract IPriceFeed",
        "name": "_priceFeed",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_priceFeedKey",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_quoteAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_fluctuationLimitRatio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tollRatio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_spreadRatio",
        "type": "uint256"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dirOfBase",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_baseAssetAmount",
        "type": "uint256"
      }
    ],
    "name": "isOverFluctuationLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_limit",
        "type": "uint256"
      }
    ],
    "name": "isOverSpread",
    "outputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "marketPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "oraclePrice",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isOverSpreadLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "marketPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "oraclePrice",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestReserveSnapshotIndex",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidationFeeRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "longPositionSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maintenanceMarginRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextFundingTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "open",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "partialLiquidationRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceFeed",
    "outputs": [
      {
        "internalType": "contract IPriceFeed",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceFeedKey",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ptcKDecreaseMax",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ptcKIncreaseMax",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quoteAsset",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quoteAssetReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_budget",
        "type": "uint256"
      }
    ],
    "name": "repegCheck",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isAdjustable",
        "type": "bool"
      },
      {
        "internalType": "int256",
        "name": "cost",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "newQuoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newBaseAssetReserve",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repegFlag",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repegPriceGapRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "reserveSnapshots",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quoteAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "baseAssetReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cumulativeTWPBefore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_adjustable",
        "type": "bool"
      }
    ],
    "name": "setAdjustable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_canLowerK",
        "type": "bool"
      }
    ],
    "name": "setCanLowerK",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_counterParty",
        "type": "address"
      }
    ],
    "name": "setCounterParty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fluctuationLimitRatio",
        "type": "uint256"
      }
    ],
    "name": "setFluctuationLimitRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "setFundingCostCoverRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "setFundingRevenueTakeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_globalShutdown",
        "type": "address"
      }
    ],
    "name": "setGlobalShutdown",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_initMarginRatio",
        "type": "uint256"
      }
    ],
    "name": "setInitMarginRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "setKDecreaseMax",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "setKIncreaseMax",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_liquidationFeeRatio",
        "type": "uint256"
      }
    ],
    "name": "setLiquidationFeeRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_maintenanceMarginRatio",
        "type": "uint256"
      }
    ],
    "name": "setMaintenanceMarginRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_open",
        "type": "bool"
      }
    ],
    "name": "setOpen",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ratio",
        "type": "uint256"
      }
    ],
    "name": "setPartialLiquidationRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IPriceFeed",
        "name": "_priceFeed",
        "type": "address"
      }
    ],
    "name": "setPriceFeed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ratio",
        "type": "uint256"
      }
    ],
    "name": "setRepegPriceGapRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_interval",
        "type": "uint256"
      }
    ],
    "name": "setSpotPriceTwapInterval",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_spreadRatio",
        "type": "uint256"
      }
    ],
    "name": "setSpreadRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tollRatio",
        "type": "uint256"
      }
    ],
    "name": "setTollRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cap",
        "type": "uint256"
      }
    ],
    "name": "settleFunding",
    "outputs": [
      {
        "internalType": "int256",
        "name": "premiumFractionLong",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "premiumFractionShort",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "fundingPayment",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shortPositionSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shutdown",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "spotPriceTwapInterval",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "spreadRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dir",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isQuote",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_canOverFluctuationLimit",
        "type": "bool"
      }
    ],
    "name": "swapInput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quoteAssetAmount",
        "type": "uint256"
      },
      {
        "internalType": "int256",
        "name": "baseAssetAmount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "spreadFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tollFee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IAmm.Dir",
        "name": "_dir",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isQuote",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_canOverFluctuationLimit",
        "type": "bool"
      }
    ],
    "name": "swapOutput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quoteAssetAmount",
        "type": "uint256"
      },
      {
        "internalType": "int256",
        "name": "baseAssetAmount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "spreadFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tollFee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tollRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tradeLimitRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const
