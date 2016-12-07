import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

import YoutubeVideo from './YoutubeVideo';
import YoutubeChannel from './YoutubeChannel';
import YoutubePlayer from './YoutubePlayer';

import Facebook from './Facebook';
import FacebookVideo from './FacebookVideo';

import GoogleVideo from './GoogleVideo';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showYoutube: true,
      showFacebook: false,
      channelUsername: '',
      currentChannel: {},
      currentGooglePlusId: '',
      currentFacebookUsername: '',
      channelTitle: '',
      channelDescription: '',
      channelImage: '',
      channelBanner: '',
      videoId: 't-_RyF4UBlc',
      videos: [],
      fbVideos: [],
      googleVideos: [],
      fbVideoId: '1543731352308887'
    }
    this._showNavBar = this._showNavBar.bind(this);

    this._showYoutube = this._showYoutube.bind(this);
    this._setChannelUsername = this._setChannelUsername.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._usernameSearch = this._usernameSearch.bind(this);
    this._channelIdSearch = this._channelIdSearch.bind(this);
    this._listVideos = this._listVideos.bind(this);
    this._setVideoId = this._setVideoId.bind(this);

    this._fetchSocialLinks = this._fetchSocialLinks.bind(this)

    this._showFacebook = this._showFacebook.bind(this);
    this._facebookUserSearch = this._facebookUserSearch.bind(this);
    this._listFbVideos = this._listFbVideos.bind(this);
    this._setFbVideoId = this._setFbVideoId.bind(this);

    this._googlePlusIdSearch = this._googlePlusIdSearch.bind(this);
    this._listFbVideos = this._listFbVideos.bind(this);

  }

  _setChannelUsername() {
    this.setState({
      channelUsername: this.refs.channelUsername.value
    })
  }

  _handleSubmit(e) {
    e.preventDefault()
    this._usernameSearch()
  }

  _usernameSearch() {
    this.setState({
      showFacebook: false
    })
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&forUsername=${this.state.channelUsername}&key=AIzaSyB8QlXehMo3zEy9L8l9ECHRAcqNFsq-l4c`)
    .then((response) => {
      let channel = response.data.items[0]
      let channelTitle = channel.brandingSettings.channel.title
      let channelDescription = channel.brandingSettings.channel.description
      let channelImage = channel.snippet.thumbnails.default.url
      let channelBanner = channel.brandingSettings.image.bannerImageUrl

       this.setState({
         channelTitle,
         channelDescription,
         channelImage,
         channelBanner
       })
      let channelId = channel.id
      this._channelIdSearch(channelId)
    })
  }


  _channelIdSearch(channelId) {
    axios.get(`https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&type=video&videoEmbeddable=true&order=date&maxResults=50&key=AIzaSyB8QlXehMo3zEy9L8l9ECHRAcqNFsq-l4c`)
    .then((response) => {
      let videos = response.data.items
      let firstVideoId = videos[0].id.videoId
      this.setState({
        videos,
        videoId: firstVideoId
       })
      this._listVideos()
      this._fetchSocialLinks()
    })
  }

  _fetchSocialLinks() {
    let searchUsername = this.state.channelUsername.toLowerCase()
    axios.get(`https://manifest-dance-backend.herokuapp.com/${searchUsername}`)
    .then((response) => {
      let currentChannel = response.data
      let currentFacebookUsername = currentChannel.facebookUsername
      let currentGooglePlusId = currentChannel.googlePlusId
      this.setState({
        currentChannel,
        currentFacebookUsername,
        currentGooglePlusId
      })
    })
  }

  _showNavBar() {
    if (this.state.currentChannel.facebookUsername) {
      return <li><Link to='/facebook' onClick={this._showFacebook}>Facebook Videos</Link></li>
    } else {
      return null
    }
  }


  _listVideos() {
    let videoInfo = this.state.videos;
    if (this.state.showYoutube) {
      return videoInfo.map((video, index) => {
        return <YoutubeVideo key={index} video={video} setVideoId={this._setVideoId} />
      })
    }
  }

  _setVideoId(videoId) {
    this.setState({videoId})
  }

  _showYoutube() {
    this.setState({
      showYoutube: true
    })
  }

  _showFacebook() {
    this.setState({
      showYoutube: false,
      showFacebook: true
    })
    axios.get(`https://graph.facebook.com/v2.8/https://www.facebook.com/${this.state.currentFacebookUsername}/?access_token=301081820285465|kaTKm8fd78pevsbeo6fTNQWNoWw`)
    .then((response) => {
      let userId = response.data.id
      this._facebookUserSearch(userId)
    })
  }



  _facebookUserSearch(userId) {
    axios.get(`https://graph.facebook.com/v2.8/${userId}/videos/?access_token=301081820285465|kaTKm8fd78pevsbeo6fTNQWNoWw`)
    .then((response) => {
      let fbVideos = response.data.data
      let firstFbVideoId = fbVideos[0].id
      console.log(firstFbVideoId);
      this.setState({
        fbVideos,
        fbVideoId: firstFbVideoId
      })
      this._listFbVideos()
    })
  }

  _listFbVideos() {
    let videoInfo = this.state.fbVideos
    if (this.state.showFacebook) {
      return videoInfo.map((video, index) => {
        return <FacebookVideo video={video} key={index} setVideoId={this._setFbVideoId}/>
      })
    }
  }

  _setFbVideoId(fbVideoId) {
    this.setState({fbVideoId})
  }

  _googlePlusIdSearch() {
    console.log(this.state.currentGooglePlusId);
    axios.get(`https://www.googleapis.com/plus/v1/people/${this.state.currentGooglePlusId}/activities/public?key=AIzaSyBaRBabLBTB8Mz-jzvgzJkAssDGkdaVPzc`)
    .then((response) => {
      let googleVideos = response.data.items
      this.setState({googleVideos})
      this._listGoogleVideos()
    })
  }

  _listGoogleVideos() {
    let videoInfo = this.state.googleVideos
    console.log(videoInfo);
    return videoInfo.map((video, index) => {
      return <YoutubeVideo googleVideo={video} key={index} setVideoId={this._setVideoId}/>
    })
  }


  componentWillMount() {
    if(location.hash === '#/home') {
      this._listVideos()
      return <YoutubePlayer videoId={this.state.videoId} />
    } else if (location.hash === '#/facebook') {
      return <Facebook id={this.state.fbVideoId} />
    }
  }

  render() {
    var youtubeChannel;
    if(this.state.channelTitle) {
      youtubeChannel = <YoutubeChannel
      channelTitle={this.state.channelTitle}
      channelDescription={this.state.channelDescription}
      channelImage={this.state.channelImage}
      channelBanner={this.state.channelBanner}
      facebook={this.state.currentFacebookUsername}/>
    }

    return (
      <div className='home'>
        <div className='header'>

        </div>
        <div className='youtubeBanner'>
          {youtubeChannel}
        </div>

        <div className='searchContainer'>
          <form>
            <input
            type='text'
            ref='channelUsername'
            onChange={this._setChannelUsername}
            onSubmit={this._handleSubmit}/>
            <input
            type='submit'
            onClick={this._handleSubmit} />
          </form>
          <div>
            {this.componentWillMount()}
          </div>
      </div>

        <div className='navBar'>
          <ul>
            <li><Link to='/home' onClick={this._showYoutube}>Youtube Videos</Link></li>
            <li onClick={this._googlePlusIdSearch}>googleplus</li>
            {this._showNavBar()}
          </ul>
        </div>
        <div className='videoLists'>
          {this._listVideos()}
          {this._listFbVideos()}
        </div>

      </div>
    );
  }
}

export default Home;
