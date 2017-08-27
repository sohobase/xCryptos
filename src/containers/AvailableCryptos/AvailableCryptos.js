import { array } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { CryptoListItem } from './components'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

class AvailableCryptos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _fetch() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }

  _keyExtractor = (item) => item.rank;

  _renderItem = ({ item }) => <CryptoListItem currency={item} />;

  render() {
    return (
      <FlatList
        data={this.props.dataSource}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._fetch.bind(this)}
          />
        }
      />
    );
  }
}

AvailableCryptos.proptypes = {
  dataSource: array,
}

export default AvailableCryptos;
