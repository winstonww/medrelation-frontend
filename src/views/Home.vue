
<template>
  <div class="homeContainer">
    <Sidebar/>
    <HomeContent/>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar';
import HomeContent from '../components/HomeContent'
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Sidebar,
    HomeContent
  }
}
</script>

<style scoped>
  .homeContainer{
    position: absolute;
    background-color: white;
    top: 100px;
  }
</style>
