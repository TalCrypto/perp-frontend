import React from 'react';
import Image from 'next/image';
import Table, { TableColumn } from '../Table';

type Data = {
  rank: string;
  usdt: number;
  points: number;
};

const columns: TableColumn<Data>[] = [
  { label: 'Rank', field: 'rank', className: 'flex-1 py-3 text-center border-r border-r-[#2E4371]' },
  {
    label: 'USDT',
    field: 'usdt',
    className: 'flex-1 py-3 text-center',
    render: row => <p className="text-h5 text-warn">{row.usdt ? row.usdt : '-'}</p>
  },
  {
    label: 'Pts',
    field: 'points',
    className: 'flex-1 py-3 text-center',
    render: row => <p className="text-h5 text-seasonGreen">{row.points.toLocaleString()}</p>
  }
];

const data: Data[] = [
  { rank: '1', usdt: 800, points: 10000 },
  { rank: '2', usdt: 400, points: 8000 },
  { rank: '3', usdt: 200, points: 6000 },
  { rank: '4', usdt: 150, points: 4000 },
  { rank: '5', usdt: 100, points: 2000 },
  { rank: '6-10', usdt: 0, points: 1500 },
  { rank: '11-20', usdt: 0, points: 1000 }
];

const Rules = () => (
  <div className="px-5 py-9 lg:p-0">
    <p className="mb-6 text-h4 lg:mb-7 lg:text-center">Rules for Top Referrer</p>

    <ul className="mb-16 space-y-6 text-b1">
      <li>
        <p>
          In the Top Referrer competition, users are competing on the total trading volume of the referees during the period. Winner team,
          i.e. Referrer & Referees, will share a prize pool with USDT and Tribe3 points!
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Competing Metrics: </span>
          <br />
          Total Referees’ Trading Volume
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Definition:</span> <br />
          The Referees’ trading volume is the total notional trading volume (including open, add, partial close, and full close) in WETH
          generated by all the referred users of each participant
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Rules:</span>
          <br /> Rank from highest total referees’ trading volume to lowest
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Period:</span> <br />
          15 Aug 2023 - 12 Sep 2023
        </p>
      </li>
    </ul>

    <p className="mb-6 text-h4 lg:mb-7 lg:text-center">Top Referrer Prize Table</p>

    <div className="mx-auto mb-9 lg:max-w-[620px]">
      <Table
        className="!text-highEmphasis"
        headerClassName="bg-secondaryBlue text-h5 
        border  !py-0 border-[#2E4371]"
        rowClassName="!py-0 border-x border-[#2E4371] !text-[16px]"
        columns={columns}
        data={data}
      />
    </div>

    <p className="mb-6 text-h5 lg:text-center">Prize Distribution Among the Team</p>

    <p className="mb-9 text-b1 lg:text-center">
      Following is a distribution of the prize between the Team Lead and the 5 Team Members with the highest trading volume. If fewer than 5
      team members are present, the remaining percentages will not be distributed.
    </p>

    <div className="hidden justify-center lg:flex">
      <Image src="/images/components/competition/revamp/prize_distribution.svg" width={950} height={516} alt="" />
    </div>

    <div className="mb-9 flex flex-col justify-center space-y-[10px] text-b2 lg:hidden">
      <div className="flex">
        <p className="basis-2/3">Team Lead:</p>
        <p className="basis-1/3 text-b2e text-warn">40%</p>
      </div>
      <div className="flex">
        <p className="basis-2/3">Top 1 Trading Vol. Member:</p>
        <p className="basis-1/3 text-b2e text-warn">16%</p>
      </div>
      <div className="flex">
        <p className="basis-2/3">Top 2 Trading Vol. Member:</p>
        <p className="basis-1/3 text-b2e text-warn">14%</p>
      </div>
      <div className="flex">
        <p className="basis-2/3">Top 3 Trading Vol. Member:</p>
        <p className="basis-1/3 text-b2e text-warn">12%</p>
      </div>
      <div className="flex">
        <p className="basis-2/3">Top 4 Trading Vol. Member:</p>
        <p className="basis-1/3 text-b2e text-warn">10%</p>
      </div>
      <div className="flex">
        <p className="basis-2/3">Top 5 Trading Vol. Member:</p>
        <p className="basis-1/3 text-b2e text-warn">8%</p>
      </div>
    </div>

    <div className="flex justify-center lg:hidden">
      <Image src="/images/components/competition/revamp/prize_distribution_m.svg" width={302} height={642} alt="" />
    </div>
  </div>
);

export default Rules;

// const Item = () => (
//   <div className="flex flex-1 flex-col items-center">
//     <p className="mb-[10px] text-b3 text-mediumEmphasis">15 Aug 2023</p>
//     <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primaryBlue">
//       <p>W1</p>
//     </div>
//     <p className="text-b3e text-highEmphasis">1st Round Starts</p>
//   </div>
// );
//
// const Rules = () => (
//   <div>
//     <p className="mb-7 text-center text-h4">Rules</p>
//
//     <div className="relative">
//       <div className="absolute left-20 right-20 top-[42px] h-[6px] rounded-[3px] bg-[#2E4371]">
//         <div className="h-full w-[30%] rounded-[3px] bg-primaryBlue" />
//       </div>
//
//       <div className="relative flex items-center">
//         <Item />
//         <Item />
//         <Item />
//         <Item />
//         <Item />
//       </div>
//     </div>
//   </div>
// );
//
// export default Rules;
