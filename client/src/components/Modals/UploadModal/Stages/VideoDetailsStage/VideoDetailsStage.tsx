import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../../../app/features/videoSlice';
import { ZodVerifyFormErrors } from '../../../../../hooks/useZodVerifySchema';
import { UploadVideoSchemaType } from '../../../../../schemas/uploadVideo.schema';
import AutoResizingTextarea from '../../../../../ui/AutoResizeTextarea';
import { Button } from '../../../../../ui/Button';
import InputGroup from '../../../../../ui/InputGroup';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../../../ui/Modal/Modal';
import { ErrorText } from '../../../../../ui/Text';
import { convertToTagList } from '../../../../../utils/convertToTagList';
import { imageOptimizer } from '../../../../../utils/imageOptimizer';
import ReCaptchaCheckbox, {
  ReCaptchaType,
} from '../../../../ReCaptchaCheckbox/ReCaptchaCheckbox';
import UploadModalStage from '../../UploadModalStage/UploadModalStage';

import {
  VideoDetailsState__Error,
  VideoDetailsState__FormContainer,
  VideoDetailsState__HiddenInput,
  VideoDetailsState__Tag,
  VideoDetailsState__TagContainer,
  VideoDetailsState__ThumbnailContainer,
} from './VideoDetailsState.styles';

interface Props {
  uploadData: UploadVideoSchemaType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadVideoSchemaType>>;
  handleUploadVideo: (event: React.FormEvent) => void;
  fieldErrors: ZodVerifyFormErrors<UploadVideoSchemaType>;
  reRef: React.RefObject<ReCaptchaType>;
}

const VideoDetailsStage = ({
  uploadData,
  setUploadData,
  handleUploadVideo,
  fieldErrors,
  reRef,
}: Props) => {
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
    <UploadModalStage>
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
              <ErrorText size="small">
                {fieldErrors.thumbnailUrl && fieldErrors.thumbnailUrl[0]}
              </ErrorText>
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
          error={fieldErrors?.tagList && fieldErrors.tagList[0]}
        />

        <VideoDetailsState__TagContainer>
          {uploadData.tagList.length > 0 &&
            uploadData.tagList.map((tag, index) => {
              return (
                <VideoDetailsState__Tag key={tag + index}>{tag}</VideoDetailsState__Tag>
              );
            })}
        </VideoDetailsState__TagContainer>

        <ReCaptchaCheckbox
          reference={reRef}
          error={fieldErrors?.reToken && fieldErrors.reToken[0]}
          onChange={(e) => setUploadData((prevState) => ({ ...prevState, reToken: e }))}
        />

        <Button
          variant="primary"
          type="submit"
          onClick={handleUploadVideo}
          id={MODAL_LAST_FOCUSABLE_ELEMENT}
        >
          Upload
        </Button>
      </VideoDetailsState__FormContainer>
    </UploadModalStage>
  );
};

export default VideoDetailsStage;
