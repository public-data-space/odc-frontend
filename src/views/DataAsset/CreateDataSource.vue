<template>
    <div class="wrapper">   
        <sidebar v-bind:sources=this.sources v-on:delete="deleteAction"></sidebar>
        <div id=content>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="datasourceName">Data Source Name</label>
                        <input type="text"
                        class="form-control"
                        id="datasourceName"
                        name="datasourceName"
                        placeholder="My Data Source"
                        v-model="name">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="datasourceType">Data Source Type</label>
                        <select class="form-control"
                        id="datasourceType"
                        name="datasourceType"
                        v-model="type"
                        :required="true">
                        <option v-for="option in sources" 
                        v-bind:key=option.type
                        v-bind:value="option.type"
                        :selected="option.type === type"    
                        >{{ option.type }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <ncform :form-schema="formSchema" form-name="dataInput" v-model="formSchema.value"></ncform>
            </div>
            <div class="row">
                <button v-on:click="submit()" class="btn btn-primary">Data Source hinzufügen</button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'createdatasource',
  components: {
    Sidebar
  },
  props:['sourceid'],
    data() {
        return {
            type: "",
            name: null,
            id: null,
            formSchema: {
                type:"object",
                properties:{}
            },
            sources: []
        };
    },
    beforeMount(){
        this.querySources()
    },
    watch: {
        '$route': 'updateParams',
        type: function() {
            this.getFormSchema()
        },
        sources: function() {
            //this.type = this.sources[0].type
            this.updateParams()
        }
    },
    methods:{
        getFormSchema(){
              this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/schema/type/'+this.type,
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    this.formSchema = response.data
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                        this.$router.push("/login")                            
                    }
                })  
        },
        updateParams(){
            if(typeof this.sourceid !== 'undefined'){
                this.id = this.sourceid
                this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/id/'+this.id,
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    this.type=response.data.source.datasourcetype
                    this.name = response.data.source.datasourcename
                    this.formSchema.value = JSON.parse(response.data.source.data)
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                        this.$router.push("/login")                            
                    }
                })
            }
            else{
                this.name = null
                let formSchemaTemp = {
                    type:"object",
                    properties:{}
                }
                this.formSchema = formSchemaTemp
                this.getFormSchema()
            }
        },
        submit(){
            let urlString;
            if(this.id === null){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/edit/'+this.id
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcetype: this.type,
                    datasourcename: this.name,
                    data: this.formSchema.value
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
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
        deleteAction(id){
         this.$axios({
                method: 'get',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/delete/'+id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$router.push("/datasource/select")
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
                    this.sources = []
                    for( var i in response.data.sort() ){
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
    }
}
</script>