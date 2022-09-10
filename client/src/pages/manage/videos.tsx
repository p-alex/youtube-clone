import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  IVideo,
  removeVideo,
  resetVideoToDelete,
  setUserVideos,
} from "../../app/features/manageVideo";
import { RootState } from "../../app/store";
import EditVideoModal from "../../components/editVideoModal/EditVideoModal";
import ManageVideoCard from "../../components/manageVideoCard/ManageVideoCard";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import Layout from "../../layout/Layout";
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from "../../layout/style";
import { PrimaryButton } from "../../ui/PrimaryBtn";

const Container = styled.div`
  position: relative;
  margin: calc(${NAV_BAR_HEIGHT}px + 20px) auto;
  max-width: 1200px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: calc(${NAV_BAR_HEIGHT}px + 20px) 10px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
`;

const VideoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
`;

const ConfirmDelete = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1001;
`;

const ConfirmContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1002;
  background-color: ${(props) => props.theme.uiBg};
  padding: 20px;
  border-radius: 5px;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const Manage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { videos, videoToEdit, videoToDelete } = useSelector(
    (state: RootState) => state.manageVideos
  );
  const dispatch = useDispatch();

  const [getUserVideos, { isLoading }] = useAxiosWithRetry<{
    videos: IVideo[];
  }>("api/videos/manage", {
    accessToken: auth.accessToken!,
  });

  const [deleteVideo, { isLoading: isDeleteLoading }] = useAxiosWithRetry(
    "api/videos",
    {
      body: { video_id: videoToDelete },
      method: "DELETE",
      accessToken: auth.accessToken!,
    }
  );

  const handleGetUserVideos = async () => {
    const response = await getUserVideos();
    if (response.result === null) return;
    dispatch(setUserVideos(response.result.videos));
  };

  const handleDeleteVideo = async () => {
    dispatch(removeVideo({ video_id: videoToDelete! }));
    dispatch(resetVideoToDelete());
    try {
      await deleteVideo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserVideos();
  }, [auth]);

  return (
    <Layout>
      <AnimatePresence>
        {videoToDelete && (
          <ConfirmDelete
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "just" }}
            exit={{ opacity: 0 }}
          >
            <ConfirmBackdrop
              onClick={() => dispatch(resetVideoToDelete())}
            ></ConfirmBackdrop>
            <ConfirmContainer>
              <Title>Are you sure?</Title>
              <ConfirmButtons>
                <PrimaryButton onClick={() => dispatch(resetVideoToDelete())}>
                  Cancel
                </PrimaryButton>
                <PrimaryButton onClick={handleDeleteVideo}>
                  Delete
                </PrimaryButton>
              </ConfirmButtons>
            </ConfirmContainer>
          </ConfirmDelete>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {videoToEdit && <EditVideoModal video={videoToEdit} />}
      </AnimatePresence>
      <Container>
        <Title>Manage your videos</Title>
        <VideoCards>
          {videos.map((video) => {
            return <ManageVideoCard key={video.video_id} video={video} />;
          })}
        </VideoCards>
      </Container>
    </Layout>
  );
};

export default Manage;
