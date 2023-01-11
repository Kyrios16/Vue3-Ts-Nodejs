<template>
    <div class="submit-form">
        <div v-if="!submitted" class="no-submitted">
            <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" v-model="tutorial.title" name="title" required>
                </div>
                <div class="form-group mt-3">
                    <label for="description">Description</label>
                    <textarea type="text" rows=3 class="form-control" id="description" v-model="tutorial.description" name="description" required />
                </div>
                <button @click="saveTutorial" class="btn btn-success mt-3">Submit</button>
            </div>
        <div v-else>
            <div class="alert alert-success" role="alert">
                You submitted successfully!
            </div>
            <button class="btn btn-secondary" @click="newTutorial">Back</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorial-add",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      } as Tutorial,
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      let data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };

      TutorialDataService.create(data).then((response: ResponseData) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {} as Tutorial;
      this.$router.push({ name: "tutorials-list" });
    },
  },
});
</script>

<style scoped>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
    *:focus {
        outline: none;
        box-shadow: none;
    }
</style>