<template>
    <div class="profil">
        <div class="yourProfil">
            <h3>Votre profil</h3>
            <p>Login : {{ profils.login }}</p>
            <p><button v-on:click="deleteAccount">Supprimer mon compte</button></p>
            <p><button v-on:click="logout">Se déconnecter</button></p>
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