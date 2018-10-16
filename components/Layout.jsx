import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage, defineMessages } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LocContext from './LocContext';

const GithubIcon = () => (<SvgIcon>
  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>
</SvgIcon>);

const GraphQLIcon = () => (<SvgIcon viewBox="0 0 400 400">
  <path d="M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z"/>
  <path d="M39.8 272.2h320.3v16.6H39.8z"/>
  <path d="M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z"/>
  <path d="M54.482 132.883l-8.3-14.375 160.21-92.5 8.3 14.376z"/>
  <path d="M342.568 302.663l-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5zM330.9 107.5h16.6v185h-16.6z"/>
  <path d="M203.522 367l-7.25-12.558 139.34-80.45 7.25 12.557z"/>
  <path d="M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9"/>
</SvgIcon>);

const messages = defineMessages({
  appTitle: {
    id: 'App.title',
    defaultMessage: '土御门麻薯店',
  },
});

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flex: '1 1 auto',
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

/*
zh_CN
zh_TW
en_US
ko_KR
ja_JP
es_ES
*/

const SelectLanguage = () => (
  <LocContext.Consumer>{
    language=>(
      <Select value={language||'zh_CN'}>
        <MenuItem value="zh_CN">
          <Link href={{ pathname: '/'}}>
            简体中文
          </Link>
        </MenuItem>
        <MenuItem value="zh_TW">
          <Link href={{ pathname: '/zh_TW'}}>
            繁體中文
          </Link>
        </MenuItem>
        <MenuItem value="ja_JP">
          <Link href={{ pathname: '/ja_JP'}}>
            日本語
          </Link>
        </MenuItem>
        <MenuItem value="en_US">
          <Link href={{ pathname: '/en_US'}}>
            English
          </Link>
        </MenuItem>
        <MenuItem value="ko_KR">
          <Link href={{ pathname: '/ko_KR'}}>
            한국어
          </Link>
        </MenuItem>
        <MenuItem value="es_ES">
          <Link href={{ pathname: '/es_ES'}}>
            Español
          </Link>
        </MenuItem>
      </Select>
    )
  }</LocContext.Consumer>
);

function Layout(props) {
  const { classes, children } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link href={{ pathname: '/'}}>
            <Typography variant="title" color="inherit" noWrap>
              <FormattedMessage {...messages.appTitle} />
            </Typography>
          </Link>
          <div className={classes.grow} />
          <SelectLanguage/>
          <IconButton
            component="a"
            color="inherit"
            href="/graphql"
            aria-label="Graphql IDE"
          >
            <GraphQLIcon />
          </IconButton>
          <IconButton
            component="a"
            color="inherit"
            target="blank"
            href="https://github.com/gooaya/mikado-mochi-shop"
            aria-label="GitHub repository"
          >
            <GithubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </React.Fragment>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);

function footer(arg) {
  return <div>
    {/* Footer */}
    <footer className={classes.footer}>
      <Typography variant="title" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subheading" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
    </footer>
    {/* End footer */}
  </div>
}
