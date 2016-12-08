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
      showGoogle: false,
      error: '',
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

    this._setChannelUsername = this._setChannelUsername.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this._showFbButton = this._showFbButton.bind(this);
    this._showFbButton = this._showFbButton.bind(this);
    this._showGooglebutton = this._showGooglebutton.bind(this);

    this._showYoutube = this._showYoutube.bind(this);
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
    window.location = '#/home'
    this._usernameSearch()
  }



  _usernameSearch() {
    this.setState({
      showYoutube: true,
      showFacebook: false,
      showGoogle: false,
      error: ''
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
    .catch((err) => {
      this.setState({
        error: 'Please make sure you spelled the channel correctly.'
      })
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
      this.refs.channelUsername.value = ''
    })
  }

  _showFbButton() {
    if (this.state.currentChannel.facebookUsername) {
      return <li><Link to='/facebook' onClick={this._showFacebook}>Facebook Videos</Link></li>
    } else {
      return null
    }
  }

  _showGooglebutton() {
    if (this.state.currentChannel.googlePlusId) {
      return <li><Link to='/googleplus' onClick={this._googlePlusIdSearch}>Google Plus Videos</Link></li>
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
      showFacebook: true,
      showGoogle: false,
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
    this.setState({
      showYoutube: false,
      showFacebook: false,
      showGoogle: true
    })
    axios.get(`https://www.googleapis.com/plus/v1/people/${this.state.currentGooglePlusId}/activities/public?key=AIzaSyBaRBabLBTB8Mz-jzvgzJkAssDGkdaVPzc`)
    .then((response) => {
      let googleVideos = response.data.items
      var sortVideosList = []
      for (var i = 0; i < googleVideos.length; i++) {
        if (googleVideos[i].object.attachments[0].embed) {
          sortVideosList.push(googleVideos[i])
        }
      }
      let firstGoogleIdUrl = sortVideosList[0].object.attachments[0].url
      let firstGoogleVideoId
      if (firstGoogleIdUrl.includes('&feature')) {
        firstGoogleVideoId = firstGoogleIdUrl.split('?v=')[1].split('&')[0]
      } else {
        firstGoogleVideoId = firstGoogleIdUrl.split('?v=')[1]
      }

      this.setState({
        googleVideos: sortVideosList,
        videoId: firstGoogleVideoId
      })
      this._listGoogleVideos()
    })
  }

  _listGoogleVideos() {
    let videoInfo = this.state.googleVideos
    return videoInfo.map((video, index) => {
    if (!video.object.attachments[0].embed) {
      return null
    } else {
      return <GoogleVideo video={video} key={index} setVideoId={this._setVideoId}/>
    }
    })
  }


  componentWillMount() {
    if (location.hash === '#/facebook') {
      return <Facebook id={this.state.fbVideoId} />
    } else {
      this._listVideos()
      return <YoutubePlayer videoId={this.state.videoId} />
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
      facebook={this.state.currentFacebookUsername}
      googlePlus={this.state.currentGooglePlusId}/>
    }

    return (
      <div className='home'>
        <div className='header'>

        </div>
        <div className='youtubeBanner'>
          {youtubeChannel}
        </div>

        <div className='searchContainer'>
          <div>
            <form>
              <input
              type='text'
              ref='channelUsername'
              placeholder='Search by Youtube Channel Name'
              onChange={this._setChannelUsername}
              onSubmit={this._handleSubmit}/>
              <input
              type='submit'
              onClick={this._handleSubmit} />
            </form>
            <div>
              {this.state.error}
            </div>
          </div>
          <div className='videoPlayer'>
            {this.componentWillMount()}
          </div>
        </div>
        <div className='bottomContainer'>
          <div className='navBar'>
            <ul>
              <li><Link to='/home' onClick={this._showYoutube}>Youtube Videos</Link></li>
              {this._showFbButton()}
              {this._showGooglebutton()}
            </ul>
          </div>
          <div className='videoLists'>
            {this._listVideos()}
            {this._listFbVideos()}
            {this._listGoogleVideos()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
