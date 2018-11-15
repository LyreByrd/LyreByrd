import React from 'react';
import { Dropdown, Icon, Menu, Input } from 'semantic-ui-react';
import {Link} from "next/link";
import Head from "next/head";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick (e, { name }) { 
    console.log(name);
    this.setState({ 
      activeItem: name 
    });
    // if (name == 'logout') {
    //   this.props.logout();  
    // }
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
        <Menu>
          <Menu.Item 
          name='feed' 
          active={activeItem === 'feed'} 
          onClick={this.handleItemClick} 
          href="/feed"
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            href="/login"
            />
            <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
            href="/signup"
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar;