import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { activeFavoriteAction, removeFavoriteAction } from '../../../actions';
import { ButtonIcon, Touchable } from '../../../components';
import { ASSET, SHAPE, THEME, STYLE } from '../../../config';
import { formatCurrency } from '../../../modules';
import styles from './ListItem.style';

const { ALERT, CURRENCY } = SHAPE;
const SWIPE_BUTTON = {
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
        alerts, conversionUsd = 0, currency, decimal, onAlert, removeFavorite, value,
      },
    } = this;
    const {
      active, image, symbol, usd = 0,
    } = currency;

    const alert = alerts.find(item => item.currency === symbol);
    const options = [
      {
        ...SWIPE_BUTTON,
        text: 'HODL...',
      },
      {
        ...SWIPE_BUTTON,
        component: <ButtonIcon icon="alert" onPress={onAlert} style={styles.option} />,
      },
      {
        ...SWIPE_BUTTON,
        component: <ButtonIcon icon="remove" onPress={() => removeFavorite(currency)} style={styles.option} />,
      },
    ];

    return (
      <Swipeout
        autoClose
        backgroundColor={THEME.TRANSPARENT}
        buttonWidth={64}
        close={!active}
        onOpen={_onActiveItem}
        right={options}
      >
        <Touchable onPress={_onPress}>
          <View style={[styles.container, (active && styles.active)]}>
            <View style={styles.thumb}>
              <View style={[styles.imageWrap, styles.image]}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
              { alert && <Image style={styles.alert} source={ASSET.alert} /> }
            </View>
            <View style={styles.currency}>
              <Text style={styles.symbol}>{symbol}</Text>
              <Text style={styles.text}>your hodl...</Text>
            </View>
            <TouchableWithoutFeedback underlayColor={THEME.TRANSPARENT} onPress={_onActiveItem}>
              <View style={styles.values}>
                <View style={STYLE.ROW}>
                  <Text style={styles.value}>
                    { active ? `${value}${decimal ? '.' : ''}` : formatCurrency(((conversionUsd * value) / usd), 4)}
                  </Text>
                  { active &&
                    <Motion animation="fadeIn" duration={500} iterationCount="infinite" style={styles.blink} /> }
                </View>
                <Text style={styles.text}>{`$${formatCurrency((active ? value : 1) * usd)}`}</Text>
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
  alerts: arrayOf(shape(ALERT)),
  conversionUsd: number,
  currency: shape(CURRENCY),
  decimal: bool,
  onAlert: func,
  onPress: func,
  removeFavorite: func,
  value: string,
};

ListItem.defaultProps = {
  activeFavorite() {},
  alerts: [],
  conversionUsd: 1,
  currency: {},
  decimal: false,
  onAlert: undefined,
  onPress: undefined,
  removeFavorite() {},
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
