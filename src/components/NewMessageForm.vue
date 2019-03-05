<template>
  <div class="text-center">
        <input 
            type="text"
            data-test="messageText"
            v-model="inputText"
        />
        <b-button variant="dark"
            data-test="sendButton"
            @click="send"
        >
            Send
        </b-button>
  </div>
</template>

<script>
export default {
  name: 'NewMessageForm',
  data(){
      return {
          inputText: ''
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
