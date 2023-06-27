/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import { utils } from 'ethers';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { useStore as useNanostore } from '@nanostores/react';

import { formatterValue, calculateNumber } from '@/utils/calculateNumbers';
// import collectionList from '@/const/collectionList';
import { pageTitleParser } from '@/utils/eventLog';
import { dataFetch, whitelisted } from '@/stores/UserState';

import tradePanel from '@/stores/tradePanel';
import { priceGapLimit } from '@/stores/priceGap';
import InputSlider from '@/components/trade/desktop/trading/InputSlider';

import {
  wsIsLogin,
  wsIsWrongNetwork,
  wsWethBalance,
  wsIsApproveRequired,
  wsCurrentToken,
  wsUserPosition,
  wsFullWalletAddress
} from '@/stores/WalletState';

function LongShortRatio(props: any) {
  const { setSaleOrBuyIndex, saleOrBuyIndex } = props;
  const userPosition: any = useNanostore(wsUserPosition);

  return (
    <div className="mb-[26px] flex h-[40px] rounded-full bg-mediumBlue">
      <div
        className={`flex flex-1 flex-shrink-0 cursor-pointer items-center justify-center rounded-full
          ${saleOrBuyIndex === 0 ? 'long-selected text-highEmphasis' : 'text-direction-unselected-normal'}
          text-center text-[14px] font-semibold hover:text-highEmphasis`}
        onClick={() => {
          if (!userPosition) {
            setSaleOrBuyIndex(0);
          }
        }}
        key="long">
        <div className="">LONG</div>
      </div>
      <div
        className={`flex flex-1 flex-shrink-0 cursor-pointer items-center justify-center rounded-full
          ${saleOrBuyIndex === 1 ? 'short-selected text-highEmphasis' : 'text-direction-unselected-normal'}
          text-center text-[14px] font-semibold hover:text-highEmphasis`}
        onClick={() => {
          if (!userPosition) {
            setSaleOrBuyIndex(1);
          }
        }}
        key="short">
        <div className="">SHORT</div>
      </div>
    </div>
  );
}

function QuantityTips(props: any) {
  const {
    isInsuffBalance,
    isAmountTooSmall,
    isAmountNegative,
    estPriceFluctuation,
    isFluctuationLimit,
    isPending,
    isLiquidatable,
    value
    //
  } = props;
  // price gap
  const isWrongNetwork = useNanostore(wsIsWrongNetwork);

  const isChecking = !isInsuffBalance && !isAmountTooSmall && !isPending && !estPriceFluctuation && !isLiquidatable;
  const isShow = value <= 0 || isChecking || isWrongNetwork || isAmountNegative;

  if (isShow) {
    return null;
  }

  const label = isPending ? (
    'Your previous transaction is pending, you can trade this collection again after the transaction is completed.'
  ) : isAmountTooSmall ? (
    'Minimum collateral size 0.01'
  ) : isInsuffBalance ? (
    <>
      Not enough WETH (including transaction fee).
      <a href="#" className="ml-1 text-white underline">
        Get WETH
      </a>{' '}
      first
    </>
  ) : isFluctuationLimit ? (
    'Transaction will fail due to high price impact of the trade. To increase the chance of executing the transaction, please reduce the notional size of your trade.'
  ) : isLiquidatable ? (
    'Resulting position DOES NOT meet the maintenance leverage requirement of 10x calculated based on Oracle Price.'
  ) : estPriceFluctuation ? (
    'Transaction might fail due to high price impact of the trade. To increase the chance of executing the transaction, please reduce the notional size of your trade.'
  ) : (
    ''
  );

  const isRedText = isInsuffBalance || isAmountTooSmall || isFluctuationLimit || isLiquidatable;
  return (
    <div className={`quantity-tips-container ${(!isInsuffBalance && estPriceFluctuation) || isPending ? 'price-fluc' : ''}`}>
      <div className={`${isRedText ? 'text-marketRed' : 'text-warn'} mb-2 text-[12px] leading-[20px]`}>{label}</div>
    </div>
  );
}

