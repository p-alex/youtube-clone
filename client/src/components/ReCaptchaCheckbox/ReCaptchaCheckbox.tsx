import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import { ErrorText } from '../../ui/Text';

const ReCaptchaCheckbox__Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  margin: var(--space-large) 0 48px 0;
  height: 83px;
`;

export type ReCaptchaType = ReCAPTCHA;

const ReCaptchaCheckbox = ({
  onChange,
  reference,
  error,
}: {
  onChange: (event: any) => void;
  reference: React.RefObject<ReCAPTCHA>;
  error: string | undefined;
}) => {
  return (
    <ReCaptchaCheckbox__Container>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        size="normal"
        onChange={onChange}
        ref={reference}
      />
      <ErrorText size="small">{error}</ErrorText>
    </ReCaptchaCheckbox__Container>
  );
};

export default ReCaptchaCheckbox;
