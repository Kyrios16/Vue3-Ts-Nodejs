<template>
  <div id="app">
    <HeaderNav/>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderNav from "@/components/HeaderNav.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderNav
  }
});
</script>

<style scoped>
  #app {
    width: 100%;
    height: 1280px;
    margin: 0 auto;
    background: #f7f1e3;
  }
</style>