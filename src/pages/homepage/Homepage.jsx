import { useState } from 'react';
import Header from '../../components/header/Header';
import StoryCards from '../../components/storyCards/StoryCards';
import TopicCards from '../../components/topicCard/TopicCard';
import style from './Homepage.module.css';

function Homepage() {
  const [selected, setSelected] = useState([0, 1, 2, 3, 4, 5]);
  const cards = ['all', 'food', 'health', 'movie', 'education', 'travel'];
  const token = localStorage.getItem('token');

  return (
    <>
      <Header />
      <div className={style.homepage}>
        <TopicCards selected={selected} setSelected={setSelected} />
        {token && <StoryCards about='mystories' />}
        {selected.map(c => (
          <StoryCards about={cards[c]} key={c} />
        ))}
      </div>
    </>
  );
}

export default Homepage;
