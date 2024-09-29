import { useState } from 'react';
import style from './TopicCard.module.css';

const topics = [
  { text: 'All', image: '/img/news.jpg' },
  { text: 'Food', image: '/img/food.jpg' },
  { text: 'Health and Fitness', image: '/img/health.jpg' },
  { text: 'Movie', image: '/img/movie.jpg' },
  { text: 'Education', image: '/img/education.jpg' },
];

function TopicCard({ data, selected, handelSelected, num }) {
  const { text, image } = data;
  const styles = {
    backgroundImage: `url(${image})`,
    border: selected
      ? '5px solid var(--blue-color)'
      : '5px solid var(--white-color)',
  };
  return (
    <div
      style={styles}
      className={style.card}
      onClick={() => handelSelected(num)}
    >
      <span>{text}</span>
    </div>
  );
}

//['food', 'health', 'movie', 'education']

function TopicCards({ selected, setSelected }) {
  const handelSelected = num => {
    if (selected.includes(num)) {
      if (num === 0) return setSelected([]);
      setSelected(c => {
        const data = [...c];
        data.splice(data.indexOf(num), 1);
        return data;
      });
    } else {
      if (num === 0) return setSelected([0, 1, 2, 3, 4]);
      setSelected(c => {
        const data = [...c];
        data.push(num);
        return data;
      });
    }
  };
  return (
    <div className={style.cards}>
      {topics.map((c, i) => (
        <TopicCard
          data={c}
          key={i}
          num={i}
          selected={selected.includes(i)}
          handelSelected={handelSelected}
        />
      ))}
    </div>
  );
}

export default TopicCards;
