import { useEffect, useState } from 'react';
import style from './StoryCards.module.css';
import AddStory from '../addStory/AddStory';
import Modal from '../modal/Modal';
import Story from '../story/Story';
import SplashScreen from '../splashScreen/SplashScreen';
import { toast } from 'react-toastify';
import axios from 'axios';

function StoryCards({ about }) {
  const token = localStorage.getItem('token');
  if (about === 'all') return null;

  const [more, setMore] = useState(4);
  const [stories, setStories] = useState([]);
  const [storyData, setStoryData] = useState(null);
  const [loader, setLoader] = useState(false);

  const handelShowStory = data => setStoryData(data);
  const handelHideStory = () => setStoryData(null);
  const handelSeeMore = () => setMore(() => more + 4);

  const length = stories.length;
  const clippedStories = stories.slice(0, more);

  const mystory = about === 'mystories';
  const bookmarks = about === 'bookmarks';
  const heading = mystory
    ? 'Your Stories'
    : bookmarks
    ? 'Your Bookmarks'
    : `Top stories about ${about}`;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        let config;
        if (mystory) {
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${window.backendUrl}api/story/`,
            headers: { token },
            data: {},
          };
        } else if (bookmarks) {
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${window.backendUrl}api/user/bookmarks/`,
            headers: { token },
            data: {},
          };
        } else {
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${window.backendUrl}api/story/category/${about}/`,
            headers: {},
            data: {},
          };
        }

        const res = await axios.request(config);
        setStories(res?.data?.story || []);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.message || err.message;
        toast.error(msg);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [about]);

  return (
    <>
      {storyData && <Story data={storyData} handelClose={handelHideStory} />}
      {loader && <SplashScreen />}
      <div className={style.storyCardsBox}>
        <div className={style.heading}>
          <h1>{heading}</h1>
        </div>
        {length === 0 ? (
          <p className={style.noStory}>No stories available</p>
        ) : (
          <div className={style.storyCards}>
            {clippedStories.map((c, i) => (
              <StoryCard
                data={c}
                key={i}
                editEnable={mystory}
                handelShowStory={handelShowStory}
              />
            ))}
          </div>
        )}

        {length > more && (
          <div className={style.seeBtn}>
            <button onClick={handelSeeMore} className={style.seeBtn}>
              See More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function StoryCard({ data, editEnable, handelShowStory }) {
  const { image, heading, description } = data.cards[0];
  const [edit, setEdit] = useState(false);
  const handelEdit = () => setEdit(c => !c);
  const handelShow = () => handelShowStory(data);

  const styles = { backgroundImage: `url(${image}),  url('/img/error.jpg')` };
  return (
    <>
      <div className={style.StoryCardBox}>
        <div className={style.storyCard} style={styles} onClick={handelShow}>
          <div className={style.storyCardBlank}></div>
          <div className={style.storyCardTexts}>
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
        {editEnable && (
          <div className={style.editBox}>
            <button className={style.edit} onClick={handelEdit}>
              <img src='/img/edit.png' alt='edit' />
              Edit
            </button>
          </div>
        )}
      </div>

      {edit && (
        <Modal close={handelEdit} text='Edit Story'>
          <AddStory
            data={data}
            edit={edit}
            editEnable={editEnable}
            closeModal={handelEdit}
          />
        </Modal>
      )}
    </>
  );
}

export default StoryCards;
