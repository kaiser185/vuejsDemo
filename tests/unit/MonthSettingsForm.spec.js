import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import flushPromises from 'flush-promises';
import MonthSettingsForm from '../../src/components/MonthSettingsForm';
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai)

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('MonthSettingsForm', () => {
  //Only these two are of interest for consultation within the tests
  let wrapper
  const actions = {
    setYear: sinon.stub(),
    setMonth: sinon.stub(),
    setMax: sinon.stub()
  }

  const wrapperFactory = (isDateSet) => {
    const getters = {
      dateSet: sinon.stub().returns(isDateSet)
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
    return mount(MonthSettingsForm, {
      localVue,
      store: store,
    })
  }

  it('Calls setYear on the Store when setting the year', async () => {
    wrapper = wrapperFactory(false)
    let spy = sinon.spy(wrapper.vm, 'changeYear')
    wrapper.find('[data-test="yearSelector"]').setValue('1');
    //Given that calls to Vuex, and even the components methods
    //are asynchronous, it is necessary to "flush" all promises
    //in order to insure execution has been completed.
    await flushPromises()
    expect(spy).to.have.been.called
    expect(actions.setYear).to.have.been.called
  })

  it('Calls setMonth on the Store when setting the month', async () => {
    wrapper = wrapperFactory(false)
    const spy = sinon.spy(wrapper.vm, 'changeMonth')
    wrapper.find('[data-test="monthSelector"]').setValue('1');
    await flushPromises()
    expect(spy).to.have.been.called
    expect(actions.setMonth).to.have.been.called
  })

  it('Setting max without dateSet is does not change the state', async () => {
    wrapper = wrapperFactory(false)
    const spy = sinon.spy(wrapper.vm, 'changeMax')
    wrapper.find('[data-test="maxInput"]').setValue('192.68');
    wrapper.find('[data-test="maxSet"]').trigger('click');
    await flushPromises()
    expect(spy).to.not.have.been.called
    expect(actions.setMax).to.not.have.been.called
  })

  it('Setting max with dateSet is does not change the state', async () => {
    wrapper = wrapperFactory(true)
    const spy = sinon.spy(wrapper.vm, 'changeMax')
    wrapper.find('[data-test="maxInput"]').setValue('192.68');
    wrapper.find('[data-test="maxSet"]').trigger('click');
    await flushPromises()
    expect(spy).to.have.been.called
    expect(actions.setMax).to.have.been.called
  })

  it('Setting max with dateSet resets the currentMax', async () => {
    wrapper = wrapperFactory(true)
    wrapper.find('[data-test="maxInput"]').setValue('192.68');
    wrapper.find('[data-test="maxSet"]').trigger('click');
    await flushPromises()
    expect(wrapper.vm.currentMax).to.deep.equal(null)
  })
});