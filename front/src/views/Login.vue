<script lang="ts">
import { defineComponent, onMounted, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  name: "Login",
  components: {
    DxButton
  },
  props: {
    iconColor: { type: String, default: "default" },
  },
  setup(context) {
    const socket:any = inject("socket");
    const router = useRouter();
    const testSocket = () => {
      socket.emit("event", new Date().getTime());
    }
    const goHome = async () => router.push({ name: "Home" });
    return {
      testSocket,
      goHome
    };
  },
});
</script>

<template>
  <div>
    <h2>Login</h2>
    <DxButton
      text="Socket-test"
      type="normal"
      styling-mode="outlined"
      @click="testSocket()"
    />
    <DxButton
      text="home"
      type="normal"
      styling-mode="outlined"
      @click="goHome()"
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
