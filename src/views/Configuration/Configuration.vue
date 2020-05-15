<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Konfiguration des Open Data Konnektors</h5>
                <p class="card-text">
                    Konfigurieren Sie ihren Konnektor zur korrekten Darstellung des IDS Informationsmodells.
                </p>
                <div class="form-group">
                    <label for="connectorTitle">Konnektor Titel</label>
                    <input type="text"
                            class="form-control"
                            id="connectorTitle"
                            name="connectorTitle"
                            placeholder=""
                            v-model="configuration.title">
                </div>
                <div class="form-group">
                    <label for="connectorURL">Konnektor URL</label>
                    <input type="text"
                            class="form-control"
                            id="connectorURL"
                            name="connectorURL"
                            placeholder=""
                            v-model="configuration.url">
                </div>
                <div class="form-group">
                    <label for="connectorMaintainer">Maintainer</label>
                    <input type="text"
                            class="form-control"
                            id="connectorMaintainer"
                            name="connectorMaintainer"
                            placeholder=""
                            v-model="configuration.maintainer">
                </div>
                <div class="form-group">
                    <label for="connectorCurator">Curator</label>
                    <input type="text"
                            class="form-control"
                            id="connectorCurator"
                            name="connectorCurator"
                            placeholder=""
                            v-model="configuration.curator">
                </div>
                <button v-on:click="submit()" class="btn btn-primary">Konfiguration bearbeiten</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Configuration",
    data() {
        return {
            configuration:{
                url:"",
                maintainer:"",
                curator:"",
                title:""
            },
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    beforeMount(){
        this.getConfig()
    },
    methods:{
        getConfig(){
            this.$axios({
            method: 'get',
            url: this.$env.apiBaseUrl+'/api/configuration/get',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
            })
            .then(response => {
                this.configuration = response.data
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        submit(){
            this.$axios({
                method: 'post',
                url: this.$env.apiBaseUrl+'/api/configuration/edit',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                },
                data: this.configuration
                })
                .then(response => {
                    this.$store.dispatch('update', response.data)
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

<style>

</style>