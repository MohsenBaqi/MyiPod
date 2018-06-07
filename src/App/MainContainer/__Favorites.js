import React, { Component } from 'react';
import Artists from './___Artists';
import Pagination from './___Pagination';
import Album from './___Album';

/* Favorites section */
class Favorites extends Component {
  /* handle page click */
  handleFavoritePage = (pageId) => {
    this.props.handleFavoritePage(pageId);
  }

  /* add/remoe favorites */
  handleFavorites = (AlbumId) => {
    this.props.handleFavorites(AlbumId);
  }

  /* handle favorite artists */
  handleSelectedArtist = (artistId) => {
    this.props.handleSelectedArtist(artistId);
  }

  /* handle show details of selected album */
  handleTracks = (albumProps) => {
    this.props.handleTracks(albumProps);
  }

  render() {
    const FavoritesAlbums = (this.props.SelectedArtist === '')
                                    ? this.props.FavoritesAlbums
                                    : this.props.FavoritesAlbums.filter(albume => albume.artistId === this.props.SelectedArtist);
    return (
      <div id="favorites-container">
        <div id="favorite-artists">
          <Artists FavoritesArtists={this.props.FavoritesArtists}
                   CurrentArtistId={this.props.CurrentArtistId}
                   SelectedArtist={this.props.SelectedArtist}
                   handleSelectedArtist={this.handleSelectedArtist.bind(this)}/>

          <Pagination Selector="#browse" 
                      TotalItems={FavoritesAlbums.length} 
                      PageItems={6}
                      CurrentPageId={this.props.CurrentFavoritePageId}
                      handlePage={this.handleFavoritePage.bind(this)}/>
          
          <div className="clearfix"></div>
        </div>

        <div id="favorite-albums">
          <ul className="albums-container">
            {(FavoritesAlbums.length > 0)
              ? FavoritesAlbums.map((album, i) => {
                return <Album key={i} 
                              Id={album.collectionId}
                              Title={album.collectionName}
                              Artist={album.artistName}
                              Genre={album.primaryGenreName}
                              TotalTracks={album.trackCount}
                              Tumbnail={album.artworkUrl100}
                              PageId={Math.ceil((i+1)/6)}
                              CurrentPageId={this.props.CurrentFavoritePageId}
                              MyFavorites={this.props.MyFavorites}
                              handleFavorites={this.handleFavorites.bind(this)}
                              handleTracks={this.handleTracks.bind(this)}/>
              })
              : 'No result found!'
            }

            <div className="clearfix"></div>
          </ul>
        </div>
      </div>
    );
  }
}

export default Favorites;