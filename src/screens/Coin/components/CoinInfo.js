import { LinearGradient } from 'expo';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Amount } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import Chart from './Chart';
import ChipPrice from './ChipPrice';
import TimelineOption from './TimelineOption';
import styles from './CoinInfo.style';

const { SYMBOL } = C;
const { COIN, HISTORY, SETTINGS } = SHAPE;

class CoinInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { price: undefined };
    this._onValue = this._onValue.bind(this);
  }

  _onValue(price) {
    this.setState({ price });
  }

  render() {
    const {
      _onValue,
      props: {
        history, onChange, refreshing, settings: { currency }, timeline,
      },
      state: { price = this.props.coin.price },
    } = this;

    let high = 0;
    let low = 0;
    if (history.length > 0) {
      high = Math.max.apply(null, history.map(({ value }) => value));
      low = Math.min.apply(null, history.map(({ value }) => value));
    }
    const chipProps = { price, symbol: SYMBOL[currency] };

    return (
      <LinearGradient colors={THEME.GRADIENT} style={[STYLE.LAYOUT_MAIN, styles.container]}>
        <View style={styles.prices}>
          { !refreshing && <ChipPrice {...chipProps} icon="up" value={high} /> }
          <Amount value={price} style={styles.price} />
          { !refreshing && <ChipPrice {...chipProps} icon="down" value={low} /> }
        </View>
        <View style={STYLE.ROW}>
          {
            C.TIMELINES.map(key => (
              <TimelineOption
                key={key}
                caption={key}
                current={timeline}
                refreshing={refreshing}
                onPress={() => !refreshing && onChange(key)}
              />
            ))
          }
        </View>
        <Chart dataSource={history} onValue={_onValue} style={styles.chart} />
      </LinearGradient>
    );
  }
}

CoinInfo.propTypes = {
  coin: shape(COIN).isRequired,
  history: arrayOf(shape(HISTORY)),
  onChange: func,
  refreshing: bool,
  settings: shape(SETTINGS),
  timeline: string,
};

CoinInfo.defaultProps = {
  history: [],
  onChange: undefined,
  refreshing: false,
  settings: {},
  timeline: undefined,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(CoinInfo);
