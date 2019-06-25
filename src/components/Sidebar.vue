<template>
                <nav id="sidebar">
                        <ul class="list-unstyled">
                            <h5>Data Sources</h5>
                            <li>
                                <div class="row">
                                    <div class="col">
                                        CKAN
                                    </div>
                                    <div class="col">
                                         <router-link to="/datasource/create/CKAN"><img src="../assets/images/baseline_add_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                    </div>
                                </div>
                                <span class="border-top my-2"></span>
                                <div class="row" v-for="ckansource in ckan">
                                    <div class="col">
                                        <a href="#">{{ckansource.name}}</a>
                                    </div>
                                    <div class="col">
                                        <span>
                                             <router-link :to="'/dataasset/edit/'+ckansource.id"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
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
                                    <div class="col">
                                        <router-link to="/datasource/create/PostgreSQL"><img src="../assets/images/baseline_add_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                    </div>
                                </div>
                                <span class="border-top my-2"></span>
                                <div class="row">
                                                             <div class="col">
                                        <a href="#">T</a>
                                    </div>
                                    <div class="col">
                                        <span>
                                              <router-link :to="'/dataasset/edit/1'"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                        </span>
                                        <span>
                                            <button v-on:click="deleteAction()"><img src="../assets/images/baseline_delete_white_18dp.png" alt="Delete" style="width:15px"></button>
                                        </span>
                                    </div>
                                    </div>
                                <div class="row" v-for="postgressource in postgres">
                                    <div class="col">
                                        <a href="#">{{postgressource.name}}</a>
                                    </div>
                                    <div class="col">
                                        <span>
                                              <router-link :to="'/dataasset/edit/'+postgressource.id"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
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
                                <div class="row" v-for="othersource in other">
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
    mounted(){
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/ckan')
            .then(response => {
                this.ckan = response.data;
            })
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/postgres')
            .then(response => {
                this.postgres = response.data;
            })
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/datasources/find/other')
            .then(response => {
                this.other = response.data;
            })
    },
    methods:{
        deleteAction(){

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