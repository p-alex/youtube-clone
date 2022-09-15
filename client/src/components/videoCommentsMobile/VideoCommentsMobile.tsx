import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  CloseBtn,
  CommentBtn,
  Comments,
  Container,
  Form,
  FormContainer,
  FormInput,
  Handle,
  Header,
  ProfilePicture,
  Title,
  TitleAndClose,
} from "./style";
import { MdClose } from "react-icons/md";
import Comment from "../comment/Comment";
import useDisableScroll from "../../hooks/useDisableScroll";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  disableKeyBinds,
  enableKeyBinds,
  VideoInfo,
} from "../../app/features/videoSlice";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import { RootState } from "../../app/store";
import { IComment, setComments } from "../../app/features/commentsSectionSlice";

const VideoCommentsMobile = ({
  video,
  handleToggleMobileComments,
}: {
  video: VideoInfo;
  handleToggleMobileComments: () => void;
}) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { comments, page, totalComments } = useSelector(
    (state: RootState) => state.commentsSection
  );

  const dispatch = useDispatch();

  const effectRan = useRef(false);

  const [canMove, setCanMove] = useState(false);
  const [initialPos, setInitialPos] = useState(0);
  const [moved, setMoved] = useState(0);

  useDisableScroll();

  const handleMouseDown = (e: any) => {
    setInitialPos(e.pageY);
    setCanMove(true);
  };

  const handleMouseMove = (e: any) => {
    if (canMove && initialPos - e.pageY < 0) {
      setMoved(-(initialPos - e.pageY));
    }
  };

  const handleTouchStart = (e: any) => {
    setInitialPos(e.touches[0].pageY);
    setCanMove(true);
  };

  const handleTouchMove = (e: any) => {
    if (canMove && initialPos - e.touches[0].pageY < 0) {
      setMoved(-(initialPos - e.touches[0].pageY));
    }
  };

  const handleEnd = () => {
    setCanMove(false);
    if (Math.abs(moved) > 100) {
      handleToggleMobileComments();
      return;
    }
    setInitialPos(0);
    setMoved(0);
  };

  const [getComments, { isLoading }] = useAxiosWithRetry<{
    comments: IComment[];
  }>(`api/comments/${video.video_id}/${page}`, {
    accessToken: accessToken!,
  });

  const handleGetComments = async () => {
    try {
      const response = await getComments();
      if (response.result) {
        dispatch(
          setComments({ comments: response.result.comments, totalComments })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (effectRan.current) return;
    handleGetComments();
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <Container
      id="mobile-comments-container"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "just" }}
      exit={{ opacity: 0 }}
      style={{ transform: `translateY(${moved}px)` }}
    >
      <Header
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={handleEnd}
      >
        <Handle></Handle>
        <TitleAndClose>
          <Title>Comments</Title>
          <CloseBtn onClick={handleToggleMobileComments}>
            <MdClose />
          </CloseBtn>
        </TitleAndClose>
      </Header>
      <FormContainer>
        <ProfilePicture
          as={Image}
          src={"/images/profile-picture.jpg"}
          width={48}
          height={48}
        />
        <Form>
          <FormInput
            placeholder="Add a comment..."
            onFocus={() => dispatch(disableKeyBinds())}
            onBlur={() => dispatch(enableKeyBinds())}
          />
          <CommentBtn>Comment</CommentBtn>
        </Form>
      </FormContainer>
      <Comments>
        {comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </Comments>
    </Container>
  );
};

export default VideoCommentsMobile;
