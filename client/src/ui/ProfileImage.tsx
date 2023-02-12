import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ProfileImageContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  min-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
`;

const ProfileImage = ({
  userId,
  imageUrl,
  width,
  height,
  elemRef,
}: {
  userId: string;
  imageUrl: string;
  width: number;
  height: number;
  elemRef?: React.RefObject<any>;
}) => {
  return (
    <ProfileImageContainer width={width} height={height}>
      <Link href={'/profile/' + userId + '/videos'}>
        <a ref={elemRef} aria-label={`View ${userId}'s channel`}>
          <Image
            src={imageUrl}
            width={width}
            height={height}
            alt=""
            style={{ borderRadius: '50%' }}
          />
        </a>
      </Link>
    </ProfileImageContainer>
  );
};

export default ProfileImage;
