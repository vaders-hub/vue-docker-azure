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
    DxToolbar,
    DxItem,
    DxButton,
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
  <DxToolbar class="header-toolbar">
    <DxItem location="before" widget="dxButton">
      <DxButton icon="menu" stylingMode="text" />
    </DxItem>
    <DxItem location="before" text="SKI" />
    <DxItem location="after" locateInMenu="auto" menuItemTemplate="userPanelTemplate">
      <DxButton
        class="user-button authorization"
        width="210"
        height="100%"
        stylingMode="text"
      >
        <!-- <UserPanel menuMode="context" /> -->
      </DxButton>
    </DxItem>
    <DxItem location="after">
      <DxButton icon="home" @click="goHome" />
    </DxItem>
  </DxToolbar>
</template>
