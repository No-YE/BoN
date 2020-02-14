import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import initializeStore, { RootStore, StoreProvider } from '../store';

export default class extends React.Component {
  static async getInitialProps(appContext: any) {
    const store = initializeStore({});
    appContext.ctx.store = store;
    const appProps = await App.getInitialProps(appContext);
    store.nextInit();

    return {
      ...appProps,
      initialState: store,
    };
  }

  store!: RootStore;

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer ?
      props.initialState :
      initializeStore(props.initialState);
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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
