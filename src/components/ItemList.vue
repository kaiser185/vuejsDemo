<template>
  <div class="row align-items-center justify-content-center mt-2">
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} -- € {{item.price}}
        <button data-test="RemoveItemButton" @click="removeItem(item)" class="btn">
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
    removeItem (item) {
      this.$emit('removeItem', item)
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
  background-color: red; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  /* padding: 12px 16px; /* Some padding */
  /* font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

.btn:hover {
  background-color: rebeccapurple;
}

li {
  padding: 5px;
}
</style>
