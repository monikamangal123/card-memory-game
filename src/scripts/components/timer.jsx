import React, {Component} from 'react';

class Timer extends Component{
    constructor(){
        super();

        this.state = {
            elapsed: 0
        };

        this.tick = this.tick.bind(this);
        setInterval(this.tick, 1000);
    }

    tick(){
        this.setState({elapsed: new Date() - this.props.start});
    }

    render() {
        let seconds = Math.round(this.state.elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        return (<p>Time: {minutes}:<b>{seconds}</b></p>);
    }
}

export default Timer;

