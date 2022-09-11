import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { dateConverter } from "../../utils/dateConverter";
import { IComment } from "../videoComments/VideoComments";
import {
  Body,
  Button,
  ButtonsContainer,
  Container,
  CreatedAt,
  EditCommentForm,
  Header,
  ProfilePicture,
  Text,
  Username,
} from "./style";

const Comment = ({ comment }: { comment: IComment }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <Container>
      <Link href={"#"}>
        <a>
          <ProfilePicture>
            <Image
              src={comment.profile_picture}
              width={40}
              height={40}
              alt=""
            />
          </ProfilePicture>
        </a>
      </Link>
      <Body>
        <Header>
          <Link href={"#"}>
            <a>
              <Username>{comment.username}</Username>
            </a>
          </Link>
          <CreatedAt>
            {dateConverter(new Date(comment.created_at).getTime())}
          </CreatedAt>
        </Header>
        {!isEditMode && <Text>{comment.text}</Text>}
        {isEditMode && <EditCommentForm></EditCommentForm>}
        <ButtonsContainer>
          <Button>
            {comment.is_liked ? <AiFillLike /> : <AiOutlineLike />}{" "}
            <span>{comment.total_likes}</span>
          </Button>
          <Button>
            {comment.is_liked === false ? (
              <AiFillDislike />
            ) : (
              <AiOutlineDislike />
            )}{" "}
            <span>{comment.total_dislikes}</span>
          </Button>
          <Button>Reply</Button>
        </ButtonsContainer>
      </Body>
    </Container>
  );
};

export default Comment;
