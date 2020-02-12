import React from 'react';

export default class StartScreen extends React.Component {

    changeCurrentPage(pageChange) {
        let currentPage = this.props.currentPage + pageChange;
        if (currentPage < 0 || currentPage > this.props.arrayLength - 1) {
            this.props.updateCurrentPageArray(this.props.currentPage);
        } else {
            this.props.updateCurrentPageArray(currentPage);
        }
    }

    render () {
        let isPrevButtonInactive = this.props.currentPage - 1 < 0;
        let isNextButtonInactive = this.props.currentPage + 1 > this.props.arrayLength - 1;
        return (
        <div className="pagination-block">
            <div 
                className={isPrevButtonInactive ? "pagination-block__button pagination-block__button_inactive" : "pagination-block__button"}
                onClick={(e) => this.changeCurrentPage(-1)}>
            </div>
            <div>{this.props.currentPage}</div>
            <div 
                className={isNextButtonInactive ? "pagination-block__button pagination-block__button_reverse pagination-block__button_inactive" : "pagination-block__button pagination-block__button_reverse"}
                onClick={(e) => this.changeCurrentPage(1)}>
            </div>
        </div>
        )
    }
}
        
