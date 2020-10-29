<template>
    <md-toolbar class="md-default navbar" md-elevation="1">
        <md-button class="md-primary" v-if="loggedIn()" @click="toggleShowSidebar">
          <i class="fas fa-bars"></i>
        </md-button>
        <h3 class="md-title" style="flex: 1">
            Relatome
        </h3>
        <!-- <md-button>Sign up</md-button> -->
        <md-button v-if="!loggedIn()"
            @click="login"
            class="md-primary">
            Log in
         </md-button>
          <md-button v-else
            @click="logout"
            class="md-primary">
            Log out
         </md-button>
    </md-toolbar>
</template>

<script>
// import { mapActions } from "vuex";
export default {
    methods: {
       // ...mapActions({showSideBar: "setIsShowSidebar"})
        toggleShowSidebar: function() {
            this.$store.dispatch('setIsShowSidebar')
        },
        loggedIn: async function() {
            let loggedIn = await this.$store.dispatch("fetchIsLoggedIn")
            return this.$route.meta.requiresAuth && loggedIn
        },
        login: function() {
            this.$router.push('/login')
        },
        logout: async function() {
            await this.$store.dispatch("logoutUser")
            this.$router.push('/login')
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .navbar {
        position: fixed;
        z-index: 999;
    }
</style>
