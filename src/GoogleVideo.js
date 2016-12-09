import React, {Component} from 'react';

class GoogleVideo extends Component {
  constructor(props) {
    super(props)

    this._passVideoId = this._passVideoId.bind(this)
    this._convertDate = this._convertDate.bind(this)
  }

  _convertDate() {
    //CHANGE PUBLISHED DATE TO A READABLE DATE
    let dateArr = []
    let published = new Date(this.props.video.published)
    let dateSplit = published.toString().split(' ')
    for (var i = 1; i < 4; i++) {
      dateArr.push(dateSplit[i])
    }
    let date = dateArr.join('/')
    return `published at ${date}`
  }

  _passVideoId() {
    //PASS CLICKED VIDEO'S ID TO PLAYERS THROUGH HOME
    //GET VIDEO ID FROM THE YOUTUBE LINK URL
    let idUrl = this.props.video.object.attachments[0].embed.url
    let videoId = idUrl.split('/v/')[1].split('?')[0]
    this.props.setVideoId(videoId)
  }

  render() {
    return (
      <div className='googleVideo video'>
        <ul onClick={this._passVideoId}>
          <img src={this.props.video.object.attachments[0].image.url} role='presentation' />
        </ul>
        <ul className='videoInfo'>
          <li className='videoTitle'>
            {this.props.video.object.attachments[0].displayName}
          </li>
          <li>
            {this._convertDate()}
          </li>
        </ul>
      </div>
    );
  }
}

export default GoogleVideo;
