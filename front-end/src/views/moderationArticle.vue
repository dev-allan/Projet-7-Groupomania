<template>
    <div class="article-moderation flex-column col-md-8 ml-auto mr-auto mt-3">
        <h3>Moderation article</h3>
        <b-form @submit.prevent="submitModification">
            <b-form-input type="text" name="title" v-for="post in posts" v-bind:key="post" v-model="post.titre"/>
            <b-form-textarea class="mt-3" type="text" name="smallContent" v-for="post in posts" v-bind:key="post" v-model="post.court"></b-form-textarea>
            <b-form-textarea class="mt-3" rows="15" type="text" name="content" v-for="post in posts" v-bind:key="post" v-model="post.contenu"></b-form-textarea>
            <b-button class="mt-3" type="submit" variant="primary">Envoyer les modifications</b-button>
        </b-form>
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