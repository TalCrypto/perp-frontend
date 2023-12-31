import Image from 'next/image';
import React from 'react';
import { getCollectionInformation } from '@/const/collectionList';
import { getAMMByAddress } from '@/const/addresses';
import { $currentChain } from '@/stores/user';
import { useStore as useNanostore } from '@nanostores/react';

export function TypeWithIconByAmm(props: any) {
  const { content, showCollectionName, amm, className, imageWidth = 24, imageHeight = 24 } = props;
  const chain = useNanostore($currentChain);
  const ammValue = getAMMByAddress(amm, chain);

  const targetAmm = getCollectionInformation(amm);
  const targetCollection = targetAmm ?? getCollectionInformation(ammValue);

  if (targetCollection) {
    return (
      <div className={`flex ${className} items-center`}>
        <Image src={targetCollection.image} alt="" width={imageWidth} height={imageHeight} className="mr-[6px]" />
        <div className="flex flex-wrap text-[14px] font-normal">
          <div>{showCollectionName ? targetCollection.shortName : null}</div>
          {content ? <div className="whitespace-nowrap">{content}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${className}`}>
      <div>{content}</div>
    </div>
  );
}
