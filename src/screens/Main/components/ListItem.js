import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { activeFavoriteAction, removeFavoriteAction } from '../../../actions';
import { Touchable } from '../../../components';
import { C, THEME, STYLE } from '../../../config';
import { formatCurrency } from '../../../modules';
import styles from './ListItem.style';

const OPTION = {
  backgroundColor: THEME.BACKGROUND_DARK_HIGHLIGHT, underlayColor: THEME.BACKGROUND_DARK,
};

class ListItem extends Component {
  constructor(props) {
    super(props);
    this._onActiveItem = this._onActiveItem.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  _onActiveItem() {
    this.props.activeFavorite(this.props.currency);
  }

  _onPress() {
    this.props.onPress();
    this._onActiveItem();
  }

  render() {
    const {
      _onPress, _onActiveItem,
      props: {
        alerts, conversionUsd, decimal, removeFavorite, value, currency,
      },
    } = this;
    const {
      active, name, image, symbol, usd,
    } = currency;

    const alert = alerts.find(item => item.currency === symbol);
    const options = [
      { ...OPTION, text: 'Holdings' },
      { ...OPTION, text: 'Remove', onPress: () => removeFavorite(currency) },
    ];

    return (
      <Swipeout right={options} autoClose backgroundColor={THEME.TRANSPARENT}>
        <Touchable onPress={_onPress}>
          <View style={[styles.container, (active && styles.active)]}>
            <View style={styles.thumb}>
              <View style={[styles.imageWrap, styles.image]}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
              { alert && <Image style={styles.alert} source={C.ICON.alert} /> }
            </View>
            <View style={styles.currency}>
              <Text style={STYLE.CURRENCY_SYMBOL}>{symbol}</Text>
              { 1 === 2 && <Text style={styles.text}>{name}</Text> }
            </View>
            <TouchableWithoutFeedback underlayColor={THEME.TRANSPARENT} onPress={_onActiveItem}>
              <View style={styles.values}>
                { active && <Text style={[styles.text, styles.highlight]}>{`$${formatCurrency(value * usd)}`}</Text> }
                <View style={STYLE.ROW}>
                  <Text style={styles.value}>
                    { active ? `${value}${decimal ? '.' : ''}` : formatCurrency(((conversionUsd * value) / usd), 4)}
                  </Text>
                  { active &&
                    <Animatable animation="fadeIn" duration={500} iterationCount="infinite" style={styles.blink} /> }
                </View>
                <Text style={styles.text}>{`$${formatCurrency(usd)}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Touchable>
      </Swipeout>
    );
  }
}

ListItem.propTypes = {
  activeFavorite: func,
  alerts: arrayOf(C.SHAPE.ALERT),
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
  value: string,
};

ListItem.defaultProps = {
  activeFavorite() {},
  alerts: [],
  conversionUsd: 1,
  currency: {
    active: false,
    usd: 0,
  },
  decimal: false,
  onPress: undefined,
  value: 0,
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

const mapDispatchToProps = dispatch => ({
  activeFavorite: favorite => dispatch(activeFavoriteAction(favorite)),
  removeFavorite: favorite => dispatch(removeFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
