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
        <div class="showComment">
          <li v-for="comment in comments" v-bind:key="comment"><h5>{{ comment.login }}</h5><p>{{ comment.contenu_commentaire}}</p></li>
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
      comments : [],
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

    showComment(){
      axios.get('http://localhost:3000/commentaires/comment/' + this.$route.query.id,{
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
        },
      })
      .then(res => this.comments = res.data)
      .catch((error) => {
        console.error(error)
      })
    },

    submitComment(){
      var token = localStorage.getItem('accessToken');
      var decoded = jwt_decode(token);
      document.location.reload(true);
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
      this.showComment();
    },
}
</script>

<style lang="scss">
li {
  display: inline-block;
  margin: 0 10px;
}
</style>