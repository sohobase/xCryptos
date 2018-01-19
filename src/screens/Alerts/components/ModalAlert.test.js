import 'react-native';
import React from 'react';
import { ModalAlert } from './ModalAlert';
import renderer from 'react-native-test-utils';

jest.mock('../../../components/Amount', () => 'Amount');
jest.mock('../../../services/alerts', () => ({
  add: () => Promise.resolve(),
  remove: () => Promise.resolve(),
}));

const COIN = { price: 5 };
const ALERT = { low: 1, high: 10 };

describe('<ModalAlert />', () => {
  describe('when alert is new', () => {
    it('renders by default', () => {
      const tree = renderer(<ModalAlert coin={COIN} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders the correct title', () => {
      const component = renderer(<ModalAlert coin={COIN} />);
      const modal = component.query('Modal');
      
      expect(modal.props.title).toEqual('New Alert');
    });

    it('renders the correct caption in <Button />', () => {
      const component = renderer(<ModalAlert coin={COIN} />);
      const button = component.query('Button');
      
      expect(button.props.caption).toEqual('Create');
    });

    describe('when low is empty', () => {
      it('disables submit button', () => {
        const component = renderer(<ModalAlert coin={COIN} />);
        component.instance.setState({
          item: { low: null, high: 5 }
        });

        const button = component.query('Button');
        expect(button.props.disabled).toBe(true);
      });
    });

    describe('when low is bigger than price', () => {
      it('disables submit button', () => {
        const component = renderer(<ModalAlert coin={COIN} />);
        component.instance.setState({
          item: { low: 10, high: 5 }
        });

        const button = component.query('Button');
        expect(button.props.disabled).toBe(true);
      });
    });

    describe('when high is empty', () => {
      it('disables submit button', () => {
        const component = renderer(<ModalAlert coin={COIN} />);
        component.instance.setState({
          item: { low: 2, high: null }
        });

        const button = component.query('Button');
        expect(button.props.disabled).toBe(true);
      });
    });

    describe('when hight is smaller than price', () => {
      it('disables submit button', () => {
        const component = renderer(<ModalAlert coin={COIN} />);
        component.instance.setState({
          item: { low: 2, high: 3 }
        });

        const button = component.query('Button');
        expect(button.props.disabled).toBe(true);
      });
    });
  });

  describe('when alert already exists', () => {
    it('renders by default', () => {
      const tree = renderer(<ModalAlert coin={COIN} alert={ALERT} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders the correct title', () => {
      const component = renderer(<ModalAlert coin={COIN} alert={ALERT} />);
      const modal = component.query('Modal');
      
      expect(modal.props.title).toEqual('Alert');
    });

    it('renders the correct caption in <Button />', () => {
      const component = renderer(<ModalAlert coin={COIN} alert={ALERT} />);
      const button = component.query('Button');
      
      expect(button.props.caption).toEqual('Delete');
    });

    it('disables fieldsets', () => {
      const component = renderer(<ModalAlert coin={COIN} alert={ALERT} />);
      const fieldsets = component.queryAll('Fieldset');

      fieldsets.forEach(fieldset => expect(fieldset.props.disabled).toBeTruthy());
    });
  });

  describe('when refreshing is true', () => {
    it('disables submit button', () => {
      const component = renderer(<ModalAlert coin={COIN} />);
      component.instance.setState({
        item: { low: 2, high: 16 },
        refreshing: true
      });

      const button = component.query('Button');
      expect(button.props.disabled).toBe(true);
    });
  });

  describe('._onChange', () => {
    it('sets the state with the correct value', () => {
      const component = renderer(<ModalAlert coin={COIN} />).instance;

      expect(component.state.item).toBeUndefined();

      component._onChange('low', 66);

      expect(component.state.item.low).toEqual(66);
    });
  });

  describe('._onSubmit', () => {
    it('sets refreshing to true', () => {
      const component = renderer(<ModalAlert coin={COIN} />).instance;
      component._onSubmit();
      expect(component.state.refreshing).toBe(true);
    });

    describe('when there is an alert', () => {
      it('calls removeAlert prop', async () => {
        const removeSpy = jest.fn();
        const component = renderer(<ModalAlert coin={COIN} alert={ALERT} removeAlert={removeSpy} />).instance;
        
        await component._onSubmit();
        
        expect(removeSpy).toHaveBeenCalled();
      });
    });

    describe('when alert is new', () => {
      it('calls addAlert prop', async () => {
        const addSpy = jest.fn();
        const component = renderer(<ModalAlert coin={COIN} addAlert={addSpy} />).instance;
        
        await component._onSubmit();
        
        expect(addSpy).toHaveBeenCalled();
      });
    });
  });
});
