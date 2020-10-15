<template>
    <div class="moderation">
        <div class="moderation-article">
            <h4>Modération des articles</h4>
                <ul>
                    <li v-for="post in posts" v-bind:key="post"><h4>{{ post.titre }}</h4> <p>{{ post.court }}</p><p>par {{ post.login }}</p><b-button variant="danger" v-on:click="deleteArticle(post.id)">Supprimer</b-button> <b-button v-on:click="boutonEditArticle(post.id)">Editer</b-button></li>
                </ul>
        </div>
        <div class="moderation-commentaire">
            <h4>Modération des commentaires</h4>
              <ul>
                <li v-for="comment in comments" v-bind:key="comment"><p>{{ comment.login }}</p><p>{{ comment.contenu_commentaire }}</p><b-button variant="danger" v-on:click="deleteComment(comment.id)">Supprimer</b-button> <b-button v-on:click="boutonEditComment(comment.id)">Editer</b-button></li>
              </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      posts: [],
      comments : [],
    }
  },
  methods: {
    showArticle(){
      axios.get('http://localhost:3000/articles/', {
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
      axios.get('http://localhost:3000/commentaires/all',{
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
        },
      })
      .then(res => this.comments = res.data)
      .catch((error) => {
        console.error(error)
      })
    },
    boutonEditArticle(id){
      document.location.href="#/moderator/article?id=" +id;
    },
    boutonEditComment(id){
      document.location.href="#/moderator/comment?id="+id;
    },
    deleteComment(id){
      axios.delete('http://localhost:3000/commentaires/moderator/' + id,{
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
        },
      })
      .then(res => this.comments = res.data)
      .catch((error) => {
        console.error(error)       
      })
      document.location.reload(true);
    },

    deleteArticle(id){
      axios.delete('http://localhost:3000/articles/moderator/' + id,{
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
        },
      })
      .then(res => this.comments = res.data)
      .catch((error) => {
        console.error(error)       
      })
      document.location.reload(true);
    },
  },

    beforeMount() {
        this.showArticle();
        this.showComment();
    },
};

</script>