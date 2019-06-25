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
            </div>
            <div v-if="type==='PostgreSQL'">
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
            <div v-if="type==='FileUpload'">
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
    props:['type'],
    data() {
        return {
            id:null,
            query:null,
            file:null
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        addAction(){
            this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add/'+this.id)
            .then(response => {
                this.$store.state.info = response.data;
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
