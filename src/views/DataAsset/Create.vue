<template>
    <div>
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
                <button v-on:click="addAction" class="btn btn-primary">Data Asset hinzufügen</button>
    </div>
</template>

            
<script>
export default {
    name:"Create",
    data() {
        return {
            id: null
        };
    },
    beforeDestroy(){
        this.$store.state.info = null;
    },
    methods:{
        addAction(){
            this.$axios
            .get('http://localhost:8090/dataassets/add/'+this.id)
            .then(response => {
                this.$store.state.info = response.data;
            }) 
            this.$router.push("/job")
        }
    }
}
</script>
