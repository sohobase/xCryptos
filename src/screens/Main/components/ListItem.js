import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, CursorBlink } from '../../../components';
import { ASSET, SHAPE, THEME, STYLE } from '../../../config';
import { formatCurrency } from '../../../modules';
import styles from './ListItem.style';

const { ALERT, COIN } = SHAPE;
const { TRANSPARENT } = THEME;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  _onFocus() {
    const { props: { coin, onFocus } } = this;
    this.setState({ focus: true });
    onFocus(coin);
  }

  _onPress() {
    const { props: { coin, onPress } } = this;
    this.setState({ focus: false });
    onPress(coin);
  }

  render() {
    const {
      _onFocus, _onPress,
      props: {
        active, alerts, conversion = 0, coin, decimal, value,
      },
      state: { focus },
    } = this;
    const {
      hodl = 0, image, price = 0, total = 0, trend = 0,
    } = coin;
    const alert = alerts.find(item => item.coin === coin.coin);

    return (
      <View style={[STYLE.ROW, styles.container, active && styles.active]}>
        <TouchableWithoutFeedback onPress={_onPress}>
          <View style={[STYLE.ROW, styles.info]}>
            <View style={styles.thumb}>
              { parseInt((trend * 100) / price, 10) !== 0 &&
                <View style={[styles.bullet, trend > 0 ? STYLE.GREEN : STYLE.RED]} /> }
              <View style={[STYLE.CENTERED, styles.imageWrap]}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
              { alert && <Image style={styles.alert} source={ASSET.alert} /> }
            </View>
            <View style={styles.coin}>
              <Text style={styles.value}>{coin.coin}</Text>
              { hodl > 0 && <Amount style={styles.text} value={total} /> }
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback underlayColor={TRANSPARENT} onPress={_onFocus}>
          <View style={styles.price}>
            <View style={STYLE.ROW}>
              <Text style={styles.value}>
                { active ? `${value}${decimal ? '.' : ''}` : formatCurrency(((conversion * value) / price), 4)}
              </Text>
              { active && focus && <CursorBlink /> }
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
  active: bool,
  alerts: arrayOf(shape(ALERT)),
  conversion: number,
  coin: shape(COIN),
  decimal: bool,
  onFocus: func,
  onPress: func,
  value: string,
};

ListItem.defaultProps = {
  active: false,
  alerts: [],
  conversion: 1,
  coin: {},
  decimal: false,
  onFocus() {},
  onPress() {},
  value: '0',
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

export default connect(mapStateToProps)(ListItem);
