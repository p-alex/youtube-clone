import React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {
  Header,
  RatioBar,
  ReactAndRatioContainer,
  ReactBtn,
  ReactBtnContainer,
  ReactContainer,
  Stats,
  Title,
} from './style';
import useAuth from '../../hooks/useAuth';

const VideoHeader = () => {
  const { isAuth } = useAuth();
  return (
    <Header>
      <Title>Norwegians React to Stereotypes</Title>
      <ReactContainer>
        <Stats>
          <span>37,940 views</span>
          <span>•</span>
          <span>3 hours ago</span>
        </Stats>
        <ReactAndRatioContainer>
          <ReactBtnContainer>
            <ReactBtn disabled={!isAuth}>
              <ThumbUpOffAltIcon /> 99
            </ReactBtn>
            <ReactBtn disabled={!isAuth}>
              <ThumbDownOffAltIcon /> 2
            </ReactBtn>
          </ReactBtnContainer>
          <RatioBar width={(99 / 101) * 100}></RatioBar>
        </ReactAndRatioContainer>
      </ReactContainer>
    </Header>
  );
};

export default VideoHeader;
