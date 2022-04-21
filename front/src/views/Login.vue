<script lang="ts">
import { defineComponent, onMounted, reactive, inject } from "vue";
import { io } from 'socket.io-client'
import DxButton from "devextreme-vue/button";

export default defineComponent({
  name: "Login",
  components: {
    DxButton
  },
  props: {
    msg: { type: String, default: "SKI LCA infra" },
  },
  setup(context) {
    const socket:any = inject("socket");
    const testSocket = () => {
      socket.emit("event", 'abcd');
    }
    return {
      testSocket
    };
  },
});
</script>

<template>
  <div>
    <h2>Login</h2>
    <DxButton
      text="Dashboard"
      type="normal"
      styling-mode="outlined"
      @click="testSocket()"
    />
  </div>
</template>
<style lang="scss">
.loginBox {
  width: 25rem;
  margin: 1rem 0;
  .btn {
    margin: 0.5rem 0.2rem 0 0;
  }
}
</style>