function QuantityEnter(props: any) {
  const {
    value,
    onChange,
    isInsuffBalance,
    isAmountTooSmall,
    estPriceFluctuation,
    isFluctuationLimit,
    isLiquidatable,
    isPending,
    disabled
  } = props;

  const isLoginState = useNanostore(wsIsLogin);
  const isWrongNetwork = useNanostore(wsIsWrongNetwork);
  const isApproveRequired = useNanostore(wsIsApproveRequired);
  const wethBalance = useNanostore(wsWethBalance);

  const [isFocus, setIsFocus] = useState(false);

  const handleEnter = (event: any) => {
    const { target } = event;
    const { value: inputValue } = target;

    const reg = /^\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '') {
      const decimalNumber = inputValue?.split('.')?.[1];
      if (decimalNumber?.length > 4) {
        return;
      }
      onChange(inputValue);
    }
  };

  // determine if input is valid or error state
  // const isValid = value > 0 && !isInsuffBalance && !isAmountTooSmall && !estPriceFluctuation;
  let isError = isAmountTooSmall || isInsuffBalance;
  if (value <= 0) {
    isError = false;
  }

  return (
    <>
      <div className={`mb-3 flex items-center ${disabled ? 'opacity-30' : ''}`}>
        <div className="flex-1 text-[14px] text-mediumEmphasis">Collateral</div>
        {isLoginState && !isWrongNetwork ? (
          <div className="font-14 text-color-secondary flex" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <div className="mr-1 flex flex-1">
              <Image alt="" src="/images/common/wallet-white.svg" height={16} width={16} />
            </div>
            <span className="text-[14px] text-[#ffffffde]">{`${Number(wethBalance).toFixed(4)} WETH`}</span>
            {/* get weth button. was: wethBalance <= 0 */}
            <button type="button" className="ml-[8px] text-[14px] text-primaryBlue">
              Get WETH
            </button>
          </div>
        ) : null}
      </div>
      {/* ${isError ? 'bg-marketRed' : ''} */}
      <div className="py-3">
        <div
          className={`trade-input-outline mb-3 rounded-[4px] bg-none p-[1px]
            ${isFocus ? 'valid' : ''}
            ${disabled ? 'opacity-30' : ''}
          `}>
          <div className="flex h-[48px] rounded-[4px] bg-mediumBlue p-3">
            <Image src="/images/common/symbols/eth-tribe3.svg" alt="" width={24} height={24} padding-right="12dp" className="betIcon" />
            <div className="ml-[4px] flex items-center justify-center">
              <span className="input-with-text text-[12px] font-semibold">WETH</span>
            </div>
            <input
              type="text"
              // pattern="[0-9]*"
              className={`${isApproveRequired ? 'cursor-not-allowed' : ''}
                w-full border-none border-mediumBlue bg-mediumBlue text-right
                text-[15px] font-semibold text-white outline-none
              `}
              value={value}
              placeholder="0.00"
              onChange={handleEnter}
              disabled={isApproveRequired || disabled}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              min={0}

              // onClick={e => {
              //   e.target.selectionStart = e.target.value.length;
              //   e.target.selectionEnd = e.target.value.length;
              // }}
            />
          </div>
        </div>
      </div>
      <QuantityTips
        isInsuffBalance={isInsuffBalance}
        isAmountTooSmall={isAmountTooSmall}
        estPriceFluctuation={estPriceFluctuation}
        isFluctuationLimit={isFluctuationLimit}
        isLiquidatable={isLiquidatable}
        value={value}
        isPending={isPending}
      />
    </>
  );
}

function LeverageComponent(props: any) {
  const { value, onChange, disabled } = props;

  const leverageMarks = Array(10)
    .fill(0)
    .reduce((pre, item, index) => ({ ...pre, [index + 1]: { style: { color: 'rgb(255, 255, 255)' }, label: `${index + 1}` } }), {});

  return (
    <>
      <div className={`flex items-center ${disabled ? 'opacity-30' : ''}`}>
        <div className="text-[14px] text-[#a3c2ff]">Leverage</div>
        <div className="flex-1 flex-shrink-0 text-right text-[14px] font-semibold">{`${value}x`}</div>
      </div>
      <div className="row">
        <div className="col mb-6 mt-3">
          <InputSlider
            disabled={disabled}
            defaultValue={1}
            value={value}
            min={1}
            max={10}
            step={0.1}
            onChange={onChange}
            marks={leverageMarks}
          />
        </div>
      </div>
    </>
  );
}

