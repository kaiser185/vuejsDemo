import Vue from 'vue'
import { uuid } from 'vue-uuid'; 


//The following two constants constitute 'translation' tables for the indices
//they are used within getters that return a string and not an index.
const years = {
  '1': '2018',
  '2': '2019',
  '3': '2020',
}

const months = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

//This object constitutes the 'source of truth' of the application.
const state = {
  dataObject: {},
  currentYear: null,
  currentMonth: null,
}

//The getters described hereafter serve as 'computed' properties that can be queried by components or other getters 
//NOTE:
//The syntax proposed by the guide is inconsistent
//in style to the others, since they are properties
//of an object and not methods within it.
export const getters = {
  //Returns the string corresponding to the year
  getFullYear: (state, getters) => {
    return years[getters.getYear]
  },
  //Returns the index corresponding to the year
  getYear: (state) => {
    return state.currentYear
  },
  //Returns the string corresponding to the month
  getFullMonth: (state, getters) => {
    return months[getters.getMonth]
  },
  //Returns the index corresponding to the month
  getMonth: (state) => {
    return state.currentMonth
  },
  //Returns true if both the year and month have been set, otherwise it returns false
  dateSet: (state) => {
    return state.currentYear !== null && state.currentMonth !== null
  },
  //This returns the object that represents the current the information within the currently set month + year
  //It is an object that contains the max budget, the month, and the corresponding items.
  getCurrentMonthEntry: (state) =>{
    const month = state.currentMonth
    const year = state.currentYear
    let entry
    if (month !== null 
      && year !== null 
      && state.dataObject[year] !== undefined 
      && (entry = state.dataObject[year].find(element => { return element.month === month })) !== undefined) {
        return entry
      }
    else {
      return undefined
    }
  },
  //Using the getCurrentMonthEntry getter, it returns the max property for the current month
  getCurrentMax: (state, getters) => {
    const entry = getters.getCurrentMonthEntry
    if(entry !== undefined) {
      return entry.max
    } else {
      return 0
    }
  },
  //Using the getCurrentMonthEntry getter, it returns the item list for the current month
  getCurrentItems: (state, getters) => {
    const entry = getters.getCurrentMonthEntry
    if(entry !== undefined) {
      return entry.items
    } else {
      return []
    }
  },
  //Using the getCurrentItems getter, it calculates the current spending for the month
  getCurrentSpending: (state, getters) => {
    const items = getters.getCurrentItems
    if (items.length !== 0) {
      let sum = 0;
      items.forEach(element => {
        sum += parseFloat(element.price)
      })
      return sum
    } else {
      return 0
    }
  }
}

//The actions that are defined here set in motion the changing of the state, and 'commit' the synchronous mutations
//that must take place when called. In a sense they are the 'handlers' for state change requests.
export const actions = {
  //This action sets the year
  //First it commits the currently selected year to the state
  //Second it verifies whether an entry has been created for the current combination of month + year
  //If not it proceeds to create it. There is a need to do this to 'play well' with vue's reactivity.
  setYear (context, year) {
    context.commit('SET_YEAR', year)
    const month = context.state.currentMonth
    if(month !== null 
      && (context.state.dataObject[year] === undefined 
        || context.state.dataObject[year].find(element => { 
          return element.month === month }) 
        === undefined)){
        context.commit('CREATE_ENTRY', {year, month})
    }
  },
  //This action sets the month
  //First it commits the currently selected month to the state
  //Second it verifies whether an entry has been created for the current combination of month + year
  //If not it proceeds to create it. There is a need to do this to 'play well' with vue's reactivity.
  setMonth (context, month) {
    context.commit('SET_MONTH', month)
    const year = context.state.currentYear
    if(year !== null 
      && (context.state.dataObject[year] === undefined 
        || context.state.dataObject[year].find(element => { 
          return element.month === month }) 
        === undefined)){
        context.commit('CREATE_ENTRY', {year, month})
    }
  },
  //This action sets the maximum for the currently selected year + month pair.
  //No verification is done for the component logics impedes this method from
  //being called before both are set (and thus creating the corresponding entry)
  //Checks could be created, though.
  setMax (context, max) {
    context.commit('SET_MAX', max)
  },
  //This action adds an item to the entry for the currently selected year + month pair.
  //No verification is done for the component logics impedes this method from
  //being called before both are set (and thus creating the corresponding entry)
  //Checks should be created, perhaps.
  addItem (context, item) {
    context.commit('ADD_ITEM', item)
  },
  //This action removes an item to the entry for the currently selected year + month pair.
  //No verification is done for the component logics impedes this method from
  //being called before both are set (and thus creating the corresponding entry)
  //Checks should be created, perhaps.
  removeItem(context, item) {
    context.commit('REMOVE_ITEM', item)
  }
}

//Mutations are the functions that actually modify the state of the application
//They are the only ones that may do so
//There cannot be asynchronous
export const mutations = {
  //This sets the year property
  SET_YEAR (state, year){
    state.currentYear = year
  },
  //This sets the month property
  SET_MONTH (state, month){
    state.currentMonth = month
  },
  //This creates an entry in the array for the corresponding year + month pair.
  //This logic is tied to the way Vue looks at objects for updates.
  CREATE_ENTRY (state, {year, month}){
    if(state.dataObject[year] === undefined){
      Vue.set(state.dataObject, year, [{month: month, max: 0, items: [] }])
    } else {
      state.dataObject[year].push({month: month, max: 0, items: [] })
    }
  },
  //This modifies the max property for the corresponding year + month pair.
  SET_MAX (state, max){
    const year = state.currentYear
    const month = state.currentMonth
    const idx = state.dataObject[year].findIndex(element => {return element.month === month })
    Vue.set(state.dataObject[year][idx], 'max', parseFloat(max))
  },
  //This adds an item in the entry for the corresponding year + month pair.
  ADD_ITEM (state, {name, price}){
    const year = state.currentYear
    const month = state.currentMonth
    state.dataObject[year]
      .find(element => {return element.month === month })
      .items
      .push({name: name, price: price, id: uuid.v4()})
  },
  //This removes an item in the entry for the corresponding year + month pair.
  //An in place modification is carried out with splice, both to simplify calculation and
  //to conform to vue's expectations for object updates.
  REMOVE_ITEM (state, {id}){
    const year = state.currentYear
    const month = state.currentMonth
    //This is very costly and must be refactored
    const items = state.dataObject[year].find(element => {return element.month === month }).items
    const idx = items.findIndex(element => {return element.id === id});
    items.splice(idx,1);
  }
}

//In order to have a correct differentiation of methods, should there be othere modules, this module is namespaced.
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}