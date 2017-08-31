import { bool, func, shape, string, number } from 'prop-types';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { save_favorites } from '../../actions';
import { C, THEME } from '../../config';
import { ServiceFavorites } from '../../services';
import styles from './FavoriteItem.style';

const { ICON = {} } = C;

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
    const { conversionUsd, currency, decimal, onPress, value } = this.props;
    const { active, name, symbol = '', usd } = currency;
    const iconCurrency = ICON[name];

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.container, (active && styles.active)]}>
          <Image style={styles.icon} source={iconCurrency} />
          <View style={styles.currency}>
            <Text style={[styles.symbol, styles.text]}>{symbol.toUpperCase()}</Text>
            <Text style={[styles.small, styles.text]}>{name}</Text>
          </View>
          <TouchableHighlight underlayColor={THEME.TRANSPARENT} onPress={this._onActiveItem}>
            <View style={styles.values}>
              <Text style={[styles.value, styles.text]}>
                { active ? `${value}${decimal ? '.' : ''}` : ((conversionUsd * value) / usd) }
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
  decimal: bool,
  onPress: func,
  value: number,
  saveFavorites: func,
};

FavoriteItem.defaultProps = {
  conversionUsd: 1,
  currency: {
    active: false,
  },
  decimal: false,
  onPress: undefined,
  value: 0,
  saveFavorites() {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);
