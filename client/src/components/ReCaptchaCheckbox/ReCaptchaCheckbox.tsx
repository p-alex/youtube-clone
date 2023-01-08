import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';

const ReCaptchaCheckbox__Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 40px 0;
  height: 83px;
`;

const ReCaptchaCheckbox__Error = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.errorColor};
  font-weight: 700;
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
        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
        size="normal"
        onChange={onChange}
        ref={reference}
      />
      <ReCaptchaCheckbox__Error>{error}</ReCaptchaCheckbox__Error>
    </ReCaptchaCheckbox__Container>
  );
};

export default ReCaptchaCheckbox;
