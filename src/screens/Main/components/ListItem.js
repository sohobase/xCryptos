import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { activeFavoriteAction, removeFavoriteAction } from '../../../actions';
import { Amount, CursorBlink } from '../../../components';
import { ASSET, SHAPE, TEXT, THEME, STYLE } from '../../../config';
import { formatCurrency } from '../../../modules';
import styles from './ListItem.style';

const { ALERT, COIN } = SHAPE;
const { EN: { HINT_SET_HODL } } = TEXT;
const { TRANSPARENT } = THEME;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this._onFocus = this._onFocus.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  _onFocus() {
    const { props: { activeFavorite, coin, onFocus } } = this;
    activeFavorite(coin);
    onFocus();
  }

  _onPress() {
    const { props: { activeFavorite, coin, onPress } } = this;
    activeFavorite(coin);
    onPress();
  }

  render() {
    const {
      _onFocus, _onPress,
      props: {
        alerts, conversion = 0, coin, decimal, value,
      },
    } = this;
    const {
      active, hodl = 0, image, price = 0, total = 0,
    } = coin;
    const alert = alerts.find(item => item.coin === coin.coin);

    return (
      <View style={[STYLE.ROW, styles.container, (active && styles.active)]}>
        <TouchableWithoutFeedback onPress={_onPress}>
          <View style={[STYLE.ROW, styles.info]}>
            <View style={styles.thumb}>
              <View style={[STYLE.CENTERED, styles.imageWrap]}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
              { alert && <Image style={styles.alert} source={ASSET.alert} /> }
            </View>
            <View style={styles.coin}>
              <Text style={styles.symbol}>{coin.coin}</Text>
              { hodl > 0 && <Amount style={styles.text} value={total} /> }
              { hodl === 0 && active && <Text style={[styles.text, styles.hint]}>{HINT_SET_HODL}</Text> }
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback underlayColor={TRANSPARENT} onPress={_onFocus}>
          <View style={styles.price}>
            <View style={STYLE.ROW}>
              <Text style={styles.value}>
                { active ? `${value}${decimal ? '.' : ''}` : formatCurrency(((conversion * value) / price), 4)}
              </Text>
              { active && <CursorBlink /> }
            </View>
            <View style={STYLE.ROW}>
              <Amount style={styles.text} value={price} />
              { active && value !== '1' && value !== '0' &&
                <View style={[STYLE.ROW, STYLE.CENTERED]}>
                  <Text style={[styles.text, styles.operation]}>{` x${value} `}</Text>
                  <Text style={styles.text}>= </Text>
                  <Amount style={styles.text} value={value * price} />
                </View> }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

ListItem.propTypes = {
  activeFavorite: func,
  alerts: arrayOf(shape(ALERT)),
  conversion: number,
  coin: shape(COIN),
  decimal: bool,
  onFocus: func,
  onPress: func,
  removeFavorite: func,
  value: string,
};

ListItem.defaultProps = {
  activeFavorite() {},
  alerts: [],
  conversion: 1,
  coin: {},
  decimal: false,
  onFocus() {},
  onPress() {},
  removeFavorite() {},
  value: '0',
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

const mapDispatchToProps = dispatch => ({
  activeFavorite: favorite => dispatch(activeFavoriteAction(favorite)),
  removeFavorite: favorite => dispatch(removeFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
