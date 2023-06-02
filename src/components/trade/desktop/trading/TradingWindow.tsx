import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import tradePanelModal from '@/stores/tradePanelModal';

import TradeComponent from '@/components/trade/desktop/trading/tradeComponent';
import AdjustCollateral from '@/components/trade/desktop/trading/AdjustCollateral';
import CloseCollateral from '@/components/trade/desktop/trading/CloseCollateral';
import TradePanelModal from '@/components/trade/desktop/trading/TradePanelModal';

import { connectWallet } from '@/utils/Wallet';

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
          <div className="confirm" onClick={closeWindow}>
            <div className="text">OK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradingWindow(props: any) {
  const { userPosition, refreshPositions, tradingData, wethBalance, fullWalletAddress, currentToken, maxReduceValue } = props;
  const [tradeWindowIndex, setTradeWindowIndex] = useState(0);
  const isTradePanelModalShow = useStore(tradePanelModal.show);
  const tradePanelModalMsg = useStore(tradePanelModal.message);
  const tradePanelModalLink = useStore(tradePanelModal.link);

  const traderConnectWallet = () => {
    connectWallet(() => {}, true);
  };
  useEffect(() => setTradeWindowIndex(0), [currentToken]);

  const tradeComponent = (
    <TradeComponent
      refreshPositions={refreshPositions}
      connectWallet={traderConnectWallet}
      wethBalance={wethBalance}
      fullWalletAddress={fullWalletAddress}
      currentToken={currentToken}
      userPosition={userPosition}
      tradingData={tradingData}
    />
  );

  const displayComponent = [
    tradeComponent,
    <CloseCollateral
      refreshPositions={refreshPositions}
      userPosition={userPosition}
      wethBalance={wethBalance}
      fullWalletAddress={fullWalletAddress}
      tradingData={tradingData}
      currentToken={currentToken}
      setTradeWindowIndex={setTradeWindowIndex}
    />,
    <AdjustCollateral
      refreshPositions={refreshPositions}
      userPosition={userPosition}
      wethBalance={wethBalance}
      fullWalletAddress={fullWalletAddress}
      tradingData={tradingData}
      currentToken={currentToken}
      maxReduceValue={maxReduceValue}
    />
  ][tradeWindowIndex];

  const tabs = ['Add', 'Close', 'Adjust Collateral'];

  const [showOverFluctuationContent, setShowOverFluctuationContent] = useState(false);

  const onTabClick = (index: any) => {
    setTradeWindowIndex(index);
  };

  return (
    <div className="ml-[44px] mr-[20px] w-full 2xl:w-[400px]" style={{ height: 'fit-content' }}>
      {showOverFluctuationContent ? <OverFluctuationError setShowOverFluctuationContent={setShowOverFluctuationContent} /> : null}
      {userPosition !== null ? (
        <div
          className="border-b-none flex h-[50px] justify-between
            rounded-t-[12px] border-[1px] border-[#71aaff]/[.2]
            p-0 font-normal">
          {tabs.map((item, index) => (
            <div
              className={`trade-tab flex w-full cursor-pointer items-center
                justify-center text-[14px] font-semibold text-primaryBlue
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
        className="mb-[60px]  flex 
        rounded-[6px] border-[1px] border-[#71aaff]/[.2]
      bg-lightBlue p-6 px-[36px] py-[32px] text-white">
        <div className={`w-full ${userPosition ? 'showmenu' : 'hidemenu'}`}>
          {userPosition !== null ? displayComponent : tradeComponent}
        </div>
        <TradePanelModal
          isShow={isTradePanelModalShow}
          setIsShow={tradePanelModal.setIsShow}
          message={tradePanelModalMsg}
          link={tradePanelModalLink}
        />
      </div>
    </div>
  );
}

export default TradingWindow;
