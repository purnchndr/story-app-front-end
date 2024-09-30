import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bookmarks from './pages/bookmarks/Bookmarks';
import YourStories from './pages/yourStories/YourStories';
import StoryPage from './pages/storyPage/StoryPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/bookmarks',
    element: <Bookmarks />,
  },

  {
    path: '/your-stories',
    element: <YourStories />,
  },
  {
    path: '/:id',
    element: <StoryPage />,
  },

  {
    path: '*',
    element: <center>Error Happen</center>,
    errorElement: <center>Error Happen</center>,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
