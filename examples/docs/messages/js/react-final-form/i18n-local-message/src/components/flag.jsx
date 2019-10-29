import React from 'react';
import * as s from './flag.styles';

export const Flag = props => {
  const { icon, selected, onClick } = props;
  return <s.Flag src={icon} selected={selected} onClick={onClick} />;
};
