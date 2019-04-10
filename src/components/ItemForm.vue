<template>
  <div class="row align-items-center justify-content-center">
    <b-card
      bg-variant="light"
      :title="formTitle"
      :sub-title="formSubTitle"
      data-test="currentMonthCard"
    >
      <h3>You've spent {{ getCurrentSpending }} €</h3>
      <b-form>
        <b-form-group
          id="InputGroup1"
          label="Item Name:"
          label-for="ItemInput1"
          description="Please put the name of the item you bought here."
        >
          <b-form-input
            id="ItemInput1"
            type="text"
            placeholder="Item Description"
            v-model="itemName"
            data-test="productName"
          />
        </b-form-group>
        <b-form-group
          id="InputGroup2"
          label="Item Price:"
          label-for="ItemInput2"
          description="Please put the price of the item you bought here."
        >
          <b-form-input
            id="ItemInput2"
            type="number"
            placeholder="Price (in €)"
            v-model="itemPrice"
            data-test="productPrice"
          />
        </b-form-group>
        <b-button
          variant="outline-primary"
          @click="registerItem"
          data-test="registerProduct"
        >Register Item</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ItemForm",
  computed: {
    formTitle() {
      return this.getFullMonth + " " + this.getFullYear;
    },
    formSubTitle() {
      return "You have a budget of " + this.getCurrentMax + " €";
    },
    ...mapGetters('spending', 
      ['getFullYear', 'getFullMonth', 'getCurrentMax', 'getCurrentSpending'])
  },
  data() {
    return {
      itemName: "",
      itemPrice: null
    };
  },
  methods: {
    registerItem() {
      this.addItem({name: this.itemName, price: this.itemPrice})
      this.itemName = "";
      this.itemPrice = null;
    },
    ...mapActions('spending', ['addItem'])
  }
};
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
