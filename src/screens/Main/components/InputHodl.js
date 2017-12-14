import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { updateFavoriteAction } from '../../../actions';
import { SHAPE, THEME } from '../../../config';
import styles from './InputHodl.style';

const { CURRENCY } = SHAPE;

class InputHodl extends Component {
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
  }

  _onChangeText(hodl) {
    const { currency, updateFavorite } = this.props;
    updateFavorite({ ...currency, hodl });
  }

  render() {
    const { _onChangeText, props: { currency: { hodl } } } = this;

    return (
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        defaultValue={hodl ? hodl.toString() : undefined}
        keyboardType="numeric"
        onChangeText={_onChangeText}
        placeholder="0.0"
        placeholderTextColor={THEME.CONTRAST}
        style={styles.input}
        tintColor="yellow"
        underlineColorAndroid="transparent"
      />
    );
  }
}

InputHodl.propTypes = {
  currency: shape(CURRENCY),
  updateFavorite: func,
};

InputHodl.defaultProps = {
  currency: {},
  updateFavorite() {},
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

const mapDispatchToProps = dispatch => ({
  updateFavorite: favorite => dispatch(updateFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputHodl);
