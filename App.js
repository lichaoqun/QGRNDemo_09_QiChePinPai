/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

import Car from './Car.json';

var getSectionData = (dataBlob, sectionID) => {
  return dataBlob[sectionID];
};

var getRowData = (dataBlob, sectionID, rowID) => {

  return dataBlob[sectionID + ':' + rowID];
};

var ds = new ListView.DataSource({
  getSectionData:getSectionData, // 获取组中的数据
  getRowData:getRowData, // 获取行中的数据
  rowHasChanged:(r1, r2) => (r1 !== r2),
  sectionHeaderHasChanged:(s1, s2) => (s1 !== s2)
});

export default class App extends Component<{}> {

  getSectionData(dataBlob, sectionID){
    return dataBlob[sectionID];
  }

  getRowData(dataBlob, sectionID, rowID){
    return dataBlob[sectionID + ':' + rowID];
  }

  state={
    dataSource : ds,
  }

  render() {
    return (
        <View style = {{backgroundColor:'#FF1111', flex:1}}>
          <View style = {styles.titleViewStyle}>
            <Text>
              SeeMyGo 品牌
            </Text>
          </View>

          <ListView style = {{backgroundColor:'#CCCCCC'}}
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow.bind(this)}
            renderSectionHeader = {this.renderSectionHeader.bind(this)}
          />
        </View>
    );
  }

  componentDidMount(){
    this.loadJsonFrmJson();

  }

  onCellPressClick(e){
    console.log(e);
  }

  onHeaderPressClick(e){
    console.log(e);
  }

  renderRow(rowData){
    return (
        <TouchableOpacity
          onPress = {(e)=>this.onCellPressClick(rowData)}
        >
          <View style = {styles.rowStyle}>
            <Image
                style = {styles.imageStyle}
                source = {{uri : rowData.icon}}/>
            <Text style = {styles.nameStyle}>
              {rowData.name}
            </Text>
          </View>

        </TouchableOpacity>

    )
  }
  renderSectionHeader(sectionData, sectionID){
    return (
        <TouchableOpacity
          onPress = {(e)=>this.onHeaderPressClick(sectionData)}
        >
          <View style = {styles.sectionStyle}>
            <Text>
              {sectionData}
            </Text>
          </View>
        </TouchableOpacity>

    )
  }

  loadJsonFrmJson(){
    var jsonData = Car.data;

    var dataBlob = {},
        sectionIDs = [],
        cars = [],
        rowIDs = [];

    for (var i = 0; i < jsonData.length; i++){

      sectionIDs.push(i);
      dataBlob[i] = jsonData[i].title;
      cars = jsonData[i].cars;
      rowIDs[i] = [];

      for (var j = 0; j < cars.length; j++){
        rowIDs[i].push(j);
        dataBlob[i + ':' + j] = cars[j];
      }
    }

    this.setState({
      dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    });
  }

}

const styles = StyleSheet.create({
  titleViewStyle:{
    marginTop:30
  },

  rowStyle:{
    backgroundColor:'red',
  },

  imageStyle:{
    backgroundColor:'blue',
    width:70,
    height:70
  },

  nameStyle:{

    backgroundColor:'green',
  },

  sectionStyle:{

  }
});
