import NavBar from './NavBar';
import Head from 'next/head';

const Layout = props => (
  <div>
    <Head>
      <title>LyreByrd</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
      />
    </Head>
    <NavBar />
    <style jsx global>{`
      *,
      *::after,
      *::before {
        margin: 0;
        padding-right: 0;
        box-sizing: inheritt;
      }
      html {
        font-size: 62.5%; /*This defines what 1 rem should be */
      }
      body {
        box-sizing: border-box;
        background-color: #dfdcd4; /*changes box model so border and padding are not added */
      }
    `}</style>
    {props.children}
  </div>
);

export default Layout;
