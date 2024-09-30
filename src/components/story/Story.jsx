import { useEffect, useState } from 'react';
import style from './Story.module.css';
import LoginAndRegister from '../loginAndRegister/LoginAndRegister';
import Modal from '../modal/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';

function Story({ data, handelClose }) {
  const [num, setNum] = useState(0);
  const [cards, setCards] = useState(data.cards);
  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(false);
  const length = cards.length;
  const token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  user = user && JSON.parse(user);
  const handelPre = () => setNum(c => (c > 0 ? c - 1 : c));
  const handelNext = () => setNum(c => (c < length - 1 ? c + 1 : c));
  const handelDownload = el => {
    var data =
      'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    el.setAttribute('href', 'data:' + data);
    el.setAttribute('download', 'data.json');
  };
  const likeAndSave = async save => {
    if (!token) return setLogin(true);
    try {
      setLoader(true);
      const api = save ? 'save' : 'like';
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${window.backendUrl}api/user/${api}/${data._id}`,
        headers: { token },
        data: {},
      };
      const res = await axios.request(config);
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setLoader(false);
    }
  };
  const handelLike = async () => await likeAndSave(false);
  const handelSave = async () => await likeAndSave(true);
  const handelLogin = () => setLogin(c => !c);
  const downloadData = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;

  const handlers = {
    handelClose,
    downloadData,
    handelLike,
    handelSave,
    handelNext,
  };

  const bookmark = user?.bookmarks?.includes(data._id);
  const like = user?.liked?.includes(data._id);

  return (
    <>
      {login && (
        <Modal text='Login first!' close={handelLogin}>
          <LoginAndRegister auth='login' closeModal={handelLogin} />
        </Modal>
      )}
      <div className={style.storyBg}>
        <div className={style.pre} onClick={handelPre}>
          <img src='/img/pre.png' alt='pre' />
        </div>

        <StoryBox
          data={cards[num]}
          length={length}
          num={num}
          id={data._id}
          handlers={handlers}
          key={num}
          bookmark={bookmark}
          like={like}
        />

        {num === length - 1 ? (
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

function StoryBox({ data, length, num, id, handlers, bookmark, like }) {
  const { handelClose, downloadData, handelLike, handelSave, handelNext } =
    handlers;
  const { heading, description, image } = data;
  const [time, setTime] = useState(0);
  const [copy, setCopy] = useState(false);

  const handelShare = () => {
    navigator.clipboard.writeText(window.fontendUrl + id);
    setMessage('Link copied to clipboard');
  };
  const setMessage = msg => {
    setCopy(msg);
    setTimeout(() => setCopy(false), 3000);
  };
  const likeH = () => {
    setMessage('Liked...');
    handelLike();
  };
  const saveH = () => {
    setMessage('Saved...');
    handelSave();
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

  const styles = { backgroundImage: `url(${image}), url('/img/error.jpg')` };

  return (
    <div className={style.storyBox} style={styles}>
      <div className={style.storyCardBlank}>
        <div className={style.bars}>
          {Array.from({ length }).map((c, i) => (
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
        <p>{description}</p>
        <div className={style.icons}>
          {bookmark ? (
            <div>
              <img src='/img/icons/saved.png' alt='save' />{' '}
            </div>
          ) : (
            <div onClick={saveH}>
              <img src='/img/icons/save.png' alt='save' />{' '}
            </div>
          )}
          <a href={downloadData} download={`${id}.json`}>
            <img src='/img/icons/download.png' width='30px' alt='like' />
          </a>

          {like ? (
            <div>
              <img src='/img/icons/liked.png' alt='like' />
            </div>
          ) : (
            <div onClick={likeH}>
              <img src='/img/icons/like.png' alt='like' />
            </div>
          )}
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
