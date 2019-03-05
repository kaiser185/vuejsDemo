<template>
  <div class="row align-items-center justify-content-center">
        <b-card bg-variant="light" :title="formTitle">

        </b-card>
  </div>
</template>

<script>
export default {
    name: 'ItemForm',
    props: [
        'year', 
        'month'
    ],
    computed: {
        formTitle () {
            return this.month + ' ' + this.year;
        }
    },
    data(){
        return {
          inputText: '',
        };
    },
    methods: {
        send (){
            this.$emit('send', this.inputText);
            this.inputText = '';
        },
    },
};
</script>

<style scoped>
input {
    margin: 10px;
}
</style>
