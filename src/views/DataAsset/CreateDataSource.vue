<template>
    <div class="wrapper">   
        <sidebar v-bind:sources=this.sources></sidebar>
        <div id=content>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="datasourceName">Data Source Name</label>
                        <input type="text"
                        class="form-control"
                        id="datasourceName"
                        name="datasourceName"
                        placeholder="My Data Source"
                        v-model="name">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="datasourceType">Data Source Type</label>
                        <select class="form-control"
                        id="datasourceType"
                        name="datasourceType"
                        v-model="type"
                        :required="true">
                        <option v-for="option in options" 
                        v-bind:key=option.name
                        v-bind:value="option"
                        :selected="option === type"    
                        >{{ option }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <ncform :form-schema="formSchema" form-name="dataInput" v-model="formSchema.value"></ncform>
            </div>
            <div class="row">
                <button v-on:click="submit()" class="btn btn-primary">Data Source hinzufügen</button>
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
  props:['sources', 'sourceid'],
    data() {
        return {
            options: [],
            type: "",
            name: null,
            id: null,
            formSchema: {}
        };
    },
    beforeMount(){
        for (var source in this.sources){
            this.options.push(this.sources[source].type)
        }
        this.type = this.sources[0].type
        this.updateParams()
    },
    watch: {
        '$route': 'updateParams',
        type: function(val) {
            this.getFormSchema()
        }
    },
    methods:{
        getFormSchema(){
              this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/schema/type/'+this.type,
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    this.formSchema = response.data
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                        this.$router.push("/login")                            
                    }
                })  
        },
        updateParams(){
            if(typeof this.datasourceid !== 'undefined'){
                this.id = this.datasourceid
                this.$axios({
                    method: 'get',
                    url: process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/find/id/'+this.id,
                    headers: {
                         Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
                .then(response => {
                    this.type=response.data.source.datasourcetype
                    this.getFormSchema().then(() => {
                    })
                    
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$store.dispatch('update',{'status':'error','text':'Session expired.'})
                        this.$router.push("/login")                            
                    }
                })
            }
        },
        submit(){
            var urlString;
            if(this.datasourceid !== 'undefined'){
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/add'
            }
            else{
                urlString = process.env.VUE_APP_BACKEND_BASE_URL+'/api/datasources/edit'
            }
            this.$axios({
                method: 'post',
                url: urlString,
                data: {
                    datasourcetype: this.type,
                    datasourcename: this.name,
                    data: this.formSchema.value
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(response => {
                this.$store.dispatch('update',response.data)
                this.$router.push("/datasource/select")  
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