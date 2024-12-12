<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

export default {
  name: "Detail",
  data() {
    return {
      searchQuery: "", //Zone de recherche
      superheros: [], //La liste des super-héros
      selectedHero: null, //Super-héros sélectionné par defaut
    };
  },
  computed: {
    //On filtre les super-héros en fonction de la recherche
    filteredSuperheros() {
      return this.superheros.filter((hero) =>
        hero.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    //On affiche les détails du super-héros sélectionné
    showDetails(heroId) {
      this.selectedHero = this.superheros.find((hero) => hero.id === heroId);
    },
  },
  mounted() {
    //On récupère les super-héros dans l'api fournie 
    axios
      .get("https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/all.json")
      .then((response) => {
        this.superheros = response.data;
        //Si un super-héros est sélectionné dans l'URL, on affiche ses détails
        const heroId = this.$route.params.id;
        if (heroId) {
          this.showDetails(parseInt(heroId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>




<template>
  <div class="container my-4">
    <!-- Titre de la page -->
    <h2>Détails des super-héros</h2>

    <!-- Barre de recherche -->
    <input
      type="search"
      class="form-control my-3"
      v-model="searchQuery"
      placeholder="Rechercher un Super Héro"
    />

    <!-- Liste filtrée des super-héros -->
    <ul v-if="filteredSuperheros.length > 0" class="list-group mb-4">
      <li
        v-for="hero in filteredSuperheros"
        :key="hero.id"
        class="list-group-item"
        @click="showDetails(hero.id)"
        style="cursor: pointer;"
      >
        {{ hero.name }}
      </li>
    </ul>

    <!-- Affichage des détails du super-héros sélectionné -->
    <div v-if="selectedHero">
      <h3>{{ selectedHero.name }}</h3>
      <img :src="selectedHero.images.md" alt="Hero Image" class="img-fluid" />
      <h5>Détails</h5>
      <p><strong>Intelligence:</strong> {{ selectedHero.powerstats.intelligence }}</p>
      <p><strong>Force:</strong> {{ selectedHero.powerstats.strength }}</p>
      <p><strong>Vitesse:</strong> {{ selectedHero.powerstats.speed }}</p>
      <p><strong>Durabilité:</strong> {{ selectedHero.powerstats.durability }}</p>
      <p><strong>Puissance:</strong> {{ selectedHero.powerstats.power }}</p>
      <p><strong>Combat:</strong> {{ selectedHero.powerstats.combat }}</p>
    </div>

    <!-- Si aucun super-héros sélectionné -->
    <div v-else>
      <p>Sélectionnez un super-héros pour voir ses détails.</p>
    </div>
  </div>
</template>

