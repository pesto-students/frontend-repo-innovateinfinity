import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { differenceInMilliseconds } from "date-fns";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import Routes from "./Routes";
import Page from "./MainLayouts/Page";
import "./App.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import 'react-toastify/dist/ReactToastify.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-lightbox/style.css";
import "aos/dist/aos.css";
import { getRefreshToken, logout } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';

const App = () => {

  const dispatch = useDispatch();
  const loaderStatus = useSelector(state => state.loaderReducer);

  // dont use useffect because , it dispactches setAuthtoken and other requests fails

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }


  if (localStorage.loginTimeStamp && localStorage.refreshToken && localStorage.token) {
    const currentTimeStamp = new Date();

    const firstLogin = new Date(localStorage.firstLogin);

    // 7 days
    if (differenceInMilliseconds(currentTimeStamp, firstLogin) > 604800000) {
      dispatch(logout())
    }

    const loginTimeStamp = new Date(localStorage.loginTimeStamp);
    // 50 minutes
    if (differenceInMilliseconds(currentTimeStamp, loginTimeStamp) >= 3000000) {
      console.log("here")
      const data = {
        refreshToken: localStorage.refreshToken
      }
      dispatch(getRefreshToken(data))
    }
    
  }

  return (
    <Page>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={{ xs: 'center', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        style={{
          display: loaderStatus === false ? 'none' : undefined,
          height: '100%',
          width: '100%',
          position: 'fixed',
          zIndex: 10000,
          backgroundColor: 'lightgray',
          opacity: '75%',
        }} >
        <CircularProgress />
      </Box>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Page>
  );
};

export default App;
