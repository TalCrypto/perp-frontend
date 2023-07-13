/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import Image from 'next/image';
import CountdownTimer from '@/components/common/CountdownTimer';
import { useRouter } from 'next/router';
import MobileDropdown from '@/components/competition/desktop/MobileDropdown';
import { useStore as useNanostore } from '@nanostores/react';
import { $isCompetitionLeaderboardLoading } from '@/stores/competition';
import { useAccount } from 'wagmi';
import { apiConnection } from '@/utils/apiConnection';

const TopComponent = () => {
  const router = useRouter();
  const openRules = () => window.open('https://mirror.xyz/tribe3.eth/Zjg7s1ORT06DtFJXOBDgTbW2O8v4y6bKaCUhKSsxDcI', '_blank');
  const isCompetitionLeaderboardLoading = useNanostore($isCompetitionLeaderboardLoading);

  const { address, isConnected, isConnecting } = useAccount();

  const getInitialData = async () => {
    $isCompetitionLeaderboardLoading.set(true);
    const leaderboardPromises = [
      apiConnection.getAbsPnlLeaderboard(address),
      apiConnection.getRealizedPnlPercentageLeaderboard(address),
      apiConnection.getNetConvergenceLeaderboard(address),
      apiConnection.getTopLosersLeaderboard(address)
    ];

    await Promise.allSettled(leaderboardPromises);

    setTimeout(() => {
      $isCompetitionLeaderboardLoading.set(false);
    }, 500);
  };

  useEffect(() => {
    getInitialData();
  }, [address]);

  return (
    <>
      <div className="relative mb-6 px-5 pb-6 pt-4 md:mt-12 md:px-0">
        {/* view rule mobile btn */}
        <div className="mb-6 flex justify-end md:hidden">
          <div className="flex cursor-pointer items-center " onClick={openRules}>
            <Image className="mb-[1px]" src="/images/common/rules.svg" alt="rules" width={20} height={18} />
            <span className="pl-[5.33px] text-b2e">View Rules</span>
          </div>
        </div>

        <h1 className="text-glow-yellow text-shadow-lb mb-[14px] text-center text-h1">TRADING COMPETITION</h1>
        <CountdownTimer className="mb-11" date="2023-07-16 17:00:00" timeZone="Asia/Hong_Kong" />
        <h5 className="mb-9 text-center text-h5">
          <span className="text-[#3EF3FF]">Trade, Compete, Win! </span>
          <span>Join our Trading Competition Today</span>
        </h5>
        <div className="item-center flex justify-center">
          <button
            type="button"
            className="rounded bg-primaryBlue px-6 py-[12px] text-b1e hover:bg-primaryBlueHover"
            onClick={() => router.push('/trade/MILADY')}>
            Trade Now !
          </button>
        </div>
        <div className="absolute bottom-0 right-0 hidden items-center justify-center md:flex">
          <div className="mr-2 flex cursor-pointer items-center justify-center" onClick={openRules}>
            <Image className="mb-[1px]" src="/images/common/rules.svg" alt="rules" width={20} height={18} />
            <span className="pl-[5.33px] text-b2e">View Rules</span>
          </div>
          <div className="flex w-56 items-center justify-end">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                // leaderboardFetch();
              }}>
              <Image
                alt="refresh"
                // className={`${leaderboardIsLoading ? 'animate-spin' : ''}`}
                src="/images/components/airdrop/refresh.svg"
                width={30}
                height={30}
              />
              <span className="pl-[1px] text-b2e">{false ? 'Updating Leaderboards...' : 'Update Leaderboards'}</span>
            </div>
          </div>
        </div>
      </div>
      <MobileDropdown />
    </>
  );
};

export default TopComponent;
