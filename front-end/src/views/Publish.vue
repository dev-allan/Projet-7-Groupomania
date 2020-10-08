<template>
  <div class="publish">
    <h1>Publier votre article</h1>
        <form @submit.prevent="sendArticle">
            <input type="text" name="titre" placeholder="Titre de votre article" v-model="titre"/>
            <textarea name="court" v-model="court">Ecrivez un résumé de votre article</textarea>
            <textarea name="contenu" v-model="contenu">Ecrivez votre article</textarea>
            <button type="submit">Publier votre article</button>
        </form>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
  data(){
    return {
        titre: '',
        court : '',
        contenu : '',
    }
  },
  methods: {
    sendArticle(){
      var token = localStorage.getItem('accessToken');
      var decoded = jwt_decode(token);
      var body = {
        pseudo : decoded.utilisateursId,
        title : this.titre,
        content : this.contenu,
        smallContent : this.court,
      };
      axios.post('http://localhost:3000/articles/send', body, {
        headers : {
          'Authorization' : localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      })
      .then(res => console.log(res))
      // .catch((error) => {
      //   console.error(error)
      // })
    }
  },
}
</script>
