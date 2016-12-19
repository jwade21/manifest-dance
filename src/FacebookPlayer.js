import React, {Component} from 'react';
import FacebookPlayer from 'react-facebook-player'

class Facebook extends Component {


  render() {
    return (
      <div>
        <FacebookPlayer
        appId='301081820285465'
        width={400}
        height={500}
        allowfullscreen='true'
        videoId={this.props.id}
        id='facebookPlayer'/>
      </div>
    );
  }
}

export default Facebook;
