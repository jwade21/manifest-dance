import React, {Component} from 'react';

class YoutubeChannel extends Component {


  render() {
    return (
      <div style={{backgroundImage: `url(${this.props.channelBanner})`}}>
        <img src={this.props.channelImage} role='presentation'/>
        <h1>{this.props.channelTitle}</h1>
        <h2>Facebook Username: {this.props.facebook}</h2>
        <p>{this.props.channelDescription}</p>
      </div>
    );
  }
}

export default YoutubeChannel;
