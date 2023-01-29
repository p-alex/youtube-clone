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
  EditVideoModal__SubmitContainer,
  EditVideoModal__Tag,
  EditVideoModal__TagContainer,
  EditVideoModal__ThumbnailContainer,
} from './EditVideoModal.styles';
import AutoResizingTextarea from '../../ui/AutoResizeTextarea';
import useZodVerifySchema from '../../hooks/useZodVerifySchema';
import {
  editVideoSchema,
  EditVideoSchemaType,
} from '../../schemas/editVideoModal.schema';
import { convertToTagList } from '../../utils/convertToTagList';
import Modal, { MODAL_LAST_FOCUSABLE_ELEMENT } from '../Modal/Modal';
import ReCaptchaCheckbox, { ReCaptchaType } from '../ReCaptchaCheckbox/ReCaptchaCheckbox';

const EditVideoModal = ({ video }: { video: IVideo }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { lastFocusedElement } = useSelector((state: RootState) => state.manageVideos);
  const dispatch = useDispatch();

  useDisableScroll();

  const [result, setResult] = useState<{
    success: boolean;
    error: string;
  } | null>(null);

  const [currentTagList, setCurrentTagList] = useState<string[]>([]);
  const [newTagList, setNewTagList] = useState<string[]>([]);
  const [tagsText, setTagsText] = useState('');

  const [state, setState] = useState<EditVideoSchemaType>({
    videoId: video.video_id,
    title: video.title,
    description: video.description,
    thumbnailData: {
      currentThumbnailUrl: video.thumbnail_url,
      newThumbnailBase64: null,
    },
    tagList: currentTagList,
    reToken: '',
  });

  const reRef = useRef<ReCaptchaType>(null);

  const hiddenInput = useRef<any>();

  const [getTags, { isLoading: isGetTagsLoading }] = useAxiosWithRetry<
    {},
    { tags: string[] }
  >(`api/videos/${video.video_id}/tags`, 'GET');

  const [updateVideo, { isLoading: isUpdateVideoLoading }] = useAxiosWithRetry<
    EditVideoSchemaType,
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

  const { verify, fieldErrors } = useZodVerifySchema(editVideoSchema, state);

  const handleUpdateVideo = async () => {
    setResult({ success: false, error: '' });

    if (
      state.title === video.title &&
      state.description === video.description &&
      state.tagList?.join('').replaceAll(' ', '') ===
        currentTagList.join('').replaceAll(',', '').replaceAll(' ', '')
    )
      return setResult({
        success: false,
        error: 'You did not make any modifications...',
      });
    const isValid = verify();
    if (!isValid) return;
    try {
      const response = await updateVideo(state);
      if (!response.result) return;
      dispatch(editVideo(state));
      setResult({ success: response.success, error: '' });
      reRef.current?.reset();
      setState((prevState) => ({ ...prevState, reToken: '' }));
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
      setState((prevState) => ({
        ...prevState,
        thumbnailData: {
          ...prevState.thumbnailData,
          newThumbnailBase64: optimizedImageUrl,
        },
      }));
    };
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, ['title']: event.target.value }));
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, ['description']: event.target.value }));
  };

  const handleChangeTagList = (event: ChangeEvent<HTMLInputElement>) => {
    setTagsText(event.target.value);
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, ['tagList']: convertToTagList(tagsText) }));
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
            state.thumbnailData.newThumbnailBase64
              ? state.thumbnailData.newThumbnailBase64
              : state.thumbnailData.currentThumbnailUrl
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
          typeof state.thumbnailData.newThumbnailBase64 === 'string' &&
          video.thumbnail_url !== state.thumbnailData.newThumbnailBase64 && (
            <Button
              variant="normal"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  thumbnailData: { ...prevState.thumbnailData, newThumbnailBase64: null },
                }))
              }
              type="button"
            >
              Reset
            </Button>
          )}
      </EditVideoModal__ThumbnailContainer>

      <InputGroup
        type={'text'}
        label="title"
        placeholder="Write a title"
        value={state.title}
        setValue={handleChangeTitle}
        error={fieldErrors.title && fieldErrors.title[0]}
      />
      <AutoResizingTextarea
        label={'description (optional)'}
        placeholder="Write a description"
        value={state.description}
        setValue={handleChangeDescription}
        maxLength={1500}
      />
      <InputGroup
        label={'tags (optional)'}
        type={'text'}
        placeholder="E.g. tag1, tag2, tag3 (minimum 4 tags)"
        value={tagsText}
        setValue={handleChangeTagList}
      />
      <EditVideoModal__TagContainer>
        {state.tagList &&
          state.tagList.length > 0 &&
          state.tagList.map((tag, index) => {
            return <EditVideoModal__Tag key={tag + index}>{tag}</EditVideoModal__Tag>;
          })}
      </EditVideoModal__TagContainer>
      <ReCaptchaCheckbox
        error={fieldErrors?.reToken && fieldErrors.reToken[0]}
        onChange={(e) => setState((prevState) => ({ ...prevState, reToken: e }))}
        reference={reRef}
      />
      <EditVideoModal__SubmitContainer>
        <Button
          variant="primary"
          type="submit"
          onClick={handleUpdateVideo}
          disabled={isUpdateVideoLoading}
          id={MODAL_LAST_FOCUSABLE_ELEMENT}
        >
          {isUpdateVideoLoading ? 'Loading' : 'Edit'}
        </Button>
        {typeof result?.success === 'boolean' ? (
          <EditVideoModal__ResultMessage isSuccess={result.success}>
            {result.success ? 'Video edited successfully!' : result.error}
          </EditVideoModal__ResultMessage>
        ) : null}
      </EditVideoModal__SubmitContainer>
    </Modal>
  );
};

export default EditVideoModal;
