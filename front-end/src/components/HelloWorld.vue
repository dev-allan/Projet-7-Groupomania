<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Ecrivez et partagez vos articles pour partager vos passions.
    </p>
    <h3>Les derniers articles publiés par vos collègues</h3>
    <!-- <button v-on:click='showArticle'>Montrer les articles</button> -->
    <ul>
        <li v-for="post in posts" v-bind:key="post">{{ posts[0].titre }} {{ posts[0].court }} <a href="">Lire la suite</a></li>
    </ul>
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
      posts: [''],
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
