<template>
  <div class="hello">
    <img  class="mb-3" alt="groupomania logo" src="../assets/logo-black.svg">
    <p class="hello-bienvenue">
      Vous souhaite la bienvenue !
    </p>
    <div>
      <h3 class="mb-3">Les derniers articles publiés par vos collègues</h3>
      <!-- <button v-on:click='showArticle'>Montrer les articles</button> -->
      <div>
          <div class="card" v-for="post in posts" v-bind:key="post"><h4 class="card-title">{{ post.titre }}</h4> <p class="card-text">{{ post.court }} <a :href=" '#/article?id=' + post.id" >Lire la suite</a></p><p>par {{ post.login }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      posts: [],
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
    }
  },
    beforeMount() {
        this.showArticle();
    },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello{
  .hello-bienvenue{
    font-size: 30px;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
