import NavBar from './NavBar';
import Head from 'next/head';

const navBarStyle = {
  marginBottom: '1%',
};

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

    <style jsx global>{`
      *,
      *::after,
      *::before {
        margin: 0;
        padding-right: 0;
        box-sizing: inheritt;
      }

      .ui.menu {
        font-size: 14px;
      }
      html {
        font-size: 62.5%;
      }

      body {
        box-sizing: border-box;
        background-color: #dfdcd4; /*changes box model so border and padding are not added */
      }
    `}</style>
    <div style={navBarStyle}>
      <NavBar />
    </div>
    {props.children}
  </div>
);

export default Layout;
