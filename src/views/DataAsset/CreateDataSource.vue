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
            </div>
            <div class="row">
                <div class="col">
                    <button v-on:click="addAction" class="btn btn-info">Data Source hinzufügen</button>
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
  props: ['type'],
    data() {
        return {
            options: ["CKAN","PostgreSQL"],
            datasourceName: null,
            datasourceType: "CKAN",
            datasourceUrl: null,
            datasourcePort: null,
            databaseName: null,
            username:null,
            password:null
        };
    },
    mounted(){
        console.log(this.type)
        if(typeof this.type !== 'undefined'){
            this.datasourceType = this.type
        }
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        addAction(){
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/add',
                data: {
                    datasourceName: this.datasourceName,
                    datasourceType: this.datasourceType,
                    datasourceUrl: this.datasourceUrl,
                    datasourcePort: this.datasourcePort,
                }
                })
            .then(response => {
                this.$store.state.info = response.data;
            }) 
        },
        createPush(){
            this.$router.push("/datasource/create")
        }
    }
}
</script>