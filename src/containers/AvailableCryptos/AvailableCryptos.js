import {array} from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CryptoListItem } from './components'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

class AvailableCryptos extends Component {

  keyExtractor = (item) => item.rank;

  renderItem = ({ item }) => <CryptoListItem currency={item} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.dataSource}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

AvailableCryptos.proptypes = {
  dataSource: array,
}

export default AvailableCryptos;