function DisplayValues(props: any) {
  const { title, value, unit = '', valueClassName = '', unitClassName = '', className = '' } = props;

  return (
    <div
      className={`${className !== '' ? className : ''}
      mb-[2px] flex items-center
    `}>
      <div className="text-[14px] text-mediumEmphasis">{title}</div>
      <div className={`flex-1 flex-shrink-0 text-right text-mediumEmphasis ${valueClassName}`}>
        <span className="text-[14px]">{value}</span> <span className={`text-[12px] ${unitClassName}`}>{unit}</span>
      </div>
    </div>
  );
}

function EstimatedValueDisplay(props: any) {
  const router = useRouter();
  const { page } = pageTitleParser(router.asPath);
  const { estimatedValue, toleranceRate, setToleranceRate, leverageValue, value, isInsuffBalance, isAmountTooSmall, disabled } = props;

  // const isEstimatedValueEmpty = Object.keys(estimatedValue).length === 0;
  const { fee } = estimatedValue;
  const { cost } = estimatedValue;
  const costInNumber = Number(formatterValue(cost, 4));
  const feeInNumber = Number(formatterValue(fee, 4));
  // const collateralCalc = isEstimatedValueEmpty ? 0 : cost.sub(feeInNumber);
  // const newCollateral = isEstimatedValueEmpty ? '-.--' : formatterValue(collateralCalc, 4);
  const sizeNotional = fee && cost && leverageValue ? ((costInNumber - feeInNumber) * Number(leverageValue))?.toFixed(4) : '-.--';
  const fullWalletAddress = useNanostore(wsFullWalletAddress);
  const currentToken = useNanostore(wsCurrentToken);

  // determine if input is valid or error state
  // const isValid = value > 0 && !isInsuffBalance && !isAmountTooSmall && !estPriceFluctuation;
  let isError = isAmountTooSmall || isInsuffBalance;
  if (value <= 0) {
    isError = false;
  }

  return (
    <>
      <div className="mb-3 flex items-center">
        <div className="font-14 text-color-secondary col-auto">
          <div className="text-[14px] text-mediumEmphasis">Slippage Tolerance</div>
          {/* tipsText="The maximum pricing difference between the price at the time of trade confirmation and the actual price of the transaction that the users are willing to acceptM" */}
        </div>
        <div className="flex flex-1 flex-shrink-0" style={{ display: 'flex', justifyContent: 'end' }}>
          <div
            className={`flex max-w-[100px] justify-end
            rounded-[4px] bg-mediumBlue px-[10px] py-1
            ${disabled ? 'opacity-30' : ''}`}>
            <input
              disabled={disabled}
              title=""
              type="text"
              // pattern="[0-9]*"
              className="w-[90%] border-none border-mediumBlue bg-mediumBlue text-right
                text-[15px] font-semibold outline-none"
              placeholder="0.0 "
              value={toleranceRate}
              onChange={e => {
                const { value: inputValue } = e.target;
                const reg = /^\d*(\.\d*)?$/;
                if (reg.test(inputValue) || inputValue === '') {
                  setToleranceRate(e.target.value);
                }
              }}
            />
            <span className="my-auto">%</span>
          </div>
        </div>
      </div>
      <DisplayValues
        title="Size (Notional)"
        value={isError || value <= 0 ? '-.--' : sizeNotional}
        unit="WETH"
        className="slipagerow"
        valueClassName="text-color-primary font-14-600"
        unitClassName="font-12"
      />
      {/* <DisplayValuesWithTooltips title="Transaction Fee" value={fee} unit="WETH" tipsText="0.5% of the notional amount of the trade" /> */}
      <div className="my-4 h-[1px] bg-[#2e3064]" />
      <div className="mb-4 flex items-center">
        <div className="text-[14px] text-mediumEmphasis">Total Balance Required</div>
        <div className="flex-1 flex-shrink-0 text-right">
          <span className=" text-[14px]">
            {isError || value <= 0 ? '-.--' : estimatedValue.cost ? formatterValue(estimatedValue.cost, 4, '') : '-.--'}
          </span>
          <span className="text-[12px]" style={{ marginLeft: 4 }}>
            WETH
          </span>
        </div>
      </div>
    </>
  );
}

