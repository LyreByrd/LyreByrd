import React from 'react';
import { Dropdown, Icon, Menu, Input } from 'semantic-ui-react';
import {Link} from "next/link";
import Head from "next/head";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      Token: null
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount(){
    this.setState({ 
      Token: localStorage.getItem('jwt')
    });
  }

  handleItemClick (e, { name }) { 
    console.log(name);
    this.setState({ 
      activeItem: name,
    });
    // if (name == 'logout') {
    //   this.props.logout();  
    // }
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
  }

  LogSignRender() {
    if (this.state.Token) {
      return (
        <div>
          <Menu>
            <Menu.Item 
            name='home' 
            active={this.state.activeItem === 'home'} 
            onClick={this.handleItemClick} 
            href="/index"
            />
            <Menu.Item 
            name='feed' 
            active={this.state.activeItem === 'feed'} 
            onClick={this.handleItemClick} 
            href="/feed"
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Menu.Item
                name = 'create feed'
                active={this.state.activeItem === 'createFeed'}
                onClick={this.handleItemClick}
                href="/createFeed"
              />
              <Menu.Item
              name='profile'
              active={this.state.activeItem === 'profile'}
              onClick={this.handleItemClick}
              href="/profile"
              />
              <Menu.Item
              name='logout'
              active={this.state.activeItem === 'logout'}
              onClick={this.logout}
              href="/"
              />
            </Menu.Menu>
          </Menu>
        </div>
      )
    } else {
      return (
      <div>
        <Menu>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
            name='login'
            active={this.state.activeItem === 'login'}
            onClick={this.handleItemClick}
            href="/login"
            />
            <Menu.Item
            name='signup'
            active={this.state.activeItem === 'signup'}
            onClick={this.handleItemClick}
            href="/signup"
            />
          </Menu.Menu>
        </Menu>
      </div>
      )
      
    }
  }


  render() {
    const { activeItem } = this.state;

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
        </Head>
       {this.LogSignRender()}
      </div>
    )
  }
}

export default NavBar;