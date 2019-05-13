<template>
    <div>
        <div class="text-center">
            <p>
                <img src="../assets/images/ids-white.png" alt="Logo of Industrial data space" class="navbar-logo mx-auto" style="width: auto; height: 50px;">
            </p>
        </div>
        <div class="card mx-auto" style="width: 30rem;">
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="username">Nutzername</label>
                        <input type="text"
                        class="form-control"
                        id="username"
                        required v-model="username">
                        <label for="password">Passwort</label>
                        <input type="password"
                        class="form-control"
                        id="password"
                        required v-model="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    <div>
</template>
<script>
export default {
    name:"Login",
    data() {
        return {
            id: null
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        login: function () {
            const { username, password } = this
            this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                this.$router.push('/')
            })
        }
    }
}
</script>