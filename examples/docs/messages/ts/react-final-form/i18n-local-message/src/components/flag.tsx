import React from 'react';
import * as s from './flag.styles';

interface Props {
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export const Flag: React.FunctionComponent<Props> = props => {
  const { icon, selected, onClick } = props;
  return <s.Flag src={icon} selected={selected} onClick={onClick} />;
};
