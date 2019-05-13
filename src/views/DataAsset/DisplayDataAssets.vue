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
                                <a href="../Job/index.html" class=" badge badge-info">Download Rohdaten</a>
                            <!--  <a href="@urlService.getOriginalResourceURL(dataAsset)" target="_blank" class="badge badge-info">Zur Quelle</a>-->
                                </p>
                                <h5>IDS Download</h5>
                                 <p>
                                <a :href="'http://localhost:8080/payload/'+dataAsset.id" class="badge badge-success">IDS</a>
                                <a :href="'http://localhost:8080/payload/'+dataAsset.id+'.txt'" class="badge badge-primary">IDS+TXT</a>
                                <a :href="'http://localhost:8080/payload/'+dataAsset.id+'.json'" class="badge badge-primary">IDS+JSON</a>
                                </p>
                        </div>
                        <div class="card-footer text-muted">
                            <span v-if="dataAsset.status == 1">
                                <a href="@controllers.routes.DataAssetController.publish(dataAsset.getId)" class="btn btn-success">Veröffentlichen</a>
                            </span>
                            <span v-if="dataAsset.status == 2">
                                <a href="@controllers.routes.DataAssetController.unPublish(dataAsset.getId)" class="btn btn-primary">Zurückhalten</a>
                            </span>
                            <a href="@controllers.routes.DataAssetController.delete(dataAsset.getId)" class="btn btn-danger">Löschen</a>
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
                mounted (){
                    this.$axios
                        .get('http://localhost:8090/dataassets/')
                        .then(response => {
                            this.dataassets = response.data;
                        })
                },
                beforeDestroy(){
                    this.$store.state.info = null;
                }
            }
        </script>