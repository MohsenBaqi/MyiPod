import React, { Component } from 'react';
import logo from '../../assets/img/logo.png';

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      browsing: false,
      artist: ''
    };
  }

  /* handle input changes */
  handleChange = (e) => {
    this.setState(
      {
        artist: e.target.value
      }
    )
  }

  /* handle form submit */
  handleSubmit = (e) => {
    this.setState(
      {
        browsing: true
      }
    )
    this.props.handleArtist(this.state.artist);
    e.preventDefault();
  }

  render() {
    return (

      <div id="top-bar" 
           className="top-bar-transition">

          {/* container */}
          <div className="container">

              {/* logo */}
              <div id="logo" 
                   className="top-bar-transition">

                  <a href="/myipod">

                      <img src={logo} 
                           alt="MyiPod" 
                           title="MyiPod" 
                           width="400"/>

                  </a>

              </div>

              {/* search box */}
              <div id="search-box-container" 
                   className="top-bar-transition">

                  <form id="search-box" 
                        onSubmit={this.handleSubmit}>

                      <input type="text" 
                             name="artist" 
                             placeholder="Search Artist..."
                             value={this.state.artist}
                             onChange={this.handleChange}/>

                      <button>

                        <i className="fa fa-search"></i>

                      </button>

                      <p className="note">

                          Search artists, Browse albums and Collect your Favorites.

                      </p>

                  </form>

              </div>

          </div>

      </div>

    );
  }
}

export default TopBar;