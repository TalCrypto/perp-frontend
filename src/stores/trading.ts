import { DAY_RESOLUTION, MONTH_RESOLUTION, WEEK_RESOLUTION } from '@/const';
import { AMM, collectionsInfos } from '@/const/collectionList';
import { OhlcData, Time } from 'lightweight-charts';
import { atom, computed, map } from 'nanostores';
import { Address } from 'wagmi';
import { formatBigInt } from '@/utils/bigInt';
import { getLatestOraclePriceBefore } from '@/utils/subgraph';

export type TransactionPendings = {
  // eslint-disable-next-line no-unused-vars
  [value in AMM]?: boolean;
};

export interface ChartGraphRecord {
  round: number;
  avgPrice: number;
  open: number;
  close: number;
  start: number;
  end: number;
}

export interface FundingRatesRecord {
  amm: Address;
  timestamp: number;
  underlyingPrice: number;
  rateLong: number;
  rateShort: number;
  amountLong: number;
  amountShort: number;
}

export interface MarketHistoryRecord {
  ammAddress: string;
  timestamp: number;
  exchangedPositionSize: number;
  positionNotional: number;
  positionSizeAfter: number;
  liquidationPenalty: number;
  spotPrice: number;
  userAddress: Address;
  userId: string;
  txHash: string;
  isNew: boolean; // used for adding animation
}

export interface CollectionConfig {
  fundingPeriod: number;
  liqSwitchRatio: number;
  initMarginRatio: number;
}

export const $vammPrice = atom<number | undefined>();
export const $oraclePrice = atom<number | undefined>();
export const $nextFundingTime = atom<number | undefined>();
export const $openInterests = atom<{ longRatio: number; shortRatio: number } | undefined>();
export const $fundingRates = atom<{ longRate: number; shortRate: number } | undefined>();

export const $currentAmm = atom<AMM | undefined>();

export const $transactionPendings = map<TransactionPendings>();

export const $collectionConfig = map<CollectionConfig>();

export const $futureMarketHistory = atom<MarketHistoryRecord[] | undefined>();

export const $fundingRatesHistory = atom<FundingRatesRecord[] | undefined>();
export const $fundingRatesHistoryTrigger = atom(false);

export const $spotMarketHistory = atom<any[] | undefined>();

export const $selectedTimeIndex = atom(0);

export const $ohlcData = atom<OhlcData[]>([]);
export const $OracleGraphData = atom<OhlcData[]>([]);

export const $tsTransactionStatus = atom({
  isShow: false,
  isSuccess: true,
  linkUrl: ''
});

export const $priceChange = computed($ohlcData, graphData => {
  if (graphData && graphData.length > 0) {
    const basePrice = graphData[0].open;
    const nowPrice = graphData[graphData.length - 1].close;
    return nowPrice - basePrice;
  }
  return undefined;
});

export const $priceChangePct = computed($ohlcData, graphData => {
  if (graphData && graphData.length > 0) {
    const basePrice = graphData[0].open;
    const nowPrice = graphData[graphData.length - 1].close;
    return ((nowPrice - basePrice) / basePrice) * 100;
  }
  return undefined;
});

export const $lowPrice = computed($ohlcData, graphData => {
  if (graphData && graphData.length > 0) {
    let lowPrice = 0;
    graphData.forEach(({ low }) => {
      if (lowPrice === 0 || low < lowPrice) {
        lowPrice = low;
      }
    });
    return lowPrice;
  }
  return undefined;
});

export const $highPrice = computed($ohlcData, graphData => {
  if (graphData && graphData.length > 0) {
    let highPrice = 0;
    graphData.forEach(({ high }) => {
      if (high > highPrice) {
        highPrice = high;
      }
    });
    return highPrice;
  }
  return undefined;
});

export const $dailyVolume = atom<number | undefined>();

export async function addGraphRecord(ohlcPrice?: number /* TODO , notionalValue?: number */) {
  const selectedTimeIndex = $selectedTimeIndex.get();
  const nowTs = Math.round(new Date().getTime() / 1000);
  const interval = selectedTimeIndex === 0 ? DAY_RESOLUTION : selectedTimeIndex === 1 ? WEEK_RESOLUTION : MONTH_RESOLUTION;
  const ohlcData = $ohlcData.get();
  const oracleData = $OracleGraphData.get();
  const currentAmm = $currentAmm.get();

  let oraclePrice;

  if (currentAmm && oracleData?.length > 0) {
    const ammOracleAddr = collectionsInfos[currentAmm].contract;
    let latestOraclePrice: any = oracleData[oracleData.length - 1].close;
    latestOraclePrice = await getLatestOraclePriceBefore(ammOracleAddr, nowTs);
    oraclePrice = formatBigInt(latestOraclePrice?.spotPrice);
  }

  const updateGraph = (targetData: any, graphData: any[], price?: number) => {
    if (graphData && graphData.length > 0) {
      const lastGraphRecord = graphData[graphData.length - 1];
      if (nowTs >= Number(lastGraphRecord.time) + interval) {
        if (price) {
          targetData.set([
            ...graphData,
            {
              time: (Number(lastGraphRecord.time) + interval) as Time,
              open: price,
              high: price,
              low: price,
              close: price
            }
          ]);
        } else {
          targetData.set([
            ...graphData,
            {
              time: (Number(lastGraphRecord.time) + interval) as Time,
              open: lastGraphRecord.close,
              high: lastGraphRecord.close,
              low: lastGraphRecord.close,
              close: lastGraphRecord.close
            }
          ]);
        }
      } else if (price) {
        const high = Math.max(price, lastGraphRecord.high);
        const low = Math.min(price, lastGraphRecord.low);
        const newRecord = {
          time: lastGraphRecord.time,
          open: lastGraphRecord.open,
          high,
          low,
          close: price
        };
        graphData.pop();
        targetData.set([...graphData, newRecord]);
      }
    }
  };

  updateGraph($ohlcData, ohlcData, ohlcPrice);
  updateGraph($OracleGraphData, oracleData, oraclePrice);
}

// Market Overview Data Trigger
export const $marketUpdateTrigger = atom(false);
export const $isMarketDataUpdating = atom(false);

// mobile specialized stores
export const $isShowTradingMobile = atom(false);

export const $tsIsShowPriceGapOverModal = atom(true);

export const $isShowDisplayCollections = atom(false);

export const $tsIsFirstPartialClose = atom(true);
export const $tsIsShowPartialCloseModal = atom(false);
export const $tsIsContinueClose = atom(false);
