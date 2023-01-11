<template>
  <div class="row">
    <div class="col col-md-6">
      <div class="tutorials-list">
        <h4>Tutorials List</h4>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" 
            :class="{ active: index == currentIndex }" 
            v-for="(tutorial, index) in tutorials"
            :key="index"
            @click="setActiveTutorial(tutorial, index)"
          >
            {{ tutorial.title }}
          </li>
        </ul>
        <button class="m-3 btn btn-danger" @click="removeAllTutorials">Remove All</button>
      </div>
    </div>

    <div class="col col-md-6">
      <div class="row g-2">
        <div class="col-auto">
          <input type="text" class="form-control" placeholder="Search by title" v-model="title"/>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-primary" type="button" @click="searchTitle">
              Search
          </button> 
        </div>
      </div>
      <div v-if="currentTutorial.id" class="row mt-3">
        <h4>Tutorial</h4>
        <div class="card w-75 mb-3">
          <div class="card-body">
            <h5 class="card-title fw-bold">{{ currentTutorial.title }}</h5>
            <p class="card-text"><small>{{ currentTutorial.description }}</small></p>
            <p class="card-text"><strong>Status:</strong> {{ currentTutorial.published ? "Published" : "Pending" }}</p>
            <router-link :to="'/tutorials/' + currentTutorial.id" class="btn btn-warning">Edit</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <br/>
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorials-list",
  data() {
    return {
      tutorials: [] as Tutorial[],
      currentTutorial: {} as Tutorial,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll().then((response: ResponseData) => {
          this.tutorials = response.data;
          console.log(response.data);
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = {} as Tutorial;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial: Tutorial, index = -1) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll().then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        }).catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title).then((response: ResponseData) => {
          this.tutorials = response.data;
          this.setActiveTutorial({} as Tutorial);
          console.log(response.data);
        }).catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
});
</script>

<style scoped>
  .tutorials-list {
    width: 60%;
  }
  *:focus {
    outline: none;
    box-shadow: none;
  }
</style>