import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { BORDER_RADIUS_ROUND } from '../layout/style';
import { PASSWORD_RESTRICTIONS } from '../app/features/authSlice';

const InputSchemaDisplay__Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: var(--space-small);
  padding: var(--space-small);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  font-size: 0.85rem;
  margin-top: var(--space-small);
`;

const InputSchemaDispaly__Rule = styled.div<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  & svg {
    color: ${(props) =>
      props.isValid ? props.theme.accentColor : props.theme.errorColor};
    width: 20px;
    height: 20px;
    @keyframes scale {
    }
  }
`;

interface Props {
  password: string;
  show: boolean;
}

const PasswordSchemaDisplay = ({ password, show }: Props) => {
  const [isCorrectLength, setIsCorrectLength] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  useEffect(() => {
    setIsCorrectLength(password.length >= 8 && password.length <= 30);
    setIsLowercase(/[a-z]/g.test(password));
    setIsUppercase(/[A-Z]/g.test(password));
    setIsNumber(/[0-9]/g.test(password));
    setIsSymbol(/[!@#$%^&*]/g.test(password));
  }, [password]);
  return (
    <InputSchemaDisplay__Container show={show} id="password-schema-display">
      <InputSchemaDispaly__Rule isValid={isCorrectLength}>
        {isCorrectLength ? <AiOutlineCheck /> : <AiOutlineClose />} between{' '}
        {PASSWORD_RESTRICTIONS.minLength} to {PASSWORD_RESTRICTIONS.maxLength} characters
      </InputSchemaDispaly__Rule>
      <InputSchemaDispaly__Rule isValid={isLowercase}>
        {isLowercase ? <AiOutlineCheck /> : <AiOutlineClose />} at least 1 lowercase
        letter
      </InputSchemaDispaly__Rule>
      <InputSchemaDispaly__Rule isValid={isUppercase}>
        {isUppercase ? <AiOutlineCheck /> : <AiOutlineClose />} at least 1 uppercase
        letter
      </InputSchemaDispaly__Rule>
      <InputSchemaDispaly__Rule isValid={isNumber}>
        {isNumber ? <AiOutlineCheck /> : <AiOutlineClose />} at least 1 number
      </InputSchemaDispaly__Rule>
      <InputSchemaDispaly__Rule isValid={isSymbol}>
        {isSymbol ? <AiOutlineCheck /> : <AiOutlineClose />} at least 1 symbol (
        !,@,#,$,%,^,&,* )
      </InputSchemaDispaly__Rule>
    </InputSchemaDisplay__Container>
  );
};

export default PasswordSchemaDisplay;
