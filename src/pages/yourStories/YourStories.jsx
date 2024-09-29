import Header from '../../components/header/Header';
import StoryCards from '../../components/storyCards/StoryCards';
import style from './YourStories.module.css';
function YourStories() {
  const user = localStorage.getItem('token');
  return (
    <>
      <Header />
      <div className={style.homepage}>
        {user && <StoryCards about='mystories' />}
      </div>
    </>
  );
}

export default YourStories;
