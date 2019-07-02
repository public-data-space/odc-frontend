<template>
    <div class="wrapper">   
        <sidebar></sidebar>
        <div class="col-8">
            <div v-if="type===0">
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
            </div>
            <div v-if="type===1">
                <div class="form-group">
                <label for="query">SQL Query</label>
                <textarea rows="4" cols="50"
                    class="form-control"
                    id="query"
                    name="query"
                    aria-describedby="query"
                    placeholder="SELECT * FROM table_name;"
                    v-model="query"/>
                </div>
            </div>
            <div v-if="type===2">
                <div class="form-group">
                <label for="query">SQL Query</label>
                <input type="file"
                    class="form-control"
                    id="fileToUpload"
                    ref="file" 
                    v-on:change="handleFileUpload()">
                </div>
            </div>
            <button v-on:click="addAction()" class="btn btn-primary">Data Asset hinzufügen</button>
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
            query:null,
            file:null,
            source:null,
            type:null
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    mounted(){
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/id/'+this.sourceid)
            .then(response => {
                this.source = response.data;
                this.type = this.source.datasourcetype;
            })
    },
    beforeRouteUpdate  (to, from, next) {
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/id/'+this.sourceid)
            .then(response => {
                this.source = response.data;
                this.type = this.source.datasourcetype;
            }) 
        next()
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        addAction(){

            this.$axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add/ckan',
                data: {
                    sourceId: this.sourceid,
                    resourceId:this.id
                }
                })    
            this.$router.push("/job")
        },
        postquery(){
            this.$axios
            .post(process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add/', {
                body: this.query
            })
            .then(response => {
                this.$store.state.info = response.data;
            }) 
        },
        uploadFile(){
            let formData = new FormData()
            formData.append('file', this.file)
            this.$axios.post( process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    ).then(function(){
                        this.$store.state.info = response.data;
                    })
        }
    }
}
</script>
