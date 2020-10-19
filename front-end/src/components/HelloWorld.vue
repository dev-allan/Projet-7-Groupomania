<template>
  <div class="hello">
    <div class="hello-entete">
    <img  class="mb-3 hello-entete__logo" alt="groupomania logo" src="../assets/logo-black.svg">
    <p class="hello-entete__message">
      Vous souhaite la bienvenue !
    </p>
    </div>
    <div>
      <h3 class="mb-3">Les derniers articles publiés par vos collègues</h3>
      <!-- <button v-on:click='showArticle'>Montrer les articles</button> -->
      <div class="card-columns">
          <div class="card mt-3" v-for="post in posts" v-bind:key="post">
            <h4 class="card-header">{{ post.titre }}</h4> 
            <p class="card-body">{{ post.court }} <a :href=" '#/article?id=' + post.id" >Lire la suite</a></p>
            <div class="card-footer">par {{ post.login }}</div>
          </div>
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
  .hello-entete{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: center;
    .hello-entete__message{
    font-size: 30px;
    }
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
