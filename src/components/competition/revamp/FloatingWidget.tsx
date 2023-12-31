import React, { FC, PropsWithChildren } from 'react';

type ItemProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
};

const Item: FC<ItemProps> = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`flex min-w-[140px] flex-col items-center rounded bg-secondaryBlue p-[10px] ${className}`}>
    {children}
  </div>
);

Item.defaultProps = {
  className: undefined,
  onClick: undefined
};

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="absolute right-0 top-0 hidden h-full lg:block">
    <div className="sticky top-[8rem] z-[3] flex flex-col space-y-4">{children}</div>
  </div>
);

export default { Container, Item };
