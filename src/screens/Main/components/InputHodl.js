import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { updateFavoriteAction } from '../../../actions';
import { SHAPE, STYLE, THEME } from '../../../config';
import styles from './InputHodl.style';

const { COIN } = SHAPE;

class InputHodl extends Component {
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
  }

  _onChangeText(hodl) {
    const { coin, updateFavorite } = this.props;
    updateFavorite({ ...coin, hodl: parseFloat(hodl, 10) });
  }

  render() {
    const {
      _onChangeText,
      props: { coin: { hodl }, onBlur, onFocus },
    } = this;

    return (
      <View style={[STYLE.ROW, styles.container]}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          defaultValue={hodl ? hodl.toString() : undefined}
          keyboardType="numeric"
          onChangeText={_onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="0.0"
          placeholderTextColor={THEME.CONTRAST}
          style={styles.input}
          tintColor="yellow"
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

InputHodl.propTypes = {
  coin: shape(COIN),
  onBlur: func,
  onFocus: func,
  updateFavorite: func,
};

InputHodl.defaultProps = {
  coin: {},
  onBlur() {},
  onFocus() {},
  updateFavorite() {},
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

const mapDispatchToProps = dispatch => ({
  updateFavorite: favorite => dispatch(updateFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputHodl);
