import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { useState } from 'react';
import Modal from '../modal/Modal';
import LoginAndRegister from '../loginAndRegister/LoginAndRegister';
import AddStory from '../addStory/AddStory';

function Header() {
  const [profile, setProfile] = useState(false);
  const [modal, setModal] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const handelLogin = () => setModal('login');
  const handelRegister = () => setModal('register');
  const handelAdd = () => setModal('add');
  const closeModal = () => setModal(false);
  const setProfileView = () => setProfile(() => !profile);
  const handelMobileView = () => setMobileView(c => !c);

  window.onresize = function (event) {
    const size = window.innerWidth;
    if (size <= 450) setMobileView(true);
    else setMobileView(false);
  };

  const token = localStorage.getItem('token');
  const name = 'Purnachandra';

  const logout = () => {
    localStorage.removeItem('token');
    setProfileView();
  };

  return (
    <>
      <ModalBox modal={modal} closeModal={closeModal} />
      <header className={style.header}>
        <div className={style.logo}>
          <Link to='/'>Storyfy</Link>
        </div>

        <div className={style.btns}>
          {mobileView ? (
            <MobileViewBtns
              handelAdd={handelAdd}
              handelRegister={handelRegister}
              handelLogin={handelLogin}
              handelMobileView={handelMobileView}
              logout={logout}
              token={token}
              name={name}
            />
          ) : (
            <DesktopViewBtns
              handelAdd={handelAdd}
              setProfileView={setProfileView}
              handelRegister={handelRegister}
              handelLogin={handelLogin}
              profile={profile}
              token={token}
              logout={logout}
              name={name}
            />
          )}
          <img
            width='30px'
            src='/img/menu.png'
            alt='menu'
            onClick={setProfileView}
            className={style.menuBtn0}
          />
          <img
            className={style.menuBtn1}
            width='30px'
            src='/img/menu.png'
            alt='menu'
            onClick={handelMobileView}
          />
        </div>
      </header>
    </>
  );
}

function DesktopViewBtns({
  handelAdd,
  setProfileView,
  handelRegister,
  handelLogin,
  token,
  profile,
  logout,
  name,
}) {
  return (
    <>
      {token ? (
        <div className={style.profile} style={null}>
          <Link to='/bookmarks'>
            <button className={style.bookmarks}>
              <img width='15px' src='/img/bookmark.png' /> Bookmarks
            </button>
          </Link>
          <button className={style.addstory} onClick={handelAdd}>
            Add Story
          </button>
          <img
            width='30px'
            src='/img/profile.png'
            alt='profile'
            onClick={setProfileView}
          />
        </div>
      ) : (
        <div className={style.authBtnsHide}>
          <div className={style.authBtns}>
            <button className={style.register} onClick={handelRegister}>
              Register Now
            </button>
            <button className={style.signin} onClick={handelLogin}>
              Sign in
            </button>
          </div>
        </div>
      )}
      {profile && (
        <div className={style.profileInfo}>
          <p>{name}</p>
          <button className={style.logout} onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
}

function MobileViewBtns({
  handelAdd,
  token,
  handelLogin,
  handelRegister,
  handelMobileView,
  logout,
  name,
}) {
  return (
    <>
      <div className={style.profile} style={{ display: 'flex' }}>
        {token ? (
          <>
            <div className={style.mobileProfile}>
              <img width='30px' src='/img/profile.png' alt='profile' />
              <p>{name}</p>
              <img
                width='20px'
                src='/img/icons/close2.png'
                alt='profile'
                onClick={handelMobileView}
              />
            </div>
            <Link to='/your-stories'>
              <button className={style.bookmarks}>Your Stories</button>
            </Link>
            <Link to='/bookmarks'>
              <button className={style.bookmarks}>
                <img width='15px' src='/img/bookmark.png' /> Bookmarks
              </button>
            </Link>

            <button className={style.addstory} onClick={handelAdd}>
              Add Story
            </button>
            <button className={style.logout} onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <div className={style.authBtns}>
            <button className={style.register} onClick={handelRegister}>
              Register Now
            </button>
            <button className={style.signin} onClick={handelLogin}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function ModalBox({ modal, closeModal }) {
  return (
    <>
      {modal === 'login' && (
        <Modal close={closeModal}>
          <LoginAndRegister auth='login' closeModal={closeModal} />
        </Modal>
      )}
      {modal === 'register' && (
        <Modal close={closeModal}>
          <LoginAndRegister auth='register' closeModal={closeModal} />
        </Modal>
      )}
      {modal === 'add' && (
        <Modal text={'Test heading'} close={closeModal}>
          <AddStory closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default Header;
