/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { showToast } from '@/components/common/Toast';
import BaseButton from '@/components/trade/common/actionBtns/BaseButton';
import { useClosePositionTransaction } from '@/hooks/trade';
import { useStore as useNanostore } from '@nanostores/react';
import { $currentAmm, $tsTransactionStatus } from '@/stores/trading';
import { getCollectionInformation } from '@/const/collectionList';
import { TradeActions } from '@/const';
import { $isMobileView } from '@/stores/modal';

function ClosePosButton({
  isEstimating,
  slippagePercent,
  onPending,
  onSuccess,
  onError
}: {
  isEstimating: boolean;
  slippagePercent: number;
  onPending: () => void;
  onSuccess: () => void;
  // eslint-disable-next-line no-unused-vars
  onError: (error: Error | null, isPrepareError: boolean) => void;
}) {
  const currentAmm = useNanostore($currentAmm);
  const collectionInfo = getCollectionInformation(currentAmm);
  const [isLoading, setIsLoading] = useState(false);
  const isMobileView = useNanostore($isMobileView);

  const { write, isError, error, isPrepareError, isPreparing, isPending, isSuccess, txHash } = useClosePositionTransaction(slippagePercent);

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
    onError(isError ? error : null, isPrepareError);
  }, [isError, error, onError]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
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
    if (isPending) {
      if (!isMobileView) {
        showToast(
          {
            warning: true,
            title: `${collectionInfo.shortName} - ${TradeActions.CLOSE}`,
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
  }, [isPending, onPending, collectionInfo.shortName, txHash]);

  useEffect(() => {
    if (isError && !isMobileView) {
      if (String(error).includes('RPC')) {
        showToast(
          {
            error: true,
            title: `${collectionInfo.shortName} - ${TradeActions.CLOSE}`,
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

  return (
    <BaseButton
      disabled={!write}
      isLoading={isLoading || isPreparing || isPending || isEstimating}
      onClick={() => {
        onPending();
        setIsLoading(true);
        write?.();
      }}
      label="Close Position"
    />
  );
}

export default ClosePosButton;