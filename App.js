import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});

class Currency extends Component {
  render() {
    const { name, rank, symbol, usd } = this.props.currency;

    return (
      <TouchableHighlight
        key={rank}
      >
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>{`${symbol} ${name}`}</Text>
          <Text style={styles.groupName}>{`${usd}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
Currency.propTypes = {
  currency: PropTypes.shape({
    name: PropTypes.string,
    rank: PropTypes.number,
    symbol: PropTypes.string,
    usd: PropTypes.number,
  }),
};

class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  };

  componentWillMount() {
    return fetch('https://coinbin.org/coins')
      .then((response) => response.json())
      .then(({coins = {}}) => {
        const cryptos = [];
        Object.keys(coins).forEach((coin) => {
          if (coins[coin].rank < 32) {
            cryptos.push(Object.assign(coins[coin], { symbol: coin }));
          }
        });

        this.setState({ dataSource: cryptos.sort((a, b) => a.rank - b.rank) });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  keyExtractor = item => item.rank;

  renderItem = ({ item }) => <Currency currency={item} />;

  render() {
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource.slice(0, 31)}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Currencies;
