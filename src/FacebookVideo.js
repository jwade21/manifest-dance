import React, {Component} from 'react';

class FacebookVideo extends Component {
  constructor(props) {
    super(props)

    this._passVideoId = this._passVideoId.bind(this)
  }

  _passVideoId() {
    //PASS CLICKED VIDEO'S ID TO PLAYERS THROUGH HOME
    let videoId = this.props.video.id
    this.props.setVideoId(videoId)
  }

  render() {
    return (
      <div className='facebookVideo video' onClick={this._passVideoId}>
        <img src={require('./photos/facebookvideoplaceholder.jpg')} role='presentation' />
        <ul>
          <li>
            {this.props.video.description}
          </li>
        </ul>
      </div>
    );
  }
}

export default FacebookVideo;
