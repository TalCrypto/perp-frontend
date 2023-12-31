import { WETH_INSUFFICIENT } from '@/const/errorList';
import { $showGetWEthModal } from '@/stores/modal';
import React from 'react';

export const ErrorTip = ({ label }: { label: string | null }) => {
  if (!label) return null;

  return (
    <div className="mb-3 text-[12px] leading-[16px] text-marketRed">
      {label !== WETH_INSUFFICIENT ? (
        label
      ) : (
        <>
          Not enough WETH (including transaction fee).
          <br />
          <span onClick={() => $showGetWEthModal.set(true)} className="cursor-pointer text-white underline">
            Get WETH
          </span>{' '}
          first
        </>
      )}
    </div>
  );
};
