import React, { Component } from 'react';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      droppedMenu: false
    };
  }

  /* slide up & down menu */
  handleTrigger = () => {
    this.setState(
      {
        droppedMenu: !this.state.droppedMenu
      }
    )
  }

  /* switch to browse mode */
  handleBrowse = () => {
    this.props.handleMode('browse');
  }

  /* switch to favorites mode */
  handleFavorite = () => {
    this.props.handleMode('favorites');
  }

  render() {
    return (
      <div id="menu"
           className={(this.state.droppedMenu)?'dropped':''}>
        {/* container */}
        <div className="container">
          {/* menu body */}
          <div className="menu-body">
            {/* menu trigger */}
            <span className="trigger" 
                  onClick={this.handleTrigger}>
              <i className="fa fa-bars"></i>
            </span>

            {/* menu list */}
            <ul>
              {/* browse button */}
              <li className={(this.props.Mode === 'browse')?'active':''}
                onClick={this.handleBrowse}>
                <span>
                  <i className="fa fa-music"></i>Browse
                </span>
              </li>

              {/* favorites button */}
              <li className={(this.props.Mode === 'favorites')?'active':''}
                onClick={this.handleFavorite}>
                <span>
                  <i className="fa fa-heart"></i>My favorites
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;