<template>
    <div>
            <div class="wrapper">
                <sidebar v-bind:sources="this.sources" v-on:delete="deleteAction"></sidebar>
                <div id=content>
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">
                                Bitte wählen sie eine Datenquelle, aus der ein weiteres DataAsset hinzugefügt werden soll, aus der Liste, oder klicken Sie auf das Kreuz um eine weitere Datenquelle des Typs hinzuzufügen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'selectdatasource',
  components: {
    Sidebar
  },
    data() {
        return {
            sources:[]
        };
    },
    beforeMount(){
        this.querySources()
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    watch:{
    '$route': 'querySources'
    },
    methods:{
        deleteAction(id){
            this.sources = []
         this.$axios({
                method: 'get',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/delete/'+id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.querySources()
                this.$store.dispatch('update',response.data)
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        querySources(){
                this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_CONFIG_MANAGER_BASE_URL+'/listAdapters',
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    for( var i in response.data){
                        var adapter = response.data[i]
                         this.$axios({
                            method: 'get',
                            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/type/'+adapter.name,
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('jwt')
                            }
                        })
                        .then(response2 => {
                            this.sources.push({
                                type: response2.data.type,
                                sources: response2.data.result
                            })
                        })
                        .catch(error2 => {
                            if(error2.response.status === 401){
                                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                                this.$router.push("/login")                            
                            }
                        })    
                    }
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