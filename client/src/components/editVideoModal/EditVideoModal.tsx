import Image from 'next/image';
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editVideo, IVideo, resetVideoToEdit } from '../../app/features/manageVideo';
import { RootState } from '../../app/store';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import useDisableScroll from '../../hooks/useDisableScroll';
import InputGroup from '../../ui/InputGroup';
import { Button } from '../../ui/Button';
import { imageOptimizer } from '../../utils/imageOptimizer';
import {
  EditVideoModal__HiddenInput,
  EditVideoModal__ResultMessage,
  EditVideoModal__Tag,
  EditVideoModal__TagContainer,
  EditVideoModal__ThumbnailContainer,
} from './EditVideoModal.styles';
import { removeEmptyLinesFromString } from '../../utils/removeEmptyLinesFromString';
import AutoResizingTextarea from '../../ui/AutoResizeTextarea';
import useZodVerifySchema from '../../hooks/useZodVerifySchema';
import { editVideoSchema } from '../../schemas/editVideoModal.schema';
import { convertToTagList } from '../../utils/convertToTagList';
import Modal, { MODAL_LAST_FOCUSABLE_ELEMENT } from '../Modal/Modal';

const EditVideoModal = ({ video }: { video: IVideo }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { lastFocusedElement } = useSelector((state: RootState) => state.manageVideos);
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
  const [tagsText, setTagsText] = useState('');

  const hiddenInput = useRef<any>();

  const [getTags, { isLoading: isGetTagsLoading }] = useAxiosWithRetry<
    {},
    { tags: string[] }
  >(`api/videos/${video.video_id}/tags`, 'GET');

  const [updateVideo, { isLoading: isUpdateVideoLoading }] = useAxiosWithRetry<
    {
      videoId: string;
      title: string;
      description: string;
      thumbnailData: {
        currentThumbnailUrl: string;
        newThumbnailBase64: string | null;
      };
      tagList: string[] | null;
    },
    {}
  >('api/videos', 'PATCH');

  const handleGetTags = async () => {
    try {
      const response = await getTags({ tags: newTagList });
      if (response.result) {
        setCurrentTagList(response.result.tags);
        setNewTagList(response.result.tags);
        setTagsText(response.result.tags.join(', '));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth.accessToken) return;
    handleGetTags();
  }, [auth]);

  const { verify, fieldErrors } = useZodVerifySchema(editVideoSchema, { title });

  const handleUpdateVideo = async () => {
    try {
      const isValid = verify();
      if (!isValid) return;
      const response = await updateVideo({
        videoId: video.video_id,
        title,
        description: removeEmptyLinesFromString(description),
        thumbnailData: thumbnailData,
        tagList:
          newTagList !== currentTagList && newTagList.length >= 4 ? newTagList : null,
      });
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
      setResult({ success: response.success, error: '' });
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
        newThumbnailBase64: optimizedImageUrl,
      }));
    };
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeTagList = (event: ChangeEvent<HTMLInputElement>) => {
    setTagsText(event.target.value);
  };

  useEffect(() => {
    setNewTagList(convertToTagList(tagsText));
  }, [tagsText]);

  const handleCloseModal = () => {
    dispatch(resetVideoToEdit());
    document.getElementById(lastFocusedElement!)?.focus();
  };

  return (
    <Modal title={video.title} width={600} handleClose={handleCloseModal}>
      <EditVideoModal__ThumbnailContainer>
        <EditVideoModal__HiddenInput
          type="file"
          accept=".jpg, .png"
          ref={hiddenInput}
          required
          onChange={handleChooseThumbnail}
        ></EditVideoModal__HiddenInput>
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
        <Button
          variant="normal"
          onClick={() => hiddenInput.current.click()}
          type="button"
          autoFocus
        >
          Change thumbnail
        </Button>
        {video.thumbnail_url &&
          typeof thumbnailData.newThumbnailBase64 === 'string' &&
          video.thumbnail_url !== thumbnailData.newThumbnailBase64 && (
            <Button
              variant="normal"
              onClick={() =>
                setThumbnailData((prevState) => ({
                  ...prevState,
                  newThumbnailBase64: null,
                }))
              }
              type="button"
            >
              Reset
            </Button>
          )}
      </EditVideoModal__ThumbnailContainer>
      {typeof result?.success === 'boolean' ? (
        <EditVideoModal__ResultMessage isSuccess={result.success}>
          {result.success ? 'Video edited successfully!' : result.error}
        </EditVideoModal__ResultMessage>
      ) : null}
      <InputGroup
        type={'text'}
        label="title"
        placeholder="Write a title"
        value={title}
        setValue={handleChangeTitle}
        error={fieldErrors.title && fieldErrors.title[0]}
      />
      <AutoResizingTextarea
        label={'description'}
        placeholder="Write a description"
        value={description}
        setValue={handleChangeDescription}
        maxLength={1500}
      />
      <InputGroup
        type={'text'}
        label={'tags'}
        placeholder="E.g. tag1, tag2, tag3 (minimum 4 tags)"
        value={tagsText}
        setValue={handleChangeTagList}
      />
      <EditVideoModal__TagContainer>
        {newTagList.length > 0 &&
          newTagList.map((tag, index) => {
            return <EditVideoModal__Tag key={tag + index}>{tag}</EditVideoModal__Tag>;
          })}
      </EditVideoModal__TagContainer>
      <Button
        variant="primary"
        type="submit"
        onClick={handleUpdateVideo}
        disabled={isUpdateVideoLoading}
        id={MODAL_LAST_FOCUSABLE_ELEMENT}
      >
        {isUpdateVideoLoading ? 'Loading' : 'Edit'}
      </Button>
    </Modal>
  );
};

export default EditVideoModal;
