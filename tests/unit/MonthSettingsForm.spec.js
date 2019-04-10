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

//The describe block represents the test 'suite'
//It represents a logical grouping of tests.
//It can be nested as much as is desired.
//Caution: Hooks from outer 'describes' will run within inner 'describes' too.
describe('MonthSettingsForm', () => {
  //Only these two are of interest for consultation within the tests
  //As such they are left within the scope of the suite.
  //As they are redefined in every execution, they cannot pollute
  //independent tests.
  let wrapper
  const actions = {
    setYear: sinon.stub(),
    setMonth: sinon.stub(),
    setMax: sinon.stub()
  }

  //The wrapper factory pattern is suggested in the Vue.js documentation, 
  //and allows easy control of wrapper properties while also avoiding the
  //repetition of code. 
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
  
  //An it block can be considered as the unit test itself
  //Within this particular test, we are testing both that
  //a function that is local to the component is called and
  //that a function that is within the store is called; thus,
  //the use of two assertions is justified.
  it('Calls setYear on the Store when setting the year', async () => {
    wrapper = wrapperFactory(false)
    let spy = sinon.spy(wrapper.vm, 'changeYear')
    wrapper.find('[data-test="yearSelector"]').setValue('1');
    //Given that calls to Vuex, and even to the components' methods
    //are asynchronous, it is necessary to "flush" all promises
    //in order to insure execution has been completed.
    //The async/await pattern allows execution to halt in order 
    //to 'wait' for asynchronous code to complete.
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