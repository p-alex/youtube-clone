import { useState } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';
import PasswordSchemaDisplay from './PasswordSchemaDisplay';

const InputGroup__Container = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  margin-bottom: var(--space-medium);
`;

const InputGroup__Label = styled.label`
  font-weight: 700;
  text-transform: capitalize;
`;

const InputGroup__Error = styled.p`
  font-weight: 700;
  color: ${(props) => props.theme.errorColor};
  font-size: 0.85rem;
`;

const Input = styled.input<{ isError: boolean }>`
  display: block;
  width: 100%;
  border: ${(props) =>
    props.isError
      ? `solid 1px ${props.theme.errorColor}`
      : `solid 1px ${props.theme.borderColor}`};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: var(--space-small) var(--space-medium);
  font-size: 1rem;
  width: 100%;
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;

interface Props {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  withPasswordSchemaDisplay?: boolean;
}

const InputGroup = ({
  label,
  type,
  placeholder,
  value,
  setValue,
  error,
  onFocus,
  onBlur,
  disabled,
  autoFocus,
  withPasswordSchemaDisplay,
}: Props) => {
  const [showPasswordSchema, setShowPasswordSchema] = useState(false);
  const formatedId = label.replaceAll(' ', '-').toLowerCase();
  const handleOnFocus = () => {
    if (withPasswordSchemaDisplay) {
      setShowPasswordSchema(true);
    }
    onFocus && onFocus();
  };
  const handleOnBlur = () => {
    onBlur && onBlur();
  };
  // aria-describedby
  return (
    <InputGroup__Container>
      <InputGroup__Label htmlFor={formatedId}>{label}</InputGroup__Label>
      <Input
        type={type}
        id={formatedId}
        name={formatedId}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        isError={error !== undefined}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-describedby={withPasswordSchemaDisplay ? 'password-schema-display' : ''}
        aria-invalid={error !== undefined}
      />
      {error && <InputGroup__Error>{error}</InputGroup__Error>}
      <PasswordSchemaDisplay password={value} show={showPasswordSchema} />
    </InputGroup__Container>
  );
};

export default InputGroup;
