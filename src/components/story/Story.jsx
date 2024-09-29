import { useEffect, useState } from 'react';
import style from './Story.module.css';
import LoginAndRegister from '../loginAndRegister/LoginAndRegister';
import Modal from '../modal/Modal';
let images = [
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688668162918_coffee19001941280.jpg',
  'https://images1.wionews.com/images/wion/900x1600/2024/9/27/1727422226244_pexelsekaterinabolovtsova5662386.jpg',
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688668754955_chocolate5514241280.jpg',
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688668871745_hersheys64929261280.jpg',
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688669093025_cinnamonsticks58282411280.jpg',
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688668754955_chocolate5514241280.jpg',
];
const story = images.map((c, i) => {
  return {
    image: c,
    heading: 'Test Heading ' + i,
    desc: i + 'Test description fdjflf fjdfkja f fdkfj lkfjdlkf jkl fa ',
  };
});

console.log(story);

function Story({ id, handelClose }) {
  const [num, setNum] = useState(0);

  const token = localStorage.getItem('token');
  const [login, setLogin] = useState(false);

  const handelPre = () => setNum(c => (c > 0 ? c - 1 : c));
  const handelNext = () => setNum(c => (c < story.length - 1 ? c + 1 : c));

  const handelDownload = () => null;
  const handelLike = () => null;
  const handelSave = () => null;
  const handelLogin = () => setLogin(c => !c);

  const handlers = {
    handelClose,
    handelDownload,
    handelLike,
    handelSave,
    handelNext,
  };

  return (
    <>
      {login && (
        <Modal text='Login first!' close={handelLogin}>
          <LoginAndRegister auth='login' />
        </Modal>
      )}
      <div className={style.storyBg}>
        <div className={style.pre} onClick={handelPre}>
          <img src='/img/pre.png' alt='pre' />
        </div>

        <StoryBox
          data={story[num]}
          length={story.length}
          num={num}
          handlers={handlers}
          key={num}
          id={id}
        />

        {num === story.length - 1 ? (
          <div className={style.next} onClick={() => setNum(0)}>
            <img src='/img/replay.png' width='60px' alt='next' />{' '}
          </div>
        ) : (
          <div className={style.next} onClick={handelNext}>
            <img src='/img/next.png' width='60px' alt='next' />{' '}
          </div>
        )}
      </div>
    </>
  );
}

function StoryBox({ data, length, num, id, handlers }) {
  const { handelClose, handelDownload, handelLike, handelSave, handelNext } =
    handlers;
  const { heading, desc, image } = data;
  const [time, setTime] = useState(0);
  const [copy, setCopy] = useState(false);

  const handelShare = () => {
    navigator.clipboard.writeText(`link copies......${id}`);
    setCopy('Link copied to clipboard');
    setTimeout(() => setCopy(false), 3000);
  };

  useEffect(() => {
    if (time >= 10) {
      handelNext();
      return;
    }
    const intervalId = setInterval(() => {
      setTime(t => t + 0.02);
    }, 10);
    return () => clearInterval(intervalId);
  }, [time]);

  const styles = { backgroundImage: `url(${image})` };
  return (
    <div className={style.storyBox} style={styles}>
      <div className={style.storyCardBlank}>
        <div className={style.bars}>
          {story.map((c, i) => (
            <Bar key={i} num={num} i={i} length={length} time={time} />
          ))}
        </div>
        <div className={style.icons}>
          <div onClick={handelClose}>
            <img src='/img/icons/close.png' alt='close' />
          </div>
          <div onClick={handelShare}>
            <img src='/img/icons/share.png' alt='share' />
          </div>
        </div>
      </div>
      <div className={style.storyCardTexts}>
        {copy && <button className={style.copy}>{copy}</button>}
        <h1>{heading}</h1>
        <p>{desc}</p>
        <div className={style.icons}>
          <div onClick={handelSave}>
            <img src='/img/icons/save.png' alt='save' />
          </div>
          <div onClick={handelDownload}>
            <img src='/img/icons/download.png' width='30px' alt='like' />
          </div>
          <div onClick={handelLike}>
            <img src='/img/icons/like.png' alt='like' />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({ i, num, length, time }) {
  const styles2 = { width: `${100 / length}%` };
  const styles3 = {
    backgroundColor: 'var(--white-color)',
    width: `100%`,
  };
  const styles4 = {
    backgroundColor: 'var(--white-color)',
    width: `${time * 10}%`,
  };
  const styles = i === num ? styles4 : i < num ? styles3 : {};
  return (
    <div className={style.barBox} key={i} style={styles2}>
      <span className={style.bar} style={styles}></span>
    </div>
  );
}

export default Story;
