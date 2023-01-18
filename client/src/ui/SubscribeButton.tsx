import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { subscribeToProfileOwner } from '../app/features/profileSlice';
import { subscribeToVideoOwner } from '../app/features/videoSlice';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import useAxiosWithRetry from '../hooks/requestHooks/useAxiosWithRetry';
import { BORDER_RADIUS_ROUNDER } from '../layout/style';

const SubscribeButton__Btn = styled.button<{ variant: 'subed' | 'normal' }>`
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
  height: 35px;
  color: ${(props) =>
    props.variant === 'subed'
      ? props.theme.subscribeBtn.subedTextColor
      : props.theme.subscribeBtn.textColor};
  background-color: ${(props) =>
    props.variant === 'subed'
      ? props.theme.subscribeBtn.subedBg
      : props.theme.subscribeBtn.bg};
  border-radius: ${BORDER_RADIUS_ROUNDER}px;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'subed'
        ? props.theme.subscribeBtn.subedBgHover
        : props.theme.subscribeBtn.bgHover};
  }
`;

interface Props {
  isSubscribed: boolean;
  subscribeToUserId: string;
  subscribeToUsername: string;
}

const SubscribeButton = ({
  isSubscribed,
  subscribeToUserId,
  subscribeToUsername,
}: Props) => {
  const dispatch = useDispatch();

  const [subscribeRequest, { isLoading, errors }] = useAxiosWithRetry<
    { subscribeToUserId: string },
    {}
  >('api/users/subscribe', 'POST');

  const [isConfirmationActive, setIsConfirmationActive] = useState(false);

  const handleChangeStateToReflectNewSubscribeStatus = () => {
    dispatch(subscribeToVideoOwner({ isSubscribed }));
    dispatch(subscribeToProfileOwner({ isSubscribed }));
  };

  const handleSubscribe = async () => {
    const response = await subscribeRequest({ subscribeToUserId });
    if (!response.success) return;
    handleChangeStateToReflectNewSubscribeStatus();
    setIsConfirmationActive(false);
  };

  const handleToggleConfirm = () => {
    setIsConfirmationActive((prevState) => !prevState);
  };

  return (
    <>
      {isConfirmationActive && (
        <ConfirmationModal
          btnName="unsubscribe"
          func={handleSubscribe}
          isLoading={isLoading}
          message={'Unsubscribe from ' + subscribeToUsername + '?'}
          title="confirm"
          toggle={handleToggleConfirm}
          redirectToElementIdOnClose={'subscribe-btn'}
        ></ConfirmationModal>
      )}
      <SubscribeButton__Btn
        variant={isSubscribed ? 'subed' : 'normal'}
        type="button"
        onClick={isSubscribed ? handleToggleConfirm : handleSubscribe}
        disabled={isLoading}
        id={'subscribe-btn'}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </SubscribeButton__Btn>
    </>
  );
};

export default SubscribeButton;
