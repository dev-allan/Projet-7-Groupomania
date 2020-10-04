<template>
  <div class="home">
    <!-- <img alt="groupomania logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Bienvenue sur GROUPOMANIA"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
