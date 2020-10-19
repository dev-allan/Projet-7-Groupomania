<template>
    <div class="moderation flex-column col-md-10 ml-auto mr-auto mt-3">
        <div class="moderation-article mt-3">
            <h4>Modération des articles</h4>
                <ul class="moderation-article__card">
                    <li class="card mt-3" v-for="post in posts" v-bind:key="post">
                      <p class="card-body">Titre de l'article : {{ post.titre }}</p> 
                      <p class="card-body">Contenu en une : {{ post.court }}</p>
                      <p class="card-body">par : {{ post.login }}</p>
                      <b-button variant="danger" v-on:click="deleteArticle(post.id)">Supprimer</b-button> 
                      <b-button v-on:click="boutonEditArticle(post.id)">Editer</b-button></li>
                </ul>
        </div>
        <div class="moderation-commentaire mt-3">
            <h4>Modération des commentaires</h4>
              <ul class="moderation-commentaire__card">
                <li class="card mt-3" v-for="comment in comments" v-bind:key="comment">
                    <p class="card-body">login : {{ comment.login }}</p><p class="card-body">Contenu : {{ comment.contenu_commentaire }}</p>
                    <b-button variant="danger" v-on:click="deleteComment(comment.id)">Supprimer</b-button> 
                    <b-button v-on:click="boutonEditComment(comment.id)">Editer</b-button>
                </li>
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

<style lang="scss">

.moderation {
  .moderation-article {
    .moderation-article__card {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: auto;
      align-content: center
    }
  }
}

.moderation {
  .moderation-commentaire {
    .moderation-commentaire__card {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: auto;
      align-content: center
    }
  }
}

</style>