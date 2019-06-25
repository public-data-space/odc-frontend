<template>
<span style="white-space: pre-line">{{selfDescription}}</span>
</template>

<script>
export default {
    name: "Connector",
    data() {
        return {
            selfDescription: null
        };
    },
    mounted (){
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/about')
            .then(response => {
                this.selfDescription = response.data;
            })
    },
    beforeDestroy(){
        this.$store.state.info = null;
    }
}
</script>