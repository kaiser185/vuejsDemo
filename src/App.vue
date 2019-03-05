<template>
  <div class="text-center">
    <div class="page-header text-center">
        <h1>Budget App</h1>
    </div>
    <month-settings-form />
  </div>
</template>

<script>
import MonthSettingsForm from './components/MonthSettingsForm'

export default {
  name: 'App',
  components: {
    MonthSettingsForm
  },
  data() {
    return {
      messages: []
    };
  },
  methods: {
    addMessage(text){
      this.messages.unshift(text);
    },
    rmItem(text){
      this.messages = this.messages.filter(e => {return e !== text});
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

