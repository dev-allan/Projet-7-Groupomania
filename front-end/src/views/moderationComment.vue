<template>
    <div class="commentaire-moderation">
        <h1>Moderation commentaire</h1>
        <form @submit.prevent="submitModification">
            <textarea type="text" name="comment" v-for="post in posts" v-bind:key="post" v-model="post.contenu_commentaire"></textarea>
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
    showOnComment(){
      axios.get('http://localhost:3000/commentaires/moderator/' + this.$route.query.id,{
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
            comment : document.forms[0][0].value,
            id : this.$route.query.id,
            };
        axios.put('http://localhost:3000/commentaires/moderator/modify',body, {
            headers: {
                'Authorization' : localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
        })
        .then(res => console.log(res))
    }

  },
    beforeMount() {
      this.showOnComment();
    },
}
</script>