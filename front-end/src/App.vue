<template>
  <div id="app">
    <div id="nav">
      <router-link to="/accueil">Accueil</router-link> |
      <router-link to="/publish">Publier</router-link> |
      <router-link to="profil">Profil</router-link> |
      <router-link to="/multimedia">Multimedia</router-link> 
      <!-- <router-link to="/">Se connecter</router-link> | -->
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
	components: {
  },
}
</script>

<style lang="scss">

</style>