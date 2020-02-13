import React from 'react';
import StartScreen from '../components/StartScreen';
import Loader from '../components/Loader';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';
import Filter from '../components/Filter'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrentPageArray = this.updateCurrentPageArray.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.updateUsersData = this.updateUsersData.bind(this);
    this.getFilteredArray = this.getFilteredArray.bind(this);
    this.updateIsFieldSorted = this.updateIsFieldSorted.bind(this);
    //допустим, что мы знаем поля лежащие в файле пользователей, и у всех пользователей данные заполнены корректно
    this.state = {isDataLoading: false, isStartScreen: true, url: '', usersData: [],
    usersFields: ['id', 'firstName', 'lastName', 'email', 'phone'],  currentPage: 0, 
    currentUsersArr: [], isUsersDataFiltered: false, filteredUsersData: [],
    isFieldSorted: {id: 0, firstName: 0, lastName: 0, email: 0, phone: 0}};
  }

  onUrlChange(url) {
    //this.setState({url: url});
    //console.log(url);
    this.fetchData(url);
  }

  updateUsersData(usersData) {
    if (this.state.isUsersDataFiltered) {
      this.setState({
        filteredUsersData: usersData,
      });
    } else {
      this.setState({
        usersData: usersData,
      });
    }
  }

  async fetchData(url) {
    this.setState({
      isDataLoading: true,
      isStartScreen: false
    });
    const response = await fetch(url)
    const usersData = await response.json()
    this.setState({
      usersData: usersData,
      isDataLoading: false,
      currentUsersArr: usersData.slice(0, Math.min(51, usersData.length))
    });
    console.log(this.state.usersData);
  }

  updateCurrentPageArray(currentPage, currentArr) {
    if (!currentArr) {
      currentArr = this.state.isUsersDataFiltered ? this.state.filteredUsersData : this.state.usersData;
    }
    this.setState({
        currentPage: currentPage,
        currentUsersArr: currentArr.slice(currentPage * 50, (currentPage + 1) * 50 + 1)
    });
  }

  updateIsFieldSorted(isFieldSorted) {
    this.setState({
      isFieldSorted: isFieldSorted,
    });
  }

  //плохой алгоритм фильтрации можно ускорить
  getFilteredArray(id, firstName, lastName, email, phone) {
    let filteredArray = [];
    for (let i = 0; i < this.state.usersData.length; i++) {
      let isRowInFilter = true;
      if (this.state.usersData[i]['id'].toString().indexOf(id) === -1 || this.state.usersData[i]['firstName'].indexOf(firstName) === -1 || 
        this.state.usersData[i]['lastName'].indexOf(lastName) === -1 || this.state.usersData[i]['email'].indexOf(email) === -1 ||
        this.state.usersData[i]['phone'].indexOf(phone) === -1) {
        isRowInFilter = false;
      }
      if (isRowInFilter) {
        filteredArray.push(this.state.usersData[i]);
      }
    }
    this.setState({
      isUsersDataFiltered: true,
      filteredUsersData: filteredArray
    });
    this.updateCurrentPageArray(0, filteredArray);
   // this.updateIsFieldSorted({id: 0, firstName: 0, lastName: 0, email: 0, phone: 0});
  }

  render () {
    return (
      <div className="App">
        {this.state.isStartScreen && <StartScreen onUrlChange={this.onUrlChange} />}
        {this.state.isDataLoading && <Loader />}
        {Boolean(this.state.usersData.length) && <Filter 
          getFilteredArray = {this.getFilteredArray} />}
        {Boolean(this.state.usersData.length) && <Table 
          usersFields ={this.state.usersFields}
          usersData = {this.state.isUsersDataFiltered ? this.state.filteredUsersData : this.state.usersData}
          updateUsersData = {this.updateUsersData}
          currentPage = {this.state.currentPage}
          currentUsersArr = {this.state.currentUsersArr}
          updateCurrentPageArray = {this.updateCurrentPageArray} 
          isFieldSorted = {this.state.isFieldSorted}
          updateIsFieldSorted = {this.updateIsFieldSorted} />}
        {Boolean(this.state.usersData.length) && <TablePagination 
          updateCurrentPageArray = {this.updateCurrentPageArray}
          currentPage = {this.state.currentPage} 
          arrayLength = {this.state.isUsersDataFiltered ? this.state.filteredUsersData.length / 50 : this.state.usersData.length / 50} />}
      </div>
    );
  }
}

