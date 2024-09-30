import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import StoryCards from '../../components/storyCards/StoryCards';
import style from './YourStories.module.css';
import { useEffect } from 'react';
function YourStories() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) navigate('/');
  });
  return (
    <>
      <Header />
      <div className={style.homepage}>
        {token && <StoryCards about='mystories' />}
      </div>
    </>
  );
}

export default YourStories;
