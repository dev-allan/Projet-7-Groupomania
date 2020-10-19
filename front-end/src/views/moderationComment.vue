<template>
    <div class="commentaire-moderation flex-column col-md-8 ml-auto mr-auto mt-3">
        <h3>Moderation commentaire</h3>
        <b-form @submit.prevent="submitModification">
            <b-textarea type="text" name="comment" row="7" v-for="post in posts" v-bind:key="post" v-model="post.contenu_commentaire"></b-textarea>
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