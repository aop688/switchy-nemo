import React from 'react';

export type SelectValueType = string | number;
export type SelectLabelType = string | React.ReactNode | number;

export interface SelectOptionType {
  label: SelectLabelType;
  value: SelectValueType;
  disabled?: boolean;
}

export interface ISelectProps {
  options: Array<SelectOptionType>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: SelectValueType;
  onSelect?: (value: AnyValue) => void;
}

export interface IOptionProps
  extends React.InputHTMLAttributes<HTMLOptionElement> {
  className?: string;
  children: React.ReactNode;
}
