<template>
    <div class="wrapper">   
        <sidebar v-bind:sources=this.sources v-on:delete="deleteAction"></sidebar> 
        <div class="col-8">
            <ncform :form-schema="formSchema" form-name="dataInput" v-model="formSchema.value"></ncform>
            <button v-on:click="submit()" class="btn btn-primary">Data Asset hinzufügen</button>
        </div>
    </div>
</template>

            
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
    name:"Create",
    components: {
        Sidebar
    },
    props:['sourceid'],
    data() {
        return {
            formSchema:{},
            source:null,
            type:null,
            sources:[]
        };
    },
    beforeMount(){
        this.querySources()
        this.$axios({
           method: 'get',
            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/id/'+this.sourceid,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(response => {
            this.source = response.data.source
            this.type = this.source.datasourcetype
            this.formSchema = response.data.formSchema
        })
        .catch(error => {
            if(error.response.status === 401){
                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                this.$router.push("/login")                            
            }
        })
    },
    beforeRouteUpdate  (to, from, next) {
        this.$axios({
            method: 'get',
            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/id/'+this.sourceid,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(response => {
            this.source = response.data;
            this.type = this.source.datasourcetype;
            next()
        })
        .catch(error => {
            if(error.response.status === 401){
                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                this.$router.push("/login")                            
            }
        })
    },
    methods:{
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        deleteAction(id){
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
                this.$router.push("/datasource/select")     
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
                    this.sources = []
                    for( var i in response.data.sort()){
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
        },
        submit(){
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/add',
                data: {
                    sourceId: this.sourceid,
                    data: this.formSchema.value,
                    datasourcetype: this.type
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/job")
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        uploadFile(){
            let formData = new FormData()
            formData.append('file', this.file)
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/add',
                data: formData,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.$store.state.info = response.data;
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
                    this.sources = []
                    for( var i in response.data ){
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
