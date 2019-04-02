<template>
  <div class="text-center">
    <div class="page-header text-center">
        <h1>Budget App</h1>
    </div>
    <month-settings-form/>
    <div class="row align-items-center justify-content-center">
      <item-form style="max-width: 30rem;" 
        v-if="dateSet"
        />
    </div>
    <div class="row align-items-center justify-content-center">
      <item-list v-if="dateSet"/>
    </div>
  </div>
</template>

<script>
import MonthSettingsForm from './components/MonthSettingsForm'
import ItemForm from './components/ItemForm.vue'
import ItemList from './components/ItemList.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    MonthSettingsForm,
    ItemForm,
    ItemList
  },
  computed: {
    ...mapGetters('spending', ['dateSet'])
  },
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

