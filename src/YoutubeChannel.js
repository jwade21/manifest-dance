import React, {Component} from 'react';
import accounting from 'accounting';
class YoutubeChannel extends Component {


  render() {
    var facebook;
    var googlePlus;
    var videos = this.props.channelVideoCount;
    var accVideos;
    var views = this.props.channelViewCount;
    var accViews;
    var subscribers = this.props.channelSubscribers;
    var accSubscribers;
    //IF THEY HAVE A FACEBOOK, DISPLAY USERNAME
    if (this.props.facebook === '') {
      facebook = 'none'
    } else {
      facebook = this.props.facebook
    }
    //IF THEY HAVE A GOOGLE, DISPLAY ID
    if (this.props.googlePlus === '') {
      googlePlus = 'none'
    } else {
      googlePlus = this.props.googlePlus
    }
    //IF NUMBER OF VIDEOS, VIEWS, OR SUBSUBSCRIBERS IS LONGER THAN 3 DIGITS, USE ACCOUNTING TO ADD COMMAS
    if (videos.toString().length > 3) {
      accVideos = accounting.formatNumber(videos)
    } else {
      accVideos = videos
    }
    if (views.toString().length > 3) {
      accViews = accounting.formatNumber(views)
    } else {
      accViews = views
    }
    if (subscribers.toString().length > 3) {
      accSubscribers = accounting.formatNumber(subscribers)
    } else {
      accSubscribers = subscribers
    }

    return (
      <div>
        <div style={{backgroundImage: `url(${this.props.channelBanner})`}} className='youtubeBanner'>
          <img src={this.props.channelImage} role='presentation'/>
        </div>
        <div className='youtubeBannerInfo'>
          <div id='bannerLeft'>
            <h1>{this.props.channelTitle}</h1>
            <div>
              <h3>Videos: {accVideos} </h3>
              <h3>Views: {accViews}</h3>
              <h3>Subscribers: {accSubscribers} </h3>
            </div>
          </div>
          <div id='bannerRight'>
            <div id='bannerDescription'>
              <p>{this.props.channelDescription}</p>
            </div>
            <div id='bannerNames'>
              <h3>Facebook Username: {facebook}</h3>
              <h3>Google Plus Id: {googlePlus}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YoutubeChannel;
