<template>
    <div class="registerContainer">
    <div class="registerContent">
    <RegisterForm/>
    </div>
  </div>
</template>


<script>

import RegisterForm from '../components/RegisterForm';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    RegisterForm
  },
}
</script>

<style lang='scss' scoped>
.registerContainer {
    position: absolute;
    background-color: white;
    top: 100px;
  .registerContent{
    position: absolute;
    top: 0px;
    left: 350px;
    width: 500px;
    height: 300px;
    justify-content: center;
    text-align: center;
  }
}
</style>