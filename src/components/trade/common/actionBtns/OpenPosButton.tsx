/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { showToast } from '@/components/common/Toast';
import BaseButton from '@/components/trade/common/actionBtns/BaseButton';
import { OpenPositionEstimation, Side, useOpenPositionTransaction } from '@/hooks/trade';
import { useStore as useNanostore } from '@nanostores/react';
import {
  $currentAmm,
  $tsIsContinueClose,
  $tsIsFirstPartialClose,
  $tsIsShowPartialCloseModal,
  $tsTransactionStatus
} from '@/stores/trading';
import { getCollectionInformation } from '@/const/collectionList';
import { usePositionInfo } from '@/hooks/collection';
import { TradeActions } from '@/const';
import { $isMobileView } from '@/stores/modal';

function OpenPosButton({
  isEstimating,
  side,
  notionalAmount,
  leverage,
  slippagePercent,
  estimation,
  onPending,
  onSuccess,
  onError
}: {
  isEstimating: boolean;
  side: Side;
  notionalAmount: number;
  leverage: number;
  slippagePercent: number;
  estimation: OpenPositionEstimation | undefined;
  onPending: () => void;
  onSuccess: () => void;
  // eslint-disable-next-line no-unused-vars
  onError: (error: Error | null, isPrepareError: boolean) => void;
}) {
  const currentAmm = useNanostore($currentAmm);
  const collectionInfo = getCollectionInformation(currentAmm);
  const positionInfo = usePositionInfo(currentAmm);
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const isMobileView = useNanostore($isMobileView);

  const sideDisplay = side === 0 ? 'LONG' : 'SHORT';
  const sideDisplayLabel = side === 0 ? 'Long' : 'Short';

  const [isPartialClose, setIsPartialClose] = useState(false);
  const isFirstPartialClose = useNanostore($tsIsFirstPartialClose);
  const isShowPartialCloseModal = useNanostore($tsIsShowPartialCloseModal);
  const isContinueClose = useNanostore($tsIsContinueClose);

  useEffect(() => {
    if (positionInfo) {
      const posType =
        positionInfo.size === 0
          ? `${TradeActions.OPEN} ${sideDisplay}`
          : (-1) ** side * positionInfo.size > 0
          ? `${TradeActions.ADD}`
          : `${TradeActions.REDUCE}`;
      setLabel(posType);

      const buttonLabelTemp =
        positionInfo.size === 0
          ? `${TradeActions.OPEN} ${sideDisplayLabel}`
          : (-1) ** side * positionInfo.size > 0
          ? `${TradeActions.ADD} Position`
          : `Close Position`;
      setButtonLabel(buttonLabelTemp);

      setIsPartialClose(posType === `${TradeActions.REDUCE}`);
    }
  }, [positionInfo, side]);

  useEffect(() => {
    setIsLoading(false);
  }, [currentAmm]);

  const { write, isError, error, isPrepareError, isPreparing, isPending, isSuccess, txHash } = useOpenPositionTransaction({
    side,
    notionalAmount,
    leverage,
    slippagePercent,
    estimation
  });

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
    onError(isError ? error : null, isPrepareError);
  }, [isError, error, onError]);

  useEffect(() => {
    // alert(`openPos isSuccess: ${isSuccess}, isMobileView: ${isMobileView}, txHash: ${txHash}`);
    if (isSuccess) {
      onSuccess();
      // alert(`openPos isMobileView: ${isMobileView}, txHash: ${txHash}`);
      if (isMobileView && txHash) {
        $tsTransactionStatus.set({
          isShow: true,
          isSuccess: true,
          linkUrl: `${process.env.NEXT_PUBLIC_TRANSACTIONS_DETAILS_URL}${txHash}`
        });
      }
      setIsLoading(false);
    }
  }, [isSuccess, txHash, onSuccess]);

  useEffect(() => {
    if (isPending && txHash) {
      if (!isMobileView) {
        showToast(
          {
            warning: true,
            title: `${collectionInfo.shortName} - ${label}`,
            message: 'Order Received!',
            linkUrl: `${process.env.NEXT_PUBLIC_TRANSACTIONS_DETAILS_URL}${txHash}`,
            linkLabel: 'Check on Arbiscan'
          },
          {
            autoClose: 5000,
            hideProgressBar: true
          }
        );
      }
    }
  }, [isPending, label, txHash]);

  useEffect(() => {
    if (isError && !isMobileView) {
      if (String(error).includes('RPC') || String(error).includes('CH_RM')) {
        showToast(
          {
            error: true,
            title: `${collectionInfo.shortName} - ${label}`,
            message: 'Your transaction has failed due to network error. Please try again.',
            linkUrl: `${process.env.NEXT_PUBLIC_TRANSACTIONS_DETAILS_URL}${txHash}`,
            linkLabel: 'Check on Arbiscan'
          },
          {
            autoClose: 5000,
            hideProgressBar: true
          }
        );
      }
    }

    if (isError && isMobileView) {
      if (String(error).includes('rejected')) {
        $tsTransactionStatus.set({
          isShow: true,
          isSuccess: false,
          linkUrl: ''
        });
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isPartialClose && isContinueClose) {
      onPending();
      setIsLoading(true);
      write?.();
      $tsIsContinueClose.set(false);
    }
  }, [isShowPartialCloseModal, isContinueClose]);

  const handleOnClick = () => {
    if (isPartialClose && isFirstPartialClose) {
      $tsIsShowPartialCloseModal.set(true);
    } else if (!isPartialClose || !isShowPartialCloseModal) {
      onPending();
      setIsLoading(true);
      write?.();
    }
  };

  return (
    <BaseButton
      disabled={!write}
      isLoading={isLoading || isPreparing || isPending || isEstimating}
      onClick={handleOnClick}
      label={buttonLabel}
    />
  );
}

export default OpenPosButton;
