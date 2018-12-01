import React from 'react';
import Link from 'next/link';

const Card = ({feeds}) => {
  console.log('feeds :', feeds);
  return (

    feeds.map((feed, i) => {
      return (
        <div className="tile" key={i}>
          <Link href={feed.path}>
            <div>
              <div className="thumbnail" />
              <div className="title">{feed.title || 'No Video Currently Playing'}</div>
              <div className="host">{feed.host}</div>
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
                  overflow: hidden;
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
          </Link>
        </div>
      )
    })
  )
};

export default Card;
