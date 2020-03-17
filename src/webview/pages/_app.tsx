/*eslint-disable @typescript-eslint/no-explicit-any*/
/*eslint-disable react/jsx-props-no-spreading*/
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import { StoreProvider, createStore, Store } from '../store';
import 'react-markdown-editor-lite/lib/index.css';
import '../styles/global.css';
import 'highlight.js/styles/github.css';
import Float from '../componets/Float';

export default class extends React.Component {
  static async getInitialProps(appContext: any): Promise<any> {
    const store = createStore({});

    //eslint-disable-next-line no-param-reassign
    appContext.ctx.store = store;
    const appProps = await App.getInitialProps(appContext);

    if (typeof window === 'undefined') {
      store.setUser(appContext.ctx.req.session?.user);
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

  render(): JSX.Element {
    return (
      <NextApp
        {...this.props}
        store={this.store}
      />
    );
  }
}

class NextApp extends App<any> {
  render(): JSX.Element {
    const {
      Component, pageProps, router, store,
    } = this.props;

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
            {router.pathname !== '/write-post' && store.user?.role === 'admin'
              ? <Float />
              : null}
          </ThemeProvider>
        </StoreProvider>
      </>
    );
  }
}
