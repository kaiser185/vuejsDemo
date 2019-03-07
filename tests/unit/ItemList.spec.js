import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import ItemList from '../../src/components/ItemList';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

Vue.use(BootstrapVue)

describe('ItemList', () => {
  let wrapper;

  before(() => {
    wrapper = mount(ItemList, {
      propsData: {
        items: [
          { id: '1', name: 'AAA', price: '145'},
          { id: '2', name: 'BBB', price: '168'},
          { id: '3', name: 'CCC', price: '192.68'}
        ]
      }
    });
  });

  it('Deletes an item and checks that the event is emitted', () => {
    const list = wrapper.find('ul')
    const items = list.findAll('li')
    items.at(0).find('[data-test="RemoveItemButton"]').trigger('click');

    expect((wrapper.emitted('removeItem')[0])[0]).to.deep.equal({ id: '1', name: 'AAA', price: '145'});
  })

});