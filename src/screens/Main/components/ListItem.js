import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, CursorBlink } from '../../../components';
import { ASSET, C, SHAPE, THEME, STYLE } from '../../../config';
import styles from './ListItem.style';

const { LOCALE } = C;
const { TRANSPARENT } = THEME;

const ListItem = ({
  active, alerts, conversion = 0, coin, decimal, onFocus, onPress, settings: { locale = LOCALE }, value,
}) => {
  const {
    hodl = 0, image, price = 0, total = 0, trend = 0,
  } = coin;
  const alert = alerts.find(item => item.coin === coin.coin);
  const valueConversion = value ? parseFloat((conversion * value.replace(',', '')) / price).toLocaleString(locale) : 0;

  return (
    <View style={[STYLE.ROW, styles.container, active && styles.active]}>
      <TouchableWithoutFeedback onPress={onPress}>
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
      <TouchableWithoutFeedback
        underlayColor={TRANSPARENT}
        onPress={() => onFocus(value ? valueConversion : '1')}
      >
        <View style={styles.price}>
          { value &&
          <View style={STYLE.ROW}>
            <Text style={styles.value}>
              { active ? `${value}${decimal ? '.' : ''}` : valueConversion }
            </Text>
            { active && <CursorBlink /> }
          </View>
          }
          <View style={STYLE.ROW}>
            <Amount style={value ? styles.text : styles.value} value={price} />
            { active && value && value !== '1' && value !== '0' &&
              <View style={[STYLE.ROW, STYLE.CENTERED]}>
                <Text style={[styles.text, styles.operation]}>{` x${value} `}</Text>
                <Text style={styles.text}>= </Text>
                <Amount style={styles.text} value={value.replace(',', '') * price} />
              </View> }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

ListItem.propTypes = {
  active: bool,
  alerts: arrayOf(shape(SHAPE.ALERT)),
  conversion: number,
  coin: shape(SHAPE.COIN),
  decimal: bool,
  onFocus: func,
  onPress: func,
  settings: shape(SHAPE.SETTINGS),
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
  settings: {},
  value: undefined,
};

const mapStateToProps = ({ alerts, settings }) => ({
  alerts,
  settings,
});

export default connect(mapStateToProps)(ListItem);
