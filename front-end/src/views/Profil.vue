<template>
    <div class="profil">
        <div class="yourProfil">
            <h3>Votre profil</h3>
            <p v-for="post in posts" v-bind:key="post">{{ post.login }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      posts : [],
    }
  },
    methods: {
    showProfil(){
      axios.get('http://localhost:3000/utilisateurs/me',{
        headers : {
          'Authorization' : localStorage.getItem('accessToken')
        }
      })
      .then(res => this.posts = res.data)
      .catch((error) => {
        console.error(error)
      })
    },

    beforeMount() {
      this.showProfil()
    },
    },
}
</script>