<template>
    <div class="wrapper">   
        <sidebar></sidebar>
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
                        v-model="datasourceName">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="datasourceType">Data Source Type</label>
                        <select class="form-control"
                        id="datasourceType"
                        name="datasourceType"
                        v-model="datasourceType"
                        :required="true">
                        <option v-for="option in options" 
                        v-bind:value="option"
                        :selected="option === datasourceType"    
                        >{{ option }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-9">
                    <div class="form-group">
                        <label for="datasourceUrl">Data Source URL</label>
                        <input type="text"
                        class="form-control"
                        id="datasourceUrl"
                        name="datasourceUrl"
                        placeholder="http://localhost"
                        v-model="host">
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label for="datasourcePort">Port</label>
                        <input type="text"
                        class="form-control"
                        id="datasourcePort"
                        name="datasourcePort"
                        placeholder="80"
                        v-model="port">
                    </div>
                </div>
            </div>
            <div v-if="datasourceType==='CKAN'">
                <div class="row">
                    <div class="col">
                        <button v-on:click="addCKAN" class="btn btn-info">Data Source hinzufügen</button>
                    </div>
                </div>    
            </div>
            <div v-else>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="databaseName">Database Name</label>
                            <input type="text"
                            class="form-control"
                            id="databaseName"
                            name="databaseName"
                            placeholder=""
                            v-model="database">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text"
                            class="form-control"
                            id="username"
                            name="username"
                            placeholder=""
                            v-model="username">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password"
                            class="form-control"
                            id="password"
                            name="password"
                            placeholder=""
                            v-model="password">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button v-on:click="addPOSTGRES" class="btn btn-info">Data Source hinzufügen</button>
                    </div>
                </div>
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
  props:['datasourceid'],
    data() {
        return {
            options: ["CKAN","POSTGRESQL"],
            datasourceName: null,
            datasourceType: "CKAN",
            host: null,
            port: null,
            database: null,
            username: null,
            password: null,
            id: null
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
            if(typeof this.datasourceid !== 'undefined'){
                this.id = this.datasourceid
                this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/id/'+this.id,
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    this.datasourceName = response.data.datasourcename;
                    if(response.data.datasourcetype == 'CKAN'){
                        this.datasourceType = "CKAN",
                        this.host = JSON.parse(response.data.data).ckanApiUrl,
                        this.port = JSON.parse(response.data.data).ckanPort
                    }
                    else{
                        this.datasourceType =  "POSTGRESQL",
                        this.database = JSON.parse(response.data.data).database,
                        this.host = JSON.parse(response.data.data).host,
                        this.port = JSON.parse(response.data.data).port,
                        this.username = JSON.parse(response.data.data).username,
                        this.password = JSON.parse(response.data.data).password
                    }
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                        this.$router.push("/login")                            }
                })
            }
        },
        addCKAN(){
            var urlString;
            if(this.id !== 'undefined'){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/edit'
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcename: this.datasourceName,
                    datasourcetype: this.datasourceType,
                    data: {
                        ckanApiUrl: this.host,
                        ckanPort: this.port
                    }
                },
                headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/datasource/create")
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            }) 
        },
         addPOSTGRES(){
            var urlString;
            if(this.id !== 'undefined'){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/edit'
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcename: this.datasourceName,
                    datasourcetype: this.datasourceType,
                    data: {
                        host: this.host,
                        port: parseInt(this.port),
                        database: this.database,
                        username: this.username,
                        password: this.password
                    }
                }
                })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/datasource/create")
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