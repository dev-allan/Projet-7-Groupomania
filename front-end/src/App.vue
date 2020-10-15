<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" id="nav" v-if="profils.id > 0">
      <b-navbar-nav>
        <b-nav-item to="/accueil">Accueil</b-nav-item>
        <b-nav-item to="/publish">Publier</b-nav-item>
        <b-nav-item to="profil">Profil</b-nav-item>
        <b-nav-item to="/multimedia">Multimedia</b-nav-item>
        <b-nav-item v-if="profils.permission === 'Moderator'" to="/moderator">Moderation</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
	components: {
  },
  data(){
    return {
      profils : [],
    }
  },
  methods: {
    Authorization(){
      axios.get('http://localhost:3000/utilisateurs/me', {
        headers : {
          'Authorization' : localStorage.getItem('accessToken')
        }
      })
      .then(res => this.profils = res.data)
      .catch((error) => {
        console.error(error)
      })
    },
  },
  created() {
      this.Authorization();
  },
}
</script>

<style lang="scss">

</style>