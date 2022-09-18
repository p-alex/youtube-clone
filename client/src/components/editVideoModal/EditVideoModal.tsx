import Image from "next/image";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editVideo,
  IVideo,
  resetVideoToEdit,
} from "../../app/features/manageVideo";
import { RootState } from "../../app/store";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import useDisableScroll from "../../hooks/useDisableScroll";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { imageOptimizer } from "../../utils/imageOptimizer";
import { convertToTagList } from "../uploadModal/UploadModal";
import { MdClose } from "react-icons/md";
import {
  Backdrop,
  CloseBtn,
  Container,
  FormContainer,
  HiddenInput,
  InputLabel,
  ResultMessage,
  Tag,
  TagContainer,
  ThumbnailContainer,
} from "./style";
import { motion } from "framer-motion";

const EditVideoModal = ({ video }: { video: IVideo }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useDisableScroll();

  const [result, setResult] = useState<{
    success: boolean;
    error: string;
  } | null>(null);

  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [thumbnailData, setThumbnailData] = useState<{
    currentThumbnailUrl: string;
    newThumbnailBase64: string | null;
  }>({
    currentThumbnailUrl: video.thumbnail_url,
    newThumbnailBase64: null,
  });
  const [currentTagList, setCurrentTagList] = useState<string[]>([]);
  const [newTagList, setNewTagList] = useState<string[]>([]);

  const hiddenInput = useRef<any>();

  const tagsInputRef = useRef<HTMLInputElement>(null);

  const [getTags, { isLoading: isGetTagsLoading }] = useAxiosWithRetry<{
    tags: string[];
  }>(`api/videos/${video.video_id}/tags`, {
    accessToken: auth.accessToken!,
  });

  const [updateVideo, { isLoading: isUpdateVideoLoading }] = useAxiosWithRetry(
    "api/videos",
    {
      method: "PATCH",
      accessToken: auth.accessToken!,
      body: {
        videoId: video.video_id,
        title,
        description,
        thumbnailData: thumbnailData,
        tagList:
          newTagList !== currentTagList && newTagList.length >= 4
            ? newTagList
            : null,
      },
    }
  );

  const handleGetTags = async () => {
    try {
      const tags = await getTags();
      if (tags.result) {
        setCurrentTagList(tags.result.tags);
        setNewTagList(tags.result.tags);
        tagsInputRef.current!.value = tags.result.tags.join(", ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth.accessToken) return;
    handleGetTags();
  }, [auth]);

  const handleUpdateVideo = async () => {
    try {
      const response = await updateVideo();
      if (!response.result) return;
      dispatch(
        editVideo({
          video_id: video.video_id,
          title,
          thumbnail_url: thumbnailData.newThumbnailBase64
            ? thumbnailData.newThumbnailBase64
            : thumbnailData.currentThumbnailUrl,
        })
      );
      setResult({ success: response.success, error: "" });
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    }
  };

  const handleChooseThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImageUrl = await imageOptimizer(file.result);
      setThumbnailData((prevState) => ({
        ...prevState,
        new_thumbnail_base64: optimizedImageUrl,
      }));
    };
  };

  return (
    <Container>
      <Backdrop
        onClick={() => dispatch(resetVideoToEdit())}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "just" }}
        exit={{ opacity: 0 }}
      ></Backdrop>
      <FormContainer
        as={motion.form}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "just" }}
        exit={{ y: -50, opacity: 0 }}
      >
        <CloseBtn onClick={() => dispatch(resetVideoToEdit())}>
          <MdClose />
        </CloseBtn>
        <ThumbnailContainer>
          <Button
            variant="normal"
            onClick={() => hiddenInput.current.click()}
            type="button"
          >
            Change thumbnail
          </Button>
          <HiddenInput
            type="file"
            accept=".jpg, .png"
            ref={hiddenInput}
            required
            onChange={handleChooseThumbnail}
          ></HiddenInput>
          <Image
            src={
              thumbnailData.newThumbnailBase64
                ? thumbnailData.newThumbnailBase64
                : thumbnailData.currentThumbnailUrl
            }
            width={500}
            height={281.25}
            alt=""
            objectFit="contain"
          />
          {video.thumbnail_url &&
            typeof thumbnailData.newThumbnailBase64 === "string" &&
            video.thumbnail_url !== thumbnailData.newThumbnailBase64 && (
              <Button
                variant="normal"
                onClick={() =>
                  setThumbnailData((prevState) => ({
                    ...prevState,
                    new_thumbnail_base64: null,
                  }))
                }
                type="button"
              >
                Reset
              </Button>
            )}
        </ThumbnailContainer>
        {typeof result?.success === "boolean" ? (
          <ResultMessage isSuccess={result.success}>
            {result.success ? "Video edited successfully!" : result.error}
          </ResultMessage>
        ) : null}
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          placeholder="Write a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
        />
        <InputLabel htmlFor="description">Description</InputLabel>
        <Textarea
          id="description"
          placeholder="Write a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
        ></Textarea>
        <InputLabel htmlFor="tags">Tags</InputLabel>
        <Input
          id="tags"
          ref={tagsInputRef}
          placeholder="E.g. tag1, tag2, tag3 (minimum 4 tags)"
          onChange={(e) => setNewTagList(convertToTagList(e.target.value))}
          required
          maxLength={60}
        />
        <TagContainer>
          {newTagList.length > 0 &&
            newTagList.map((tag, index) => {
              return <Tag key={tag + index}>{tag}</Tag>;
            })}
        </TagContainer>

        <Button
          variant="primary"
          type="submit"
          onClick={handleUpdateVideo}
          disabled={isUpdateVideoLoading}
        >
          {isUpdateVideoLoading ? "Loading" : "Edit"}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default EditVideoModal;
