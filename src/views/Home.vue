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
<!--            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">Verbundene CKAN Instanz</h5>
                    <p class="card-text">
                        <a href="@homeView.ckanUrl" target="_blank">@homeView.ckanUrl</a>
                    </p>
                </div>
            </div>
-->            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">Connector-Selbstauskunft</h5>
                    <p class="card-text">
                        <router-link to="/about" type="button" class="btn btn-success">Turtle (txt)</router-link>
                        <router-link to="/about.ttl" type="button" class="btn btn-success">Turtle</router-link>
                        <router-link to="/about.jsonld" type="button" class="btn btn-success">JSON-LD</router-link>
                        <router-link to="/about.rdf" type="button" class="btn btn-success">RDF-XML</router-link>

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
                        <router-link to="/dataasset/create" type="button" class="btn btn-info">Data Assets hinzufügen</router-link>
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
  beforeDestroy(){
    this.$store.state.info = null;
  },
  components: {
    
  },
  methods:{
    getWindowLocation(){
      return window.location.href
    }
  }

}
</script>
