<template>
    <div class="profil">
        <div class="yourProfil flex-column col-md-8 ml-auto mr-auto mt-3">
            <h3>Votre profil</h3>
            <p>Login : {{ profils.login }}</p>
            <div class="flex-row">
              <p><b-button variant="danger" v-on:click="deleteAccount">Supprimer mon compte</b-button></p>
              <p><b-button variant="warning" v-on:click="logout">Se déconnecter</b-button></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      profils : [],
    }
  },
  methods: {
    showProfil(){
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

    deleteAccount(){
      axios.delete('http://localhost:3000/utilisateurs/delete/', {
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
        },
      })
      .then(res => console.log(res))
    },

    logout(){
      localStorage.removeItem('accessToken');
      window.location = "/";
    }

  },
    beforeMount() {
      this.showProfil();
    },
};
</script>