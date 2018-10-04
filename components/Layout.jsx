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

const GithubIcon = () => (<SvgIcon>
  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>
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
          <IconButton
            component="a"
            color="inherit"
            target="blank"
            href="https://github.com/gooaya/mikado-mochi-shop"
            aria-label="GitHub repository"
          >
            <GithubIcon/>
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
