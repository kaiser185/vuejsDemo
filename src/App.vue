<template>
  <div class="text-center">
    <div class="page-header text-center">
        <h1>Budgetting app</h1>
    </div>
    <new-message-form @send="addMessage" />
    <message-list :messages="messages" @removeItem="rmItem"/>
  </div>
</template>

<script>
import NewMessageForm from './components/NewMessageForm';
import MessageList from './components/MessageList';

export default {
  name: 'App',
  components: {
    NewMessageForm,
    MessageList
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

