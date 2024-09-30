import Header from '../../components/header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './StoryPage.module.css';
import Story from '../../components/story/Story';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SplashScreen from '../../components/splashScreen/SplashScreen';

function StoryPage() {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [story, setStory] = useState(null);
  const navigate = useNavigate();
  const id = location.pathname;

  const redirect = () => navigate('/');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${window.backendUrl}api/story/${id}/`,
          headers: {},
          data: {},
        };
        const res = await axios.request(config);
        setStory(res.data?.story || []);
        console.log(res);
        const data = res.data;
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.message || err.message;
        toast.error(msg);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      {loader && <SplashScreen />}
      {story && <Story data={story} handelClose={redirect} />}
    </>
  );
}

export default StoryPage;
