import React from 'react';
import style from './style';
import events from '../../utils/events';
import prefixer from '../../utils/prefixer';
import utils from '../../utils/utils';

class Hand extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    angle: React.PropTypes.number,
    onMove: React.PropTypes.func,
    onMoved: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    angle: 0,
    length: 0,
    origin: {}
  };

  state = {
    knobWidth: 0
  };

  componentDidMount () {
    this.setState({knobWidth: this.refs.knob.offsetWidth});
  }

  getMouseEventMap () {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp
    };
  }

  getTouchEventMap () {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd
    };
  }

  handleMouseMove = (event) => {
    this.move(events.getMousePosition(event));
  };

  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  mouseStart (event) {
    events.addEventsToDocument(this.getMouseEventMap());
    this.move(events.getMousePosition(event));
  }

  touchStart (event) {
    events.addEventsToDocument(this.getTouchEventMap());
    this.move(events.getTouchPosition(event));
    events.pauseEvent(event);
  }

  getPositionRadius (position) {
    const x = this.props.origin.x - position.x;
    const y = this.props.origin.y - position.y;
    return Math.sqrt(x * x + y * y);
  }

  trimAngleToValue (angle) {
    return this.props.step * Math.round(angle / this.props.step);
  }

  positionToAngle (position) {
    return utils.angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  }

  end (evts) {
    if (this.props.onMoved) this.props.onMoved();
    events.removeEventsFromDocument(evts);
  }

  move (position) {
    const degrees = this.trimAngleToValue(this.positionToAngle(position));
    const radius = this.getPositionRadius(position);
    if (this.props.onMove) this.props.onMove(degrees === 360 ? 0 : degrees, radius);
  }

  render () {
    const className = `${style.hand} ${this.props.className}`;
    const handStyle = prefixer({
      height: this.props.length - this.state.knobWidth / 2,
      transform: `rotate(${this.props.angle}deg)`
    });

    return (
      <div className={className} style={handStyle}>
        <div ref='knob' className={style.knob}></div>
      </div>
    );
  }
}

export default Hand;
