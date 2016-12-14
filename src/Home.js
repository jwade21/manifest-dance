import React, { Component } from 'react';
import {IndexLink, Link} from 'react-router';
import axios from 'axios';
import './App.css';

import YoutubeVideo from './YoutubeVideo';
import YoutubeChannel from './YoutubeChannel';
import YoutubePlayer from './YoutubePlayer';

import Facebook from './FacebookPlayer';
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
      errCount: 0,
      channelUsername: '',
      channelTitle: '',
      channelSubscribers: '',
      channelVideoCount: '',
      channelViewCount: '',
      channelDescription: '',
      channelImage: '',
      channelBanner: '',
      currentChannel: {},
      currentGooglePlusId: '',
      currentFacebookUsername: '',
      videoId: 'Mtjatz9r-Vc',
      videos: [],
      fbVideos: [],
      googleVideos: [],
      fbVideoId: '10154982214184769'
    }

    this._setChannelUsername = this._setChannelUsername.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this._showFbButton = this._showFbButton.bind(this);
    this._showGoogleButton = this._showGoogleButton.bind(this);

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

  componentWillMount() {
    if (location.hash === '#/facebook') {
      return <Facebook id={this.state.fbVideoId} />
    } else {
      this._listVideos()
      return <YoutubePlayer videoId={this.state.videoId} />
    }
  }

