<template>
    <div class="moderation">
        <div class="moderation-article">
            <h4>Modération des articles</h4>
                <ul>
                    <li v-for="post in posts" v-bind:key="post"><h4>{{ post.titre }}</h4> <p>{{ post.court }} <a :href=" '#/moderator/article?id=' + post.id" >Modifier cet article</a></p><p>par {{ post.login }}</p></li>
                </ul>
        </div>
        <div class="moderation-commentaire">
            <h4>Modération des commentaires</h4>
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