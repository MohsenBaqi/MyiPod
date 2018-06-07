import React, { Component } from 'react';
import Truncate from 'react-truncate';

/* single album */
class Album extends Component {

  render() {
    return (
      <li className={(this.props.CurrentPageId === this.props.PageId)?'active':''}>
        <div className="album-item">
          {/* album tumbnail image */}
          <div className="album-tmb"
               onClick={() => { this.props.handleTracks(this.props) }}>
            <img src={this.props.Tumbnail} alt="" title="" />
          </div>

          {/* album info */}
          <div className="album-info">
            <span onClick={() => { this.props.handleFavorites(this.props.Id) }}
                  className="favorite-trigger" 
                  title={(((this.props.MyFavorites).indexOf(this.props.Id) >= 0)? "Remove from Favorites" : "Add to Favorites")}>
              <i className={(((this.props.MyFavorites).indexOf(this.props.Id) >= 0)? "fa" : "far") + " fa-heart"}></i>
            </span>

            <h3 className="album-name"
                onClick={() => { this.props.handleTracks(this.props) }}>              
                <Truncate lines={1}>
                  {this.props.Title}
                </Truncate>
            </h3>

            <p>
              Artist:&nbsp; 
              <Truncate lines={1}>
                {this.props.Artist}
              </Truncate>
            </p>

            <p>
              Genre:
              <strong> {this.props.Genre}</strong>
            </p>

            <p>
              Number of Tracks:
              <strong> {this.props.TotalTracks}</strong>
            </p>
          </div>

          <div className="clearfix"></div>
        </div>
      </li>
    );
  }
}

export default Album;