import React, {Component} from 'react';

class YoutubeChannel extends Component {


  render() {
    var facebook;
    var googlePlus;
    if (this.props.facebook === '') {
      facebook = 'none'
    } else {
      facebook = this.props.facebook
    }

    if (this.props.googlePlus === '') {
      googlePlus = 'none'
    } else {
      googlePlus = this.props.googlePlus
    }

    return (
      <div style={{backgroundImage: `url(${this.props.channelBanner})`}}>
        <img src={this.props.channelImage} role='presentation'/>
        <h1>{this.props.channelTitle}</h1>
        <h2>Facebook Username: {facebook}</h2>
        <h2>Google Plus Id: {googlePlus}</h2>
        <p>{this.props.channelDescription}</p>
      </div>
    );
  }
}

export default YoutubeChannel;
