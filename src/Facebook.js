import React, {Component} from 'react';
import FacebookPlayer from 'react-facebook-player'

class Facebook extends Component {


  render() {
    return (
      <div>
        <FacebookPlayer
        appId='301081820285465'
        width={400}
        allowfullscreen='true'
        videoId={this.props.id} />
      </div>
    );
  }
}

export default Facebook;
