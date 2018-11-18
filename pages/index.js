import Link from 'next/link';

import Layout from './components/Layout.js';

const Index = () => (
  <Layout>
    <div className="container">
      <div className="top-bar">
        <div className="top left-img">image</div>
        <div className="top app-name">App Name</div>
        <div className="top signup">Signup button</div>
        <div className=" social-logins">
          <div className="login-link icon">
            <div>
              <Link href="login">Login</Link>
            </div>
            <div />
          </div>
          <div className="login-link spotify icon">
            Login with Spotify <div className="icon" />
          </div>
          <div className="login-link google icon">
            Login with Google <div className="icon" />
          </div>
        </div>
      </div>
      <div className="img-header" />
      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-rows: 100px 1fr;
            margin: 40px;
          }
          .top-bar {
            display: grid;
            grid-template-columns: 165px auto 200px 200px;
            grid-gap: 10px;
          }
          .img-header {
            display: grid;
            height: 600px;
            grid-row-start: 2;
            margin-top: 13px;
            border-radius: 6px;
            background-image: url(https://via.placeholder.com/1364X600);
          }
        `}
      </style>
    </div>
  </Layout>
);

export default Index;
