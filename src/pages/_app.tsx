import React from 'react';
import Head from 'next/head';
import reduxStore from 'Redux/store';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import 'Styles/index.css';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = reduxStore;

function TegamiApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <meta name="google" content="notranslate" />
          <title>Project XYZ</title>
          <link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Sacramento&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default TegamiApp;
