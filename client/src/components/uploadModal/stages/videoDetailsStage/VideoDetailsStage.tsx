import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  disableKeyBinds,
  enableKeyBinds,
} from "../../../../app/features/videoSlice";
import { Input } from "../../../../ui/Input";
import { Button } from "../../../../ui/Button";
import { Textarea } from "../../../../ui/Textarea";
import { imageOptimizer } from "../../../../utils/imageOptimizer";
import { convertToTagList, UploadVideoData } from "../../UploadModal";
import {
  Container,
  FormContainer,
  HiddenInput,
  InputLabel,
  Tag,
  TagContainer,
  ThumbnailContainer,
} from "./style";

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

  const handleChooseThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImageUrl = await imageOptimizer(file.result);
      setUploadData((prevState) => ({
        ...prevState,
        thumbnail_url: optimizedImageUrl,
      }));
    };
  };

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
          {!uploadData.thumbnail_url && (
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
          {uploadData.thumbnail_url && (
            <>
              <Image
                src={uploadData.thumbnail_url}
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
                    thumbnail_url: "",
                  }))
                }
                type="button"
              >
                Reset
              </Button>
            </>
          )}
        </ThumbnailContainer>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          placeholder="Write a title"
          value={uploadData.title}
          onChange={(e) =>
            setUploadData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          required
          maxLength={100}
        />

        <InputLabel htmlFor="description">Description</InputLabel>
        <Textarea
          id="description"
          placeholder="Write a description"
          value={uploadData.description}
          onChange={(e) =>
            setUploadData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          maxLength={1000}
        ></Textarea>

        <InputLabel htmlFor="tags">Tags</InputLabel>
        <Input
          id="tags"
          placeholder="E.g. tag1, tag2, tag3 (minimum 4 tags)"
          onChange={(e) =>
            setUploadData((prevState) => ({
              ...prevState,
              tag_list: convertToTagList(e.target.value),
            }))
          }
          required
          maxLength={60}
        />

        <TagContainer>
          {uploadData.tag_list.length > 0 &&
            uploadData.tag_list.map((tag, index) => {
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
