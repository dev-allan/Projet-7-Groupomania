<template>
    <div class="article">
        <h4 v-for="post in posts" v-bind:key="post">{{ post.titre }} </h4>
        <p v-for="post in posts" v-bind:key="post">{{ post.contenu }}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      posts: [],
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
    }
  },
    beforeMount() {
        this.showOnArticle();
    },
}
</script>