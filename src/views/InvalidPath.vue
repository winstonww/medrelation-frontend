<template>
  <div class="invalidPathContainer">
    <Sidebar/>
    <div class="invalidPathContent">
    <h1> Sorry, Path is Invalid. </h1>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Sidebar,
  },
}
</script>

<style lang='scss' scoped>
.invalidPathContainer {
    position: absolute;
    background-color: white;
    top: 100px;
  .invalidPathContent{
    position: absolute;
    top: 200px;
    left: 350px;
    width: 800px;
    height: 300px;
    justify-content: center;
    text-align: center;
  }
}
</style>