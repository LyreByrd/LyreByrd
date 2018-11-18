import React from 'react';

const Card = () => (
  <div className="tile">
    <div className="thumbnail" />
    <div className="title">Title</div>
    <div className="host">Title</div>
    <style jsx>{`
      .tile {
        height: 192px;
        width: 192px;
      }
      .thumbnail {
        height: 160px;
        width: 160px;
        background-image: url('https://media.pitchfork.com/photos/5b632655482717722e52cc04/1:1/w_160/Ava%20Luna%20_%20Moon%202%20_%20Album%20Cover.jpg');
        position: contain;
      }
      .title {
        font-size: 14px;
        font-weight: 100;
        height: 19px;
        whitespce: nowrap;
        width: ;
      }
      .host {
        font-size: 12px;
        font-weight: 100;
        height: 16px;
        whitespce: nowrap;
        width: 55px;
      }
    `}</style>
  </div>
);

export default Card;
