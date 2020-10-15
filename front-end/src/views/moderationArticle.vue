<template>
    <div class="article-moderation">
        <h1>Moderation article</h1>
        <form @submit.prevent="submitModification">
            <input type="text" name="title" v-for="post in posts" v-bind:key="post" v-model="post.titre"/>
            <textarea type="text" name="content" v-for="post in posts" v-bind:key="post" v-model="post.contenu"></textarea>
            <textarea type="text" name="smallContent" v-for="post in posts" v-bind:key="post" v-model="post.court"></textarea>
            <button type="submit">Envoyer les modifications</button>
        </form>
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
    },

    submitModification(){
        document.location.reload(true);
        var body = {
            title : document.forms[0][0].value,
            smallContent : document.forms[0][1].value,
            content : document.forms[0][2].value,
            id : this.$route.query.id,
            };
        axios.put('http://localhost:3000/articles/moderator/update',body, {
            headers: {
                'Authorization' : localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
        })
        .then(res => console.log(res))
    }

  },
    beforeMount() {
      this.showOnArticle();
    },
}
</script>