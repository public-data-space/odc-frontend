<template>
                <nav id="sidebar">
                        <ul class="list-unstyled">
                            <li>
                                <div class="row">
                                    <div class="col">
                                        <h5>Data Sources</h5>
                                    </div>
                                    <div class="col">
                                         <router-link to="/datasource/create/"><img src="../assets/images/baseline_add_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                    </div>
                                </div>
                            <li>
                                <div class="row">
                                    <div class="col">
                                        CKAN
                                    </div>
                                </div>
                                <span class="border-top my-2"></span>
                                <div class="row" v-for="ckansource in ckan" v-bind:key="ckansource.id">
                                    <div class="col">
                                      <router-link :to="'/dataasset/create/'+ckansource.id">{{ckansource.datasourcename}}</router-link>
                                    </div>
                                    <div class="col">
                                        <span>
                                             <router-link :to="'/datasource/edit/'+ckansource.id"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                        </span>
                                        <span>
                                             <button v-on:click="deleteAction(ckansource.id)"><img src="../assets/images/baseline_delete_white_18dp.png" alt="Delete" style="width:15px"></button>
                                        </span>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        PostgreSQL
                                    </div>
                                </div>
                                <span class="border-top my-2"></span>
                                <div class="row" v-for="postgressource in postgres"  v-bind:key="postgressource.id">
                                    <div class="col">
                                         <router-link :to="'/dataasset/create/'+postgressource.id">{{postgressource.datasourcename}}</router-link>
                                    </div>
                                    <div class="col">
                                        <span>
                                              <router-link :to="'/datasource/edit/'+postgressource.id"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                        </span>
                                        <span>
                                            <button v-on:click="deleteAction(postgressource.id)"><img src="../assets/images/baseline_delete_white_18dp.png" alt="Delete" style="width:15px"></button>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        Others
                                    </div>
                                </div>
                                <div class="row" v-for="othersource in other"  v-bind:key="othersource.id">
                                    <div class="col">
                                        <a href="#">{{othersource.name}}</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </nav>
</template>

<script>
export default {
    name:"Sidebar",
    data() {
        return {
            ckan: null,
            postgres: null,
            other: null
        };
    },
    created(){
        this.getAvailableSources()
    },
    watch: {
        '$route': 'getAvailableSources'
    },
    methods:{
        deleteAction(id){
         this.$axios({
                method: 'get',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/delete/'+id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.getAvailableSources()
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                    this.$router.push("/login")                            
                }
            })
        },
        getAvailableSources(){
            this.$axios({
                method: 'get',
                url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/findAll',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.ckan = response.data.CKAN
                this.postgres = response.data.POSTGRESQL
                this.other = response.data.OTHER
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
<style>
.wrapper {
    display: flex;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
}

#sidebar.active {
    margin-left: -250px;
}
button {     
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;        
}
</style>