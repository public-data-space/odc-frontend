<template>
    <div>
        <div v-if="datasources !== null">
            <button v-on:click="createPush()" type="button" class="btn btn-info btn-lg btn-block">Data Source hinzufügen</button>
        </div>
        <div v-else>
            <div class="wrapper">
                <sidebar></sidebar>
                <div id=content>
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">
                                Bitte wählen sie eine Datenquelle, aus der ein weiteres DataAsset hinzugefügt werden soll, aus der Liste, oder klicken Sie auf das Kreuz um eine weitere Datenquelle des Typs hinzuzufügen.
                            </p>
                        </div>
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
    data() {
        return {
            datasources: null
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        addAction(){
            this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/add/'+this.id)
            .then(response => {
                this.$store.state.info = response.data;
            }) 
            this.$router.push("/job")
        },
        createPush(){
            this.$router.push("/datasource/create")
        }
    }
}
</script>