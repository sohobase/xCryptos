import { bool, func, shape, string, number } from 'prop-types';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { activeFavoriteAction } from '../../actions';
import { C, THEME } from '../../config';
import styles from './FavoriteItem.style';

const { ICON } = C;

class FavoriteItem extends Component {
  constructor(props) {
    super(props);
    this._onActiveItem = this._onActiveItem.bind(this);
  }

  _onActiveItem() {
    this.props.activeFavorite(this.props.currency);
  }

  render() {
    const { conversionUsd, currency, decimal, onPress, value } = this.props;
    const { active, name, symbol = '', usd } = currency;
    const iconCurrency = ICON[name];

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.container, (active && styles.active)]}>
          { iconCurrency && <Image style={styles.icon} source={iconCurrency} /> }
          <View style={styles.currency}>
            <Text style={[styles.symbol, styles.text]}>{symbol.toUpperCase()}</Text>
            <Text style={[styles.small, styles.text]}>{name}</Text>
          </View>
          <TouchableHighlight underlayColor={THEME.TRANSPARENT} onPress={this._onActiveItem}>
            <View style={styles.values}>
              <Text style={[styles.value, styles.text]}>
                { active ? `${value}${decimal ? '.' : ''}` : ((conversionUsd * value) / usd).toFixed(4) }
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
  activeFavorite: func,
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
};

FavoriteItem.defaultProps = {
  activeFavorite() {},
  conversionUsd: 1,
  currency: {
    active: false,
  },
  decimal: false,
  onPress: undefined,
  value: 0,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  activeFavorite: favorite => dispatch(activeFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);
