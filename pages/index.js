import Link from 'next/link';

import Layout from './components/Layout.js';

const Index = () => (
  <Layout>
    <div className="container">
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
