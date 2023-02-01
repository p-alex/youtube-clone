import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { subscribeToProfileOwner } from '../app/features/profileSlice';
import { changeSubscriptionSubscribeStatus } from '../app/features/subscriptionsSlice';
import { subscribeToVideoOwner } from '../app/features/videoSlice';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import useAuth from '../hooks/authHooks/useAuth';
import useAxiosWithRetry from '../hooks/requestHooks/useAxiosWithRetry';
import { BORDER_RADIUS_ROUNDER } from '../layout/style';

const SubscribeButton__Btn = styled.button<{ variant: 'subed' | 'normal' }>`
  padding: var(--space-small) var(--space-medium);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
  width: max-content;
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
  changeStateIn: 'profile' | 'videopage' | 'manageSubscriptions';
  withConfirmation?: boolean;
}

const SubscribeButton = ({
  isSubscribed,
  subscribeToUserId,
  subscribeToUsername,
  changeStateIn,
  withConfirmation,
}: Props) => {
  const router = useRouter();
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const [subscribeRequest, { isLoading, errors }] = useAxiosWithRetry<
    { subscribeToUserId: string },
    {}
  >('api/users/subscribe', 'POST');

  const [isConfirmationActive, setIsConfirmationActive] = useState(false);

  const handleChangeStateToReflectNewSubscribeStatus = () => {
    changeStateIn === 'videopage' && dispatch(subscribeToVideoOwner({ isSubscribed }));
    changeStateIn === 'profile' && dispatch(subscribeToProfileOwner({ isSubscribed }));
    changeStateIn === 'manageSubscriptions' &&
      dispatch(
        changeSubscriptionSubscribeStatus({ isSubscribed, userId: subscribeToUserId })
      );
  };

  const handleSubscribe = async () => {
    if (!isAuth) return router.push('/signin');
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
        onClick={isSubscribed && withConfirmation ? handleToggleConfirm : handleSubscribe}
        disabled={isLoading}
        id={'subscribe-btn'}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </SubscribeButton__Btn>
    </>
  );
};

export default SubscribeButton;
