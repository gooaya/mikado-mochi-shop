import React from 'react';
import Layout from '../components/Layout';
import Monster from '../components/Monster';

export default class MonsterPage extends React.Component {
  static async getInitialProps (ctx) {
    return { pageProps: { query: ctx.ctx.query } };
  }
  render() {
    return (<Layout>
      <Monster descId={this.props.query.descId} />
    </Layout>);
  }
}
