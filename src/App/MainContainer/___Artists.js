import React, { Component } from 'react';

/* make pagination */
class Artist extends Component {
  render() {
    return (
      <li className={(this.props.SelectedArtist === this.props.Id) ? 'active' : ''}
          onClick={() => { this.props.handleSelectedArtist(this.props.Id) }}>
        <span>
          {this.props.Name}
        </span>
      </li>
    )
  }
}

class Artists extends Component {
  /* handle favorite artists */
  handleSelectedArtist = (artistId) => {
    this.props.handleSelectedArtist(artistId);
  }

  render() {
    return (
      <ul className="artists-container">
        <li className={(this.props.SelectedArtist === '') ? 'active' : ''}
            onClick={() => { this.handleSelectedArtist('') }}>
          <span>
            All Artists
          </span>
        </li>

        {(this.props.FavoritesArtists.length > 0)
          ? this.props.FavoritesArtists.map((album, i) => {
            return <Artist key={i} 
                           Id={album.artistId}
                           Name={album.artistName}
                           CurrentArtistId={this.props.CurrentArtistId}
                           SelectedArtist={this.props.SelectedArtist}
                           handleSelectedArtist={this.handleSelectedArtist.bind(this)}/>
          })
          : ''
        }

        <div className="clearfix"></div>
      </ul>
    );
  }
}

export default Artists;