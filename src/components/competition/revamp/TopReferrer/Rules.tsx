import React from 'react';
import Table, { TableColumn } from '../Table';

type Data = {
  rank: string;
  usdt: number;
  points: number;
};

const columns: TableColumn<Data>[] = [
  { label: 'Rank', field: 'rank', className: 'flex-1 py-3 text-center border-r border-r-[#2E4371]' },
  { label: 'USDT', field: 'usdt', className: 'flex-1 py-3 text-center', render: row => <p className="text-h5 text-warn">{row.usdt}</p> },
  {
    label: 'Points',
    field: 'points',
    className: 'flex-1 py-3 text-center',
    render: row => <p className="text-h5 text-seasonGreen">{row.points.toLocaleString()}</p>
  }
];

const data: Data[] = [
  { rank: '1', usdt: 100, points: 1000 },
  { rank: '2', usdt: 100, points: 1000 },
  { rank: '3', usdt: 100, points: 1000 },
  { rank: '4-10', usdt: 100, points: 1000 },
  { rank: '11-50', usdt: 100, points: 1000 },
  { rank: '51-250', usdt: 100, points: 1000 }
];

const Rules = () => (
  <div className="px-5 py-9 lg:p-0">
    <p className="mb-6 text-h4 lg:mb-7 lg:text-center">Rules for Top Referrer</p>

    <ul className="mb-16 space-y-6 text-b1">
      <li>
        <p>
          In the Top Referrer competition, users are competing on the total trading volume of your referees during the period. Winners will
          share a prize pool with USDT and Tribe3 points!
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Competing Metrics: </span>
          <br />
          Referees’ trading volume
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Definition:</span> <br />
          The Referees’ trading volume is the total notional trading volume (open, add, partial close and full close would be counted) in
          WETH generated by all the referred users of each participant.
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Rules:</span>
          <br /> Rank from highest Referees’ trading volume to lowest Referees’ trading volume; referred users have to trade over{' '}
          <span className="text-b1e">5 WETH</span> to be eligible.
        </p>
      </li>
      <li>
        <p>
          <span className="text-b1e">Period:</span> <br />1 Month (15 Aug 2023 - 15 Sep 2023)
        </p>
      </li>
    </ul>

    <p className="mb-6 text-h4 lg:mb-7 lg:text-center">Team Prize</p>

    <div className="mx-auto lg:max-w-[620px]">
      <Table
        className="!text-highEmphasis"
        headerClassName="bg-secondaryBlue text-h5 
        border  !py-0 border-[#2E4371]"
        rowClassName="!py-0 border-x border-[#2E4371] !text-[16px]"
        columns={columns}
        data={data}
      />
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
