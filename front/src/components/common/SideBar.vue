<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import TreeView from "devextreme-vue/tree-view";
import { DxList } from "devextreme-vue/list";

export default defineComponent({
  components: {
    TreeView,
    DxList,
  },
  setup(context) {
    const router = useRouter();
    const treeData = reactive([
      {
        ID: "1",
        name: "Dashboard",
        expanded: false,
      },
      {
        ID: "1_1",
        categoryId: "1",
        name: "Super Mart of the West",
        expanded: false,
      },
      {
        ID: "1_2",
        categoryId: "1",
        name: "Video Players",
        expanded: false,
      },
      {
        ID: "2",
        name: "Assessment",
        expanded: false,
      },
    ]);

    const navigation = [
      { id: 1, text: "Products", icon: "product" },
      { id: 2, text: "Sales", icon: "money" },
      { id: 3, text: "Customers", icon: "group" },
      { id: 4, text: "Employees", icon: "card" },
      { id: 5, text: "Reports", icon: "chart" },
    ];

    const onClickTree = (e) => {
      const { text } = e.node;

      router.push({ name: text });
    };
    return {
      treeData,
      navigation,
      onClickTree,
    };
  },
});
</script>
<template>
  <div>
    <!-- <DxList
      :data-source="navigation"
      :active-state-enabled="false"
      :hover-state-enabled="false"
      :focus-state-enabled="false"
      class="panel-list dx-theme-accent-as-background-color"
    /> -->
    <TreeView
      id="simple-treeview"
      :items="treeData"
      :width="300"
      data-structure="plain"
      parent-id-expr="categoryId"
      key-expr="ID"
      display-expr="name"
      @item-click="onClickTree"
    />
  </div>
</template>
