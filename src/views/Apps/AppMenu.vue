<template>
    <div class="wrapper">
        <ul class="list-group">
            <li v-for="app in images" class="list-group-item" v-bind:class="{ disabled: app.containerIds.length==0}">
                <div class="row">
                    <div class="col-10">
                    {{app.name}}
                    </div>
                    <div class="col-1">
                        <button v-on:click="startAction(app.id)" class="btn btn-primary" v-bind:class="{ disabled: app.containerIds.length!=0}">Start</button>
                    </div>
                    <div class="col-1">
                        <button v-on:click="stopAction(app.containerIds)" class="btn btn-primary mb1 bg-red" v-bind:class="{ disabled: app.containerIds.length==0}">Stop</button>
                    </div>
                </div>
            </li>
        </ul>   
    </div>
</template>

            
<script>
export default {
    name:"Apps",
    data() {
        return {
            images: null
        };
    },
    beforeMount(){
        this.updateParams()
    },
    watch: {
        '$route': 'updateParams'
    },
    methods:{
          updateParams(){
            this.$axios({
                method: 'get',
                url: process.env.VUE_APP_CONFIG_MANAGER_BASE_URL+'/images',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.images = response.data
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        startAction(id){
            this.$axios({
                method: 'get',
                url: process.env.VUE_APP_CONFIG_MANAGER_BASE_URL+'/images/start/'+id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                updateParams()
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        stopAction(ids){
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_CONFIG_MANAGER_BASE_URL+'/images/stop/',
                data: ids,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        }
    }
}
</script>