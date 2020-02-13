import React from 'react';

export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.onAddRow = this.onAddRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.idInput = React.createRef();
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.state = {isButtonActive: false};
    }

    handleChange() {
        if(this.idInput.current.value && this.firstNameInput.current.value && this.lastNameInput.current.value &&
        this.emailInput.current.value && this.phoneInput.current.value) {
            this.setState({
                isButtonActive: true
            })
        }
    }

    onAddRow() {
        let newUser = {id: Number(this.idInput.current.value), firstName: this.firstNameInput.current.value, lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value, phone: this.phoneInput.current.value};
        if (this.state.isButtonActive) {
            this.props.addRowInUsersData(newUser);
        }
    }

    render () {
        return (
        <div className="add-row-block">
            <input className="add-row-block__input" placeholder="id" type="text" onChange={this.handleChange} ref={this.idInput} />
            <input className="add-row-block__input" placeholder="firstName" type="text" onChange={this.handleChange} ref={this.firstNameInput} />
            <input className="add-row-block__input" placeholder="lastName" type="text" onChange={this.handleChange} ref={this.lastNameInput} />
            <input className="add-row-block__input" placeholder="email" type="text" onChange={this.handleChange} ref={this.emailInput} />
            <input className="add-row-block__input" placeholder="phone" type="text" onChange={this.handleChange} ref={this.phoneInput} />
            <div className={this.state.isButtonActive ? "add-row-block__button" : "add-row-block__button add-row-block__button_inactive"} onClick={this.onAddRow}>Добавить</div>
        </div>
        )
    }
}
        
