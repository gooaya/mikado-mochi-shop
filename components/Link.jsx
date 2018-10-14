import React from 'react';
import Link from 'next/link';
import LocContext from './LocContext';

function newPath(language, path) {
  if (!language) {
    return path;
  }
  return '/'+language+path;
}

export default ({href,...rest}) => (
  <LocContext.Consumer>{
    language=>{
      if (typeof(href)==='string') {
        href = {pathname: href};
      }
      href = {
        ...href,
        pathname: newPath(language, href.pathname)
      };
      return <Link {...rest} href={href} />
    }
  }</LocContext.Consumer>
);
