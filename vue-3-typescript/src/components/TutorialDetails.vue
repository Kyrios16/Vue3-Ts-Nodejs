<template>
  <div v-if="currentTutorial.id" class="edit-form">
    <h4 class="text-center">Tutorial</h4>
    <form class="mb-4">
      <div class="form-group mb-2">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentTutorial.title"/>
      </div>
      <div class="form-group mb-2">
        <label for="description">Description</label>
        <textarea type="text" rows=3 class="form-control" id="description" v-model="currentTutorial.description"/>
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-secondary me-2 btn-sm" v-if="currentTutorial.published" @click="updatePublished(false)">UnPublish</button>
    <button v-else class="btn btn-primary me-2 btn-sm" @click="updatePublished(true)">Publish</button>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger me-2 btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure want to delete?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" @click="deleteTutorial" data-bs-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-success btn-sm" @click="updateTutorial">Update</button>
    <p class="mt-2 text-success">{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <div class="alert alert-success" role="alert">
        Tutorial deleted successfully!
    </div>
    <router-link to="/tutorials">Back</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorial-detail",
  data() {
    return {
      currentTutorial: {} as Tutorial,
      message: "",
    };
  },
  methods: {
    getTutorial(id: any) {
      TutorialDataService.get(id).then((response: ResponseData) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data).then((response: ResponseData) => {
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial).then((response: ResponseData) => {
          this.message = "The tutorial was updated successfully!";
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id).then((response: ResponseData) => {
          this.$router.push({ name: "tutorials-list" });
      }).catch((e: Error) => {
          console.log(e);
      });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
});
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
    *:focus {
        outline: none;
        box-shadow: none;
    }
    .modal.fade .modal-dialog {
        transition: transform .1s ease-out !important;
    }
</style>