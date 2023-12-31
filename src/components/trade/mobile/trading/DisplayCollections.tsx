/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStore as useNanostore } from '@nanostores/react';
import { ThreeDots } from 'react-loader-spinner';

import { PriceWithIcon } from '@/components/common/PriceWithIcon';
import { $isShowMobileModal } from '@/stores/modal';
import { AMM, getCollectionInformation } from '@/const/collectionList';
import { $isShowDisplayCollections, /* $currentAmm, */ $marketUpdateTrigger, $isMarketDataUpdating } from '@/stores/trading';
import { getSupportedAMMs } from '@/const/addresses';
import { useMarketOverview } from '@/hooks/market';
import { $userPositionInfos } from '@/stores/user';

export default function DisplayCollections() {
  const router = useRouter();

  const { data: overviewData } = useMarketOverview();
  const isShowDisplayCollections = useNanostore($isShowDisplayCollections);
  // const currentAmm = useNanostore($currentAmm);
  const positionInfos = useNanostore($userPositionInfos);
  const isMarketDataUpdating = useNanostore($isMarketDataUpdating);

  const ammList = getSupportedAMMs(); // .filter((amm: AMM) => amm !== currentAmm);
  const sortedAmmList = [...ammList].sort((a, b) => {
    const { sort: sortA } = getCollectionInformation(a);
    const { sort: sortB } = getCollectionInformation(b);
    return sortA - sortB;
  });

  const marketUpdateTrigger = useNanostore($marketUpdateTrigger);
  const updateOverviewData = () => {
    $marketUpdateTrigger.set(!marketUpdateTrigger);
  };

  const handleBackClick = () => {
    $isShowMobileModal.set(false);
    $isShowDisplayCollections.set(false);
  };

  return (
    <div
      className={`fixed top-0 z-[12] h-full w-full bg-lightBlue 2xl:w-[400px]
      ${isShowDisplayCollections ? 'left-[0]' : 'left-[100%]'}
      transition-left duration-500
    `}>
      <div
        className="h-[54px] w-full bg-[#171833] pt-[24px]
        text-[12px] font-[400] text-[#A8CBFF]">
        <div className="flex flex-row items-center justify-between px-[20px]">
          <div>vAMM / Oracle</div>
          <div>Price Gap</div>
        </div>
        <div className="mt-[12px] h-[1px] w-full bg-[#2E4371]" />
      </div>
      <div className="flex h-[calc(100%-104px)] flex-col overflow-y-scroll ">
        {isMarketDataUpdating ? (
          <div className="flex h-full items-center justify-center">
            <ThreeDots ariaLabel="loading-indicator" height={60} width={60} color="white" />
          </div>
        ) : (
          sortedAmmList.map((item: any, index) => {
            const key = `switcher_collection_${index}`;
            const collectionInfo = getCollectionInformation(item);
            const tradingDataList: any = overviewData?.filter((dataItem: any) => item === dataItem.amm);
            const tradingData = tradingDataList?.length > 0 ? tradingDataList[0] : null;

            const vAMMPrice = !tradingData ? 0 : tradingData.vammPrice;
            const oraclePrice = !tradingData ? 0 : tradingData.oraclePrice;
            const priceGap = vAMMPrice && oraclePrice ? vAMMPrice - oraclePrice : 0;
            const priceGapPercentage = vAMMPrice && oraclePrice ? (vAMMPrice / oraclePrice - 1) * 100 : 0;
            const isPriceGapPositive = priceGap > 0;

            const isHasPos = (amm: AMM): boolean => {
              const size = positionInfos[amm]?.size;
              if (size) {
                return size !== 0;
              }
              return false;
            };

            return (
              <div
                key={key}
                className=""
                onClick={() => {
                  router.push(`/trade/${collectionInfo.amm.toLowerCase()}`, undefined, { shallow: true });
                  handleBackClick();
                }}>
                <div className="my-[16px] flex flex-col px-[20px]">
                  <div className="flex flex-row items-start justify-between ">
                    <div className="flex flex-row items-start justify-start text-[14px] font-[600]">
                      <Image src={collectionInfo.image} width={20} height={20} alt="" className="mr-[6px]" />
                      {collectionInfo.collectionName}
                    </div>
                    {isHasPos(tradingData?.amm) ? (
                      <Image src="/images/mobile/pages/trade/shopping-bag-green.svg" width={20} height={20} alt="" />
                    ) : null}
                  </div>
                  <div className="mt-[20px] flex flex-row items-start justify-between text-[14px] font-[600]">
                    <div className="flex flex-row items-start font-[400]">
                      <PriceWithIcon
                        priceValue={tradingData && tradingData.vammPrice ? tradingData.vammPrice.toFixed(2) : '-.--'}
                        className={`${!tradingData || isMarketDataUpdating ? 'flash' : ''} !font-[400]`}
                      />
                      &nbsp; / &nbsp;
                      <PriceWithIcon
                        priceValue={tradingData && tradingData.oraclePrice ? tradingData.oraclePrice.toFixed(2) : '-.--'}
                        className={`${!tradingData || isMarketDataUpdating ? 'flash' : ''} !font-[400] !text-mediumEmphasis`}
                      />
                    </div>

                    <div>
                      <PriceWithIcon
                        priceValue={`${isPriceGapPositive ? '+' : ''}${priceGap.toFixed(2)} (${Math.abs(priceGapPercentage).toFixed(2)}%)`}
                        className={`${!tradingData || isMarketDataUpdating ? 'flash' : ''} !font-[400]`}
                      />
                    </div>
                  </div>
                  <div className="mt-[8px]">
                    <div
                      className={`flex w-[70px] text-[14px] ${!tradingData || isMarketDataUpdating ? 'flash' : ''}
                    ${
                      !tradingData || !tradingData.priceChangeRatio24h
                        ? ''
                        : tradingData.priceChangeRatio24h > 0
                        ? 'text-marketGreen'
                        : tradingData.priceChangeRatio24h < 0
                        ? 'text-marketRed'
                        : ''
                    }`}>
                      {tradingData && (
                        <Image
                          src={
                            tradingData && tradingData.priceChangeRatio24h > 0
                              ? '/images/components/trade/chart/polygon_pos.svg'
                              : '/images/components/trade/chart/polygon_neg.svg'
                          }
                          alt=""
                          width={16}
                          height={16}
                        />
                      )}

                      <span className="ml-1">{tradingData ? `${Math.abs(tradingData.priceChangeRatio24h.toFixed(2))}%` : '-.-- %'}</span>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-[#2E4371]" />
              </div>
            );
          })
        )}
      </div>
      <div
        className="absolute bottom-0 flex h-[50px] w-full items-center justify-center
        bg-secondaryBlue px-[22px] py-4 text-[15px] text-white
      ">
        <Image
          src="/images/mobile/common/angle-right.svg"
          className="absolute left-[22px] cursor-pointer"
          width={14}
          height={14}
          alt=""
          onClick={handleBackClick}
        />
        <div className="flex">Collections</div>
        <Image
          className="absolute right-[22px] cursor-pointer"
          src="/images/common/refresh.svg"
          width={24}
          height={24}
          alt=""
          onClick={updateOverviewData}
        />
      </div>
    </div>
  );
}
