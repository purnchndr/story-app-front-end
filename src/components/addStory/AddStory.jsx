import { useEffect, useState } from 'react';
import style from './AddStory.module.css';
import { toast } from 'react-toastify';
import SplashScreen from '../splashScreen/SplashScreen';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStory({ data, editEnable, closeModal }) {
  const [selected, setSelected] = useState(0);
  const [slides, setSlides] = useState(data?.cards || [{}, {}, {}]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
  const handelPost = async () => {
    try {
      const sendMessage = (msg, i) => {
        setError(msg);
        setSelected(i);
        toast.error(msg);
      };
      for (let [i, d] of slides.entries()) {
        const { heading, description, category, image } = d;
        if (!heading) return sendMessage(`Enter Heading in Slide ${i + 1}`, i);
        if (!description)
          return sendMessage(`Enter Description in Slide ${i + 1}`, i);
        if (!image) return sendMessage(`Enter Image Url in Slide ${i + 1}`, i);
      }
      setLoading(true);
      const cards = slides.map((c, i) => {
        return {
          heading: c.heading,
          image: c.image,
          description: c.description,
        };
      });
      const category = slides[0].category;
      if (!category) return sendMessage(`Select Category in Slide ${1}`, 0);
      let config;
      if (editEnable) {
        console.log('Updating');
        config = {
          method: 'patch',
          maxBodyLength: Infinity,
          url: `${window.backendUrl}api/story/${data._id}/`,
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          data: { cards, category },
        };
      } else {
        console.log('submitting');
        config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: window.backendUrl + 'api/story/',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          data: { cards, category },
        };
      }
      const res = await axios.request(config);
      console.log(res);
      navigate('/your-stories');
      closeModal();
      toast.success(res?.data?.message || 'Success');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
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
            category={data?.category || ''}
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

function StoryInputs({ sendData, data, category: cat }) {
  const [heading, setHeading] = useState(data.heading || '');
  const [description, setDescription] = useState(data.description || '');
  const [image, setUrl] = useState(data.image || '');
  const [category, setCategory] = useState(cat || '');

  const handelHeading = e => setHeading(e.target.value);
  const handelDesc = e => setDescription(e.target.value);
  const handelUrl = e => setUrl(e.target.value);
  const handelCategory = e => setCategory(e.target.value);
  const handelData = () => sendData({ heading, description, image, category });
  useEffect(handelData, [heading, description, image, category]);

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
          value={description}
          onChange={handelDesc}
          placeholder='Story Description'
        />
      </div>
      <div className={style.input}>
        <label>Image Url: </label>
        <input
          type='url'
          value={image}
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
          <option value='travel'>Travel</option>
          <option value='movie'>Movie</option>
          <option value='education'>education</option>
        </select>
      </div>
    </div>
  );
}

export default AddStory;