function ConfirmButton(props: any) {
  const router = useRouter();
  const { page } = pageTitleParser(router.asPath);
  const {
    quantity,
    createTransaction,
    isInsuffBalance,
    isAmountTooSmall,
    setQuantity,
    setEstimatedValue,
    setEstPriceFluctuation,
    isFluctuationLimit,
    connectWallet,
    leverageValue,
    handleLeverageEnter,
    setToleranceRate,
    isPending,
    isWaiting
  } = props;

  const isLoginState = useNanostore(wsIsLogin);
  const isWrongNetwork = useNanostore(wsIsWrongNetwork);
  const isApproveRequired = useNanostore(wsIsApproveRequired);

  // const { isWethCollected, isWhitelisted, isDataFetch } = walletProvider;
  const isDataFetch = useNanostore(dataFetch);
  // const isWhitelisted = useNanostore(whitelisted);
  // const isWethCollected = useNanostore(wethCollected);
  // const isWethCollected = Number(walletProvider.wethBalance) !== 0;

  const [isProcessingOpenPos, setIsProcessingOpenPos] = useState(false);
  const isNormal = isLoginState && !isWrongNetwork && quantity > 0 && !isInsuffBalance && !isAmountTooSmall;
  const fullWalletAddress = useNanostore(wsFullWalletAddress);
  const currentToken = useNanostore(wsCurrentToken);

  // sync isProcessing to store/tradePanel
  useEffect(() => {
    tradePanel.setIsProcessing(isProcessingOpenPos);
  }, [isProcessingOpenPos]);

  const startOpenPosition = () => {
    setIsProcessingOpenPos(false);
    setQuantity('');
    setEstimatedValue({});
    setEstPriceFluctuation(false);
    handleLeverageEnter(1);
    setToleranceRate(0.5);
  };

  let disabled = !isNormal;
  if (!isLoginState || isWrongNetwork || /*! isWethCollected || */ isApproveRequired) {
    disabled = false;
  } else if (isWaiting) {
    disabled = true;
  } else if (isFluctuationLimit) {
    disabled = true;
  }

  const onClickButton = () => {
    if (!isLoginState) {
      connectWallet();
    } else if (isWrongNetwork) {
      // performSwitchGeorli();
      // } else if (!isWethCollected) {
      //   performGetWeth();
    } else if (isApproveRequired) {
      // performApprove();
    } else if (isNormal && !isProcessingOpenPos && !isPending && !disabled) {
      // connectContract();
    }
  };

  return (
    <div className="pb-6">
      <div className="flex">
        <div
          className={`${disabled || isPending ? 'opacity-30' : ''}
            flex h-[46px] w-full cursor-pointer items-center rounded-[4px] bg-primaryBlue
            px-[10px] py-[14px] text-center
          `}
          onClick={onClickButton}>
          <div className="w-full text-center text-[15px] font-semibold">
            {isProcessingOpenPos || isDataFetch ? (
              <div className="flex justify-center">
                <ThreeDots ariaLabel="loading-indicator" height={50} width={50} color="white" />
              </div>
            ) : !isLoginState ? (
              'Connect Wallet'
            ) : isWrongNetwork ? (
              'Switch to Arbitrum'
            ) : // ) : !isWethCollected ? (
            //   'Get WETH'
            isApproveRequired ? (
              'Approve'
            ) : (
              'Trade'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tips(props: any) {
  const isDataFetch = useNanostore(dataFetch);
  // const isWethCollected = Number(walletProvider.wethBalance) !== 0;
  const isWethCollected = false;
  const isLoginState = useNanostore(wsIsLogin);
  const isWrongNetwork = useNanostore(wsIsWrongNetwork);
  const isApproveRequired = useNanostore(wsIsApproveRequired);

  if ((isLoginState && !isWrongNetwork && !isApproveRequired) || isDataFetch) {
    return null;
  }
  const label = !isLoginState ? (
    'Please connect the wallets to trade !'
  ) : isWrongNetwork ? (
    'Wrong Network, please switch to Arbitrum!'
  ) : !isWethCollected ? (
    'Please get WETH first !'
  ) : isApproveRequired ? (
    <>
      Please approve before trading! <br />{' '}
      <a
        target="_blank"
        href="https://tribe3.gitbook.io/tribe3/getting-started/set-up-wallet-get-weth-and-start"
        rel="noreferrer"
        className="underline">
        Learn more
      </a>
    </>
  ) : (
    ''
  );

  return (
    <div
      className="mt-4 flex h-[16px] items-center text-[12px]
      font-normal leading-[16px] text-warn">
      <Image src="/images/common/info_warning_icon.svg" alt="" width={12} height={12} className="mr-2" />
      <span className="">{label}</span>
    </div>
  );
}

function ExtendedEstimateComponent(props: any) {
  const router = useRouter();
  const currentToken = useNanostore(wsCurrentToken);
  const { page } = pageTitleParser(router.asPath);
  const { estimatedValue, value, isAmountTooSmall, isInsuffBalance } = props;
  const [showDetail, isShowDetail] = useState(false);
  // const targetCollection = collectionList.filter(({ collection }) => collection === currentToken);
  // const { collectionType: currentType } = targetCollection.length !== 0 ? targetCollection[0] : collectionList[0];
  const exposure = formatterValue(estimatedValue.exposure, 4);
  const isNewPosition = 'newPosition' in estimatedValue;
  const fee = formatterValue(estimatedValue.fee, 4);
  const fullWalletAddress = useNanostore(wsFullWalletAddress);
  const userPosition: any = useNanostore(wsUserPosition);
  const elementRef = useRef(null);

  // hide component when there is no estimatedValue
  if (!estimatedValue || !estimatedValue.cost) return null;

  // determine if input is valid or error state
  let isError = isAmountTooSmall || isInsuffBalance;
  if (value <= 0) {
    isError = false;
  }
  if (isError || value <= 0) return null;

  return (
    <div className="pb-6">
      <div
        className="flex cursor-pointer text-[14px] font-semibold text-primaryBlue hover:text-[#6286e3]"
        onClick={() => {
          isShowDetail(!showDetail);

          if (!showDetail) {
            // if (elementRef.current) {
            //   const ref: any = elementRef.current;
            //   ref.scrollIntoView();
            // }
            // window.scrollTo({
            //   top: 3000,
            //   behavior: 'smooth'
            // });
            window.scrollTo({
              top: 100000,
              behavior: 'auto'
              /* you can also use 'auto' behaviour 
                 in place of 'smooth' */
            });
          }
        }}>
        {showDetail ? 'Hide' : 'Show'} Advanced Details
        {showDetail ? (
          <Image src="/images/common/angle_up.svg" className="mr-2" alt="" width={12} height={12} />
        ) : (
          <Image src="/images/common/angle_down.svg" className="mr-2" alt="" width={12} height={12} />
        )}
      </div>

      {showDetail ? (
        <div className="">
          {userPosition != null ? (
            <>
              <div className="row">
                <div className="mb-1 mt-4 text-[14px] font-semibold text-white underline">Estimated Blended Position</div>
              </div>
              {/* <DisplayValues
                title="Position Type"
                value={isNewPosition ? (estimatedValue.newPosition.type === 'long' ? 'Long' : 'Short') : '---'}
                unit=""
              /> */}
              {/* <DisplayValues
                title="Contract Size"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.size, 4) : '-.--'}
                unit={currentType}
              /> */}
              <DisplayValues
                title="Notional"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.marketValue, 4) : '-.--'}
                unit="WETH"
              />
              <DisplayValues
                title="Collateral"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.newRemainMargin, 4) : '-.--'}
                unit="WETH"
              />
              <DisplayValues
                title="Average Entry Price"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.entryPrice, 2) : '-.--'}
                unit="WETH"
              />
              {/* <DisplayValues
              title="Collateral Ratio"
              value={isNewPosition ? formatterValue(estimatedValue.newPosition.marginRatio, 2) : '-.--'}
              unit="%"
            /> */}
              <DisplayValues
                title="Leverage"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.leverage, 2) : '-.--'}
                unit="x"
              />
              <DisplayValues
                title="Liquidation Price"
                value={isNewPosition ? formatterValue(estimatedValue.newPosition.liquidationPrice, 2) : '-.--'}
                unit="WETH"
              />
            </>
          ) : null}

          <div className="row">
            <div className="mb-2 mt-4 text-[14px] font-semibold text-white underline">
              Transaction Details
              {/* {userPosition != null ? '(Standalone Basis)' : null} */}
            </div>
          </div>
          {/* <DisplayValues title="Estimated Exposure" value={exposure} unit={currentType} /> */}
          <DisplayValues title="Transaction Fee" value={fee} unit="WETH" />
          <DisplayValues title="Entry Price" value={formatterValue(estimatedValue.entryPrice, 2)} unit="WETH" />
          <DisplayValues title="Price Impact" value={formatterValue(estimatedValue.priceImpact, 2)} unit="%" />
          {userPosition != null ? null : (
            <DisplayValues
              title="Liquidation Price"
              value={isNewPosition ? formatterValue(estimatedValue.newPosition.liquidationPrice, 2) : '-.--'}
              unit="WETH"
            />
          )}
          <div ref={elementRef} />
        </div>
      ) : null}
    </div>
  );
}

