<template>
  <div id="app">
    <div id="nav">
      <router-link to="/accueil">Accueil</router-link> |
      <router-link to="/publish">Publier</router-link> |
      <router-link to="profil">Profil</router-link> |
      <router-link to="/multimedia">Multimedia</router-link> |
      <!-- <router-link to="/">Se connecter</router-link> | -->
      <router-link v-if="moderator == 'Moderator'" to='/moderator'>Moderation</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

// var token = localStorage.getItem('accessToken');
// var decoded = jwt_decode(token);
// var permission = decoded.permission;
// console.log(permission)

export default {
  name: 'App',
  data() {
    return{
      moderator : permission,
    }
  },
	components: {
  },
}
</script>

<style lang="scss">

</style>