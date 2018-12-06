// import Link from 'next/link';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import Layout from './components/Layout.js';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
  }

  componentDidMount() {
    this.setState({
      done: true,
    });
  }

  render() {
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      );
    }
    return (
      <div className="body">
        <Layout>
          <div className="container">
            <div className="hero">
              <div className="headline">LyreByrd</div>
            </div>

            <div className="discover">
              <div className="discover-heading">
                Chat with people who like what you like
              </div>
              <div className="trending-artist">
                <div className="explore">
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Spotify sessions brought to you instantly
                  </h3>
                  <p className="paragraph">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae voluptates tenetur, asperiores quaerat laboriosam,
                    accusamus assumenda quibusdam sapiente maiores suscipit
                    quidem doloribus quis quae! Laborum enim esse quibusdam
                    ipsam dolores?
                  </p>

                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Expirence Youtube like you neve have before
                  </h3>
                  <p className="paragraph">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Doloremque, dolor beatae maxime modi autem fugiat odit, esse
                    eius libero in officia.
                  </p>
                </div>
                <div className="pics">
                  <div className="composition">
                    <img
                      src="../static/dection-photo-1.jpg"
                      alt=""
                      className="composition_photo composition_photo--p1"
                    />
                    <img
                      src="../static/section-photo-5.jpg"
                      alt=""
                      className="composition_photo composition_photo--p2"
                    />
                    <img
                      src="../static/section-photo-3.jpg"
                      alt=""
                      className="composition_photo composition_photo--p3"
                    />
                  </div>
                </div>
              </div>
              {/* <section className="section-features">
                <div className="row">
                  <div className="col-1-of-4">
                    <div className="feature-box">
                      <i className="feature-box__icon icon-basic-world" />
                      <h3 className="heading-tertiary  u-margin-bottom-small">
                        Explore the world
                      </h3>
                      <p className="feature-box__text">
                        Lorem ipsum dolor, sit amet cooloremque, dolor beatae
                        maxime modi autem fugiat odit,nsectetur adipisicing
                        elit. Doloremque
                      </p>
                    </div>
                  </div>
                  <div className="col-1-of-4">
                    <div className="feature-box">
                      <i className="feature-box__icon icon-basic-compass" />
                      <h3 className="heading-tertiary  u-margin-bottom-small">
                        Meet nature
                      </h3>
                      <p className="feature-box__text">
                        Lorem oloremque, dolor beatae maxime modi autem fugiat
                        odit,ipsum dolor, sit amet consectetur adipisicing elit.
                        Doloremque
                      </p>
                    </div>
                  </div>
                   <div className="col-1-of-4">
                    <div className="feature-box">
                      <i className="feature-box__icon icon-basic-map" />
                      <h3 className="heading-tertiary  u-margin-bottom-small">
                        Find yout way
                      </h3>
                      <p className="feature-box__text">
                        Lorem ipsum dolor, sit amet oloremque, dolor beatae
                        maxime modi autem fugiat odit,consectetur adipisicing
                        elit. Doloremque
                      </p>
                    </div>
                  </div>
                  <div className="col-1-of-4">
                    <div className="feature-box">
                      <i className="feature-box__icon icon-basic-heart" />
                      <h3 class="heading-tertiary  u-margin-bottom-small">
                        Live a healthier lzife
                      </h3>
                      <p class="feature-box__text">
                        Lorem oloremque, dolor beatae maxime modi autem fugiat
                        odit,ipsum dolor, sit amet consectetur adipisicing elit.
                        Doloremque
                      </p>
                    </div>
                  </div>
                </div>
              </section>*/}
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
            grid-template-rows: 8fr;
            background-color: white;
            margin: 3rem;
          }

          .hero {
            grid-row-start: 1;
            border-top: 5px solid #7647a2;
            height: 93vh; /*should be at 95% of the viewport*/
            background-image: url('../static/header-pic.jpg');
            background-size: cover; /*cover: will try to fit the element inside the box*/
            background-position: bottom; /*makes sure top of image stays at the top of the page*/
            position: relative;
            clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
          }

          .headline {
            color: white;
            text-transform: uppercase;
            backface-visibility: hidden; /*keeps animations from*/
            margin-bottom: 6rem;
            display: block;
            font-size: 6rem;
            font-weight: 400;
            letter-spacing: 3.5rem;

            animation-name: moveInLeft;
            animation-duration: 1s;
            animation-timing-function: ease-out;

            position: relative;

            position: absolute;
            top: 17%; /* top & left refer to 40% of parent element*/
            left: 52%; /* left & left refer to 50% of parent     element*/
            transform: translate(
              -50%,
              -50%
            ); /*keeps text-box in the middle(exactly in the middle) and keeps it respo  nsive*/
            text-align: center;
          }

          .discover {
            text-align: center;
            max-width: 114rem;
            margin: 0 auto;
            margin-bottom: 8rem;
          }

          .discover-heading {
            font-size: 3.5rem;
            text-transform: uppercase;
            font-weight: 700;
            display: inline-block;
            letter-spacing: 2px;
            margin: 8rem 0 8rem 0;
          }

          .heading-tertiary {
            font-size: 1.6rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .u-center-text {
            text-align: center;
          }

          .u-margin-bottom-small {
            margin-bottom: 1.5rem;
          }
          .u-margin-bottom-medium {
            margin-bottom: 4rem;
          }
          .u-margin-bottom-big {
            margin-bottom: 8rem;
          }

          .paragraph {
            font-size: 1.6rem;
          }

          .paragraph:not(:last-child) {
            margin-bottom: 3rem;
          }

          .trending-artist {
            display: grid;
            grid-template-columns: auto mimmax(1rem, 2rem);
            grid-gap: 42px;
            overflow: wrap;
          }

          .explore {
            grid-column-start: 1;
            text-align: left;
            overflow: wrap;
            color: #000;
          }
          .pics {
            grid-column-start: 2;
            text-align: left;
            overflow: wrap;
          }

          .composition {
            position: relative;
          }

          .composition_photo {
            width: 55%;
            box-shadow: 0 1.5rem 4rem rgba(black, 0.4);
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            text-replace: all 0.2s;
            outline-offset: 2rem;
          }

          .composition_photo--p1 {
            position: relative;
            left: 0;
            top: -2rem;
          }

          .composition_photo--p2 {
            right: 0;
            top: 2rem;
          }

          .composition_photo--p3 {
            left: 20%;
            top: 10rem;
          }

          .composition_photo:hover {
            outline: 1.5rem solid #7647a2;
            transform: scale(1.05) translateY(-0.5rem);
            box-shadow: 0 2.5rem 4rem rgba($color-black, 0.5);
            z-index: 20;
          }

          .composition_photo:hover .composition_photo:not(:hover) {
            transform: scale(0.95);
          }
          .section-features {
            padding: 20rem 0;
            background-image: url('../static/header-pic.jpg');
            background-size: cover;
            margin-top: -10rem;
            transform: skewY(-7deg);
          }
          .section-features > * {
            transform: skewY(7deg);
          }

          .feature-box {
            background-color: rgba($color-white, 0.8);
            font-size: 1.5rem;
            padding: 2.5rem;
            text-align: center;
            border-radius: 3px;
            box-shadow: 0 1.5rem 4rem rbga($color-black, 0.15);
            transition: transform 0.3s;
          }

          .feature-box_icon {
            font-size: 6rem;
            margin-bottom: 0.5rem;
            display: inline-block;
            background-image: linear-gradient(
              to right,
              $color-primary-light,
              $color-primary-dark
            );
            -webkit-background-clip: text;
            color: transparent;
          }

          .feature-box:hover {
            transform: translateY(-1.5rem) scale(1.03);
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