export default function TradeComponent(props: any) {
  const router = useRouter();
  const { page } = pageTitleParser(router.asPath);
  const { refreshPositions, connectWallet, tradingData } = props;
  const [saleOrBuyIndex, setSaleOrBuyIndex] = useState(0);
  const [quantity, setQuantity] = useState('0');
  const [estimatedValue, setEstimatedValue] = useState({});
  const [exposureValue, setExposureValue] = useState(0);
  const [toleranceRate, setToleranceRate] = useState(0.5);
  const [estPriceFluctuation, setEstPriceFluctuation] = useState(false);
  const [isFluctuationLimit, setIsFluctuationLimit] = useState(false);
  const [isLiquidatable, setIsLiquidatable] = useState(false);
  const [leverageValue, setLeverageValue] = useState(1);
  const [isAmountTooSmall, setIsAmountTooSmall] = useState(false);
  const [isInsuffBalance, setIsInsuffBalance] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState('');
  const [textErrorMessageShow, setTextErrorMessageShow] = useState(false);
  const isProcessing = useNanostore(tradePanel.processing);
  const [isPending, setIsPending] = useState(false);
  // const collectionIsPending = useNanostore(collectionsLoading.collectionsLoading);
  const [isWaiting, setIsWaiting] = useState(false); // waiting value for getting estimated value

  const vAMMPrice = !tradingData.spotPrice ? 0 : Number(utils.formatEther(tradingData.spotPrice));
  const oraclePrice = !tradingData.twapPrice ? 0 : Number(utils.formatEther(tradingData.twapPrice));
  const priceGap = vAMMPrice && oraclePrice ? vAMMPrice / oraclePrice - 1 : 0;
  const priceGapLmt = useNanostore(priceGapLimit);
  const isLoginState = useNanostore(wsIsLogin);
  const isWrongNetwork = useNanostore(wsIsWrongNetwork);
  const wethBalance = useNanostore(wsWethBalance);
  const isApproveRequired = useNanostore(wsIsApproveRequired);
  const fullWalletAddress = useNanostore(wsFullWalletAddress);
  const currentToken = useNanostore(wsCurrentToken);
  const userPosition: any = useNanostore(wsUserPosition);

  // price gap
  const isGapAboveLimit = priceGapLmt ? Math.abs(priceGap) >= priceGapLmt : false;

  const calculateEstimation = async (wethBal: any, value: any) => {
    setIsWaiting(true);
    const calc = Number(value);
    // const result = await walletProvider.calculateEstimationValue(saleOrBuyIndex, calc, leverageValue);
    // setEstimatedValue(result);
    // setExposureValue(result.exposure);
    // setIsWaiting(false);

    // const costInNumber = Number(utils.formatEther(result.cost?.toString()));
    // if (wethBal < costInNumber) {
    //   setIsInsuffBalance(true);
    // }

    // if (Math.abs(Number(formatterValue(result.priceImpact, 2))) > 2.0) {
    //   setIsFluctuationLimit(true);
    // } else {
    //   setIsFluctuationLimit(false);
    // }

    // if (isGapAboveLimit && result.newPosition?.isLiquidatable) {
    //   setIsLiquidatable(true);
    // } else {
    //   setIsLiquidatable(false);
    // }

    // if (Number(formatterValue(result.priceImpact, 2)) <= 0.6 && Number(formatterValue(result.priceImpact, 2)) >= -0.6) {
    //   setEstPriceFluctuation(false);
    // } else {
    //   setEstPriceFluctuation(true);
    // }
  };

  // const debouncedCalculateEstimation = useCallback(debounce(calculateEstimation, 300), []);
  // const debouncedCalculateEstimation = calculateEstimation;

  const handleEnter = async (value: any) => {
    setQuantity(value);
    setTextErrorMessage('');
    setTextErrorMessageShow(false);
    setEstPriceFluctuation(false);
    setIsAmountTooSmall(false);
    setIsInsuffBalance(false);
    setIsLiquidatable(false);

    // if (walletProvider.provider === null || Number(value) === 0 || !value) {
    //   setEstimatedValue({});
    //   setEstPriceFluctuation(false);
    //   return;
    // }

    if (Number(value) < 0.01) {
      setIsAmountTooSmall(true);
      setEstimatedValue({});
      setEstPriceFluctuation(false);
      return;
    }

    if (wethBalance < Number(value)) {
      setIsInsuffBalance(true);
      setEstimatedValue({});
      setEstPriceFluctuation(false);
      return;
    }

    // if (collectionIsPending[walletProvider?.currentTokenAmmAddress]) {
    //   await collectionsLoading.getCollectionsLoading(walletProvider?.currentTokenAmmAddress);
    //   if (collectionIsPending[walletProvider?.currentTokenAmmAddress]) {
    //     setIsPending(!!collectionIsPending[walletProvider?.currentTokenAmmAddress]);
    //     return;
    //   }
    // } else setIsPending(false);

    await calculateEstimation(wethBalance, value);
  };

  // const debouncedHandleEnter = useCallback(debounce(loggingg, 200), []);

  useEffect(() => {
    if (!isLoginState && isInsuffBalance) {
      setIsInsuffBalance(false);
    }
  }, [isLoginState, isInsuffBalance]);

  const calculateLeverageEnter = async (qty: any, sbIndex: any, lvrg: any) => {
    setIsWaiting(true);
    const updatedCollateral = Number(qty);
    // const result = await walletProvider.calculateEstimationValue(sbIndex, updatedCollateral, lvrg);
    // setEstimatedValue(result);
    // setExposureValue(result.exposure);
    // setIsWaiting(false);

    // const costInNumber = Number(utils.formatEther(result.cost?.toString()));
    // if (wethBalance < costInNumber) {
    //   setIsInsuffBalance(true);
    // }

    // if (Math.abs(Number(formatterValue(result.priceImpact, 2))) > 2.0) {
    //   setIsFluctuationLimit(true);
    // } else {
    //   setIsFluctuationLimit(false);
    // }

    // if (isGapAboveLimit && result.newPosition?.isLiquidatable) {
    //   setIsLiquidatable(true);
    // } else {
    //   setIsLiquidatable(false);
    // }

    // if (Number(formatterValue(result.priceImpact, 2)) <= 0.6 && Number(formatterValue(result.priceImpact, 2)) >= -0.6) {
    //   setEstPriceFluctuation(false);
    // } else {
    //   setEstPriceFluctuation(true);
    // }
  };

  // const debouncedcalculateLeverageEnter = useCallback(debounce(calculateLeverageEnter, 500), []);

  const handleLeverageEnter = async function handleLeverageEnter(leverage: any) {
    setLeverageValue(leverage);
    setTextErrorMessage('');
    setTextErrorMessageShow(false);
    setEstPriceFluctuation(false);
    setIsLiquidatable(false);
    setIsAmountTooSmall(false);
    setIsInsuffBalance(false);
    // if (walletProvider.provider === null || Number(quantity) === 0 || quantity === '') {
    //   setEstimatedValue({});
    //   setEstPriceFluctuation(false);
    //   return;
    // }

    if (Number(quantity) < 0.01) {
      setIsAmountTooSmall(true);
      setEstimatedValue({});
      setEstPriceFluctuation(false);
      return;
    }

    if (wethBalance < Number(quantity)) {
      setIsInsuffBalance(true);
      setEstimatedValue({});
      setEstPriceFluctuation(false);
      return;
    }

    // if (collectionIsPending[walletProvider?.currentTokenAmmAddress]) {
    //   await collectionsLoading.getCollectionsLoading(walletProvider?.currentTokenAmmAddress);
    //   if (collectionIsPending[walletProvider?.currentTokenAmmAddress]) {
    //     setIsPending(!!collectionIsPending[walletProvider?.currentTokenAmmAddress]);
    //     return;
    //   }
    // } else setIsPending(false);

    await calculateLeverageEnter(quantity, saleOrBuyIndex, leverage);
  };

  const createTransaction = async function createTransaction(startTransaction = () => {}) {
    // walletProvider
    //   .createTransaction(
    //     saleOrBuyIndex,
    //     Number(quantity) * leverageValue,
    //     leverageValue,
    //     toleranceRate,
    //     exposureValue,
    //     userPosition ? 'Add Position' : 'Open Position',
    //     startTransaction
    //   )
    //   .then(() => {
    //     // setQuantity('');
    //     // prevent refreshing when page has changed
    //     // if (currentToken === processToken) {
    //     refreshPositions();
    //     // }
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //     // set trade modal message and show
    //     if (error?.error && error.error?.message && error.error?.type === 'modal') {
    //       error?.error.showToast();
    //       // tradePanelModal.setMessage(error.error.message);
    //       // tradePanelModal.setIsShow(true);
    //     }
    //     if (error?.error && error.error?.message && error.error?.type === 'text') {
    //       setTextErrorMessage(error?.error?.message);
    //       setTextErrorMessageShow(true);
    //     }
    //   });
  };

  useEffect(() => {
    if (userPosition) {
      setSaleOrBuyIndex(userPosition.size < 0 ? 1 : 0);
    }
    if (isPending) {
      handleEnter(quantity);
    }
  }, [userPosition]);

  useEffect(() => {
    // set error message under button
    setTextErrorMessage('');
    setTextErrorMessageShow(true);

    setQuantity('');
    setEstimatedValue({});
    setLeverageValue(1);
  }, [currentToken, saleOrBuyIndex]); // from tokenRef.current

  // useEffect(() => {
  //   if (isPending) {
  //     handleEnter(quantity);
  //   }
  // }, [collectionIsPending[walletProvider?.currentTokenAmmAddress]]);

  useEffect(() => {
    setTextErrorMessage('');
    setTextErrorMessageShow(true);

    setQuantity('');
    setEstimatedValue({});
    setLeverageValue(1);
  }, [fullWalletAddress]);

  return (
    <div>
      <LongShortRatio
        saleOrBuyIndex={saleOrBuyIndex}
        setSaleOrBuyIndex={setSaleOrBuyIndex}

        // tokenRef={tokenRef}
      />
      <QuantityEnter
        disabled={isProcessing || isWrongNetwork}
        value={quantity}
        onChange={(value: any) => {
          handleEnter(value);
        }}
        isInsuffBalance={isInsuffBalance}
        isAmountTooSmall={isAmountTooSmall}
        estPriceFluctuation={estPriceFluctuation}
        isFluctuationLimit={isFluctuationLimit}
        isPending={isPending}
        isLiquidatable={isLiquidatable}
      />
      <LeverageComponent
        disabled={isProcessing || isWrongNetwork}
        value={leverageValue}
        setValue={setLeverageValue}
        onChange={(value: any) => {
          handleLeverageEnter(value);
        }}
      />
      <div className="row">
        <div className="col">
          <div className="mb-6 h-[1px] bg-[#2e3064]" />
        </div>
      </div>
      <EstimatedValueDisplay
        disabled={isProcessing || isWrongNetwork}
        estimatedValue={estimatedValue}
        toleranceRate={toleranceRate}
        setToleranceRate={setToleranceRate}
        setIsInsuffBalance={setIsInsuffBalance}
        // tokenRef={tokenRef}
        leverageValue={leverageValue}
        value={quantity}
        isInsuffBalance={isInsuffBalance}
        isAmountTooSmall={isAmountTooSmall}
        estPriceFluctuation={estPriceFluctuation}
      />
      <ConfirmButton
        quantity={quantity}
        createTransaction={createTransaction}
        isInsuffBalance={isInsuffBalance}
        isAmountTooSmall={isAmountTooSmall}
        // tokenRef={tokenRef}
        setQuantity={setQuantity}
        setEstimatedValue={setEstimatedValue}
        setEstPriceFluctuation={setEstPriceFluctuation}
        isFluctuationLimit={isFluctuationLimit}
        connectWallet={connectWallet}
        leverageValue={leverageValue}
        handleLeverageEnter={handleLeverageEnter}
        setToleranceRate={setToleranceRate}
        isPending={isPending}
        isWaiting={isWaiting}
      />
      {textErrorMessageShow && isLoginState && !isWrongNetwork && !isApproveRequired && !isInsuffBalance ? (
        <p className="font-12 text-color-warning">{textErrorMessage}</p>
      ) : null}
      <Tips isInsuffBalance={isInsuffBalance} />
      <ExtendedEstimateComponent
        estimatedValue={estimatedValue}
        // tokenRef={tokenRef}
        leverageValue={leverageValue}
        value={quantity}
        isAmountTooSmall={isAmountTooSmall}
        isInsuffBalance={isInsuffBalance}
      />
    </div>
  );
}
