import { useState } from 'react';
import style from './StoryCards.module.css';
import AddStory from '../addStory/AddStory';
import Modal from '../modal/Modal';
import Story from '../story/Story';
const image =
  'https://images1.wionews.com/images/wion/900x1600/2023/7/6/1688668754955_chocolate5514241280.jpg';

function StoryCards({ about }) {
  if (about === 'all') return null;
  const dummystories = [
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
    {
      img: image,
      heading: 'This is test heading',
      text: 'this is test text this is test text this is test text this is test textthis is test textthis is test text this is test text',
    },
  ];
  const [more, setMore] = useState(4);
  const [stories, setStories] = useState(dummystories);
  const [show, setShow] = useState(null);

  const handelShowStory = id => setShow(id);
  const handelHideStory = () => setShow(null);

  const length = stories.length;

  const clippedStories = stories.slice(0, more);

  const handelSeeMore = () => setMore(() => more + 4);
  const mystory = about === 'mystories';
  const bookmarks = about === 'bookmarks';
  // console.log(show);

  return (
    <>
      {show && <Story id={show} handelClose={handelHideStory} />}
      <div className={style.storyCardsBox}>
        <div className={style.heading}>
          <h1>
            {mystory
              ? 'Your Stories'
              : bookmarks
              ? 'Your Bookmarks'
              : `Top stories about ${about}`}
          </h1>
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
  const { img, heading, text } = data;
  const [edit, setEdit] = useState(false);
  const handeleEdit = () => setEdit(c => !c);
  const handelShow = () => handelShowStory('id');
  const sData = [
    {
      heading: 'Heading',
      desc: 'description',
      category: 'education',
      url: 'url',
    },
    {
      heading: 'Heading',
      desc: 'description',
      category: 'education',
      url: 'url',
    },
    {
      heading: 'Heading',
      desc: 'description',
      category: 'education',
      url: 'url',
    },
    {
      heading: 'Heading',
      desc: 'description',
      category: 'education',
      url: 'url',
    },
  ];

  const styles = { backgroundImage: `url(${img})` };
  return (
    <>
      <div className={style.StoryCardBox}>
        <div className={style.storyCard} style={styles} onClick={handelShow}>
          <div className={style.storyCardBlank}></div>
          <div className={style.storyCardTexts}>
            <h1>{heading}</h1>
            <p>{text}</p>
          </div>
        </div>
        {editEnable && (
          <div className={style.editBox}>
            <button className={style.edit} onClick={handeleEdit}>
              <img src='/img/edit.png' alt='edit' />
              Edit
            </button>
          </div>
        )}
      </div>

      {edit && (
        <Modal close={handeleEdit} text='Edit Story'>
          <AddStory
            data={sData}
            edit={edit}
            editEnable={editEnable}
            closeModal={handeleEdit}
          />
        </Modal>
      )}
    </>
  );
}

export default StoryCards;
