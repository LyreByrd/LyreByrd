import React from 'react';
import Card from './card';

const Block = ({ title, subtitle, host, name }) => (
  <div>
    <div className="titlebox">
      <p className="title">What's Now</p>
      <p className="subtitle">Suggestions</p>
      <div className="gallery">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    <style jsx>{`
      .titlebox {
        height: 300px;
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
      }
    `}</style>
  </div>
);

export default Block;
