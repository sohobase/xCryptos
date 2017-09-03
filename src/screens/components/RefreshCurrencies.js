import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { RefreshControl } from 'react-native';
import { save_currencies, update_favorites } from '../../actions';
import { ServiceCurrencies } from '../../services';
import { THEME } from '../../config';
import styles from './RefreshCurrencies.style';

class RefreshCurrencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this._fetch = this._fetch.bind(this);
  }

  componentDidMount() {
    if (this.props.autoRefresh) this._fetch();
  }

  async _fetch() {
    const { saveCurrencies, updateFavorites } = this.props;

    this.setState({ refreshing: true });
    const currencies = await ServiceCurrencies.list();
    saveCurrencies(currencies);
    updateFavorites(currencies);
    this.setState({ refreshing: false });
  }

  render() {
    const { refreshing } = this.state;
    const { _fetch } = this;

    return (
      <RefreshControl
        style={styles.container}
        tintColor={THEME.WHITE}
        refreshing={refreshing}
        onRefresh={_fetch}
      />
    );
  }
}

RefreshCurrencies.propTypes = {
  autoRefresh: bool,
  saveCurrencies: func,
  updateFavorites: func,
};

RefreshCurrencies.defaultProps = {
  autoRefresh: false,
  saveCurrencies() {},
  updateFavorites() {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveCurrencies: currencies => dispatch(save_currencies(currencies)),
  updateFavorites: favorites => dispatch(update_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshCurrencies);
