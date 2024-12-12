<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid d-flex align-items-center">
      <!--Lien vers la page Superhéro, qui est la page d'accueil-->
      <router-link class="navbar-brand me-3" to="/">Superhéros</router-link>

      <!--Lien vers la page Détail Superhéro -->
      <router-link class="navbar-brand" to="/detail/1">Détails d'un superhéro</router-link>
      <!--Lien vers la page SuperPower Matcher-->  
      <router-link class="navbar-brand" to="/SuperPowerMatcher">SuperPower Matcher</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
