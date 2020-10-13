<template>
  <div id="app">
    <div id="nav" v-if="profils.id > 0">
      <router-link to="/accueil">Accueil</router-link> |
      <router-link to="/publish">Publier</router-link> |
      <router-link to="profil">Profil</router-link> |
      <router-link to="/multimedia">Multimedia</router-link> |
      <router-link v-if="profils.permission === 'Moderator'" to="/moderator">Moderation</router-link>
      <!-- <router-link to="/">Se connecter</router-link> | -->
    </div>
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