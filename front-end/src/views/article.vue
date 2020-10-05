<template>
    <div class="articles">
        <div class="article">
          <h4 v-for="post in posts" v-bind:key="post">{{ post.titre }} </h4>
          <p v-for="post in posts" v-bind:key="post">{{ post.contenu }}</p>
        </div>
        <hr>
        <div class="comment"> 
              <form @submit.prevent="submitComment">
              <input type="text" name="comment" placeholder="Ecrivez votre commentaire" v-model="comment"/>
              <button type="submit">Envoyer le commentaire</button>
          </form>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode';
export default {
  data(){
    return {
      posts: [],
      comment : "",
    }
  },
  methods: {
    showOnArticle(){
      axios.get('http://localhost:3000/articles/' + this.$route.query.id,{
        headers : {
          'Authorization' : localStorage.getItem('accessToken')
        }
      })
      .then(res => this.posts = res.data)
      .catch((error) => {
        console.error(error)
      })
    },

    submitComment(){
      var token = localStorage.getItem('accessToken');
      var decoded = jwt_decode(token);
      var body = {
        utilisateur_Id : decoded.utilisateursId,
        comment : this.comment,
        articles_Id : this.$route.query.id,
      };
    axios.post('http://localhost:3000/commentaires/send', body, {
      headers : {
        'Authorization' : localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
    .then(res => console.log(res))
    }
  },
    beforeMount() {
        this.showOnArticle();
    },
}
</script>