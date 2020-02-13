import React from 'react';

export default class ChooseUser extends React.Component {
    render () {
        return (
        <div className="user-block">
            <div className="user-block__item user-block__name">Выбран пользователь: {this.props.user.firstName + ' ' + this.props.user.lastName}</div>
            <div className="user-block__item user-block__description">Описание: {this.props.user.description}</div>
            <div className="user-block__item user-block__street-address">Адрес проживания: {this.props.user.address ? this.props.user.address.streetAddress : ''}</div>
            <div className="user-block__item user-block__city">Город: {this.props.user.address ? this.props.user.address.city : ''}</div>
            <div className="user-block__item user-block__state">Провинция/штат: {this.props.user.address ? this.props.user.address.state : ''}</div>
            <div className="user-block__item user-block__zip">Индекс: {this.props.user.address ? this.props.user.address.zip : ''}</div>
        </div>
        )
    }
}
        
