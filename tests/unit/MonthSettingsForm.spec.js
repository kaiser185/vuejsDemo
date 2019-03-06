import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import MonthSettingsForm from '../../src/components/MonthSettingsForm';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

Vue.use(BootstrapVue)

describe('MonthSettingsForm', () => {
  let wrapper;

  before(() => {
    wrapper = mount(MonthSettingsForm);
  });

  describe('Setting the year selector', () => {
    
    it('emits the year it was set', () => {

      wrapper.find('[data-test="yearSelector"]').setValue('1');
      //expect(wrapper.emitted('change-year')[0]).to.deep.equal(['1']);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted('changeYear')[0]).to.deep.equal(['1']);
      });
    });

    it('disables the placeholder option', () => {
      const option = wrapper.vm.yearOptions.find(item => {return item.value === null});
      expect(option.disabled).to.deep.equal(true);
    });
  });

  describe('Setting the month selector', () => {
    
    it('emits the month it was set', () => {

      wrapper.find('[data-test="monthSelector"]').setValue('1');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().changeMonth[0]).to.deep.equal(['1']);
      });

    });

    it('disables the placeholder option', () => {
      const option = wrapper.vm.monthOptions.find(item => {return item.value === null});
      expect(option.disabled).to.deep.equal(true);
    });
  });

  describe('Setting a Value for the month', () => {
    it('emits the value set after clicking Set', () => {

    });
  });
});