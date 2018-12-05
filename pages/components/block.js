import React from 'react';
import Card from './card';

const Block = ({ title, subtitle, host, name, feeds }) => (
  <div>
    <div className="titlebox">
      <p className="title">{title}</p>
      <p className="subtitle">{subtitle}</p>
      <div className="gallery">
        <Card 
          feeds={feeds}
        />

      </div>
    </div>
    <style jsx>{`
      .titlebox {
        display: block;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #dfdcd4;
      }

      .title {
        font-size: 23px;
        font-weight: 100;
        line-height: 20px;
        color: black;
        text-decoration: none solid rgb(42, 45, 40);
      }

      .subtitle {
        font-size: 14px;
        font-weight: 100;
        line-height: 10px;
        color: #908c83;
      }

      .gallery {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 280px;
        overflow-x: auto;
        overflow-y: hidden:
      }
    `}</style>
  </div>
);

export default Block;
