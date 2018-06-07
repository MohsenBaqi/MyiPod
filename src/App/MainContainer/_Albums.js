import React, { Component } from 'react';
import Browse from './__Browse';
import Favorites from './__Favorites';

/* Albums section */
class Albums extends Component {
  /* handle page click */
  handlePage = (pageId) => {
    this.props.handlePage(pageId);
  }

  /* handle show details of selected album */
  handleTracks = (albumProps) => {
    this.props.handleTracks(albumProps);
  }

  /* add/remoe favorites */
  handleFavorites = (albumId) => {
    this.props.handleFavorites(albumId);
  }

  /* handle favorite artists */
  handleSelectedArtist = (artistId) => {
    this.props.handleSelectedArtist(artistId);
  }

  /* handle favorite page click */
  handleFavoritePage = (pageId) => {
    this.props.handleFavoritePage(pageId);
  }

  /* load favorite albums */
  loadFavorites = () => {
    this.props.loadFavorites();
  }

  render() {
    return (
      <div id="albums">
          {/* browse */}
          <Browse Artist={this.props.Artist} 
                  Albums={this.props.Albums}
                  CurrentPageId={this.props.CurrentPageId}
                  handlePage={this.handlePage.bind(this)}
                  MyFavorites={this.props.MyFavorites}
                  handleFavorites={this.handleFavorites.bind(this)}
                  handleTracks={this.handleTracks.bind(this)}/>

          {/* favorites */}
          <Favorites Artist={this.props.Artist} 
                  MyFavorites={this.props.MyFavorites}
                  handleFavorites={this.handleFavorites.bind(this)}
                  handleTracks={this.handleTracks.bind(this)}
                  FavoritesAlbums={this.props.FavoritesAlbums}
                  SelectedArtist={this.props.SelectedArtist}
                  handleSelectedArtist={this.handleSelectedArtist.bind(this)}
                  FavoritesArtists={this.props.FavoritesArtists}
                  CurrentFavoritePageId={this.props.CurrentFavoritePageId}
                  handleFavoritePage={this.handleFavoritePage.bind(this)}/>
      </div>
    );
  }
}

export default Albums;