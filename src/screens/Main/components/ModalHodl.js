import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFavoriteAction } from '../../../actions';
import { Input, Modal } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './ModalHodl.style';

const { COIN } = SHAPE;

class ModalHodl extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(value) {
    const { coin, updateFavorite } = this.props;
    updateFavorite({ ...coin, hodl: value ? parseFloat(value, 10) : 0 });
  }

  render() {
    const { _onChange, props: { coin: { coin, hodl = 0 }, onClose, visible } } = this;

    return (
      <Modal title={`${coin} holdings`} onClose={onClose} visible={visible}>
        <Input
          autoFocus
          defaultValue={hodl !== 0 ? hodl.toString() : undefined}
          onChangeText={_onChange}
          style={[STYLE.LIST_ITEM, styles.input]}
        />
      </Modal>
    );
  }
}

ModalHodl.propTypes = {
  coin: shape(COIN),
  onClose: func,
  updateFavorite: func,
  visible: bool,
};

ModalHodl.defaultProps = {
  coin: undefined,
  onClose() {},
  updateFavorite() {},
  visible: false,
};

const mapStateToProps = undefined;

const mapDispatchToProps = dispatch => ({
  updateFavorite: favorite => dispatch(updateFavoriteAction(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalHodl);
