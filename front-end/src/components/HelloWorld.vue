<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Ecrivez et partagez vos articles pour partager vos passions.
    </p>
    <h3>Les derniers articles publiés par vos collègues</h3>
    <div id="newArticle">
    

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}

// const insertNewArticle = document.getElementById('newArticle')
fetch("http://localhost:3000/articles/")
.then(function(response) {
  response.text().then(function(text) {
    // renderHTML(JSON.parse(text));
    console.log(text)
    });
})
.catch(error => alert("Erreur : " + error));


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
