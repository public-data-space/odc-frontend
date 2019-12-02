<template>
                <nav id="sidebar">
                        <ul class="list-unstyled">
                            <li>
                                <div class="row">
                                    <div class="col">
                                        <h5>Data Sources</h5>
                                    </div>
                                    <div class="col">
                                         <router-link :to="{ path: '/datasource/create' }"><img src="../assets/images/baseline_add_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                        <router-view :key="$route.fullPath"></router-view>
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
                                        <router-link :to="{name: 'createdataasset', params: {sourceid: source.id}}">{{source.datasourcename}}</router-link>
                                        </div>
                                        <div class="col">
                                            <span>
                                                <router-link :to="{name: 'editdatasource', params: {sourceid: source.id}}"><img src="../assets/images/baseline_edit_white_18dp.png" alt="Edit" style="width:15px"></router-link>
                                                <router-view :key="$route.fullPath"></router-view>
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
            this.$emit("delete", id)
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