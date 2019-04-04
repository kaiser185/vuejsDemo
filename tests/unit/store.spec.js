import {
  mutations, 
  getters,
  actions
} from '../../src/store/modules/spending';
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai)

describe('Store\'s Spending Module tests', () => {
  
  //For the sake of brevity getters with simple computations will not be tested
  describe('actions', () => {
    it('setYear with no month', () => {
      const commit = sinon.spy()
      const year = '1'
      const currentYear = null//'1'
      const currentMonth = null//'1'
      const context = {
        state: {
          dataObject: {
            /*
            '1': [
              {'month': '1', 'max': 0, 'items': []}
              ]
            */
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setYear(context, year)
      expect(commit.args).to.deep.equal([['SET_YEAR', '1']])
    })

    it('setYear with month set and no entry', () => {
      const commit = sinon.spy()
      const year = '1'
      const currentYear = null//'1'
      const currentMonth = '1'
      const context = {
        state: {
          dataObject: {
            /*
            '1': [
              {'month': '1', 'max': 0, 'items': []}
              ]
            */
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setYear(context, year)
      expect(commit.args).to.deep.equal([['SET_YEAR', '1'],['CREATE_ENTRY', {year: '1', month: '1'}]])
    })

    it('setYear with month set and entry', () => {
      const commit = sinon.spy()
      const year = '1'
      const currentYear = '2'
      const currentMonth = '1'
      const context = {
        state: {
          dataObject: {
            '1': [
              {'month': '1', 'max': 0, 'items': []}
              ]
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setYear(context, year)
      expect(commit.args).to.deep.equal([['SET_YEAR', '1']])
    })

    it('setMonth with no year', () => {
      const commit = sinon.spy()
      const month = '1'
      const currentYear = null//'1'
      const currentMonth = null//'1'
      const context = {
        state: {
          dataObject: {
            /*
            '1': [
              {'month': '1', 'max': 0, 'items': []}
              ]
            */
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setMonth(context, month)
      expect(commit.args).to.deep.equal([['SET_MONTH', '1']])
    })

    it('setMonth with year set and no entry', () => {
      const commit = sinon.spy()
      const month = '1'
      const currentYear = '1'
      const currentMonth = null//'1'
      const context = {
        state: {
          dataObject: {
            /*
            '1': [
              {'month': '1', 'max': 0, 'items': []}
              ]
            */
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setMonth(context, month)
      expect(commit.args).to.deep.equal([['SET_MONTH', '1'],['CREATE_ENTRY', {year: '1', month: '1'}]])
    })

    it('setMonth with month set and entry', () => {
      const commit = sinon.spy()
      const month = '1'
      const currentYear = '1'
      const currentMonth = '2'
      const context = {
        state: {
          dataObject: {
            '1': [
              {'month': '1', 'max': 0, 'items': []},
              {'month': '2', 'max': 0, 'items': []}
              ]
          },
          currentYear: currentYear,
          currentMonth: currentMonth
        },
        commit: commit
      }
      actions.setMonth(context, month)
      expect(commit.args).to.deep.equal([['SET_MONTH', '1']])
    })

  })

  //For the sake of brevity getters with simple computations will not be tested
  describe('getters', () => {
    it('getCurrentMonthEntry', () => {
      const year = '1'
      const month = '1'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 'max': 0, 'items': []}
            ]
        },
        currentYear: year,
        currentMonth: month
      }
      const result = getters.getCurrentMonthEntry(state)
      expect(result).to.deep.equal({'month': '1', 'max': 0, 'items': []})
    })

    it('getCurrentItems empty array', () => {
      const state = {}
      const mockGetters = {
        getCurrentMonthEntry: {'month': '1', 'max': 0, 'items': []}
      }
      const result = getters.getCurrentItems(state, mockGetters)
      expect(result).to.deep.equal([])
    })

    it('getCurrentItems undefined entry', () => {
      const state = {}
      const mockGetters = {
        getCurrentMonthEntry: undefined
      }
      const result = getters.getCurrentItems(state, mockGetters)
      expect(result).to.deep.equal([])
    })

    it('getCurrentItems items entry', () => {
      const state = {}
      const items = [{name: 'test', price: '500', id: '1'}]
      const mockGetters = {
        getCurrentMonthEntry: {'month': '1', 'max': 0, 'items': items}
      }
      const result = getters.getCurrentItems(state, mockGetters)
      expect(result).to.deep.equal(items)
    })

    it('getCurrentSpending correct sum', () => {
      const state = {}
      const items = [{name: 'test1', price: '500', id: '1'}, {name: 'test2', price: '500', id: '2'}]
      const mockGetters = {
        getCurrentItems: items
      }
      const result = getters.getCurrentSpending(state, mockGetters)
      expect(result).to.deep.equal(1000)
    })
    
  })

  //For the sake of brevity mutations with simple computations will not be tested
  describe('mutations', () => {
    it('CREATE_ENTRY empty data object', () => {
      const year = '1'
      const month = '1'
      const state = {
        dataObject: {}
      }
      mutations.CREATE_ENTRY(state, {year: year, month: month})
      expect(state.dataObject).to.deep.equal(
        {
          '1': [
          {'month': '1', 'max': 0, 'items': []}
          ]
        }
      )
    })
    
    it('CREATE_ENTRY add month to existing year', () => {
      const year = '1'
      const month = '2'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 'max': 0, 'items': []}
            ]
        }
      }
      mutations.CREATE_ENTRY(state, {year: year, month: month})
      expect(state.dataObject).to.deep.equal(
        {
          '1': [
          {'month': '1', 'max': 0, 'items': []},
          {'month': '2', 'max': 0, 'items': []}
          ]
        }
      )
    })

    it('CREATE_ENTRY add new year to existing array', () => {
      const year = '2'
      const month = '1'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 'max': 0, 'items': []}
            ]
        }
      }
      mutations.CREATE_ENTRY(state, {year: year, month: month})
      expect(state.dataObject).to.deep.equal(
        {
          '1': [
          {'month': '1', 'max': 0, 'items': []},
          ],
          '2': [
            {'month': '1', 'max': 0, 'items': []},
          ]
        }
      )
    })

    it('SET_MAX', () => {
      const max = '500.57'
      const year = '1'
      const month = '1'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 'max': 0, 'items': []}
            ]
        },
        currentYear: year,
        currentMonth: month
      }
      mutations.SET_MAX(state, max)
      const stateMax = state.dataObject[year].find(element => {return element.month === month}).max
      expect(stateMax).to.deep.equal(parseFloat(max))
    })

    it('ADD_ITEM', () => {
      const item = {name: 'test', price: '500'}
      const year = '1'
      const month = '1'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 'max': 0, 'items': []}
            ]
        },
        currentYear: year,
        currentMonth: month
      }
      mutations.ADD_ITEM(state, item)
      const length = state.dataObject[year].find(element => {return element.month === month}).items.length
      expect(length).to.deep.equal(1)
    })

    it('REMOVE_ITEM', () => {
      const id = '1'
      const year = '1'
      const month = '1'
      const state = {
        dataObject: {
          '1': [
            {'month': '1', 
              'max': 0, 
              'items': [
                {name: 'test', price: '500', id: '1'}
              ]
            }
          ]
        },
        currentYear: year,
        currentMonth: month
      }
      mutations.REMOVE_ITEM(state, {id: id})
      expect(state.dataObject[year].find(element => {return element.month === month}).items.length)
        .to.deep.equal(0)
    })
  })

});