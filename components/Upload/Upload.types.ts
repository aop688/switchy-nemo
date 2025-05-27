import React from 'react';

export interface IUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: React.ReactNode;
  onUplod?: (files: FileList) => void;
}
