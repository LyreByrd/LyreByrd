import React from 'react';
import { Dropdown, Icon, Menu, Input } from 'semantic-ui-react';
import { Link, withRouter, Button } from 'next/link';
import Head from 'next/head';
import axios from 'axios';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      Token: null,
      user: '',
    };
  }
  // this.handleItemClick = this.handleItemClick.bind(this);

  componentDidMount() {
    this.setState({
      Token: localStorage.getItem('jwt'),
      user: localStorage.getItem('username'),
    });
  }

  handleItemClick(e, { name }) {
    console.log(name);
    // this.setState({
    //   activeItem: name,
    // });
    if (name === 'create player stream') {
      axios
        .post('/player/create', {
          host: this.state.user,
          path: `/player?host=${this.state.user}`,
        })
        .then(data => {
          console.log(
            'data returned from creating player stream page in db save in Navbar.js',
            data,
          );
        })
        .catch(err => {
          console.log('error creating player stream in navbar.js', err);
        });
    }
    // if (name == 'logout') {
    //   this.props.logout();
    // }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  LogSignRender() {
    if (this.state.Token) {
      return (
        <div>
          <Menu>
            <Menu.Item
              name="home"
              active={this.state.activeItem === 'home'}
              onClick={this.handleItemClick}
              href="/index"
            />
            <Menu.Item
              name="feed"
              active={this.state.activeItem === 'feed'}
              onClick={this.handleItemClick}
              href="/feed"
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item
                icon="video"
                name="create stream"
                // user={this.state.user}
                active={this.state.activeItem === 'player'}
                onClick={this.handleItemClick}
                href={`/player?host=${this.state.user}`}
                as={Link}
              />
              <Dropdown icon="user" item>
                <Dropdown.Menu>
                  <Dropdown.Item
                    name="profile"
                    active={this.state.activeItem === 'profile'}
                    onClick={this.handleItemClick}
                    href="/profile">
                    account
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="logout"
                    active={this.state.activeItem === 'logout'}
                    onClick={this.logout}
                    href="/">
                    logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
          {/* <div>nav user is: {this.state.user}</div> */}
        </div>
      );
    } else {
      return (
        <div>
          <Menu>
            <Menu.Item
              name="home"
              active={this.state.activeItem === 'home'}
              onClick={this.handleItemClick}
              href="/index"
            />
            <Menu.Item
              as={Link}
              name="feed"
              active={this.state.activeItem === 'feed'}
              onClick={this.handleItemClick}
              href="/feed"
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item
                icon="video"
                name="create stream"
                // user={this.state.user}
                active={this.state.activeItem === 'player'}
                onClick={this.handleItemClick}
                href="/loginToStream"
              />
              <Dropdown icon="user" item>
                <Dropdown.Menu>
                  <Dropdown.Item
                    name="logout"
                    name="login"
                    active={this.state.activeItem === 'login'}
                    onClick={this.handleItemClick}
                    href="/login">
                    login
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="signup"
                    active={this.state.activeItem === 'signup'}
                    onClick={this.handleItemClick}
                    href="/signup">
                    signup
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </div>
      );
    }
  }

  render() {
    // const { activeItem } = this.state;

    return (
      <div>
        <Head>
          <title>LyreByrd</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
          <link rel="stylesheet" href={'../../styles/style.css'} />
        </Head>
        {this.LogSignRender()}
      </div>
    );
  }
}

export default NavBar;
