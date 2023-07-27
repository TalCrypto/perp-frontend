/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopMenu from '@/components/layout/header/desktop/TopMenu';
import Web3Area from '@/components/layout/header/desktop/Web3Area';
import WidgetBot from '@widgetbot/react-embed';
import { $isMobileView, $isShowDiscordModal } from '@/stores/modal';
import { useStore as useNanostore } from '@nanostores/react';
import { firebaseAuth } from '@/const/firebaseConfig';
// import MobileHeader from '@/components/layout/header/mobile';

function Header() {
  const [isCompleteLoading, setIsCompleteLoading] = useState(false);
  const [localDiscordKey, setLocalDiscordKey] = useState(false);
  const isMobileView = useNanostore($isMobileView);

  const isShowDiscordModal = useNanostore($isShowDiscordModal);

  useEffect(() => {
    setIsCompleteLoading(true);

    const localStorageDiscord = localStorage.getItem('isDiscordShown');
    if (!localStorageDiscord || localStorageDiscord === null) {
      localStorage.setItem('isDiscordShown', 'false');
      setLocalDiscordKey(false);
    } else if (localStorageDiscord === 'true') {
      setLocalDiscordKey(true);
    }
  }, []);

  const closeDiscord = () => {
    $isShowDiscordModal.set(false);
    localStorage.setItem('isDiscordShown', 'false');
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-20 hidden
        w-full shadow-md backdrop-blur-3xl md:block">
        <div className="navbar content-container px-0">
          <div className="flex">
            <Link href="/trade/degods">
              <div className="relative mr-[24px] flex h-full min-w-[93px] cursor-pointer items-center">
                <Image src="/images/logos/nav_logo.svg" alt="" width={93} height={46} />
                <div
                  className="gradient-bg absolute bottom-[10px] right-0 flex h-[13px] w-[34px]
                    items-center justify-center rounded-bl-[1px] rounded-br-[12px]
                    rounded-tl-[12px] rounded-tr-[1px] text-center text-[7px]
                    font-semibold leading-[9px] text-highEmphasis">
                  <div>BETA</div>
                </div>
              </div>
            </Link>

            <TopMenu />
            <div className="flex-1" />

            <Web3Area />
          </div>
        </div>

        {!isMobileView && isCompleteLoading ? (
          <div className={`discord-popup absolute right-[12px] ${!isShowDiscordModal && !localDiscordKey ? 'hidden' : 'open'}`}>
            <div className="relative">
              <div className="button absolute" onClick={closeDiscord}>
                <Image alt="" src="/images/components/common/modal/close-white.svg" width={16} height={16} className="" />
              </div>
              <div className="absolute left-0 top-[0] h-[40px] w-[60px] bg-[#313339] " />
              <WidgetBot
                server={process.env.NEXT_PUBLIC_DISCORD_SERVER_ID}
                channel={process.env.NEXT_PUBLIC_DISCORD_CHANNEL_ID}
                width={430}
                style={{ height: 'calc(100dvh - 112px)' }}
              />
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="block bg-lightBlue md:hidden">
        <MobileHeader />
      </div> */}
    </>
  );
}

export default Header;
