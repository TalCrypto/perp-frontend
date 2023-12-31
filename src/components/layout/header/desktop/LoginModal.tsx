import React, { useState } from 'react';
import Image from 'next/image';
import { useStore as useNanostore } from '@nanostores/react';
import { useWeb3Modal } from '@web3modal/react';
import { useConnect } from 'wagmi';
import { useRouter } from 'next/router';
import WrongSwitch from 'react-switch'; // TS has an issue with the return type
import { $isShowLoginModal } from '@/stores/modal';

const Switch = WrongSwitch as any;

interface Platform {
  title: string;
  icon: string;
  desc: string;
  isApproved: boolean;
  redirect: () => void;
}

const PlatformButton: React.FC<Platform> = ({ title, icon, desc, isApproved = false, redirect }) => (
  <div className="relative z-[2] mt-[12px] w-[100%]">
    {!isApproved ? <div className="absolute bottom-0 left-0 right-0 top-0 z-[5] bg-[#171833bf]" /> : null}
    <div
      className={`relative flex min-h-[110px] cursor-pointer
    flex-col items-center justify-center space-y-[6px] rounded-[4px] border-[1px]
    border-[#2574FB] py-[6px] hover:bg-[#2574fb33]`}
      onClick={redirect}>
      <Image src={icon} width={24} height={24} alt="" />
      <div className="text-[16px] font-[600] text-[#fff] ">{title}</div>
      <div className="text-[12px] font-[400] text-[#fff]">{desc}</div>
    </div>
  </div>
);

export default function LoginModal() {
  const [switchSelected, setSwitchSelected] = useState(false);

  const isShowLoginModal = useNanostore($isShowLoginModal);
  const { open } = useWeb3Modal();
  const { connect, connectors } = useConnect();
  const localStorageTncApproved = localStorage.getItem('isTncApproved') === 'true';
  const isTncApproved = localStorageTncApproved || switchSelected;
  const router = useRouter();

  if (!isShowLoginModal) return null;

  const closeModal = () => {
    $isShowLoginModal.set(false);
  };

  const setTncLocal = () => {
    localStorage.setItem('isTncApproved', 'true');
  };

  const redirectMetamask = () => {
    setTncLocal();
    const connector = connectors[1];
    connect({ connector });
    closeModal();
  };

  const redirectWalletConnect = () => {
    setTncLocal();
    closeModal();
    open();
  };

  const handleChange = () => {
    setSwitchSelected(!switchSelected);
  };

  const redirectTnc = () => {
    window.open('/terms', '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-20 flex h-screen items-center
        justify-center overflow-auto bg-black bg-opacity-40"
      onClick={closeModal}>
      <div
        className="relative my-[36px] w-[500px] rounded-xl bg-lightBlue px-[16px] py-[16px]
          text-[14px] font-normal leading-normal"
        onClick={e => e.stopPropagation()}>
        <div className="items-initial flex content-center justify-end">
          <Image
            src="/images/components/common/modal/close.svg"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="relative flex flex-col items-start justify-center px-[20px] pb-[20px]">
          <div className="mb-[12px]">
            <div className="text-[15px] font-semibold text-highEmphasis">Connect Your Wallet👇</div>
          </div>
          {!localStorageTncApproved ? (
            <div className="mb-[12px] flex flex-row items-center text-[12px] font-[400] text-[#fff]">
              <Switch
                onChange={handleChange}
                checked={switchSelected}
                className="react-switch mr-[6px]"
                handleDiameter={12}
                width={32}
                height={16}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#2574fb"
              />
              I accept the&nbsp;
              <span className="cursor-pointer font-[600] underline" onClick={redirectTnc}>
                Terms & Conditions
              </span>
              &nbsp;of Tribe3.
            </div>
          ) : null}
          <PlatformButton
            icon="/icons/providers/metamask.png"
            title="Metamask"
            desc="Connect to your Metamask Wallet."
            redirect={redirectMetamask}
            isApproved={isTncApproved}
          />
          <PlatformButton
            icon="/icons/providers/okx.png"
            title="OKX Wallet"
            desc="Connect to your OKX Wallet."
            redirect={redirectMetamask}
            isApproved={isTncApproved}
          />
          <PlatformButton
            icon="/icons/providers/walletconnect.png"
            title="WalletConnect"
            desc="Scan with WalletConnect to connect."
            redirect={redirectWalletConnect}
            isApproved={isTncApproved}
          />
        </div>
        <Image
          src="/images/components/common/modal/modal-logo.svg"
          width={170}
          height={165}
          alt=""
          className="absolute bottom-0 right-0 mr-3 flex items-end"
        />
      </div>
    </div>
  );
}
