import style from './Bookmarks.module.css';

import Header from '../../components/header/Header';
import StoryCards from '../../components/storyCards/StoryCards';

function Bookmarks() {
  return (
    <>
      <Header />
      <StoryCards about='bookmarks' />
    </>
  );
}

export default Bookmarks;
