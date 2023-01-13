import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../../app/features/videoSlice';
import { UploadVideoData } from '../../../../hooks/useUploadModal';
import { ZodVerifyFormErrors } from '../../../../hooks/useZodVerifySchema';
import { UploadVideoSchemaType } from '../../../../schemas/uploadVideo.schema';
import AutoResizingTextarea from '../../../../ui/AutoResizeTextarea';
import { Button } from '../../../../ui/Button';
import InputGroup from '../../../../ui/InputGroup';
import { convertToTagList } from '../../../../utils/convertToTagList';
import { imageOptimizer } from '../../../../utils/imageOptimizer';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../Modal/Modal';
import {
  VideoDetailsState__Container,
  VideoDetailsState__Error,
  VideoDetailsState__FormContainer,
  VideoDetailsState__HiddenInput,
  VideoDetailsState__Tag,
  VideoDetailsState__TagContainer,
  VideoDetailsState__ThumbnailContainer,
} from './VideoDetailsState.styles';

const VideoDetailsStage = ({
  uploadData,
  setUploadData,
  handleUploadVideo,
  fieldErrors,
}: {
  uploadData: UploadVideoData;
  setUploadData: React.Dispatch<React.SetStateAction<UploadVideoData>>;
  handleUploadVideo: (event: React.FormEvent) => void;
  fieldErrors: ZodVerifyFormErrors<UploadVideoSchemaType>;
}) => {
  const dispatch = useDispatch();
  const hiddenInput = useRef<any>();

  const [tagsText, setTagsText] = useState('');

  const handleChooseThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImageUrl = await imageOptimizer(file.result);
      setUploadData((prevState) => ({
        ...prevState,
        thumbnailUrl: optimizedImageUrl,
      }));
    };
  };

  const handleConvertIntoTagsList = () => {
    setUploadData((prevState) => ({
      ...prevState,
      tagList: convertToTagList(tagsText),
    }));
  };

  useEffect(() => {
    if (!tagsText) return;
    handleConvertIntoTagsList();
  }, [tagsText]);

  useEffect(() => {
    dispatch(disableKeyBinds());
    return () => {
      dispatch(enableKeyBinds());
    };
  }, []);

  return (
    <VideoDetailsState__Container>
      <VideoDetailsState__FormContainer>
        <VideoDetailsState__ThumbnailContainer>
          {!uploadData.thumbnailUrl && (
            <>
              <Button
                variant="normal"
                onClick={() => hiddenInput.current.click()}
                type="button"
                autoFocus
              >
                Choose thumbnail
              </Button>
              <VideoDetailsState__HiddenInput
                type="file"
                accept=".jpg, .png"
                ref={hiddenInput}
                required
                onChange={handleChooseThumbnail}
              ></VideoDetailsState__HiddenInput>
              <VideoDetailsState__Error>
                {fieldErrors.thumbnailUrl && fieldErrors.thumbnailUrl[0]}
              </VideoDetailsState__Error>
            </>
          )}
          {uploadData.thumbnailUrl && (
            <>
              <Image
                src={uploadData.thumbnailUrl}
                width={500}
                height={281.25}
                alt=""
                objectFit="contain"
              />
              <Button
                variant="normal"
                onClick={() =>
                  setUploadData((prevState) => ({
                    ...prevState,
                    thumbnailUrl: '',
                  }))
                }
                type="button"
              >
                Reset thumbnail
              </Button>
            </>
          )}
        </VideoDetailsState__ThumbnailContainer>

        <InputGroup
          type="text"
          label="title"
          placeholder="Write a title..."
          value={uploadData.title}
          setValue={(e) =>
            setUploadData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          error={fieldErrors.title && fieldErrors.title[0]}
        />

        <AutoResizingTextarea
          label="description"
          placeholder="Write a description..."
          value={uploadData.description}
          setValue={(e) =>
            setUploadData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          error={fieldErrors.description && fieldErrors.description[0]}
          maxLength={1500}
        />

        <InputGroup
          type="text"
          label="tags"
          placeholder="E.g. tag1, tag2, tag3"
          value={tagsText}
          setValue={(event) => setTagsText(event.target.value)}
          error={fieldErrors.tags && fieldErrors.tags[0]}
        />

        <VideoDetailsState__TagContainer>
          {uploadData.tagList.length > 0 &&
            uploadData.tagList.map((tag, index) => {
              return (
                <VideoDetailsState__Tag key={tag + index}>{tag}</VideoDetailsState__Tag>
              );
            })}
        </VideoDetailsState__TagContainer>

        <Button
          variant="primary"
          type="submit"
          onClick={handleUploadVideo}
          id={MODAL_LAST_FOCUSABLE_ELEMENT}
        >
          Upload
        </Button>
      </VideoDetailsState__FormContainer>
    </VideoDetailsState__Container>
  );
};

export default VideoDetailsStage;
