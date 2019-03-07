<template>
  <div class="row align-items-center justify-content-center" v-if="showComponent">
        <b-card bg-variant="light" :title="formTitle" :sub-title="formSubTitle" data-test="currentMonthCard">
            <h3>You've spent {{ spent }} € </h3>
            <b-form >
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
                >
                    Register Item
                </b-button>
            </b-form>
        </b-card>
  </div>
</template>

<script>
export default {
    name: 'ItemForm',
    props: [
        'year', 
        'month',
        'max',
        'spent'
    ],
    computed: {
        formTitle () {
            return this.month + ' ' + this.year;
        },
        formSubTitle () {
            return this.max === 0 ? 
                (this.year !== '' && this.month !== '' ? 'You have a budget of 0 €' : null) 
                : 'You have a budget of ' + this.max + " €";
        },
        showComponent () {
            return this.year !== '' && this.month !== '';
        }
    },
    data(){
        return {
          inputText: '',
          itemName: '',
          itemPrice: null
        };
    },
    methods: {
        registerItem () {
            this.$emit('registerItem', [ this.itemName, this.itemPrice ]);
            this.itemName = ''
            this.itemPrice = null;
        }
    },
};
</script>

<style scoped>
input {
    margin: 10px;
}
</style>
