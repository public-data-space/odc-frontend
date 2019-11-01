<template>
                <nav id="sidebar">
                        <ul class="list-unstyled">
                            <li>
                                <div class="row">
                                    <div class="col">
                                        <h5>Data Sources</h5>
                                    </div>
                                    <div class="col">
                                         <router-link :to="{name: 'createdatasource', params: {sources: this.sources}}"><img src="../assets/images/baseline_add_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                    </div>
                                </div>
                            <li>
                                <span v-for="sourceList in this.sources" v-bind:key="sourceList.type">
                                    <div class="row">
                                        <div class="col">
                                            {{sourceList.type}}
                                        </div>
                                    </div>
                                    <span class="border-top my-2"></span>
                                    <div class="row" v-for="source in sourceList.sources" v-bind:key="source.id">
                                        <div class="col">
                                        <router-link :to="{name: 'createdataasset', params: {sources: sources, sourceid: source.id}}">{{source.datasourcename}}</router-link>
                                        </div>
                                        <div class="col">
                                            <span>
                                                <router-link :to="{name: 'createdatasource', params: {sources: sources, sourceid: source.id}}"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                            </span>
                                            <span>
                                                <button v-on:click="deleteAction(source.id)"><img src="../assets/images/baseline_delete_white_18dp.png" alt="Delete" style="width:15px"></button>
                                            </span>
                                        </div>
                                    </div>
                                </span>
                            </li>
                        </ul>
                </nav>
</template>

<script>
export default {
    name:"Sidebar",
    props:['sources'],
    data() {
        return {
        };
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