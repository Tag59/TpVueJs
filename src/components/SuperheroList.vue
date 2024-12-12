<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const superheros = ref([]);
const afficherPouvoirs = ref(false);
const filteredSuperheros = ref(""); //variable de filtrage de recherche

//On cherche à charger les données depuis l'API au montage du composant
onMounted(() => {
  axios
    .get(
      "https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/all.json"
    )
    .then((response) => {
      superheros.value = response.data; //On recupere les superhéros
    })
    .catch((error) => {
      console.log(error); //On gere le cas où il y a un probleme avec l'api
    });
});

//On filtre les héros lors de la recherche
const filteredData = computed(() => {
  if (!filteredSuperheros.value) return superheros.value;
  return superheros.value.filter((item) =>
    item.name.toLowerCase().startsWith(filteredSuperheros.value.toLowerCase())
  );
});
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <h2 class="my-4 text-center">Liste des superhéros</h2>
    <!--On affiche ou non les pouvoirs-->
    <div class="my-4 text-center">
      <input type="checkbox" v-model="afficherPouvoirs" id="afficherPouvoirs" class="form-check-input"/>
      <label class="form-check-label text-primary" for="afficherPouvoirs">Afficher les pouvoirs</label>
    </div>

    <!--Zone de recherche-->
    <input type="search" class="form-control me-2" v-model="filteredSuperheros" placeholder="Rechercher un Super Héro"/>

    <!--bouton réinitialiser-->
    <div v-if="filteredSuperheros">
      <button class="btn btn-primary my-2" v-on:click="filteredSuperheros = ''">Réinitialiser</button>
    </div>

    <!--Liste filtrée-->
    <ul class="list-group">
      <li v-for="item in filteredData":key="item.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center w-100">
        <img :src="item.images.sm" alt="superheroImage" class="me-3 rounded-circle"/>
        <h5 class="mb-0">{{ item.name }}</h5>
        <small>{{ item.id }}</small>

        <!--On affiche les caractéristiques si la case est cochée-->
        <div v-if="afficherPouvoirs">
          <p>
            Intelligence : {{ item.powerstats.intelligence }}<br />
            Force : {{ item.powerstats.strength }}<br />
            Vitesse : {{ item.powerstats.speed }}<br />
            Durabilité : {{ item.powerstats.durability }}<br />
            Puissance : {{ item.powerstats.power }}<br />
            Combat : {{ item.powerstats.combat }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
