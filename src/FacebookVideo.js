import React, {Component} from 'react';

class FacebookVideo extends Component {
  constructor(props) {
    super(props)

    this._passVideoId = this._passVideoId.bind(this)
  }

  _passVideoId() {
    let videoId = this.props.video.id
    this.props.setVideoId(videoId)
  }

  render() {
    return (
      <div>
        <ul onClick={this._passVideoId}>
          <img src={require('./photos/facebookvideoplaceholder.jpg')} />
          <li>
            {this.props.video.description}
          </li>
        </ul>
      </div>
    );
  }
}

export default FacebookVideo;
