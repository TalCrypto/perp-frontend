import React, { useState } from 'react';
import Image from 'next/image';
import { useStore, useStore as useNanostore } from '@nanostores/react';
import { $activeDropdown } from '@/stores/competition';
import { $isShowMobileModal } from '@/stores/modal';

const mobileDropdownOptions = [
  {
    id: 0,
    label: 'Top Gainer',
    icon: '/images/components/competition/icons/m-gainer.svg'
  },
  {
    id: 1,
    label: 'Top ROI',
    icon: '/images/components/competition/icons/m-gainer2.svg'
  },
  {
    id: 2,
    label: 'Convergence',
    icon: '/images/components/competition/icons/m-convergence.svg'
  },
  {
    id: 3,
    label: 'Top Losers',
    icon: '/images/components/competition/icons/m-loser.svg'
  }
];

const MobileDropdown = () => {
  const [isExpand, setIsExpand] = useState(false);
  const activeDropdown = useStore($activeDropdown);
  const isShowMobileMenu = useNanostore($isShowMobileModal);

  const activeItem = mobileDropdownOptions.find(i => i.id === activeDropdown);

  return (
    <>
      {/* button dropdown */}
      <div className={`sticky top-0 md:hidden ${!isShowMobileMenu ? 'z-[2]' : ''}`}>
        <div className="flex justify-between bg-[#202249] px-5 py-[12px]" onClick={() => setIsExpand(!isExpand)}>
          <div className="flex space-x-[6px]">
            <Image alt="gainers" src={activeItem?.icon || '/images/components/competition/icons/m-gainer.svg'} width={16} height={16} />
            <p className="b1">{activeItem?.label}</p>
          </div>

          <Image alt="dropdown" src="/images/components/competition/icons/dropdown.svg" width={20} height={20} />
        </div>
      </div>

      {/* popup */}
      <div className="md:hidden">
        <div
          className={`${
            isExpand ? 'visible opacity-100' : 'invisible opacity-0'
          } fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col bg-black/40 transition duration-[400]`}
          onClick={() => {
            setIsExpand(false);
          }}
        />
        <div
          className={`${
            isExpand ? 'visible translate-y-0' : 'invisible translate-y-full'
          } fixed bottom-0 left-0 right-0 z-20 transition-transform duration-300`}>
          {mobileDropdownOptions.map(item => (
            <div
              className="flex space-x-[6px] bg-[#202249] p-5"
              onClick={e => {
                e.stopPropagation();
                setIsExpand(false);
                $activeDropdown.set(item.id);
              }}>
              <Image alt="gainers" src={item.icon} width={16} height={16} />
              <p className="b1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileDropdown;
