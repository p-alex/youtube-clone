import Image from "next/image";
import Link from "next/link";
import React from "react";
import { dateConverter } from "../../utils/dateConverter";
import ManageVideoCardFunctions from "./manageVideoCardFunctions/ManageVideoCardFunctions";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import {
  VideoCard,
  VideoDetailItem,
  VideoDetailItems,
  VideoDetails,
  VideoDuration,
  VideoImage,
  VideoTitle,
} from "./style";
import { videoDurationFormatter } from "../../utils/videoDurationFormatter";
import { IVideo } from "../../app/features/manageVideo";

const ManageVideoCard = ({ video }: { video: IVideo }) => {
  return (
    <VideoCard key={video.video_id}>
      <Link href={`/videos/${video.video_id}`}>
        <a>
          <VideoImage>
            <Image
              src={video.thumbnail_url}
              width={700}
              height={393.75}
              alt=""
            />
            <VideoDuration>
              {videoDurationFormatter(video.duration)}
            </VideoDuration>
          </VideoImage>
        </a>
      </Link>

      <VideoDetails>
        <VideoTitle>{video.title}</VideoTitle>
        <VideoDetailItems>
          <VideoDetailItem>{video.views} views</VideoDetailItem>
          <VideoDetailItem>
            <MdThumbUp />
            {video.total_likes}
          </VideoDetailItem>
          <VideoDetailItem>
            <MdThumbDown /> {video.total_dislikes}
          </VideoDetailItem>
          <VideoDetailItem>
            {dateConverter(new Date(video.created_at).getTime())}
          </VideoDetailItem>
        </VideoDetailItems>
      </VideoDetails>
      <ManageVideoCardFunctions video={video} />
    </VideoCard>
  );
};

export default ManageVideoCard;
