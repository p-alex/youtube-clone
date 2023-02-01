import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { dateConverter } from '../../utils/dateConverter';
import ManageVideoCardFunctions from './ManageVideoCardFunctions/ManageVideoCardFunctions';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import {
  ManageVideoCard__Container,
  ManageVideoCard__Details,
  ManageVideoCard__Image,
  ManageVideoCard__Item,
  ManageVideoCard__Items,
  ManageVideoCard__Title,
} from './ManageVideoCard.styles';
import { videoDurationFormatter } from '../../utils/videoDurationFormatter';
import { IVideo } from '../../app/features/manageVideo';
import VideoDuration from '../../ui/VideoDuration';

const ManageVideoCard = ({ video }: { video: IVideo }) => {
  return (
    <ManageVideoCard__Container key={video.video_id}>
      <Link href={`/videos/${video.video_id}`}>
        <a>
          <ManageVideoCard__Image>
            <Image src={video.thumbnail_url} width={700} height={393.75} alt="" />
            <VideoDuration>{videoDurationFormatter(video.duration)}</VideoDuration>
          </ManageVideoCard__Image>
        </a>
      </Link>

      <ManageVideoCard__Details>
        <ManageVideoCard__Title>{video.title}</ManageVideoCard__Title>
        <ManageVideoCard__Items>
          <ManageVideoCard__Item>{video.views} views</ManageVideoCard__Item>
          <ManageVideoCard__Item>
            <MdThumbUp />
            {video.total_likes}
          </ManageVideoCard__Item>
          <ManageVideoCard__Item>
            <MdThumbDown /> {video.total_dislikes}
          </ManageVideoCard__Item>
          <ManageVideoCard__Item>
            {dateConverter(new Date(video.created_at).getTime())}
          </ManageVideoCard__Item>
        </ManageVideoCard__Items>
      </ManageVideoCard__Details>
      <ManageVideoCardFunctions video={video} />
    </ManageVideoCard__Container>
  );
};

export default ManageVideoCard;
