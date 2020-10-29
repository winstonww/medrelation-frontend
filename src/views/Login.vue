<template>
    <div class="loginContainer">
    <div class="loginContent">
    <LoginForm/>
    </div>
  </div>
</template>


<script>

import LoginForm from '../components/LoginForm';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    LoginForm
  },
}
</script>

<style lang='scss' scoped>
.loginContainer {
    position: absolute;
    background-color: white;
    top: 100px;
  .loginContent{
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