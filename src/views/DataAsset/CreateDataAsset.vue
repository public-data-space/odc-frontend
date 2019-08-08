<template>
    <div class="wrapper">   
        <sidebar></sidebar>
        <div class="col-8">
            <div v-if="type==='CKAN'">
                <div class="form-group">
                <label for="resourceID">Resource-ID</label>
                <input type="text"
                    class="form-control"
                    id="resourceID"
                    name="resourceID"
                    aria-describedby="resourceIDHelp"
                    placeholder="27b4920f-e85a-436e-a1a8-e000649abb28"
                    v-model="id">
                    <small id="resourceIDHelp" class="form-text text-muted">Tipp: Die eindeutige ID der Resource aus CKAN</small>
                </div>
                <button v-on:click="addCKAN()" class="btn btn-primary">Data Asset hinzufügen</button>
            </div>
            <div v-if="type==='POSTGRESQL'">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                        <label for="query">SQL Query</label>
                        <textarea rows="4" cols="50"
                            class="form-control"
                            id="query"
                            name="query"
                            aria-describedby="query"
                            placeholder="SELECT * FROM table_name;"
                            v-model="database.query"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">  
                        <div class="form-group">   
                            <label for="resourceID">Name</label>
                            <input type="text"
                                class="form-control"
                                id="name"
                                name="name"
                                aria-describedby="nameHelp"
                                placeholder="Data Asset Name"
                                v-model="database.datasettitle">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="resourceID">Beschreibung</label>
                            <input type="text"
                                class="form-control"
                                id="description"
                                name="description"
                                aria-describedby="descriptionHelp"
                                placeholder="Beischreibung des Data Assets"
                                v-model="database.datasetnotes">    
                        </div>
                    </div>
                </div>
            <button v-on:click="addPOSTGRES()" class="btn btn-primary">Data Asset hinzufügen</button>
            </div>
            <div v-if="type==='OTHER'">
                <div class="form-group">
                <label for="query">SQL Query</label>
                <input type="file"
                    class="form-control"
                    id="fileToUpload"
                    ref="file" 
                    v-on:change="handleFileUpload()">
                </div>
            </div>
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
            id:null,
            database : {
                query:null,
                datasettitle:null,
                datasetnotes:null
            },
            file:null,
            source:null,
            type:null,

        };
    },
    beforeMount(){
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
        addCKAN(){
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/add',
                data: {
                    sourceId: this.sourceid,
                    data:{"resourceId":this.id},
                    datasourcetype:this.type
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
        addPOSTGRES(){
            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add',
                data: {
                    sourceId: this.sourceid,
                    data:this.database,
                    datasourcetype:this.type
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/job")}
            )
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
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add',
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
        }
    }
}
</script>
