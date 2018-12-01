import React, { Component } from 'react';

export default class ProfileFeed extends Component {
  render() {
    return (
      <div className="profile-feed">
        <div className="main" />
        <div className="sidebar">Sidebar</div>
        <style jsx>{`
          .profile-feed {
            display: grid;
            grid-template-columns: 1fr 25rem;
            grid-row-start: 3;
            margin: 0 100px 0 100px;
            height: 600px;
          }

          .main {
            grid-column-start: 1;
            background-color: white;
            border-right: 1px solid #dfdcd4;
            padding-right: 0.5rem;
          }

          .sidebar {
            grid-column-start: 2;
            background-color: white;
          }
        `}</style>
      </div>
    );
  }
}
