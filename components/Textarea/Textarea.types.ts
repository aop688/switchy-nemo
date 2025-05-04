import React from 'react';

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  withTrim?: boolean;
}
