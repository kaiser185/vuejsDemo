<template>
  <div class="text-center items-container">
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item }}
        <button data-test="RemoveItemButton" @click="removeItem(message)" class="btn">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: ['items'],
  methods: {
    removeItem (message) {
      this.$emit('removeItem', message)
    }
  }
};
</script>

<style scoped>
.items-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.btn {
  background-color: DodgerBlue; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  /* padding: 12px 16px; /* Some padding */
  /* font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

.btn:hover {
  background-color: RoyalBlue;
}

li {
  padding: 5px;
}
</style>
