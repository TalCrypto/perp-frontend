/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { showToast } from '@/components/common/Toast';
import BaseButton from '@/components/trade/common/actionBtns/BaseButton';
import { useApproveTransaction } from '@/hooks/trade';
import { $isShowApproveModal, $isMobileView } from '@/stores/modal';
import { useStore as useNanostore } from '@nanostores/react';
import { $userWethBalance } from '@/stores/user';
// import { useStore as useNanostore } from '@nanostores/react';
// import { $currentAmm } from '@/stores/trading';
// import { getCollectionInformation } from '@/const/collectionList';

function ApproveButton({
  isEstimating,
  approvalAmount,
  onPending,
  onSuccess,
  onError
}: {
  isEstimating: boolean;
  approvalAmount: number;
  onPending: () => void;
  onSuccess: () => void;
  // eslint-disable-next-line no-unused-vars
  onError: (error: Error | null, isPrepareError: boolean) => void;
}) {
  if (approvalAmount < 0) throw new Error('invalid prop');
  // const currentAmm = useNanostore($currentAmm);
  // const collectionInfo = getCollectionInformation(currentAmm);
  const [isLoading, setIsLoading] = useState(false);
  const isMobileView = useNanostore($isMobileView);
  const wethBalance = useNanostore($userWethBalance);
  const isInsuffBalance = wethBalance < approvalAmount;

  const { write, isError, error, isPrepareError, isPreparing, isPending, isSuccess /* txHash */ } = useApproveTransaction();

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
    onError(isError ? error : null, isPrepareError);
  }, [isError, error, onError]);

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (!isMobileView) {
      if (isLoading) {
        $isShowApproveModal.set(true);
      } else {
        $isShowApproveModal.set(false);
      }

      if (isError) {
        $isShowApproveModal.set(false);
      }

      if (isPending) {
        $isShowApproveModal.set(false);
      }
    }
  }, [isError, isPending, isLoading, isMobileView]);

  return (
    <BaseButton
      disabled={(!write && approvalAmount > 0) || isInsuffBalance}
      isLoading={isLoading || isPreparing || isPending || isEstimating}
      onClick={() => {
        onPending();
        setIsLoading(true);
        write?.();
      }}
      label="Approve"
    />
  );
}

export default ApproveButton;
