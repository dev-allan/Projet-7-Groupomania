<template>
    <div class="articles flex-column col-md-8 ml-auto mr-auto mt-3">
        <div class="article">
          <h4 v-for="post in posts" v-bind:key="post">{{ post.titre }} </h4>
          <p v-for="post in posts" v-bind:key="post">{{ post.contenu }}</p>
        </div>
        <hr>
        <div class="comment"> 
          <b-form @submit.prevent="submitComment" class="center-block">
            <div class="form-group md-form">
              <label for="comment">Commentez cet article</label>
              <textarea class="md-textarea form-control" rows="5" type="text" name="comment" id="comment" v-model="comment">Ecrivez votre commentaire</textarea>
            </div>
              <b-button type="submit" variant="primary">Envoyer le commentaire</b-button>
          </b-form>
        </div>
        <hr>
        <ul class="showComment list-group">
          <li class="" v-for="comment in comments" v-bind:key="comment"><h5>{{ comment.login }}</h5><p>{{ comment.contenu_commentaire}}</p><hr></li>
        </ul>
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


label{
display: flex;
}
</style>