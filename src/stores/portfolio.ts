/* eslint-disable no-unused-vars */
import { AMM, getCollectionInformation } from '@/const/collectionList';
import { $userPositionInfos } from '@/stores/user';
import { atom, computed } from 'nanostores';

export const $psShowBalance = atom(true);

export const $psUserPosition = computed($userPositionInfos, userPositionInfos => {
  const amms = Object.keys(userPositionInfos) as AMM[];
  const orders = ['bayc', 'mayc', 'degods', 'azuki', 'captainz', 'punks', 'ppg', 'milady'];
  return amms
    .map(amm => userPositionInfos[amm])
    .sort((a, b) => orders.indexOf(a?.amm || '') - orders.indexOf(b?.amm || ''))
    .filter(posInfo => posInfo && posInfo.size !== 0);
});

export const $psSelectedCollectionAmm = atom();

export const $psShowFundingPayment = atom(false);

export const $psShowPositionDetail = atom(false);

export const $psShowShareIndicator = atom(false);

export const $psShowHistory = atom(false);

export const $psSelectedTimeIndex = atom(0);

export const $psLineChartData = atom();

export const $psHistogramChartData = atom();

export const $accumulatedDailyPnl = atom(0);

export const $psLiqSwitchRatio = atom<number | undefined>();

export const $psTimeDescription: any = {
  0: '(1 Week)',
  1: '(1 Month)',
  2: '(2 Months)',
  3: '(6 Months)',
  4: '(Since Trading Competition)'
};
