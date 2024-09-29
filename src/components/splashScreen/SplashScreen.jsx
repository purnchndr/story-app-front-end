import style from './SplashScreen.module.css';
function SplashScreen({ text }) {
  return (
    <div className={style.splashScreen}>
      <div className={style.breathingButton}>
        <p className={style.text}>Storyfy</p>
        {/* <img src='/img/logo.png' alt='splash screen' /> */}
      </div>
    </div>
  );
}

export default SplashScreen;
