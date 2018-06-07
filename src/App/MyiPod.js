import React, { Component } from 'react';
import Menu from './Menu/Menu';
import TopBar from './Topbar/TopBar';
import MainContainer from './MainContainer/MainContainer';
import '../assets/css/App.css';

class MyiPodApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadingApp: false,
      showCookieInfo: false,
      browsing: false,
      mode: 'browse',
      artist: '',
      albums: [],
      isLoaded: false,
      currentPageId: 1,
      currentFavoritePageId : 1,
      tracksAlbumProps: [],
      tracksAlbumId: '',
      selectedArtist: '',
      playerStatus: 'STOPPED',
      tracks: []
    };
  }

  componentWillMount () {
    this.setState(
      {
        loadingApp: true
      }
    );
  }

  componentDidMount () {
    this.setState(
      {
        loadingApp: false
      }
    );
  }

  /* handle show cookie info */
  handleCookieInfo = () => {
    this.setState(
      {
        showCookieInfo: !this.state.showCookieInfo
      }
    );
  }

  /* switch browse/favorites modes */
  handleMode = (modeVal) => {
    this.setState(
      {
        mode: modeVal,
        browsing: (modeVal === 'favorites')?true
                                           :((this.state.artist === '')?false:true)
      }
    );

    this.handleCloseTracks();

    this.handlePlayerStatus('STOPPED');
  }

  /* handle searched artist */
  handleArtist = (artistVal) => {
    this.setState(
      {
        artist : artistVal,
        browsing: true,
        mode: 'browse',
        playerStatus: 'STOPPED',
        tracksAlbumId: '',
        currentPageId : 1
      }
    );

    var url = `https://itunes.apple.com/search?term=`+artistVal+`&entity=album&attribute=allArtistTerm&limit=200`;

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          albums: result.results,
          isLoaded: true
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  /* handle page click */
  handlePage = (pageId) => {
    this.setState(
      {
        currentPageId : pageId
      }
    )
  }

  /* handle favorite page click */
  handleFavoritePage = (pageId) => {
    this.setState(
      {
        currentFavoritePageId : pageId
      }
    )
  }

  /* handle show details of selected album */
  handleTracks = (albumProps) => {
    this.setState(
      {
        tracksAlbumProps: albumProps,
        tracksAlbumId: albumProps.Id
      }
    );

    var url = `https://itunes.apple.com/lookup?id=` + albumProps.Id +`&entity=song`;

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          tracks: result.results,
          isLoaded: true
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  /* end showing details of album */
  handleCloseTracks = () => {
    this.setState(
      {
        tracksAlbumId: ''
      }
    );

    this.handlePlayerStatus('STOPPED');
  }

  /* handle favorite artists */
  handleSelectedArtist = (artistId) => {
    this.setState(
      {
        selectedArtist : artistId,
        currentFavoritePageId : 1
      }
    )
  }

  /* handle player status */
  handlePlayerStatus = (playerStatus) => {
    this.setState(
      {
        playerStatus : playerStatus
      }
    )
  }

  render() {
    return (
      <div>
        <div className={"App " + ((this.state.browsing)?'browsing':'')}>

          {/* loading spinner */}
          <div id="loading-spinner"
               className={(this.state.loading)?'show':''}>
          </div>

          {/* cookie information */}
          <div id="cookie-info"
               className={(this.state.showCookieInfo)?'show':''}>
            <div className="container">
              <div className="cookie-info-content">
                <i className="fa fa-window-close close-cookie-info"
                   onClick={() => { this.handleCookieInfo() }}></i>

                <h3>Cookie Information</h3>
                <p>
                  This website uses 'cookie' to give you the best, most relevant exprience.
                  Cookie is using due to collect your favorite music albums and required for this option of website.
                </p>
                <p>
                  Using this website means you're OK with this.
                </p>
              </div>
            </div>
          </div>

          {/* fixed animated background */}
          <div id="animated-background"></div>

          {/* menu */}
          <Menu Mode={this.state.mode} 
                handleMode={this.handleMode.bind(this)}/>

          {/* top bar */}
          <TopBar handleArtist={this.handleArtist.bind(this)}/>

          {/* main container */}
          <MainContainer Mode={this.state.mode}
                         Artist={this.state.artist}
                         Albums={this.state.albums}
                         CurrentPageId={this.state.currentPageId}
                         CurrentFavoritePageId={this.state.currentFavoritePageId}
                         handlePage={this.handlePage.bind(this)}
                         handleFavoritePage={this.handleFavoritePage.bind(this)}
                         Tracks={this.state.tracks.filter(albume => albume.wrapperType === 'track')}
                         TracksAlbumProps={this.state.tracksAlbumProps}
                         TracksAlbumId={this.state.tracksAlbumId}
                         handleTracks={this.handleTracks.bind(this)}
                         handleCloseTracks={this.handleCloseTracks.bind(this)}
                         SelectedArtist={this.state.selectedArtist}
                         handleSelectedArtist={this.handleSelectedArtist.bind(this)}
                         PlayerStatus={this.state.playerStatus}
                         handlePlayerStatus={this.handlePlayerStatus.bind(this)}/>
        </div>

        {/* sticky footer */}
        <footer>
            <div className="container">
                <div id="copyright">
                  © MyiPod. All Rights Reserved.
                  <div id="cookie-info-trigger"
                        title="Cookie Information"
                        onClick={() => { this.handleCookieInfo() }}>
                    <i className="fa fa-info-circle"></i>&nbsp;
                    <span>Cookie Information</span>
                  </div>
                </div>
            </div>
        </footer>
      </div>
    );
  }
}

export default MyiPodApp;