//INITIAL SEARCH ------------------//
//--------------------------------//
  _setChannelUsername() {
    this.setState({
      channelUsername: this.refs.channelUsername.value
    })
  }

  _handleSubmit(e) {
    e.preventDefault()
    //SEND USER TO HOME WHEN SEARCHING
    window.location = '#/'
    this._usernameSearch()
  }

  //YOUTUBE ------------------//
  //------------------------//
  _showYoutube() {
    this.setState({
      showYoutube: true
    })
  }

  _usernameSearch() {
    this.setState({
      showYoutube: true,
      showFacebook: false,
      showGoogle: false,
      error: '',
      currentChannel: '',
      currentFacebookUsername: '',
      currentGooglePlusId: ''
    })
    //SEARCH BY USERNAME TO FIND CHANNEL ID
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&forUsername=${this.state.channelUsername}&key=AIzaSyB8QlXehMo3zEy9L8l9ECHRAcqNFsq-l4c`)
    .then((response) => {
      //SET CHANNEL BANNER INFORMATION
      let channel = response.data.items[0]
      let channelSubscribers = channel.statistics.subscriberCount
      let channelVideoCount = channel.statistics.videoCount
      let channelViewCount = channel.statistics.viewCount
      let channelTitle = channel.brandingSettings.channel.title
      let channelDescription = channel.brandingSettings.channel.description
      let channelImage = channel.snippet.thumbnails.medium.url
      let channelBanner = channel.brandingSettings.image.bannerImageUrl

       this.setState({
         channelSubscribers,
         channelVideoCount,
         channelViewCount,
         channelTitle,
         channelDescription,
         channelImage,
         channelBanner
       })
      let channelId = channel.id
      this._channelIdSearch(channelId)
    })
    .catch((err) => {
      //WARN USER WHEN USERNAME IS ENTERED INCORRECTLY
      if (err) {
        this.state.errCount++
      }
      if (this.state.errCount >= 2) {
        this.setState({
          error: 'Try: "cnn", "erb", "whzgud2", "elicomputerguylive".'
        })
      } else {
        this.setState({
          error: 'Please make sure you spelled the channel correctly.'
        })
      }
    })
  }


  _channelIdSearch(channelId) {
    //SEARCH BY CHANNEL ID TO FIND VIDEOS
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

  _listVideos() {

    let videoInfo = this.state.videos;
    if (this.state.showYoutube) {
      //ONLY RUN IF YOUTUBE LIST IS SHOWING
      return videoInfo.map((video, index) => {
        return <YoutubeVideo key={index} video={video} setVideoId={this._setVideoId} />
      })
    }
  }

  //GET SOCIAL LINKS OF CHANNEL FROM DATABASE//
  //----------------------------------------//

  _fetchSocialLinks() {
    //MAKE SURE THE SEARCH USERNAME IS NOT CASE SENSITIVE
    let searchUsername = this.state.channelUsername.toLowerCase()
    axios.get(`https://manifest-dance-backend.herokuapp.com/${searchUsername}`)
    .then((response) => {
      //SET STATE ID'S FOR OTHER SEARCHES
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

  //FACEBOOK ------------------//
  //------------------------//

  _showFacebook() {
    //SHOW THE FACEBOOK LIST
    this.setState({
      showYoutube: false,
      showFacebook: true,
      showGoogle: false,
    })

    //SEARCH BY FACEBOOK USERNAME AQUIRED FROM DATABASE
    axios.get(`https://graph.facebook.com/v2.8/https://www.facebook.com/${this.state.currentFacebookUsername}/?access_token=301081820285465|kaTKm8fd78pevsbeo6fTNQWNoWw`)
    .then((response) => {
      //SET FACEBOOK USER ID
      let userId = response.data.id
      this._facebookUserSearch(userId)
    })
  }

  _facebookUserSearch(userId) {
    //SEARCH BY FACEBOOK USER ID
    axios.get(`https://graph.facebook.com/v2.8/${userId}/videos/?access_token=301081820285465|kaTKm8fd78pevsbeo6fTNQWNoWw`)
    .then((response) => {
      //SET FACEBOOK VIDEOS
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
    //ONLY RUN IF FACEBOOK LIST IS SHOWING
    if (this.state.showFacebook) {
      return videoInfo.map((video, index) => {
        return <FacebookVideo video={video} key={index} setVideoId={this._setFbVideoId}/>
      })
    }
  }
  _setFbVideoId(fbVideoId) {
    this.setState({fbVideoId})
  }

  //GOOGLE ------------------//
  //------------------------//

  _googlePlusIdSearch() {
    this.setState({
      showYoutube: false,
      showFacebook: false,
      showGoogle: true
    })
    //SEARCH BY GOOGLEPLUS ID AQUIRED FROM THE DATABASE
    axios.get(`https://www.googleapis.com/plus/v1/people/${this.state.currentGooglePlusId}/activities/public?key=AIzaSyBaRBabLBTB8Mz-jzvgzJkAssDGkdaVPzc`)
    .then((response) => {
      let googleVideos = response.data.items
      var sortVideosList = []
      //IF THE POST IS NOT A VIDEO, DO NOT SAVE IT
      for (var i = 0; i < googleVideos.length; i++) {
        if (googleVideos[i].object.attachments[0].embed) {
          sortVideosList.push(googleVideos[i])
        }
      }
      //FIND THE ID OF THE FIRST VIDEO TO PLAY IT ON LOAD
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
    //ONLY RUN IF GOOGLE LIST IS SHOWING
    if (this.state.showGoogle) {
      return videoInfo.map((video, index) => {
        return <GoogleVideo video={video} key={index} setVideoId={this._setVideoId}/>
      })
    }
  }

  //YOUTUBE AND GOOGLE ------//
  //------------------------//

  _setVideoId(videoId) {
    this.setState({videoId})
  }

  //NAV BAR------//
  //-------------//

  _showFbButton() {
    //IF USER HAS A FACEBOOK USERNAME, SHOW THE FACEBOOK NAV LINK
    if (this.state.currentChannel.facebookUsername) {
      return <li><Link to='/facebook' activeClassName='active' onClick={this._showFacebook}>Facebook Videos</Link></li>
    } else {
      return null
    }
  }

  _showGoogleButton() {
    //IF USER HAS A GOOGLEPLUS ID, SHOW THE GOOGLE NAV LINK
    if (this.state.currentChannel.googlePlusId) {
      return <li><Link to='/googleplus' activeClassName='active'  onClick={this._googlePlusIdSearch}>Google Plus Videos</Link></li>
    } else {
      return null
    }
  }

  render() {
    var youtubeChannel;
    if(this.state.channelTitle) {
      youtubeChannel = <YoutubeChannel
      channelSubscribers={this.state.channelSubscribers}
      channelVideoCount={this.state.channelVideoCount}
      channelViewCount={this.state.channelViewCount}
      channelTitle={this.state.channelTitle}
      channelDescription={this.state.channelDescription}
      channelImage={this.state.channelImage}
      channelBanner={this.state.channelBanner}
      facebook={this.state.currentFacebookUsername}
      googlePlus={this.state.currentGooglePlusId}/>
    }

    return (
      <div className='home'>
        <div className='appBanner'>
          <h1 id='manifestSocial'>Manifest Social</h1>
        </div>
        <div className='header'>

        </div>
        <div className='youtubeBannerContainer'>
          {youtubeChannel}
        </div>

        <div className='searchContainer'>
          <div>
            <div>
              <form className='searchForm'>
                <input
                type='text'
                ref='channelUsername'
                placeholder='Search by Youtube Channel Name'
                onChange={this._setChannelUsername}
                onSubmit={this._handleSubmit}/>
                <button
                onClick={this._handleSubmit}>
                  Search
                </button>
              </form>
            </div>
            <div className='error'>
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
              <li><IndexLink to='/' activeClassName='active' onClick={this._showYoutube}>Youtube Videos</IndexLink></li>
              {this._showFbButton()}
              {this._showGoogleButton()}
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
