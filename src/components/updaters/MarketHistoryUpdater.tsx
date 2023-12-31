/* eslint-disable operator-linebreak */
import { useEffect } from 'react';
import { useStore as useNanostore } from '@nanostores/react';
import { $currentAmm, $fundingRatesHistory, $fundingRatesHistoryTrigger, $futureMarketHistory, $spotMarketHistory } from '@/stores/trading';
import { getAMMAddress } from '@/const/addresses';
import { getFundingPaymentHistory, getMarketHistory } from '@/utils/trading';
import { formatBigInt } from '@/utils/bigInt';
import { getAddress } from 'viem';
import { $currentChain } from '@/stores/user';
import { getBaycFromMainnet } from '@/utils/opensea';
import { getCollectionInformation } from '@/const/collectionList';

const MarketHistoryUpdater = () => {
  const currentAmm = useNanostore($currentAmm);
  const chain = useNanostore($currentChain);
  const fundingRatesHistoryTrigger = useNanostore($fundingRatesHistoryTrigger);

  // load future market history for once
  useEffect(() => {
    function fetch() {
      const ammAddr = getAMMAddress(chain, currentAmm);
      if (ammAddr) {
        getMarketHistory(ammAddr).then(res => {
          $futureMarketHistory.set(
            res.map(
              (record: {
                ammAddress: string;
                timestamp: string;
                exchangedPositionSize: string;
                positionNotional: string;
                positionSizeAfter: string;
                liquidationPenalty: string;
                spotPrice: string;
                userAddress: string;
                userId: string;
                txHash: string;
              }) => ({
                ammAddress: record.ammAddress,
                timestamp: Number(record.timestamp),
                exchangedPositionSize: formatBigInt(record.exchangedPositionSize),
                positionNotional: formatBigInt(record.positionNotional),
                positionSizeAfter: formatBigInt(record.positionSizeAfter),
                liquidationPenalty: formatBigInt(record.liquidationPenalty),
                spotPrice: formatBigInt(record.spotPrice),
                userAddress: getAddress(record.userAddress),
                userId: record.userId,
                txHash: record.txHash,
                isNew: false
              })
            )
          );
        });
      }
    }
    if (currentAmm) {
      $futureMarketHistory.set(undefined);
      fetch();
    }
  }, [currentAmm, chain]);

  // load opensea spot market history every 10 seconds
  useEffect(() => {
    function fetch() {
      const amm = getCollectionInformation(currentAmm);
      const ammAddr = amm.contract;
      if (ammAddr) {
        getBaycFromMainnet(ammAddr).then(res => {
          $spotMarketHistory.set(res);
        });
      }
    }

    if (currentAmm) {
      $spotMarketHistory.set(undefined);
      fetch();
    }

    const timer = setInterval(fetch, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [currentAmm, chain]);

  // load funding payment history for once
  useEffect(() => {
    function fetch() {
      const ammAddr = getAMMAddress(chain, currentAmm);
      if (ammAddr) {
        getFundingPaymentHistory(ammAddr).then(res => {
          if (res) {
            $fundingRatesHistory.set(
              res.map((record: { amm: string; timestamp: string; rateLong: string; rateShort: string; underlyingPrice: string }) => ({
                amm: getAddress(record.amm),
                timestamp: Number(record.timestamp),
                underlyingPrice: formatBigInt(record.underlyingPrice),
                rateLong: formatBigInt(record.rateLong),
                rateShort: formatBigInt(record.rateShort),
                amountLong: formatBigInt(record.rateLong) * formatBigInt(record.underlyingPrice),
                amountShort: formatBigInt(record.rateShort) * formatBigInt(record.underlyingPrice)
              }))
            );
          } else {
            $fundingRatesHistory.set([]);
          }
        });
      }
    }
    if (currentAmm) {
      $fundingRatesHistory.set(undefined);
      fetch();
    }
  }, [currentAmm, chain, fundingRatesHistoryTrigger]);

  return null;
};

export default MarketHistoryUpdater;
