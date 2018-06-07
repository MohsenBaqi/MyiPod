import React, { Component } from 'react';
import Truncate from 'react-truncate';
import Sound from 'react-sound';

/* make pagination */
class Track extends Component {
  	render() {
	    return (
			<li className={(this.props.Id === this.props.CurrentTrackId) ? 'active' : ''}
			 	onClick={() => { this.props.handleSelectedTrack(this.props.Id, this.props.Title, this.props.Url) }}>
		  		{/* track tumbnail image */}
		      	<div className="track-tmb">
		        	<img src={this.props.AlbumTumbnail} 
		        		 alt="" 
		        		 title=""
		        		 width="50"
		        		 height="50"/>
		  		</div>

				{/* track title */}
		  		<h5 className="track-title">
	                <Truncate lines={1}>
		  				{this.props.Title}
	                </Truncate>
		  		</h5>
				<div className="clearfix"></div>
			</li>
	    )
  	}
}

/* Tracks section */
class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	currentTrackId: '',
    	currentTrackTitle: '',
    	currentTrackUrl: ''
    };
  }

  /* handle show details of selected album */
  handleSelectedTrack = (Id, Title, Url) => {
    this.setState(
      {
    	currentTrackId: Id,
    	currentTrackTitle: Title,
    	currentTrackUrl: Url
      }
    );

    this.props.handlePlayerStatus('PLAYING');
  }

  /* handle player status */
  handlePlayerStatus = (playerStatus) => {
    this.props.handlePlayerStatus(playerStatus);
  }

  render() {
  	return (
		<div id="tracks-container">
			{/* close tracks section button */}
			<div>
				<span title="Close"
					  className="close-tracks" 
					  onClick={() => { this.props.HandleCloseTracks() }}>
					<i className="fa fa-window-close"></i>
				</span>

				<div className="clearfix"></div>
			</div>

			{/* track box */}
			<div id="tracks-box">
				{/* track album info */}
				<div className="album-info">
					{/* add/remove favorites */}
	            	<div onClick={() => { this.props.TracksAlbumProps.handleFavorites(this.props.TracksAlbumProps.Id) }}
	            		 className="favorite-trigger" 
          			     title={(((this.props.MyFavorites).indexOf(this.props.TracksAlbumProps.Id) >= 0)? "Remove from Favorites" : "Add to Favorites")}>
              		  	<i className={(((this.props.MyFavorites).indexOf(this.props.TracksAlbumProps.Id) >= 0)? "fa" : "far") + " fa-heart"}></i>
            		</div>

		          	{/* album info */}
		          	<div className="album-detail">
		            	<h3 className="album-name">
			                <Truncate lines={1}>
		            			{this.props.TracksAlbumProps.Title}
			                </Truncate>
		            	</h3>

		            	<p>
			                <Truncate lines={1}>
			              		Artist:&nbsp;
			              		{this.props.TracksAlbumProps.Artist}
			                </Truncate>
		            	</p>

		            	<p>
		              		Genre:
		              		<strong> {this.props.TracksAlbumProps.Genre}</strong>
		            	</p>

		            	<p>
		              		Number of Tracks:
		              		<strong> {this.props.TracksAlbumProps.TotalTracks}</strong>
		            	</p>
		          	</div>

		          	<div className="clearfix"></div>
				</div>

				{/* track info */}
				<div className="track-info">
					<div className="track-tmb-container">
		            	<img src={this.props.TracksAlbumProps.Tumbnail} 
		            		 alt="" 
		            		 title=""
		            		 width="50"
		            		 height="50"/>
					</div>

					<h3 className="single-track-title">
		                <Truncate lines={1}>
							{this.state.currentTrackTitle}
		                </Truncate>
					</h3>
					<span className="single-track-player"
						  onClick={() => { this.props.handlePlayerStatus((this.props.PlayerStatus === 'PLAYING') ? 'PAUSED' : 'PLAYING') }}>
						{(this.state.currentTrackId !== '')
						? <i className={(this.props.PlayerStatus === 'PLAYING') ? "fa fa-pause" : "fa fa-play"}></i>
						: ''}
					</span>

					<Sound url={this.state.currentTrackUrl}
						   playStatus={this.props.PlayerStatus}/>

					<div className="clearfix"></div>
				</div>

				{/* track list */}
				<div className="track-list">
					<div className="tracks-scroll">
						<ul>
					        {(this.props.Tracks.length > 0)
					          ? this.props.Tracks.map((track, i) => {
					            return <Track key={i} 
				                              Id={track.trackId}
				                              Title={track.trackName}
				                              Url={track.previewUrl}
				                              AlbumTumbnail={track.artworkUrl100}
				                              CurrentTrackId={this.state.currentTrackId}
				                           	  handleSelectedTrack={this.handleSelectedTrack.bind(this)}
					                       	  handlePlayerStatus={this.handlePlayerStatus.bind(this)}/>
					          })
					          : ''
					        }

							<div className="clearfix"></div>
						</ul>
					</div>
				</div>

				<div className="clearfix"></div>
			</div>
		</div>
	);
  }
}

export default Tracks;