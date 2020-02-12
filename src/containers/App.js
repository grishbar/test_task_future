import React from 'react';
import StartScreen from '../components/StartScreen';
import Loader from '../components/Loader';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrentPageArray = this.updateCurrentPageArray.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.updateUsersData = this.updateUsersData.bind(this);
    //допустим, что мы знаем поля лежащие в файле пользователей, и у всех пользователей данные заполнены корректно
    this.state = {isDataLoading: false, isStartScreen: true, url: '', usersData: [],
    usersFields: ['id', 'firstName', 'lastName', 'email', 'phone'],  currentPage: 0, 
    currentUsersArr: []};
  }

  onUrlChange(url) {
    //this.setState({url: url});
    //console.log(url);
    //url = './profiles.json';
    this.fetchData(url);
  }

  updateUsersData(usersData) {
    this.setState({
      usersData: usersData,
    });
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
      currentArr = this.state.usersData;
    }
    this.setState({
        currentPage: currentPage,
        currentUsersArr: currentArr.slice(currentPage * 50, (currentPage + 1) * 50 + 1)
    });
  }

  render () {
    return (
      <div className="App">
        {this.state.isStartScreen && <StartScreen onUrlChange={this.onUrlChange} />}
        {this.state.isDataLoading && <Loader />}
        {Boolean(this.state.usersData.length) && <Table 
          usersFields ={this.state.usersFields}
          usersData = {this.state.usersData}
          updateUsersData = {this.updateUsersData}
          currentPage = {this.state.currentPage}
          currentUsersArr = {this.state.currentUsersArr}
          updateCurrentPageArray = {this.updateCurrentPageArray}/>}
        {Boolean(this.state.usersData.length) && <TablePagination 
          updateCurrentPageArray = {this.updateCurrentPageArray}
          currentPage = {this.state.currentPage} 
          arrayLength = {this.state.usersData.length / 50}/>}
      </div>
    );
  }
}

