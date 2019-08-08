<template>
    <div>
            <span v-for="dataAsset in dataassets">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{dataAsset.datasettitle}}</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text">
                                <h5>Beschreibung</h5>
                                <p>
                                    {{dataAsset.datasetnotes}}
                                </p>
                                <h5>Resourcen</h5>
                                <p>
                                <a :href="'http://localhost:8090/data/'+dataAsset.id" class=" badge badge-info">Download Rohdaten</a>
                            <!--  <a href="@urlService.getOriginalResourceURL(dataAsset)" target="_blank" class="badge badge-info">Zur Quelle</a>-->
                                </p>
                                <h5>IDS Download</h5>
                                 <p>
                                <a :href="'http://localhost:8090/data/'+dataAsset.id" class="badge badge-success">IDS</a>
                                <a :href="'http://localhost:8090/data/'+dataAsset.id+'.txt'" class="badge badge-primary">IDS+TXT</a>
                                <a :href="'http://localhost:8090/data/'+dataAsset.id+'.json'" class="badge badge-primary">IDS+JSON</a>
                                </p>
                        </div>
                        <div class="card-footer text-muted">
                            <span v-if="dataAsset.status == 1">
                                  <button v-on:click="publishAction(dataAsset.id)" class="btn btn-success">Veröffentlichen</button>
                            </span>
                            <span v-if="dataAsset.status == 2">
                                 <button v-on:click="unpublishAction(dataAsset.id)" class="btn btn-primary">Zurückhalten</button>
                            </span>
                             <button v-on:click="deleteAction(dataAsset.id)" class="btn btn-danger">Löschen</button>
                        </div>
                    </div>
                <br />
            </span>
    </div>
</template>
        <script>
                export default {
                name: "DataAssets",
                data() {
                    return {
                        dataassets: null
                    };
                },
                beforeMount (){
                    this.setData()
                },
                methods:{
                    setData(){
                        this.$axios({
                            method: 'get',
                            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('jwt')
                            }
                        })
                        .then(response => {
                                this.dataassets = response.data;
                            })
                        .catch(error => {
                            if(error.response.status === 401){
                                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                                this.$router.push("/login")                            }
                        })
                    },
                    publishAction(id){
                        this.$axios({
                            method: 'get',
                            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/'+id+'/publish',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('jwt')
                            }
                        })
                        .then(response => {
                                this.dataassets.find(da => da.id == id).status = 2
                            })
                        .catch(error => {
                            if(error.response.status === 401){
                                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                                this.$router.push("/login")
                            }
                        })
                    },
                    unpublishAction(id){
                        this.$axios({
                            method: 'get',
                            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/'+id+'/unpublish',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('jwt')
                            }
                        })
                        .then(response => {
                                this.dataassets.find(da => da.id == id).status = 1
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
                            url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/dataassets/'+id+'/delete',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('jwt')
                            }
                        })
                        .then(response => {
                                this.$store.dispatch('update',response.data)
                                this.setData() 
                            })
                        .catch(error => {
                            if(error.response.status === 401){
                                this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                                this.$router.push("/login")
                            }
                        })
                    },
                    findById(elementId, changedId){

                    }
                }
            }
        </script>