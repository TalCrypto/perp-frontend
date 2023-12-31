/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import React from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

import Image from 'next/image';
import { formatDateTime } from '@/utils/date';
import { useStore as useNanostore } from '@nanostores/react';
import { $psSelectedCollectionAmm, $psShowShareIndicator } from '@/stores/portfolio';
import { LargeEthPrice, NormalEthPrice } from '@/components/common/LabelsComponents';
import { getCollectionInformation } from '@/const/collectionList';
import { $vammPrice } from '@/stores/trading';
import { $userInfo } from '@/stores/user';
import { usePositionInfo } from '@/hooks/collection';

export default function SharePosition() {
  const psSelectedCollectionAmm: any = useNanostore($psSelectedCollectionAmm);
  const positionInfo = usePositionInfo(psSelectedCollectionAmm);
  const collectionInfo = getCollectionInformation(psSelectedCollectionAmm);

  const userInfo = useNanostore($userInfo);
  const vammPrice = useNanostore($vammPrice);
  const pnlStatus = positionInfo ? positionInfo.unrealizedPnl >= 0 : false;
  const side = positionInfo ? positionInfo.size > 0 : false;
  const leverage = positionInfo?.leverage.toFixed(2);
  const pnlValue = positionInfo?.unrealizedPnl.toFixed(2);
  const entryPrice = positionInfo?.entryPrice.toFixed(2);
  const futurePrice = vammPrice?.toFixed(2);
  const currentPositionName = collectionInfo.collectionName;

  const userAddress = `${userInfo?.userAddress.substring(0, 7)}...${userInfo?.userAddress.slice(-3)}`;
  const showUserId = userInfo?.username === '' ? userAddress : userInfo?.username;

  const closeShareWindow = () => {
    $psShowShareIndicator.set(false);
  };

  const downloadRank = () => {
    const target = document.getElementById('image-bg');

    if (!target) return;

    htmlToImage.toJpeg(target).then((dataUrl: any) => {
      download(dataUrl, `my-result-${collectionInfo.collectionName}.jpeg`);
    });
  };

  const shareToTwitter = () => {
    const content = `Taking a ${
      side ? 'long' : 'short'
    } position on ${currentPositionName} on @Tribe3Official \n\non Tribe3 public beta app.tribe3.xyz and earn Tribe3 Points! 🪶🪶\n\n#Tribe3 #DEX #NFTFi #NFTFutures #Tribe3Points #airdrop`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
    window.open(url);
  };

  return (
    <div
      className="fixed left-0 top-0 z-[20] flex h-full
      w-full items-center justify-center overflow-auto bg-black/[.3]
      text-white/[.95] backdrop-blur-[8px]"
      onClick={() => $psShowShareIndicator.set(false)}>
      <div className="share-container min-w-[600px] rounded-[12px]" onClick={e => e.stopPropagation()}>
        <div className="ml-3 flex py-4">
          <div
            className={`image-bg h-[618px] w-[440px] py-3 pl-3
            ${pnlStatus ? 'win' : 'lose'}`}
            id="image-bg">
            <div className="mt-4">
              <div className="ml-6">
                <Image src={collectionInfo.logo} alt="" width={64} height={64} />
                <div className="mt-2 flex items-baseline">
                  <div className="pr-[6px] text-[18px] font-bold text-white/[.95]">
                    <span>{collectionInfo.displayCollectionPair}</span>
                  </div>
                  <div className="p-0 text-[14px] font-semibold text-[#98bbfe]/[.89]">
                    <span>Perpetual Contract</span>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="ml-8 flex">
                  <div
                    className={`mx-2 my-0 rounded-[2px] px-1 py-0
                      text-[16px] font-semibold
                    ${side ? 'bg-marketGreen/[.2] text-marketGreen' : 'bg-marketRed/[.2] text-marketRed'}`}>
                    {side ? 'LONG' : 'SHORT'}
                  </div>

                  <div className="pl-1">
                    <span className="text">{`${leverage}x`}</span> Leverage
                  </div>
                </div>
                <div className="ml-9 mt-[62px]">
                  <LargeEthPrice pnlValue={pnlValue} />
                </div>
                <div className="ml-10 mt-[52px]">
                  <NormalEthPrice price={entryPrice} />
                </div>
                <div className="ml-10 mt-8">
                  <NormalEthPrice price={futurePrice} />
                </div>
                <div
                  className="mx-4 mb-3 mt-[172px] flex items-center
                  justify-between text-[12px] font-medium">
                  <div>ID: {showUserId}</div>
                  <div>{formatDateTime(Date.now() / 1000, 'YYYY. DD. MMM HH:mm UTCZ').toUpperCase()}</div>
                  {/* <div>{moment().format('YYYY. DD. MMM HH:mm UTCZ').toUpperCase()}</div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[140px]">
            <div className="relative mb-[440px] flex">
              <div className="absolute right-[4px] top-[4px]">
                <Image
                  src="/images/components/common/modal/close.svg"
                  alt=""
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  onClick={closeShareWindow}
                />
              </div>
            </div>
            <div className="mb-8 cursor-pointer" onClick={shareToTwitter}>
              <div className="mb-1 flex justify-center">
                <Image src="/images/components/trade/share_twitter.png" alt="" width={44} height={44} onClick={shareToTwitter} />
              </div>
              <div className="text-center text-[12px]">Share to Twitter</div>
            </div>
            <div className="cursor-pointer" onClick={downloadRank}>
              <div className="mb-1 flex justify-center">
                <Image src="/images/components/trade/download_img.png" alt="" width={44} height={44} />
              </div>
              <div className="text-center text-[12px]">Download Image</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
