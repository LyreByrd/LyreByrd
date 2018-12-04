import React from 'react';
import Link from 'next/link';
const youtube = require('../../static/youtube.js').default;

const Card = ({feeds}) => {
  
  if (feeds.length > 0) {
    console.log('feeds :', feeds);
    return (
      feeds.map((feed, i) => {
        return (
          <div  className="tile" key={i}>
            <Link href={feed.path}>
              <div>
                <div className="thumbnail" />
                <marquee className="title">{feed.videoId ? `${feed.title}` : 'No Video Currently Playing'}</marquee>
                <div className="host">Host:{` ${feed.host}`}</div>
                <div className="usersInRoom">Listeners: {feed.usersInRoom}</div>
                <style jsx>{`
                  .tile {
                    height: 192px;
                    width: 192px;
                  }
                  .thumbnail {
                    height: 180px;
                    width: 320px;
                    background-image: url(${feed.videoId !== null ? 'http://img.youtube.com/vi/' + feed.videoId + '/mqdefault.jpg' : youtube});
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center; 
                   
                  }
                  .title {
                    font-size: 14px;
                    font-weight: 100;
                    height: 19px;
                    width: 100%;
                    whitespce: nowrap;
                    overflow: hidden;
                  }
                  .host {
                    font-size: 12px;
                    font-weight: 100;
                    height: 16px;
                    whitespce: nowrap;
                    width: 100%;
                  }
                  `}</style>
              </div>
            </Link>
          </div>
        )
      })
    )
  } else {
    return (
      <div>No Active Streams</div>
    )
  }
};

export default Card;
