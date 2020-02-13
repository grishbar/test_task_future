import React from 'react';

export default class Table extends React.Component { 

    sortTable(column) {
        // получаем порядок сортировки
        const isSorted = this.props.isFieldSorted[column];
        console.log('isSorted ' + isSorted);
        // устанавливаем направление
        let direction;
        if (isSorted === 0) {
            direction = -1
        } else if (isSorted === 1) {
            direction = 1
        } else if (isSorted === 2){
            direction = -1
        }
        console.log('direction ' + direction);
        // создаём новый массив из данных и сортируем его
        let sortedArray = [];
        if (isSorted === 0) {
            sortedArray = [].slice.call(this.props.usersData).sort((a, b) => {
              console.log('start sort')
              let firstComparedObj = a[column];
              let secondComparedObj = b[column];
              if (typeof(firstComparedObj) !== 'number' || typeof(secondComparedObj) !== 'number') {
                firstComparedObj = a[column].toLowerCase();
                secondComparedObj = b[column].toLowerCase();
              }
              if (firstComparedObj === secondComparedObj) { return 0; }
              return firstComparedObj > secondComparedObj ? 1 : -1;
            });
        }
        if (isSorted === 1) {
            sortedArray = this.props.usersData.reverse();
        } else if (isSorted === 2){
            sortedArray = this.props.usersData.reverse();
        }
        // меняем состояние сортировки полей
        // let isFieldSorted = Object.assign({}, props.isFieldSorted);
        let isFieldSortedTemp = {};
        for (let i = 0; i < this.props.usersFields.length; i++) {
          isFieldSortedTemp[this.props.usersFields[i]] = 0;
        }
        isFieldSortedTemp[column] = isFieldSortedTemp[column] ? 1 : 2;
        // обновляем состояние и сохраняем в localstorage
        this.props.updateUsersData(sortedArray);
        this.props.updateCurrentPageArray(0, sortedArray);
        this.props.updateIsFieldSorted(isFieldSortedTemp);
    }

    render () {
        return (
            // Допустим, что все пользователи имеют аналогичные свойства первого пользователя и они у всех пользователей заполнены корректно
            <table className="table table-blur">
              <thead className="table-blur__head">
                <tr>
                  {this.props.usersFields && this.props.usersFields.map( (item, index) => (
                      <td
                          key={index + item} 
                          className={this.props.isFieldSorted[item]? "table-blur__head-cell table-blur__head-cell_sorted_"+this.props.isFieldSorted[item] : "table-blur__head-cell"}
                          onClick={() => this.sortTable(item)}
                          >
                          {item}
                      </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.props.usersData && this.props.currentUsersArr.map((item, index) => (
                  <tr key={index + item.phone}>
                    {this.props.usersFields && this.props.usersFields.map( (itemName) => (
                        <td key={index+itemName}>{item[itemName]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        );
    }
}
