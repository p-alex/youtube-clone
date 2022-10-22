import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ProfileImageContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
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
      <Link href={"#"}>
        <a ref={elemRef}>
          <Image
            src={imageUrl}
            width={width}
            height={height}
            alt=""
            style={{ borderRadius: "50%" }}
          />
        </a>
      </Link>
    </ProfileImageContainer>
  );
};

export default ProfileImage;
