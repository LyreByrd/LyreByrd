import React from 'react';
import Link from 'next/link';

const Card = ({feeds}) => {
  if (feeds !== []) {
    return (
      feeds.map((feed, i) => {
        if (feed.service === 'youtube') {
          return (
            <div key={i}>
              <Link href={feed.path}>
                <div className="tile">
                  <div className="thumbnail" />
                  <marquee className="title">{feed.videoId ? `${feed.title}` : 'No Video Currently Playing'}</marquee>
                  <div className="host">Host:{` ${feed.host}`}</div>
                  <div className="usersInRoom">Watchers: {feed.usersInRoom}</div>
                  <style jsx>{`
                    .tile {
                      height: 100%;
                      width: 100%;
                    }
                    .thumbnail {
                      height: 180px;
                      width: 320px;
                      background-image: url(${feed.videoId !== null ? 'http://img.youtube.com/vi/' + feed.videoId + '/mqdefault.jpg' : '/static/youtube_placeholder.png'});
                      background-size: auto;
                      background-repeat: no-repeat;
                      background-position: center center; 
                    }
                    .title {
                      font-size: 14px;
                      font-weight: 100;
                      height: 19px;
                      width: 320px;
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

        } else {
          return (
            <div key={i}>
              <Link href={feed.path}>
                <div className="tile">
                  <div className="thumbnail" />
                  <marquee className="title">{feed.artist ? `${feed.title} by ${feed.artist}` : 'No Song Currently Playing'}</marquee>
                  <div className="host">Host:{` ${feed.host}`}</div>
                  <div className="usersInRoom">Listeners: {feed.usersInRoom}</div>
                  <style jsx>{`
                    .tile {
                      height: 100%;
                      width: 100%;
                      border: 10px solid white;
                    }
                    .thumbnail {
                      height: 180px;
                      width: 320px;
                      background-image: url(${!!feed.albumArt ? feed.albumArt : '/static/spotify_placeholder.png'});
                      background-size: contain;
                      background-repeat: no-repeat;
                      background-position: center center; 
                    }
                    .title {
                      font-size: 14px;
                      font-weight: 100;
                      height: 19px;
                      width: 320px;
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
        }
      })
    )
  } else {
    return (
      <div>No Active Streams</div>
    )
  }
};

export default Card;
