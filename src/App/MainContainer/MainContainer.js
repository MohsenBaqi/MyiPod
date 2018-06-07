import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Albums from './_Albums';
import Tracks from './_Tracks';

const cookies = new Cookies();
if(!cookies.get('myFavorites')){
  cookies.set('myFavorites', [], { path: '/' });
}

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesAlbums: [],
      favoritesIsLoaded: false,
      myFavorites: cookies.get('myFavorites'),
      currentTrack: ''
    };
  }

  /* component did mount */
  componentDidMount() {
    this.loadFavorites();
  }

  /* load favorite albums */
  loadFavorites = () => {
    
    this.setState(
      {
        myFavorites: cookies.get('myFavorites')
      }
    );

    var url = `https://itunes.apple.com/lookup?id=` + this.state.myFavorites;

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          favoritesAlbums: result.results,
          favoritesIsLoaded: true
        });
      },
      (error) => {
        this.setState({
          favoritesIsLoaded: true,
          error
        });
      }
    )

  }

  /* add/remoe favorites */
  handleFavorites = (albumId) => {
    var myFavorites = this.state.myFavorites;
    if((this.state.myFavorites).indexOf(albumId) >= 0) {
      myFavorites.splice(myFavorites.indexOf(albumId), 1);
    }else {
      myFavorites.push(albumId);
    }
    
    this.setState(
      {
        myFavorites: myFavorites
      }
    );

    this.updateFavoritesCookie();
    this.loadFavorites();
  }

  /* update favorites cookie */
  updateFavoritesCookie = () => {
    cookies.set('myFavorites', this.state.myFavorites, { path: '/' });
  }

  /* handle favorite page click */
  handleFavoritePage = (pageId) => {
    this.props.handleFavoritePage(pageId);
  }

  /* handle favorite artists */
  handleSelectedArtist = (artistId) => {
    this.props.handleSelectedArtist(artistId);
  }

  /* handle page click */
  handlePage = (pageId) => {
    this.props.handlePage(pageId);
  }

  /* handle show details of selected album */
  handleTracks = (albumProps) => {
    this.props.handleTracks(albumProps);
  }

  /* end showing details of album */
  handleCloseTracks = () => {
    this.props.handleCloseTracks();
  }

  /* handle player status */
  handlePlayerStatus = (playerStatus) => {
    this.props.handlePlayerStatus(playerStatus);
  }

  render() {
    return (
      <div id="main-container" 
           className={((this.props.Mode === 'favorites')?'view-favorites':'')
                      + ((this.props.TracksAlbumId !== '')?' view-tracks':'')}>
          {/* container */}
          <div className="container">
              {/* albums container */}
              <Albums Artist={this.props.Artist}
                      Albums={this.props.Albums}
                      CurrentPageId={this.props.CurrentPageId}
                      handleFavoritePage={this.handleFavoritePage.bind(this)}
                      MyFavorites={this.state.myFavorites}
                      handleFavorites={this.handleFavorites.bind(this)}
                      handlePage={this.handlePage.bind(this)}
                      handleTracks={this.handleTracks.bind(this)}
                      FavoritesAlbums={(this.props.SelectedArtist === '')
                        ? this.state.favoritesAlbums
                        : this.state.favoritesAlbums.filter(albume => albume.artistId === this.props.SelectedArtist)}
                      SelectedArtist={this.props.SelectedArtist}
                      handleSelectedArtist={this.handleSelectedArtist.bind(this)}
                      FavoritesArtists={[...new Map(this.state.favoritesAlbums.map(artist => [artist.artistId, artist])).values()]}
                      CurrentFavoritePageId={this.props.CurrentFavoritePageId}/>

              {/* player container */}
              <Tracks Tracks={this.props.Tracks}
                      CurrentTrack={this.state.currentTrack}
                      MyFavorites={this.state.myFavorites}
                      HandleCloseTracks={this.handleCloseTracks.bind(this)}
                      TracksAlbumProps={this.props.TracksAlbumProps}
                      PlayerStatus={this.props.PlayerStatus}
                      handlePlayerStatus={this.handlePlayerStatus.bind(this)}/>
          </div>
      </div>
    );
  }
}

export default MainContainer;