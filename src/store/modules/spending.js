import Vue from 'vue'
import { uuid } from 'vue-uuid'; 

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

const state = {
  dataObject: {},
  currentYear: null,
  currentMonth: null,
}

//The syntax proposed by the guide is inconsistent
//in style to the others, since they are properties
//of an object and not methods within it.
const getters = {
  getFullYear: (state, getters) => {
    return years[getters.getYear]
  },
  getYear: (state) => {
    return state.currentYear
  },
  getFullMonth: (state, getters) => {
    return months[getters.getMonth]
  },
  getMonth: (state) => {
    return state.currentMonth
  },
  dateSet: (state) => {
    return state.currentYear !== null && state.currentMonth !== null
  },
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
  getCurrentMax: (state, getters) => {
    const entry = getters.getCurrentMonthEntry
    if(entry !== undefined) {
      return entry.max
    } else {
      return 0
    }
  },
  getCurrentItems: (state, getters) => {
    const entry = getters.getCurrentMonthEntry
    if(entry !== undefined) {
      return entry.items
    } else {
      return []
    }
  },
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

const actions = {
  setYear (context, year) {
    context.commit('SET_YEAR', year)
    const month = context.state.currentMonth
    if(month !== null 
      && (context.state.dataObject[year] === undefined 
        || context.state.dataObject[year].find(element => { 
          return element.month === month }) 
        === undefined)){
        console.log("NEW --YEAR-- ENTRY")
        context.commit('CREATE_ENTRY', {year, month})
    }
  },
  setMonth (context, month) {
    context.commit('SET_MONTH', month)
    const year = context.state.currentYear
    if(year !== null 
      && (context.state.dataObject[year] === undefined 
        || context.state.dataObject[year].find(element => { 
          return element.month === month }) 
        === undefined)){
        console.log("NEW --MONTH-- ENTRY")
        context.commit('CREATE_ENTRY', {year, month})
    }
  },
  setMax (context, max) {
    context.commit('SET_MAX', max)
  },
  addItem (context, item) {
    context.commit('ADD_ITEM', item)
  },
  removeItem(context, item) {
    context.commit('REMOVE_ITEM', item)
  }
}

const mutations = {
  SET_YEAR (state, year){
    state.currentYear = year
  },
  SET_MONTH (state, month){
    state.currentMonth = month
  },
  CREATE_ENTRY (state, {year, month}){
    if(state.dataObject[year] === undefined){
      Vue.set(state.dataObject, year, [{month: month, max: 0, items: [] }])
    } else {
      state.dataObject[year].push({month: month, max: 0, items: [] })
    }
  },
  SET_MAX (state, max){
    const year = state.currentYear
    const month = state.currentMonth
    const idx = state.dataObject[year].findIndex(element => {return element.month === month })
    Vue.set(state.dataObject[year][idx], 'max', parseFloat(max))
  },
  ADD_ITEM (state, {name, price}){
    const year = state.currentYear
    const month = state.currentMonth
    state.dataObject[year]
      .find(element => {return element.month === month })
      .items
      .push({name: name, price: price, id: uuid.v4()})
  },
  REMOVE_ITEM (state, {id}){
    const year = state.currentYear
    const month = state.currentMonth
    //https://stackoverflow.com/a/49587869
    state.dataObject[year].splice(0, 
      state.dataObject[year].length,
      state.dataObject[year]
      .find(element => {return element.month === month })
      .items.filter(element => {
      return element.id !== id
    }))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}