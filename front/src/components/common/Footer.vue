<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useMainStore } from "@/store/index";
import { useRouter } from "vue-router";
import DxToolbar from "devextreme-vue/toolbar";
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  components: {
  },
  setup(context) {
    const mainStore = useMainStore();
    const router = useRouter();

    const goHome = async () => {
      // await mainStore.login();
      router.push({ name: "Home" });
    };

    return {
      goHome,
    };
  },
});
</script>
<template>
  <footer class="footer">
    <img src="@/assets/images/dummy-footer.gif" alt="" style="width:100%;height:163px;"><!-- dummy footer -->
  </footer>
</template>
