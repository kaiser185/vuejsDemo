import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import ItemForm from '../../src/components/ItemForm';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

Vue.use(BootstrapVue)

describe('ItemForm', () => {
    let wrapper;
  
    before(() => {
      wrapper = mount(ItemForm, {
        propsData: {
          year: '2019',
          month: 'June',
          max: 192.68
        }
      });
    });

    it('Inserts an Item and its price and sees the event emitted', () => {
      wrapper.find('[data-test="productName"]').setValue('Test1')
      wrapper.find('[data-test="productPrice"]').setValue('192.68')

      wrapper.find('[data-test="registerProduct"]').trigger('click')
      
      //Events are [payload:[X, Y, ..]] where X are arrays themselves in this case.
      expect((wrapper.emitted('registerItem')[0])[0]).to.deep.equal(['Test1', '192.68']);
    })

});