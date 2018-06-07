import React, { Component } from 'react';
import Pagination from './___Pagination';
import Album from './___Album';

/* Browse section */
class Browse extends Component {
  /* handle page click */
  handlePage = (pageId) => {
    this.props.handlePage(pageId);
  }

  /* add/remoe favorites */
  handleFavorites = (AlbumId) => {
    this.props.handleFavorites(AlbumId);
  }

  /* handle show details of selected album */
  handleTracks = (albumProps) => {
    this.props.handleTracks(albumProps);
  }

  render() {
    return (
      <div id="browse-container">
        <div id="searched-artist">
          <span className="title">
            Results for: <strong>{this.props.Artist}
            </strong>
          </span>

          <Pagination Selector="#browse" 
                      TotalItems={this.props.Albums.length} 
                      PageItems={6}
                      CurrentPageId={this.props.CurrentPageId}
                      handlePage={this.handlePage.bind(this)}/>
          
          <div className="clearfix"></div>
        </div>

        <ul className="albums-container">
          {(this.props.Albums.length > 0)
            ? this.props.Albums.map((album, i) => {
              return <Album key={i} 
                            Id={album.collectionId}
                            Title={album.collectionName}
                            Artist={album.artistName}
                            Genre={album.primaryGenreName}
                            TotalTracks={album.trackCount}
                            Tumbnail={album.artworkUrl100}
                            PageId={Math.ceil((i+1)/6)}
                            CurrentPageId={this.props.CurrentPageId}
                            MyFavorites={this.props.MyFavorites}
                            handleFavorites={this.handleFavorites.bind(this)}
                            handleTracks={this.handleTracks.bind(this)}/>
            })
            : 'No result found!'
          }

          <div className="clearfix"></div>
        </ul>
      </div>
    );
  }
}

export default Browse;