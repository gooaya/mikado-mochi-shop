import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';

import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/with-apollo-client';
import { addLocaleData, IntlProvider } from 'react-intl';
import LocContext from '../components/LocContext';

const lans=[
  'zh_TW',
  'en_US',
  'ko_KR',
  'ja_JP',
  'es_ES',
];

function getLocale(path) {
  const lan = lans.find(a=>path.startsWith('/'+a));
  return lan || null;
}

class MyApp extends App {
  static async getInitialProps (ctx) {
    const { Component } = ctx;
    const props = {
      appLocaleName: getLocale(ctx.ctx.asPath),
    };
    if (Component.getInitialProps) {
      return {
        ...(await Component.getInitialProps(ctx)),
        ...props,
      };
    } else {
      return props;
    }
  }

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
    this.appLocale = {};
    if (props.appLocaleName === 'en_US') {
      this.appLocale = require('../locales/en');
      addLocaleData(this.appLocale.data);
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient, appLocaleName } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <ApolloProvider client={apolloClient}>
              <IntlProvider locale={this.appLocale.locale} messages={this.appLocale.messages}>
                <LocContext.Provider value={appLocaleName}>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </LocContext.Provider>
              </IntlProvider>
            </ApolloProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
