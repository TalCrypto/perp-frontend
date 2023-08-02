/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import TopThree from './TopThree';
import FloatingWidget from './FloatingWidget';
import Table from './Table';
import Rules from './Rules';

const TopGainer = () => {
  const router = useRouter();
  return (
    <div className="relative">
      <FloatingWidget.Container>
        <FloatingWidget.Item>
          <div className="mb-4 flex space-x-1">
            <Image src="/images/components/competition/revamp/leaderboard.svg" width={16} height={16} alt="" />
            <p className="text-h5 text-highEmphasis">Top Gainer</p>
          </div>
          <Image src="/images/components/competition/revamp/timer.svg" className="mb-1" width={16} height={16} alt="" />
          <p className="text-b3 text-highEmphasis">
            Ends in: <span className="text-b3e">4d 3h 12m</span>
          </p>
        </FloatingWidget.Item>
      </FloatingWidget.Container>

      <div className="mx-auto lg:max-w-[929px]">
        <TopThree />

        <Table className="mb-[170px]" />

        <Rules />
      </div>
    </div>
  );
};

export default TopGainer;
