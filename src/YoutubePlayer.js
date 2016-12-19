import React, {Component} from 'react';
import YouTube from 'react-youtube';

class YoutubePlayer extends Component {


  render() {
    return (
      <div>
        <YouTube videoId={this.props.videoId} id='youtubePlayer'/>
      </div>
    );
  }
}

export default YoutubePlayer;
