<script lang="ts">
import { defineComponent, onMounted, ref, inject } from "vue";
import axiosInstance from "@/services/apiInstance";
import { useRouter } from "vue-router";
import DxTextBox from "devextreme-vue/text-box";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  components: {
    DxTextBox,
    DxButton,
  },
  setup(context) {
    const api = inject("api", (opt) => {}, false);
    const router = useRouter();
    const goDashboard = async () => {
      try {
        api({ a: "b" });
      } catch (e) {
        console.warn(e);
      }
      // router.push({ name: "Dashboard" });
    };
    const goAssessment = async () => {
      router.push({ name: "Assessment" });
    };
    const procLogin = async () => {};
    return {
      goDashboard,
      goAssessment,
      procLogin,
    };
  },
});
</script>

<template>
  <div>
    <h2>HOME</h2>
    <DxButton
      text="Dashboard"
      type="normal"
      styling-mode="outlined"
      @click="goDashboard()"
    />
    <DxButton
      text="Assessment"
      type="normal"
      styling-mode="outlined"
      @click="goAssessment()"
    />
    <div class="loginBox">
      <DxTextBox placeholder="id" />
      <DxTextBox placeholder="password" />
      <DxButton
        text="Login"
        class="btn"
        type="success"
        styling-mode="outlined"
        @click="procLogin()"
      />
    </div>
  </div>
</template>
<style lang="scss">
.loginBox {
  width: 20rem;
  margin: 1rem 0;
  .btn {
    margin-top: 0.5rem;
  }
}
</style>
