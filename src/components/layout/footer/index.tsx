import React from 'react';
import Router, { useRouter } from 'next/router';

import SocialMediaIcon from '@/components/layout/footer/SocialMediaIcon';
import MobileFooter from '@/components/layout/footer/mobile';

function Footer() {
  const router = useRouter();

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-[10] hidden bg-black
          bg-opacity-30 shadow-md backdrop-blur-lg md:flex">
        <div className="content-container flex w-full justify-between !px-0 py-[9px]">
          <div className="flex flex-1 space-x-[36px]">
            <SocialMediaIcon
              label="Discord"
              linkUrl="https://discord.com/invite/v9xrD3rK9j"
              idName="discord-icon-mask"
              svgSource="/images/components/layout/footer/discord.svg"
            />
            <SocialMediaIcon
              label="Twitter"
              linkUrl="https://twitter.com/Tribe3Official"
              idName="twitter-icon-mask"
              svgSource="/images/components/layout/footer/twitter.svg"
            />
            <SocialMediaIcon
              label="Telegram"
              linkUrl="https://t.me/OfficialTribe3"
              idName="telegram-icon-mask"
              svgSource="/images/components/layout/footer/telegram.svg"
            />
            <SocialMediaIcon
              label="Mirror"
              linkUrl="https://mirror.xyz/tribe3.eth"
              idName="mirror-icon-mask"
              svgSource="/images/components/layout/footer/mirror.svg"
            />
            <SocialMediaIcon
              label="Docs"
              linkUrl="https://tribe3.gitbook.io/tribe3/"
              idName="docs-icon-mask"
              svgSource="/images/components/layout/footer/docs.svg"
            />
          </div>
          <div>
            <div
              className="cursor-pointer text-[14px] font-[400] text-mediumEmphasis hover:text-[#FFFFFF]"
              onClick={() => window.open('/terms', '_blank')}>
              Terms & Conditions
            </div>
          </div>
        </div>
      </div>

      <MobileFooter />
    </>
  );
}

export default Footer;
