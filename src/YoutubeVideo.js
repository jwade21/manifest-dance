import React, { Component } from 'react';

class YoutubeVideo extends Component {
  constructor(props) {
    super(props);


    this._convertDate = this._convertDate.bind(this);
    this._passVideoId = this._passVideoId.bind(this);
  }

  _convertDate() {
    //CHANGE PUBLISHED DATE TO A READABLE DATE
    let dateArr = []
    let published = new Date(this.props.video.snippet.publishedAt)
    let dateSplit = published.toString().split(' ')
    for (var i = 1; i < 4; i++) {
      dateArr.push(dateSplit[i])
    }
    let date = dateArr.join('/')
    return `published at ${date}`
  }

  _passVideoId() {
    //PASS CLICKED VIDEO'S ID TO PLAYERS THROUGH HOME
    let videoId = this.props.video.id.videoId
    this.props.setVideoId(videoId);
  }

  render() {
    return (
      <div  className='youtubeVideo video' >
        <ul onClick={this._passVideoId}>
          <li>
            <img src={this.props.video.snippet.thumbnails.medium.url} alt='thumbnail'/>
          </li>
        </ul>
        <ul className='videoInfo'>
          <li className='videoTitle'>
            {this.props.video.snippet.title}
          </li>
          <li>
            {this._convertDate()}
          </li>
        </ul>
      </div>
    );
  }
}

export default YoutubeVideo;
