import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ProfileImageContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const ProfileImage = ({
  username,
  imageUrl,
  width,
  height,
  elemRef,
}: {
  username: string;
  imageUrl: string;
  width: number;
  height: number;
  elemRef?: React.RefObject<any>;
}) => {
  return (
    <ProfileImageContainer width={width} height={height}>
      <Link href={'/profile/' + username + '/videos'}>
        <a ref={elemRef} aria-label={`View ${username}'s channel`}>
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
