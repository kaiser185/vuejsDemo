import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import ItemForm from '../../src/components/ItemForm';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

Vue.use(BootstrapVue)

describe('MonthSettingsForm', () => {
    let wrapper;
  
    before(() => {
      wrapper = mount(ItemForm);
    });

    

});