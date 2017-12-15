import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { updateFavoriteAction } from '../../../actions';
import { SHAPE, STYLE, THEME } from '../../../config';
import { CursorBlink } from '../../../components';
import styles from './InputHodl.style';

const { CURRENCY } = SHAPE;

class InputHodl extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
    this._onChangeText = this._onChangeText.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

  _onChangeText(hodl) {
    const { currency, updateFavorite } = this.props;
    updateFavorite({ ...currency, hodl });
  }

  _onBlur() {
    this.setState({ focus: false });
    this.props.onBlur();
  }

  _onFocus() {
    this.setState({ focus: true });
    this.props.onFocus();
  }

  render() {
    const {
      _onChangeText, _onBlur, _onFocus,
      props: { currency: { hodl } },
      state: { focus },
    } = this;

    return (
      <View style={[STYLE.ROW, styles.container]}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          defaultValue={hodl ? hodl.toString() : undefined}
          keyboardType="numeric"
          onChangeText={_onChangeText}
          onBlur={_onBlur}
          onFocus={_onFocus}
          placeholder="0.0"
          placeholderTextColor={THEME.CONTRAST}
          style={styles.input}
          tintColor="yellow"
          underlineColorAndroid="transparent"
        />
        { focus && <CursorBlink /> }
      </View>
    );
  }
}

InputHodl.propTypes = {
  currency: shape(CURRENCY),
  onBlur: func,
  onFocus: func,
  updateFavorite: func,
};

InputHodl.defaultProps = {
  currency: {},
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
