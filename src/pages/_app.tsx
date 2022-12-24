import React from 'react';
import { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import reduxStore from 'Redux/store';
import 'Styles/index.css';

// const { store } = reduxStore;

function TegamiApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Component {...pageProps} />
  );
}

export default TegamiApp;
