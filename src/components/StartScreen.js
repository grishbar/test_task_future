import React from 'react';

export default class StartScreen extends React.Component {
    constructor(props) {
      super(props);
      this.urlChange = this.urlChange.bind(this);
    }

    urlChange(isBigData) {
        if (isBigData) {
            this.props.onUrlChange('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        } else {
            this.props.onUrlChange('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        }
    }

    render () {
        return (
        <div className="choose-block">
            <button className="choose-block__button" onClick={(e) => this.urlChange(false)}>Небольшой объем данных</button>
            <button className="choose-block__button" onClick={(e) => this.urlChange(true)}>Большой объем данных</button>
        </div>
        )
    }
}
        
