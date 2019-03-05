<template>
  <div class="text-center">
    <div class="page-header text-center">
        <h1>Budget App</h1>
    </div>
    <month-settings-form @changeYear="changeYear" @changeMonth="changeMonth" @setMax="setMax"/>
    <div class="row align-items-center justify-content-center">
      <item-form style="max-width: 20rem;" :year="currentYear" :month="currentMonth" :max="currentMax"/>
    </div>
  </div>
</template>

<script>
import MonthSettingsForm from './components/MonthSettingsForm'
import ItemForm from './components/ItemForm.vue'

export default {
  name: 'App',
  components: {
    MonthSettingsForm,
    ItemForm
  },
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentMax: 0,

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

