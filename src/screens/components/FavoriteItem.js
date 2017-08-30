import { bool, func, shape, string, number } from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { save_favorites } from '../../actions';
import { THEME } from '../../config';
import { ServiceFavorites } from '../../services';
import styles from './FavoriteItem.styles';

class FavoriteItem extends Component {
  constructor(props) {
    super(props);
    this._onActiveItem = this._onActiveItem.bind(this);
  }

  async _onActiveItem() {
    await ServiceFavorites.active(this.props.currency);
    this.props.saveFavorites(await ServiceFavorites.list());
  }

  render() {
    const { conversionUsd, currency, onPress, value } = this.props;
    const { active, name, symbol = '', usd } = currency;

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.container, (active && styles.active)]}>
          <View style={styles.currency}>
            <Text style={[styles.symbol, styles.text]}>{symbol.toUpperCase()}</Text>
            <Text style={[styles.small, styles.text]}>{name}</Text>
          </View>
          <TouchableHighlight underlayColor={THEME.TRANSPARENT} onPress={this._onActiveItem}>
            <View style={styles.values}>
              <Text style={[styles.value, styles.text]}>
                { active ? value : (conversionUsd * value) / usd }
              </Text>
              <Text style={[styles.small, styles.text]}>{`$${usd}`}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

FavoriteItem.propTypes = {
  conversionUsd: number,
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
  conversionUsd: 1,
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
