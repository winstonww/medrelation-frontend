<template>
  <div class="registerFormContainer">
    <form class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Register</div>
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
                    v-model="form.username" />
                <span class="md-error">{{errors.username}}</span>
              </md-field>
            </div>

          </div>


          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email" />
            <span class="md-error">{{errors.email}}</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="email">Password</label>
            <md-input type="password"
                name="password"
                id="password"
                v-model="form.password" />
            <span class="md-error">{{errors.password}}</span>
          </md-field>

          <md-field :class="getValidationClass('reconfirm_password')">
            <label for="email">Reconfirm Password</label>
            <md-input type="password"
                name="reconfirm_password"
                id="reconfirm_password"
                v-model="form.reconfirm_password"/>
            <span class="md-error">{{errors.reconfirm_password}}</span>
          </md-field>


        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            class="md-primary"
            :disabled="sending"
            @click="submitForm">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">
          The user was saved with success!
        </md-snackbar>
    </form>
  </div>
</template>

<script>

  export default {
    name: 'FormValidation',
    data: () => ({
      form: {
        username: null,
        email: null,
        password: null,
        reconfirm_password: null
      },
      errors: {
        username: null,
        email: null,
        password: null,
        reconfirm_password: null
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
      submitForm: async function() {
          let res = await this.$store.dispatch("registerUser", this.form)
          console.log("in submitForm")
          console.log(res)
          if ("error" in res) {
              this.errors = res['error'];
              this.$forceUpdate();
          } else {
              this.$store.commit("setIsLoggedIn", true)
              this.$router.push('/login')
          }
          
      }
    }
  }
</script>

<style lang="scss" scoped>
    .registerFormContainer {
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