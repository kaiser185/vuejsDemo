<template>
  <div class="text-center">
    <div class="page-header text-center">
        <h1>Budget App</h1>
    </div>
    <month-settings-form @changeYear="changeYear" @changeMonth="changeMonth" @setMax="setMax"/>
    <div class="row align-items-center justify-content-center">
      <item-form style="max-width: 30rem;" 
        :year="currentYear" 
        :month="currentMonth" 
        :max="currentMax" 
        @registerItem="registerItem"
        />
    </div>
    <div class="row align-items-center justify-content-center">
      <item-list :items="currentItems" @removeItem="removeItem"/>
    </div>
  </div>
</template>

<script>
import MonthSettingsForm from './components/MonthSettingsForm'
import ItemForm from './components/ItemForm.vue'
import ItemList from './components/ItemList.vue'

export default {
  name: 'App',
  components: {
    MonthSettingsForm,
    ItemForm,
    ItemList
  },
  computed: {
    dateSet () {
      return this.currentYear !== '' && this.currentMonth !== '';
    },
    currentItems () {
      const storeElem = this.itemStore.find(element => {
        return element.year === this.currentYear && element.month === this.currentMonth
      })
      if(storeElem === undefined || storeElem.monthItems.length === 0){
        return []
      } else {
        return storeElem.monthItems
      }
    }
  },
  data() {
    return {
      currentYear: '',
      currentYearIdx: '',
      currentMonth: '',
      currentMonthIdx: '',
      currentMax: 0,

      itemStore: [],

      years: {
        '1': '2018',
        '2': '2019',
        '3': '2020',
      },
      months: {
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
    };
  },
  methods: {
    changeYear (year) {
      this.currentYear = this.years[year]
    },
    changeMonth (month) {
      this.currentMonth = this.months[month]
    },
    setMax (max) {
      this.currentMax = parseFloat(max);
    },
    registerItem (item) {
      //find if store for the month exists
      const storeElem = this.itemStore.find(element => {
        return element.year === this.currentYear && element.month === this.currentMonth
      })

      //store depending on what was found - Hacked together but works
      if(storeElem === undefined){
        this.itemStore.push({ 
          year: this.currentYear, 
          month: this.currentMonth, 
          monthItems: [{ name: item[0], price: item[1], id: this.$uuid.v4() }]
        })
      } else {
        this.itemStore.find(element => {
          return element.year === this.currentYear && element.month === this.currentMonth
        }).monthItems.push({ name: item[0], price: item[1], id: this.$uuid.v4() })
      }
      //this.currentItems.push({ name: item[0], price: item[1] })
    },
    removeItem (item) {
      //Find the element within the store that corresponds to the current month
      //Then change the array to not include the item.
      this.itemStore.find(element => {
        return element.year === this.currentYear && element.month === this.currentMonth
      }).monthItems = this.itemStore.find(element => {
          return element.year === this.currentYear && element.month === this.currentMonth
        }).monthItems.filter(e => {
          return e.id !== item.id //&& e.price !== item.price
        })
    }
  }
};
</script>

<style>
.page-header {
  background-color: lightgrey;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

</style>

