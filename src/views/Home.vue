<template>
<div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Willkommen beim IDS Open Data Connector!</h5>
                    <p class="card-text">
                        Der Open Data Connector ermöglicht die einfache Bereitstellung von Open Data unter den Spezifikationen
                        des Industrial Data Spaces. Die Daten liegen dabei ursprünglich in der Open Source Datenmanagementsoftware CKAN vor.
                    </p>
                </div>
            </div>


          </div>
          <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Statistik</h5>
                    <p class="card-text">
                        {{counts.dacount}} Data Assets<br />
                        {{counts.publishedcount}} Veröffentlichte Data Assets
                    </p>
                </div>
            </div>
            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">Aktionen</h5>
                    <p class="card-text">
                        <router-link to="/dataasset/create" type="button" class="btn btn-info">Data Assets hinzufügen</router-link> <br />
                        <router-link to="/dataasset" type="button" class="btn btn-info mt-2">Data Assets</router-link>
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {
  name: 'home',
  data() {
        return {
            counts:{
                'dacount':0,
                'publishedcount':0
            }
        };
  },
  mounted(){
      this.getDataAssetCounts()
  },
  beforeDestroy(){
    this.$store.state.info = null;
  },
  components: {
    
  },
  methods:{
    getWindowLocation(){
      return window.location.href
    },
    getDataAssetCounts(){
        this.$axios
            .get(process.env.VUE_APP_BACKEND_BASE_URL+'/dataassets/counts')
            .then(response => {
            this.counts.dacount = response.data.dacount;
            this.counts.publishedcount = response.data.publishedcount;
            })
    }
  }

}
</script>
