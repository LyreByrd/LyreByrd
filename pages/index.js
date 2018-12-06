// import Link from 'next/link';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import Layout from './components/Layout.js';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done:false
    };
  }

  componentDidMount() {
    this.setState({
      done:true
    });
  }

  render() {
    if (!this.state.done) {
      return (
        <Layout>
            <div class="ui active inverted dimmer">
              <div class="ui massive text loader">Loading</div>
            </div>
        </Layout>
      )
    }
    return (
      <div className="body">
        <Layout>
          <div className="container">
            <div className="hero" />
            <div className="searchbar">
              <input
                icon="search"
                className="landing-input"
                type="text"
                placeholder="Find Artist to Listen to"
              />{' '}
              <button className="btn">Submit</button>
            </div>
            <div className="discover">
              <div className="discover-heading">
                Come and see what’s trending for free in the LyreByrd community
              </div>
              <div className="trending-artist" />
              <div className="explore">
                <button className="btn big">Explore Trending Artist</button>
              </div>
            </div>
          </div>
        </Layout>
        <style jsx>{`

        * {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
          box-sizing: border-box;
        }
          .body {
            background-color: #dfdcd4;
          }
          .container {
            display: grid;
            grid-template-rows: 8fr 100px;
            background-color: white;
            margin: 0 100px 0 100px;

          }

          .hero {
            grid-row-start: 1;
            height: 450px;
            max-width: 100%;
            background-size: cover;
            background-position: center;
            border-top: 5px solid #7647a2;
            background-image: url('../static/header-pic.jpg');
          }
          .searchbar {
            grid-row-start: 2;
            text-align: center;
            height: 46;
            margin: 49px 0 12px 0;
          }

          .landing-input {
            border: 1px solid #dfdcd4;
            background-color: #dfdcd4;
            font-size: 14px;
            border-radius: 5px;
            padding: 1rem;
            width: 600px;
            transition: all 300ms ease;
            position: relative;
          }

          .btn {
            height 46px;
            width: 168px;
            font-size: 16px;
            font-weight: 100;
            line-height: 18px;
            margin: 0 0 0 14px;
            padding 13px 23ps 13px 23px;
            border-radius: 5px;
            border: none;
            color: white;
            background-color: #7647a2;
          }

          .big {
            font-size: 18px;
            font-weight: 100;
            line-height: 18px;
            text-align: center;
            width: 252.494px;


          }
          .discover {
            height: 649.969px;
            padding: 0 0 10px 0;
            text-align: center;
          }
          .discover-heading {
            font-size: 24px;
            font-weight: 100px;
            line-height: 33px;
            text-align:center;
            height: 33px;
            width: 1180px;
            margin: 0 0 30px 0;
            padding: 20px 0 0 0;
          }

          .trending-artist {
            border: 1px solid;
            height: 500px;
            margin: 0 50px 10px 50px;
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
