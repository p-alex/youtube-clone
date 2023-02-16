import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { subscribeToProfileOwner } from '../app/features/profileSlice';
import {
  addMiniSubscription,
  changeSubscriptionSubscribeStatus,
  removeMiniSubscription,
} from '../app/features/subscriptionsSlice';
import { subscribeToVideoOwner } from '../app/features/videoSlice';
import { RootState } from '../app/store';
import ConfirmationModal from '../components/Modals/ConfirmationModal/ConfirmationModal';
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
  &:disabled {
    opacity: 0.2;
  }
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
  subscribeToUserId: string;
  subscribeToUsername: string;
  subscribeToProfilePicture: string;
  changeStateIn: 'profile' | 'videopage' | 'manageSubscriptions';
  withConfirmation?: boolean;
}

const SubscribeButton = ({
  subscribeToUserId,
  subscribeToUsername,
  subscribeToProfilePicture,
  changeStateIn,
  withConfirmation,
}: Props) => {
  const router = useRouter();
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentUserId = useSelector((state: RootState) => state.auth.user.user_id);

  const [
    checkIfSubscribedRequest,
    { isLoading: isCheckIfSubscribedLoading, errors: checkIfSubscribedErrors },
  ] = useAxiosWithRetry<{}, { isSubscribed: boolean }>(
    'api/subscriptions/' + subscribeToUserId + '/subscribe-status'
  );

  const handleCheckIfSubscribed = async () => {
    const response = await checkIfSubscribedRequest({});
    if (!response.success || !response.result) return;
    setIsSubscribed(response.result.isSubscribed);
  };

  useEffect(() => {
    if (!currentUserId) return;
    handleCheckIfSubscribed();
  }, [currentUserId]);

  const [
    subscribeRequest,
    { isLoading: isSubscribeRequestLoading, errors: subscribeRequestErrors },
  ] = useAxiosWithRetry<{ subscribeToUserId: string }, {}>(
    'api/subscriptions/subscribe',
    'POST'
  );

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
    if (isSubscribed) {
      dispatch(removeMiniSubscription({ userId: subscribeToUserId }));
    } else {
      dispatch(
        addMiniSubscription({
          user_id: subscribeToUserId,
          username: subscribeToUsername,
          profile_picture: subscribeToProfilePicture,
        })
      );
    }
    setIsSubscribed((prevState) => !prevState);
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
          isLoading={isSubscribeRequestLoading}
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
        disabled={isSubscribeRequestLoading || isCheckIfSubscribedLoading}
        id={'subscribe-btn'}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </SubscribeButton__Btn>
    </>
  );
};

export default SubscribeButton;
