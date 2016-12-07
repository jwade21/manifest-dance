import React, {Component} from 'react';

class GoogleVideo extends Component {
  constructor(props) {
    super(props)

    this._passVideoId = this._passVideoId.bind(this)
  }

  _passVideoId() {
    // let videoId = this.props.video.id
    // this.props.setVideoId(videoId)
  }

  render() {
    return (
      <div>
        <ul onClick={this._passVideoId}>
          <img src={this.object.attatchments[0].image.url} role='presentation' />
          <li>
            {this._convertDate()}
          </li>
        </ul>
      </div>
    );
  }
}

export default GoogleVideo;
