import React from 'react';
import { Dropdown, Icon, Menu, Input } from 'semantic-ui-react';
import { Link, withRouter, Button, Router } from 'next/link';
import Head from 'next/head';
import axios from 'axios';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      Token: null,
      user: '',
      searchUser: null
    };
    this.searchProfile = this.searchProfile.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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



  onSearchChange (e) {
    this.setState({
      searchUser: e.target.value
    })
  }


  searchProfile(e) {
    console.log(this.state.searchUser)
    axios.get('/user/profile/avatar', {
      params:{
        username: this.state.searchUser
      }
    })
    .then(data =>{
      let avtr = data.data;
      sessionStorage.setItem('searchUserAvatar', avtr)
      axios.get('/user/searchProfiles',{
        params:{
          username: this.state.searchUser
        }
      })
      .then( res => {
        sessionStorage.setItem('searchUser', res.data.user);
        sessionStorage.setItem('searchUserUrl', res.data.url);
        sessionStorage.setItem('searchUserFollowers', res.data.followers);
        window.location.replace(`/user?name=${this.state.searchUser}`);
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
    e.preventDefault();
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    axios.get('auth/logout')
    .then(res => console.log(res))
    .catch(err => console.log(err));

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
            <form onSubmit={this.searchProfile}>
              <Menu.Item>
                <Input icon="search" placeholder="Search..." 
                  value={this.state.username} 
                  onChange={this.onSearchChange} />
              </Menu.Item>
            </form>
              <Menu.Item
                icon="video"
                name="create stream"
                // user={this.state.user}
                active={this.state.activeItem === 'player'}
                onClick={this.handleItemClick}
                // href={`/player?host=${this.state.user}`}
                href='/streamType'
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
        {this.LogSignRender()}
      </div>
    );
  }
}

export default NavBar;
