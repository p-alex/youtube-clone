import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestions } from '../../../app/features/suggestionsSlice';
import { IVideoSmall, VideoInfo } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import useAxios from '../../../hooks/requestHooks/useAxios';
import SuggestionCard from '../../SuggestionCard/SuggestionCard';
import {
  SuggestionsContainer,
  SuggestionsNoResults,
  SuggestionsNoResultsMessage,
} from './SuggestionsSideBar.style';

interface ISuggestionsSideBar {
  video: VideoInfo;
  isTheatreMode: boolean;
}

const SuggestionsSideBar = ({ video, isTheatreMode }: ISuggestionsSideBar) => {
  const { suggestions, page } = useSelector((state: RootState) => state.suggestions);
  const dispatch = useDispatch();

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
    if (!suggestionsRequestedOnce.current) {
      handleGetSuggestedVideos();
    }
    return () => {
      suggestionsRequestedOnce.current = true;
    };
  }, [suggestions]);

  return (
    <SuggestionsContainer isTheatreMode={isTheatreMode}>
      {!suggestions.length && suggestionsRequestedOnce && (
        <SuggestionsNoResults className="noResults">
          <Image src="/svg/no-results.svg" width={104} height={120} alt="" />
          <SuggestionsNoResultsMessage>
            No suggestions found...
          </SuggestionsNoResultsMessage>
        </SuggestionsNoResults>
      )}
      {suggestions.map((video, index) => {
        return <SuggestionCard key={index} video={video} />;
      })}
    </SuggestionsContainer>
  );
};

export default SuggestionsSideBar;
