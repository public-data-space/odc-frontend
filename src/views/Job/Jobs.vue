<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Resource</th>
                    <th scope="col">Erstellt</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="job in jobs">
                        <th scope="row">{{job.id}}</th>
                        <td>{{job.resourceid}}</td>
                        <td>{{new Date(Date.parse(job.created_at)).toLocaleString()}}</td>
                        <td>
                            <!--CREATED-->
                            <span v-if="job.status == 0">
                                <span class="badge badge-primary">Erstellt</span>
                            </span>
                            <!--FINISHED-->
                            <span v-if="job.status == 2">
                                <span class="badge badge-success">Fertig</span>
                            </span>
                            <!--ERROR-->
                            <span v-if="job.status == 3">
                                <span class="badge badge-danger">Fehler</span>
                            </span>
                            <!--RUNNING-->
                            <span v-if="job.status == 1">
                                <span class="badge badge-info">Wird ausgeführt</span>
                            </span>
                        </td>
                    </tr>
            </tbody>
        </table>
        <button v-on:click="deleteAction" class="btn btn-info float-right">Jobs aufräumen</button>
    </div>
</template>


        <script>
            export default {
                name: "Jobs",
                data() {
                    return {
                    jobs: null
                    };
                },
                mounted (){
                    this.findAll()
                },
                beforeDestroy(){
                    this.$store.state.info = null;
                },
                methods:{
                    findAll () {
                        this.$axios
                        .get('http://localhost:8090/jobs/find/all')
                        .then(response => {
                            this.jobs = response.data;
                            })
                    },
                    deleteAll (){
                        this.$axios
                        .get('http://localhost:8090/jobs/delete/all')
                        .then(response => {
                            this.$store.state.info = response.data;
                        })
                    },
                    deleteAction(){
                        this.deleteAll()
                        this.findAll()
                    }
                }
            }
        </script>
