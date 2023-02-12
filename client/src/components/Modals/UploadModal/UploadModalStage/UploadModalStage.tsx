import React from 'react';
import { UploadModalStage__Container } from './UploadModalState.styles';

interface Props {
  children: React.ReactNode;
}

const UploadModalStage = ({ children }: Props) => {
  return <UploadModalStage__Container>{children}</UploadModalStage__Container>;
};

export default UploadModalStage;
