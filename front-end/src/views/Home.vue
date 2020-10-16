<template>
  <div class="home, flex-column, col-md-10 ml-auto mr-auto mt-3">
    <HelloWorld msg="Bienvenue sur"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
}
</script>
