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
                        v-model="datasourceUrl">
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
                        v-model="datasourcePort">
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
                            v-model="databaseName">
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
            datasourceUrl: null,
            datasourcePort: null,
            databaseName: null,
            username:null,
            password:null,
            id:null
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
                this.$axios
                .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/id/'+this.id)
                .then(response => {
                    this.datasourceName = response.data.datasourcename;
                    if(response.data.datasourcetype == 0){
                        this.datasourceType = "CKAN",
                        this.datasourceUrl = JSON.parse(response.data.data).ckanApiUrl,
                        this.datasourcePort = JSON.parse(response.data.data).ckanPort
                    }
                    else{
                        this.datasourceType =  "POSTGRESQL",
                        this.databaseName = JSON.parse(response.data.data).databaseName,
                        this.datasourceUrl = JSON.parse(response.data.data).databaseUrl,
                        this.datasourcePort = JSON.parse(response.data.data).databasePort,
                        this.username = JSON.parse(response.data.data).username,
                        this.password = JSON.parse(response.data.data).password
                    }
                })
            }
        },
        addCKAN(){
            var urlString;
            if(this.id !== 'undefined'){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/edit'
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcename: this.datasourceName,
                    datasourcetype: this.datasourceType,
                    data: {
                        ckanApiUrl: this.datasourceUrl,
                        ckanPort: this.datasourcePort
                    }
                }
                })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/datasource/create")
            }) 
        },
         addPOSTGRES(){
            var urlString;
            if(this.id !== 'undefined'){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/edit'
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcename: this.datasourceName,
                    datasourcetype: this.datasourceType,
                    data: {
                        databaseUrl: this.datasourceUrl,
                        databasePort: this.datasourcePort,
                        databaseName: this.databaseName,
                        username: this.username,
                        password: this.password,
                    }
                }
                })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/datasource/create")
            }) 
        }
    }
}
</script>