import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { RefreshControl } from 'react-native';
import { ServiceCryptos, ServiceFavorites } from '../../services';
import { save_currencies, save_favorites } from '../../actions';

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
    const { saveCurrencies, saveFavorites } = this.props;

    this.setState({ refreshing: true });
    const currencies = await ServiceCryptos.list();
    saveCurrencies(currencies);
    saveFavorites(await ServiceFavorites.update(currencies));
    this.setState({ refreshing: false });
  }

  render() {
    const { refreshing } = this.state;
    const { _fetch } = this;

    return <RefreshControl refreshing={refreshing} onRefresh={_fetch} />;
  }
}

RefreshCurrencies.propTypes = {
  autoRefresh: bool,
  saveCurrencies: func,
  saveFavorites: func,
};

RefreshCurrencies.defaultProps = {
  autoRefresh: false,
  saveCurrencies() {},
  saveFavorites() {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveCurrencies: currencies => dispatch(save_currencies(currencies)),
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshCurrencies);
