import React from 'react';
import { RelativeRoutingType, To } from 'react-router';

export type ButtonSize = 'small' | 'medium' | 'large';
export type Variant = 'filled' | 'filled-danger' | 'outlined';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: ButtonSize;
  loading?: boolean;
  to?: To;
  target?: string;
  relative?: RelativeRoutingType;
}
