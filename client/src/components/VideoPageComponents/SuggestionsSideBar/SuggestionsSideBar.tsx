import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestions } from '../../../app/features/suggestionsSlice';
import { IVideoSmall, VideoInfo } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import useAxios from '../../../hooks/requestHooks/useAxios';
import NoResultsMessage from '../../../ui/NoResultsMessage';
import SuggestionCard from '../../Cards/SuggestionCard/SuggestionCard';
import { SuggestionsSideBar__Container } from './SuggestionsSideBar.style';

interface ISuggestionsSideBar {
  video: VideoInfo;
  isTheatreMode: boolean;
}

const SuggestionsSideBar = ({ video, isTheatreMode }: ISuggestionsSideBar) => {
  const router = useRouter();
  const { suggestions, page } = useSelector((state: RootState) => state.suggestions);
  const dispatch = useDispatch();

  const videoId = router.query.videoId;

  const suggestionsRequestedOnce = useRef(false);

  const [getSuggestedVideos, { isLoading, errors }] = useAxios<
    { videoId: string; page: number; title: string; description: string },
    { suggestedVideos: IVideoSmall[] }
  >('api/videos/suggested', 'POST');

  const handleGetSuggestedVideos = async () => {
    const response = await getSuggestedVideos({
      videoId: video.video_id,
      title: video.title,
      description: video.description,
      page,
    });
    if (response.result) {
      dispatch(setSuggestions({ suggestions: response.result.suggestedVideos }));
    }
  };

  useEffect(() => {
    handleGetSuggestedVideos();
    return () => {
      suggestionsRequestedOnce.current = true;
    };
  }, [videoId]);

  return (
    <SuggestionsSideBar__Container isTheatreMode={isTheatreMode}>
      {!suggestions.length && suggestionsRequestedOnce && (
        <NoResultsMessage message={'No suggestions found...'} />
      )}
      {suggestions.map((video, index) => {
        return <SuggestionCard key={index} video={video} />;
      })}
    </SuggestionsSideBar__Container>
  );
};

export default SuggestionsSideBar;
