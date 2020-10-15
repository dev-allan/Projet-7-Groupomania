<template>
    <div class="moderation">
        <div class="moderation-article">
            <h4>Modération des articles</h4>
                <ul>
                    <li v-for="post in posts" v-bind:key="post"><h4>{{ post.titre }}</h4> <p>{{ post.court }} <a :href=" '#/moderator/article?id=' + post.id" >Modifier cet article</a></p><p>par {{ post.login }}</p><button v-on:click="deleteArticle(post.id)">Supprimer</button></li>
                </ul>
        </div>
        <div class="moderation-commentaire">
            <h4>Modération des commentaires</h4>
            <ul>
              <li v-for="comment in comments" v-bind:key="comment"><p>{{ comment.id }}</p><p>{{ comment.login }}</p><p>{{ comment.contenu_commentaire }}</p><button v-on:click="deleteComment(comment.id)">Supprimer</button> <button>Editer</button></li>
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