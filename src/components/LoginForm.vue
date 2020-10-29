<template>
  <div class="loginFormContainer">
    <form class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">User Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="first-name">Username</label>
                <md-input
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    v-model="form.username"
                    :disabled="sending" />
                <span class="md-error">{{errors.username}}</span>
              </md-field>
            </div>

          </div>

          <md-field :class="getValidationClass('password')">
            <label for="email">Password</label>
            <md-input type="password"
                name="password"
                id="password"
                v-model="form.password"
                :disabled="sending" />
            <span class="md-error">{{errors.password}}</span>
          </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            class="md-primary"
            :disabled="sending"
            @click="submitLoginForm">Login</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>

  export default {
    name: 'FormValidation',
    data: () => ({
      form: {
        username: null,
        password: null,
      },
      errors: {
        username: null,
        password: null,
      },
      userSaved: false,
      sending: false,
    }),
    
    methods: {
      getValidationClass: function(fieldName) {
        return {
        'md-invalid': this.errors[fieldName]
        }
      },
      clearForm: function() {
        this.form.username = null
        this.form.email = null
        this.form.password = null
        this.form.reconfirm_password = null
      },
      saveUser: function() {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      submitLoginForm: async function() {
          let res = await this.$store.dispatch("loginUser", this.form)
          console.log("in submitLoginForm")
          console.log(res)
          if ("error" in res) {
              this.errors = res['error'];
          } else {
              this.$store.commit("setIsLoggedIn", true)
              this.$router.push('/')
          }  
      }
    }
  }
</script>

<style lang="scss" scoped>
    .loginFormContainer {
        position: absolute;
        top:50px;
        left:120px;
        width:700px;
    }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>