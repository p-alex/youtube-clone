import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../../app/features/videoSlice';
import AutoResizingTextarea from '../../../../ui/AutoResizeTextarea';
import { Button } from '../../../../ui/Button';
import InputGroup from '../../../../ui/InputGroup';
import { imageOptimizer } from '../../../../utils/imageOptimizer';
import { convertToTagList, UploadVideoData } from '../../UploadModal';
import {
  Container,
  FormContainer,
  HiddenInput,
  Tag,
  TagContainer,
  ThumbnailContainer,
} from './style';

const VideoDetailsStage = ({
  uploadData,
  setUploadData,
  handleUploadVideo,
  lastFocusableElement,
}: {
  uploadData: UploadVideoData;
  setUploadData: React.Dispatch<React.SetStateAction<UploadVideoData>>;
  handleUploadVideo: (event: React.FormEvent) => void;
  lastFocusableElement: React.MutableRefObject<any>;
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
    <Container>
      <FormContainer onSubmit={handleUploadVideo}>
        <ThumbnailContainer>
          {!uploadData.thumbnailUrl && (
            <>
              <Button
                variant="normal"
                onClick={() => hiddenInput.current.click()}
                type="button"
              >
                Choose thumbnail
              </Button>
              <HiddenInput
                type="file"
                accept=".jpg, .png"
                ref={hiddenInput}
                required
                onChange={handleChooseThumbnail}
              ></HiddenInput>
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
                Reset
              </Button>
            </>
          )}
        </ThumbnailContainer>

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
          error={undefined}
          // maxLength={100}
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
          error={undefined}
          maxLength={1500}
        />

        <InputGroup
          type="text"
          label="tags"
          placeholder="E.g. tag1, tag2, tag3"
          value={tagsText}
          setValue={(event) => setTagsText(event.target.value)}
          // maxLength={60}
          error={undefined}
        />

        <TagContainer>
          {uploadData.tagList.length > 0 &&
            uploadData.tagList.map((tag, index) => {
              return <Tag key={tag + index}>{tag}</Tag>;
            })}
        </TagContainer>

        <Button variant="primary" type="submit" ref={lastFocusableElement}>
          Upload
        </Button>
      </FormContainer>
    </Container>
  );
};

export default VideoDetailsStage;
