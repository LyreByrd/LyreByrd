import React from 'react';
import Card from './card';

const Block = ({ title, subtitle, host, name, feeds }) => (
  <div>
    <div className="titlebox">
      <p className="title">New Feeds</p>
      <p className="subtitle">Currently Playing</p>
      <div className="gallery">
        <Card 
          feeds={feeds}
        />

      </div>
    </div>
    <style jsx>{`
      .titlebox {
        height: 320px;
        border-bottom: 1px solid #dfdcd4;
      }

      .title {
        font-size: 23px;
        font-weight: 100;
        line-height: 29.9px;
        color: black;
        text-decoration: none solid rgb(42, 45, 40);
      }

      .subtitle {
        font-size: 14px;
        font-weight: 100;
        line-height: 19.9px;
        color: #908c83;
      }

      .gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        height: 200px;
        grid-column-gap: 10px;
      }
    `}</style>
  </div>
);

export default Block;
