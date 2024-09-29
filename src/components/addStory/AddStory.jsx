import { useEffect, useState } from 'react';
import style from './AddStory.module.css';
import { toast } from 'react-toastify';
import SplashScreen from '../splashScreen/SplashScreen';

function AddStory({ data, editEnable, closeModal }) {
  const [selected, setSelected] = useState(0);
  const slide = data || [{}, {}, {}];
  const [slides, setSlides] = useState(slide);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const addSlide = () => {
    setSlides(c => [...c, {}]);
    setSelected(slides.length);
  };
  const handelSelected = num => setSelected(num);
  const handelDelete = (e, num) => {
    e.stopPropagation();
    setSelected(num - 1);
    setSlides(c => {
      let data = [...c];
      data.splice(num, 1);
      return data;
    });
  };
  const handelPre = () => setSelected(c => (c > 0 ? c - 1 : c));
  const handelNext = () =>
    setSelected(c => (c < slides.length - 1 ? c + 1 : c));
  const handelData = item => {
    setSlides(d => {
      let data = [...d];
      data[selected] = item;
      return data;
    });
  };
  const handelPost = () => {
    const sendMessage = (msg, i) => {
      setError(msg);
      setSelected(i);
      toast.error(msg);
    };
    for (let [i, d] of slides.entries()) {
      const { heading, desc, category, url } = d;
      if (!heading) return sendMessage(`Enter Heading in Slide ${i + 1}`, i);
      if (!desc) return sendMessage(`Enter Description in Slide ${i + 1}`, i);
      if (!category) return sendMessage(`Select Category in Slide ${i + 1}`, i);
      if (!url) return sendMessage(`Enter Image Url in Slide ${i + 1}`, i);
    }

    if (editEnable) {
      console.log('submitted');

      // setLoading(true);
      toast.success('Story Updated ' + data._id);
    } else {
      console.log('submitted');
      setLoading(true);
      toast.success('Story Published');
    }
    closeModal();
  };

  return (
    <>
      <div className={style.addStory}>
        <div className={style.inputBox}>
          <div className={style.selectors}>
            {slides.map((c, i) => (
              <NumberBox
                num={i + 1}
                key={i}
                handelSelected={handelSelected}
                handelDelete={handelDelete}
                selected={selected + 1}
              />
            ))}
            {slides.length < 6 && (
              <NumberBox num={null} addSlide={addSlide} selected={null} />
            )}
          </div>
          <StoryInputs
            sendData={handelData}
            data={slides[selected]}
            key={selected}
          />
        </div>

        {error && <p className={style.error}>{error}</p>}
        <div className={style.buttons}>
          <div className={style.navigationBtns}>
            <button className={style.pre} onClick={handelPre}>
              Previous
            </button>
            <button className={style.next} onClick={handelNext}>
              Next
            </button>
          </div>
          <button className={style.post} onClick={handelPost}>
            {editEnable ? 'Publish Changes' : 'Post'}
          </button>
        </div>
      </div>
      {loading && <SplashScreen />}
    </>
  );
}

function NumberBox({ num, selected, addSlide, handelSelected, handelDelete }) {
  const styles =
    selected === num
      ? { border: '2px solid var(--blue-color)' }
      : { border: '2px solid var(--white-color)' };
  return (
    <>
      {num ? (
        <div
          className={style.numBox}
          style={styles}
          onClick={() => handelSelected(num - 1)}
        >
          {num > 3 && (
            <span
              className={style.delete}
              onClick={e => handelDelete(e, num - 1)}
            >
              <img width='20px' src='/img/close.png' alt='delete' />
            </span>
          )}
          <p>Slide {num}</p>
        </div>
      ) : (
        <div className={style.numBox} onClick={addSlide}>
          <p>Add +</p>
        </div>
      )}
    </>
  );
}

function StoryInputs({ sendData, data }) {
  const [heading, setHeading] = useState(data.heading || '');
  const [desc, setDesc] = useState(data.desc || '');
  const [url, setUrl] = useState(data.url || '');
  const [category, setCategory] = useState(data.category || '');

  const handelHeading = e => setHeading(e.target.value);
  const handelDesc = e => setDesc(e.target.value);
  const handelUrl = e => setUrl(e.target.value);
  const handelCategory = e => setCategory(e.target.value);
  const handelData = () => sendData({ heading, desc, url, category });
  useEffect(handelData, [heading, desc, url, category]);

  return (
    <div className={style.inputs}>
      <div className={style.input}>
        <label>Heading: </label>
        <input
          type='text'
          value={heading}
          onChange={handelHeading}
          placeholder='Your Heading'
        />
      </div>
      <div className={style.input}>
        <label>Description: </label>
        <textarea
          value={desc}
          onChange={handelDesc}
          placeholder='Story Description'
        />
      </div>
      <div className={style.input}>
        <label>Image Url: </label>
        <input
          type='url'
          value={url}
          onChange={handelUrl}
          placeholder='Add Image Url'
        />
      </div>
      <div className={style.input}>
        <label>Category: </label>
        <select
          value={category}
          onChange={handelCategory}
          placeholder='Select Category'
        >
          <option value=''>Select Category</option>
          <option value='food'>Food</option>
          <option value='health'>Health and Fitness</option>
          <option value='travel'>travel</option>
          <option value='movie'>movie</option>
          <option value='education'>education</option>
        </select>
      </div>
    </div>
  );
}

export default AddStory;
