<script>
import axios from "axios";

export default {
  name: "SuperPowerMatcher",
  data() {
    return {
      superheros: [],
      selectedHero: null,
      filters: {
        intelligence: 50,
        strength: 50,
        speed: 50,
      },
      matchedHeroes: [],
    };
  },
  methods: {
    showDetails(heroId) {
      this.selectedHero = this.superheros.find((hero) => hero.id === heroId);
    },
    matchHeroes() {
      //On filtre les héros en fonction des critères
      this.matchedHeroes = this.superheros.filter((hero) => {
        return (
          hero.powerstats.intelligence >= this.filters.intelligence &&
          hero.powerstats.strength >= this.filters.strength &&
          hero.powerstats.speed >= this.filters.speed
        );
      });
    },
  },
  mounted() {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/all.json"
      )
      .then((response) => {
        this.superheros = response.data;
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
  <div class="container mt-5">
    <h1 class="mb-4 text-center">SuperPower Matcher</h1>
    <form @submit.prevent="matchHeroes">
      <!--Slider pour l'attribus intelligence -->
      <div class="mb-4">
        <label
          for="intelligence"
          class="form-label d-flex justify-content-between"
        >
          <span>Intelligence</span>
          <span>{{ filters.intelligence }}</span>
        </label>
        <input
          type="range"
          class="form-range"
          id="intelligence"
          min="0"
          max="100"
          v-model="filters.intelligence"
        />
      </div>

      <!--Slider pour l'attribus force -->
      <div class="mb-4">
        <label for="strength" class="form-label d-flex justify-content-between">
          <span>Force</span>
          <span>{{ filters.strength }}</span>
        </label>
        <input
          type="range"
          class="form-range"
          id="strength"
          min="0"
          max="100"
          v-model="filters.strength"
        />
      </div>

      <!--Slider pour l'attribus vitesse -->
      <div class="mb-4">
        <label for="speed" class="form-label d-flex justify-content-between">
          <span>Vitesse</span>
          <span>{{ filters.speed }}</span>
        </label>
        <input
          type="range"
          class="form-range"
          id="speed"
          min="0"
          max="100"
          v-model="filters.speed"
        />
      </div>

      <!--Bouton pour submit les caractéristiques-->
      <button type="submit" class="btn btn-primary w-100">Rechercher</button>
    </form>

    <!-- Results Section -->
    <div v-if="matchedHeroes.length > 0" class="mt-4">
      <h2 class="text-center">Héros correspondants :</h2>
      <ul class="list-group">
        <li
          class="list-group-item" v-for="hero in matchedHeroes" :key="hero.id">
          <strong>{{ hero.name }}</strong>
          (Intelligence: {{ hero.powerstats.intelligence }}, Force:
          {{ hero.powerstats.strength }}, Vitesse: {{ hero.powerstats.speed }})
        </li>
      </ul>
    </div>

    <div v-else class="mt-4 text-center">
      <p>Aucun super-héros ne correspond à vos critères.</p>
    </div>
  </div>
</template>
