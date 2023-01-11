<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold text-light">Vue3-Typescript</router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/tutorials" class="btn btn-outline-light me-2 btn-sm">Tutorials</router-link>
          <router-link to="/tutorials/add" class="btn btn-outline-light btn-sm">Add New</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "header-nav",
});
</script>

<style scoped>
.navbar {
  background: #2c2c54;
  padding: 10px 20px;
}
</style>