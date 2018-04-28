import React, {Component} from 'react';

class GameSquare extends Component {
    render() {
        const classes = this.props.className;
        const turned = (this.props.isSelected || this.props.didMatch) ? 'card flipped' : 'card';

        return (
            <div className='flip' id={this.props.id} onClick={this.props.handleClick}>
                <div className={turned}>
                    <div className={`face back`}> </div>
                    <div className={`face front ${classes}`}> </div>
                </div>
            </div>
        );
    }
}

export default GameSquare;