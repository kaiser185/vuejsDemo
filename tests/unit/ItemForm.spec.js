import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import flushPromises from 'flush-promises';
import ItemForm from '../../src/components/ItemForm';
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai)

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('ItemForm', () => {
  //Only these two are of interest for consultation within the tests
  let wrapper
  const actions = {
    addItem: sinon.stub()
  }

  const wrapperFactory = (fullYearText, fullMonthText, currentMax, currentSpending) => {
    const getters = {
      getFullYear: sinon.stub().returns(fullYearText),
      getFullMonth: sinon.stub().returns(fullMonthText),
      getCurrentMax: sinon.stub().returns(currentMax),
      getCurrentSpending: sinon.stub().returns(currentSpending)
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
    //shallowMount cannot be used, as the interactive bootstrap-vue
    //elements won't work without being instanced with the component.
    return mount(ItemForm, {
      localVue,
      store: store,
    })
  }

  it('Inserts an Item and its price and the correct function and actions are called', async () => {
    wrapper = wrapperFactory('2018', 'January', '100', '100')
    const spy = sinon.spy(wrapper.vm, 'registerItem')
    wrapper.find('[data-test="productName"]').setValue('Test1')
    wrapper.find('[data-test="productPrice"]').setValue('192.68')
    wrapper.find('[data-test="registerProduct"]').trigger('click')
    await flushPromises()
    expect(spy).to.have.been.called
    expect(actions.addItem).to.have.been.called
  })

});