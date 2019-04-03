import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import flushPromises from 'flush-promises';
import ItemList from '../../src/components/ItemList';
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai)

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('ItemList', () => {
  //Only these two are of interest for consultation within the tests
  let wrapper
  const actions = {
    removeItem: sinon.stub()
  }

  const wrapperFactory = (items) => {
    const getters = {
      getCurrentItems: sinon.stub().returns(items)
    }
    const spending = {
      namespaced: true,
      state: {},
      actions,
      getters
    }
    const store = new Vuex.Store({
      modules: {
        spending
      }
    })
    //shallowMount cannot be used, as the interactives bootstrap-vue
    //elements won't work without being instanced with the component.
    return mount(ItemList, {
      localVue,
      store: store,
    })
  }

  it('Deletes an item and checks that the event is emitted', async () => {
    wrapper = wrapperFactory([
      {
        "name": "Item1",
        "price": "100",
        "id": "f2b76821-6be1-47a6-a934-05f524afdfa4"
      },
      {
        "name": "Item2",
        "price": "200",
        "id": "d3ee5d9a-fd69-4b0e-8526-805c8b8c821b"
      },
      {
        "name": "Item3",
        "price": "300",
        "id": "d89a1abe-3856-4ed0-88d1-7a3bff9a9524"
      }
    ])
    const spy = sinon.spy(wrapper.vm, 'removeItem')
    const list = wrapper.find('ul')
    const items = list.findAll('li')
    items.at(0).find('[data-test="RemoveItemButton"]').trigger('click');
    await flushPromises()
    expect(spy).to.have.been.called
    expect(actions.removeItem).to.have.been.called
  })

});