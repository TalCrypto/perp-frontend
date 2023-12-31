/* eslint-disable no-unused-vars */
import React from 'react';
import { useStore as useNanostore } from '@nanostores/react';
import Image from 'next/image';
import PrimaryButton from '@/components/common/PrimaryButton';
import { $userIsConnected } from '@/stores/user';
import { useWeb3Modal } from '@web3modal/react';
import { useConnect, useSwitchNetwork } from 'wagmi';
import { DEFAULT_CHAIN } from '@/const/supportedChains';
import { $showSwitchNetworkErrorModal, $isShowMobileTncModal } from '@/stores/modal';

function PortfolioEmpty() {
  const isConnected = useNanostore($userIsConnected);
  const { open } = useWeb3Modal();
  const { switchNetwork } = useSwitchNetwork();
  const { connect, connectors } = useConnect();

  const onClickConnect = () => {
    const localStorageTncApproved = localStorage.getItem('isTncApproved') === 'true';
    if (!localStorageTncApproved) {
      $isShowMobileTncModal.set(true);
      return;
    }

    // let isInjected = false;

    // for (let i = 0; i < connectors.length; i += 1) {
    //   const connector = connectors[i];
    //   if (connector?.name.toLowerCase().includes('metamask')) {
    //     connect({ connector });
    //     isInjected = true;
    //     break;
    //   }
    // }

    // if (!isInjected) {
    //   open();
    // }
    open();
  };

  const updateTargetNetwork = () => {
    if (switchNetwork) {
      switchNetwork(DEFAULT_CHAIN.id);
    } else {
      $showSwitchNetworkErrorModal.set(true);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-50px)] w-full items-center justify-center">
      {!isConnected ? (
        <div>
          <div className="mb-6 flex items-center justify-center">
            <Image src="/images/components/portfolio/logo.svg" width={72} height={72} alt="" />
          </div>
          <div className="text-center text-[14px] text-highEmphasis">
            Please connect to your <br />
            wallet to get started.
          </div>

          <div className="absolute bottom-[25px] left-0 w-full px-5">
            <PrimaryButton className="py-2 text-[15px] font-semibold" onClick={onClickConnect}>
              Connect Wallet
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="mb-6 flex items-center justify-center">
              <Image src="/images/components/portfolio/logo.svg" width={72} height={72} alt="" />
            </div>
            <div className="text-center text-[14px] text-highEmphasis">
              You’re not connected to the <br />
              Arbitrum network, please proceed to <br />
              switch to Arbitrum.
              <br />
            </div>

            <div className="absolute bottom-[25px] left-0 w-full px-5">
              <PrimaryButton className="py-2 text-[15px] font-semibold" onClick={updateTargetNetwork}>
                Switch to Arbitrum
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioEmpty;
