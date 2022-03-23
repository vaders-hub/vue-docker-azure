<script lang="ts">
import { defineComponent, onMounted, ref, inject } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  components: {
    DxButton,
  },
  setup(context) {
    const router = useRouter();
    const goDashboard = async () => {
      router.push({ name: "Dashboard" });
    };
    const goAssessment = async () => {
      router.push({ name: "Assessment" });
    };
    const procLogin = async () => {
      try {
        const member = await api.get("/api/member");
      } catch (e) {
        console.warn(e);
      }
    };
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
      type="success"
      styling-mode="outlined"
      @click="goAssessment()"
    />
    <DxButton text="Login" type="normal" styling-mode="outlined" @click="procLogin()" />
  </div>
</template>
