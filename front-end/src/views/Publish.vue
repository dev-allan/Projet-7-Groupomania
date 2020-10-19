<template>
  <div class="publish flex-column col-md-8 ml-auto mr-auto mt-3">
    <h3>Ecrivez et publiez votre article</h3>
        <b-form @submit.prevent="sendArticle">
            <b-form-input type="text" name="titre" placeholder="Titre de votre article" v-model="titre"/>
            <b-form-textarea class="mt-3" name="court" v-model="court" placeholder="Ecrivez un court texte pour donner envie aux utilisateurs de lire votre article"></b-form-textarea>
            <b-form-textarea class="mt-3" rows="15" name="contenu" v-model="contenu" placeholder="Ecrivez votre article">Ecrivez votre article</b-form-textarea>
            <b-button type="submit" class="mt-3" variant="primary">Publier votre article</b-button>
        </b-form>
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
