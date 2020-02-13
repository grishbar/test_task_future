import React from 'react';

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
        this.idInput = React.createRef();
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    onFilter() {
        this.props.getFilteredArray(this.idInput.current.value, this.firstNameInput.current.value, this.lastNameInput.current.value,
            this.emailInput.current.value, this.phoneInput.current.value);
    }

    render () {
        return (
        <div className="filter-block">
            <input className="filter-block__input" placeholder="id" type="text" ref={this.idInput} />
            <input className="filter-block__input" placeholder="firstName" type="text" ref={this.firstNameInput} />
            <input className="filter-block__input" placeholder="lastName" type="text" ref={this.lastNameInput} />
            <input className="filter-block__input" placeholder="email" type="text" ref={this.emailInput} />
            <input className="filter-block__input" placeholder="phone" type="text" ref={this.phoneInput} />
            <div className="filter-block__button" onClick={this.onFilter}>Найти</div>
        </div>
        )
    }
}
        
