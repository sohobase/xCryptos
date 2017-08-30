import { bool, func, shape, string, number } from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { save_favorites } from '../../actions';
import { ServiceFavorites } from '../../services';
import styles from './FavoriteItem.styles';

class FavoriteItem extends Component {
  constructor(props) {
    super(props);
    this._onActiveItem = this._onActiveItem.bind(this);
  }

  async _onActiveItem() {
    this.props.saveFavorites(await ServiceFavorites.active(this.props.currency));
  }

  render() {
    const { currency, onPress, value } = this.props;
    const { active, name, symbol = '', usd } = currency;

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
          <View style={[styles.currency, (active ? styles.active : undefined)]}>
            <Text style={[styles.symbol, styles.text]}>{symbol.toUpperCase()}</Text>
            <Text style={[styles.name, styles.text]}>{name}</Text>
          </View>
          <TouchableHighlight onPress={this._onActiveItem}>
            <View>
              <Text style={[styles.value, styles.text]}>{value}</Text>
              <Text style={[styles.valueUSD, styles.text]}>{`$${usd * value}`}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

FavoriteItem.propTypes = {
  currency: shape({
    active: bool,
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
  onPress: func,
  value: number,
  saveFavorites: func,
};

FavoriteItem.defaultProps = {
  currency: {
    active: false,
  },
  onPress: undefined,
  value: 0,
  saveFavorites() {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);
