/*eslint-disable react/jsx-props-no-spreading*/
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { StoreProvider, createStore, Store } from '../store';

export default class extends React.Component {
  static async getInitialProps(appContext: any): Promise<any> {
    const store = createStore({});

    //eslint-disable-next-line no-param-reassign
    appContext.ctx.store = store;
    const appProps = await App.getInitialProps(appContext);

    if (typeof window === 'undefined') {
      await store.nextInit();
    }

    return {
      ...appProps,
      initialState: store,
    };
  }

  store!: Store;

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer
      ? props.initialState
      : createStore(props.initialState);
  }

  render() {
    return (
      <NextApp
        {...this.props}
        store={this.store}
      />
    );
  }
}

class NextApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <StoreProvider value={this.props.store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StoreProvider>
      </>
    );
  }
}
