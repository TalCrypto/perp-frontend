import React, { useEffect, useState } from 'react';
import { useStore as useNanostore } from '@nanostores/react';

import tradePanelModal from '@/stores/tradePanelModal';

import TradeComponent from '@/components/trade/desktop/trading/tradeComponent';
// import AdjustCollateral from '@/components/trade/desktop/trading/AdjustCollateral';
import CloseCollateral from '@/components/trade/desktop/trading/CloseCollateral';
import { $currentAmm } from '@/stores/trading';
import { usePositionInfo } from '@/hooks/collection';
import { useWeb3Modal } from '@web3modal/react';

function OverFluctuationError(props: any) {
  const { setShowOverFluctuationContent } = props;
  const closeWindow = () => {
    setShowOverFluctuationContent(false);
  };
  return (
    <div className="fails">
      <div className="contents-mod">
        <div className="col">
          Your transaction has failed due to high price fluctuation. <br />
          <br /> Please try again with smaller notional value
          <div className="cursor-pointer" onClick={closeWindow}>
            <div className="text">OK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradingWindow() {
  const [tradeWindowIndex, setTradeWindowIndex] = useState(0);
  const isTradePanelModalShow = useNanostore(tradePanelModal.show);
  const tradePanelModalMsg = useNanostore(tradePanelModal.message);
  const tradePanelModalLink = useNanostore(tradePanelModal.link);
  const currentAmm = useNanostore($currentAmm);
  const userPosition = usePositionInfo(currentAmm);
  const { open } = useWeb3Modal();

  // const traderConnectWallet = () => {
  //   open({ route: 'ConnectWallet' });
  // };
  useEffect(() => setTradeWindowIndex(0), [currentAmm]);

  const tradeComponent = <TradeComponent />;

  // const displayComponent = [tradeComponent, <CloseCollateral />, <AdjustCollateral />][tradeWindowIndex];

  const displayComponent = [tradeComponent, <CloseCollateral />][tradeWindowIndex];

  const tabs = ['Add', 'Close', 'Adjust Collateral'];

  // const [showOverFluctuationContent, setShowOverFluctuationContent] = useState(false);

  const onTabClick = (index: any) => {
    setTradeWindowIndex(index);
  };

  return (
    <div className="w-full 2xl:w-[400px]" style={{ height: 'fit-content' }}>
      {/* {showOverFluctuationContent ? <OverFluctuationError setShowOverFluctuationContent={setShowOverFluctuationContent} /> : null} */}
      {userPosition?.size !== 0 ? (
        <div
          className="border-b-none flex h-[50px] justify-between
            rounded-t-[6px] border-[1px] border-[#71aaff]/[.2]
            p-0 font-normal">
          {tabs.map((item, index) => (
            <div
              className={`trade-tab flex w-full cursor-pointer items-center justify-center
                text-[14px] font-semibold text-primaryBlue
                ${index === 0 ? 'rounded-tl-[6px] ' : ''}
                ${index === 2 ? 'rounded-tr-[6px] ' : ''}
                ${tradeWindowIndex === index ? 'selected' : ''}`}
              onClick={() => {
                onTabClick(index);
              }}
              key={`trade_tab_${item}`}>
              {item}
              <div className="bottom-line" />
            </div>
          ))}
        </div>
      ) : null}
      <div
        className={`mb-[60px] flex rounded-b-[6px] border-[1px] border-[#71aaff]/[.2]
          ${userPosition?.size !== 0 ? '' : 'rounded-t-[6px]'}
        bg-lightBlue p-4 px-6 py-9 text-white`}>
        <div className={`w-full ${userPosition?.size !== 0 ? 'showmenu' : 'hidemenu'}`}>
          {userPosition?.size !== 0 ? displayComponent : tradeComponent}
        </div>
      </div>
    </div>
  );
}

export default TradingWindow;
