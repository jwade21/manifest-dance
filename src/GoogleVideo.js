import React, {Component} from 'react';

class GoogleVideo extends Component {
  constructor(props) {
    super(props)

    this._passVideoId = this._passVideoId.bind(this)
    this._convertDate = this._convertDate.bind(this)
  }

  _convertDate() {
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
    let idUrl = this.props.video.object.attachments[0].embed.url
    let videoId = idUrl.split('/v/')[1].split('?')[0]
    this.props.setVideoId(videoId)
  }

  render() {
    return (
      <div>
        <ul onClick={this._passVideoId}>
          <img src={this.props.video.object.attachments[0].image.url} role='presentation' />
          <li>

          </li>
          <li>

          </li>
          <li>
          {/* {this._convertDate()} */}
          </li>
        </ul>
      </div>
    );
  }
}

export default GoogleVideo;
