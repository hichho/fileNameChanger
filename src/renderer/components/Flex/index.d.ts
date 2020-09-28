import * as React from 'react';

export interface IFlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';

  itemSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  itemOrder?: number;
  itemGrow?: number;

  style?: object;
  className?: string;

  onClick?: any,
}

export default class Flex extends React.Component<IFlexProps, any> {
}
