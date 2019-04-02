import { mount } from '@vue/test-utils';
import MonthSettingsForm from '../../src/components/MonthSettingsForm';
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai)

describe('MonthSettingsForm', () => {
  let wrapper;

  before(() => {
    wrapper = mount(MonthSettingsForm);
  });

  //A 'describe' block shows the context of the test being run
  describe('Setting the year selector', () => {
    //Each particular unit test lives within an 'it' block
    //It is within these blocks that mocha will look for exceptions to warn of failures.
    //One or more assertions may be made within.
    //Its callback must be marked 'async' for it handles code that is not necessarily concurrent with the test.
    it('emits the year it was set', async () => {
      var emitted;
      //Here we create a spy on our function of interest within the component.
      var spy = sinon.spy(wrapper.vm, 'changeYear')
      //Here we interact with the DOM's element.
      wrapper.find('[data-test="yearSelector"]').setValue('1');
      //The callback within is asynchronous, and thus it is necessary to 'await' its execution
      //This is done because the 'this.$emit(X)' function is called within a function that
      //'handles' a DOM event, and thus, there is no certainty that it will complete whilst the test runs.
      //wrapper.vm.$nextTick() forces the component to run through it 'cycle' and complete its operations
      await wrapper.vm.$nextTick( () => {
        emitted = wrapper.emitted('changeYear')[0]
      });
      //Here we utilise chai's expressive syntax to examine whether the component behaved as expected.
      expect(spy).to.have.been.called;
      expect(emitted).to.deep.equal(['1']);
    });
    //Here we examine that the components data has been correctly modified. This is not necessarily a common test.
    it('disables the placeholder option', () => {
      //Here we obtain the 'option' that is modeled in the 'select'
      //Here is where it is advantageous to use bootstrap-vue, 
      //as it can directly pull and model the component's data.
      const option = wrapper.vm.yearOptions.find(item => {return item.value === null});
      //Then we use chai's api to verify whether our expectations are true.
      expect(option.disabled).to.deep.equal(true);
    });
  });

  describe('Setting the month selector', () => {
    
    it('emits the month it was set', async () => {
      
      //Necessary because the event fired when the selector is interacted with 
      //will not fire until the next 'tick'
      var emitted;

      var spy = sinon.spy(wrapper.vm, 'changeMonth')

      wrapper.find('[data-test="monthSelector"]').setValue('1');
      await wrapper.vm.$nextTick(() => {
        emitted = wrapper.emitted().changeMonth[0]
      });

      expect(spy).to.have.been.called;
      expect(emitted).to.deep.equal(['1']);

    });

    it('disables the placeholder option', () => {
      const option = wrapper.vm.monthOptions.find(item => {return item.value === null});
      expect(option.disabled).to.deep.equal(true);
    });
  });

  describe('Setting a Value for the month', () => {
    it('emits the value set after clicking Set', () => {
      wrapper.find('[data-test="maxInput"]').setValue('192.68');
      wrapper.find('[data-test="maxSet"]').trigger('click');
      
      expect(wrapper.emitted().setMax[0]).to.deep.equal(['192.68']);
    });
  });
});