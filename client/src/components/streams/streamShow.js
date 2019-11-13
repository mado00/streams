import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    // console.log('id', this.props.match.params.id)
    const { id } = this.props.match.params;
    //  console.log(this.videoRef)
    this.props.fetchStream(id);
    this.buildPlayer();
  }
  // when our component first renders attempt to build the player and then if our component fetches the stream successfully at some point in the future and the component renders componentDitUpdate will be called
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    // case 1: first access the page 
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        {/* Need to get a reference to the video element that actually gets created on the screen. The ref system in React is how we can get access or a reference to a actual Dom element that gets created inside of our DOM tree all the GSX  */}
        <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }  
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps,
  {fetchStream}
)(StreamShow);
