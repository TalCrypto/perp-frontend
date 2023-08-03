import React, { FC } from 'react';
import { useConnect } from 'wagmi';
import { $userIsConnected, $userInfo } from '@/stores/user';
import { useStore } from '@nanostores/react';
import Image from 'next/image';

interface PerformanceTagProps {
  title: string;
  type: number;
  leaderboardRank: number;
}

const PerformanceTag: FC<PerformanceTagProps> = ({ title, type, leaderboardRank = 3 }) => {
  let contentTitle = '';
  switch (type) {
    case 0:
      contentTitle = 'Trading Vol.';
      break;

    case 1:
      contentTitle = 'Realized P/L';
      break;

    case 2:
      contentTitle = 'Total Fund. Payment';
      break;

    case 3:
      contentTitle = 'Referee’s Total Trad. Vol.';
      break;

    default:
      break;
  }

  return (
    <div
      className="relative mr-[24px] h-[362px] w-[242px] overflow-hidden
                rounded-[12px] border-[0.5px] border-[#FFD39240] bg-[#0C0D20CC]
                bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[rgba(72,50,24,0.7)] to-50% ">
      <div
        className="h-full w-full  bg-[url('/images/components/userprofile/profilecardbg.png')] 
    bg-cover bg-[center_bottom_-3rem] bg-no-repeat px-[36px] py-[24px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-start text-[16px] font-[600]">
            <Image src="/images/components/competition/revamp/performance-icon.svg" width={16} height={16} alt="" className="mr-[4px]" />
            {title}
          </div>
          {type === 0 ? <div className="mt-[4px] text-[12px] font-[400]">(Week 2)</div> : null}
          <div className={`${type === 0 ? 'mt-[16px]' : 'mt-[36px]'} text-[12px] font-[400] text-[#FFD392]`}>Leaderboard Rank</div>
          <div className="mt-[6px] text-[20px] font-[600]">{leaderboardRank}</div>
          <div className="mt-[18px] text-[12px] font-[400] text-[#FFD392]">{contentTitle}</div>
          <div className="mt-[6px] text-[20px] font-[600]">{leaderboardRank}</div>
          <div className="mt-[18px] text-[12px] font-[400] text-[#FFD392]">Reward</div>
          <div className="mt-[6px] text-[14px] font-[400]">200USDT</div>
          <div
            className="mt-[28px] flex min-w-[173px] cursor-pointer flex-row items-center justify-center
          rounded-[4px] border-[0.5px] border-[#FFD39240] py-[8px] pl-[8px] text-[12px] font-[400] text-[#FFD392] hover:bg-[#FFD39233]">
            View Leaderboard
            <Image src="/images/components/userprofile/arrow_right.svg" alt="" width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Divider = () => <div className="h-[1px] w-full bg-[#2E4371]" />;

const MyPerformance = () => {
  const isConnected = useStore($userIsConnected);
  const userInfo = useStore($userInfo);
  const displayUsername =
    userInfo?.username === '' ? `${userInfo.userAddress.substring(0, 7)}...${userInfo.userAddress.slice(-3)}` : userInfo?.username;

  return !isConnected ? (
    <div className="mt-[72px] flex items-center justify-center text-[16px] text-mediumEmphasis">
      Please connect to your wallet to get started.
    </div>
  ) : (
    <div>
      <div className="mt-[16px] flex items-center justify-center text-[18pt] font-[700] ">General Performance</div>
      <div className="mt-[36px] flex flex-row items-center justify-center">
        <PerformanceTag title="Top Vol." type={0} leaderboardRank={3} />
        <PerformanceTag title="Top Gainer" type={1} leaderboardRank={5} />
        <PerformanceTag title="FP" type={2} leaderboardRank={99} />
        <PerformanceTag title="Top Referrer" type={3} leaderboardRank={100} />
      </div>
      <div className="mt-[78px]">
        <div className="mt-[16px] flex items-center justify-center text-[18pt] font-[700] ">
          <Image src="/images/components/competition/revamp/my-performance/crown.svg" alt="" width={24} height={24} className="mr-[6px]" />
          Referral - My Team
        </div>
      </div>
      <div className="mt-[36px]">
        <div className="flex items-center">
          <div className="mr-[36px] w-[388px] rounded-[12px] border-[1px] border-[#2E4371] bg-[#1B1C30]">
            <div
              className="flex items-center rounded-t-[12px] bg-[#3A1A18] 
            bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#8C6E4B] to-50% p-[36px]">
              <Image src="/images/components/competition/revamp/my-performance/referrer-master.svg" width={43} height={57} alt="" />
              <div className="ml-[12px] flex flex-col justify-between">
                <div className="text-[12px] font-[400]">Master (Referrer)</div>
                <div className="mt-[8px] bg-gradient-to-b from-[#FFC977] to-[#fff] bg-clip-text text-[20px] font-[600] text-transparent">
                  {displayUsername}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex items-stretch justify-between px-[36px] py-[24px]">
              <div className="flex flex-col items-center justify-between">
                <div className="text-[12px] font-[400] text-[#FFD392]">Team Rank</div>
                <div className="text-[15px] font-[600]">12</div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <div className="text-[12px] font-[400] text-[#FFD392]">Team Reward</div>
                <div className="text-[15px] font-[600]">400USDT</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-center text-[12px] font-[400] text-[#FFD392]">
                  Referee’s Total <br /> Trad. Vol
                </div>
                <div className="mt-[6px] text-[15px] font-[600]">55.00</div>
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-center px-[36px] py-[24px]">
              <div className="text-center">
                <div className="text-[20px] font-[600] text-[#FFD392]">My Reward</div>
                <div className="mt-[6px] text-[12px] font-[400] text-[#FFD392]">(50% of Team Reward)</div>
                <div className="mt-[12px] text-[20px] font-[600]">100USDT</div>
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-center px-[36px] py-[24px]">
              <div>
                <div className="text-center text-[15px] font-[600]">📢 Share My Referral Link</div>
                <div className="mt-[24px] flex items-center justify-between">
                  <button
                    className="mr-[12px] flex items-center justify-center 
                  rounded-[4px] bg-[#2574FB] px-[21px] py-[10px] text-[15px] font-[600]">
                    <Image
                      src="/images/components/competition/revamp/my-performance/share.svg"
                      width={16}
                      height={16}
                      alt=""
                      className="mr-[8px]"
                    />
                    Share Link
                  </button>
                  <button
                    className="mr-[12px] flex items-center justify-center rounded-[4px] 
                  bg-[#2574FB] px-[21px] py-[10px] text-[15px] font-[600]">
                    <Image
                      src="/images/components/competition/revamp/my-performance/copy.svg"
                      width={16}
                      height={16}
                      alt=""
                      className="mr-[8px]"
                    />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;
