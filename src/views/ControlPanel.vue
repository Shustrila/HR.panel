<template>
    <div class="control-panel" >
        <form v-if="userLogin !== null">
            <input type="text">
            <input type="text">
            <input type="text">
            <label>
                <input type="text">
            </label>
            <input type="submit">
        </form>
        <table class="table" v-if="userLogin !== null">
            <thead class="table__head">
            <tr class="table__head-tr">
                <td class="table__head-td"> ФИО </td>
                <td class="table__head-td"> Должность </td>
                <td class="table__head-td"> Статус </td>
                <td class="table__head-td"> Дата приема на работу </td>
                <td class="table__head-td"> edit </td>
            </tr>
            </thead>
            <tbody>
                <line-worker v-for="worker in workers"
                             :worker="worker"
                             :key="worker.id"/>
            </tbody>
        </table>
        <div class="control-panel__not-login"  v-if="userLogin === null">
            вы не можите видеть эту страницу по тому что вы еще не зашли в акаунт
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ControlPanel",
        data () {
            return {
                userLogin: this.$store.state.userLogin,
                workers: [],
                form: {
                    dateCreated: ""
                }
            }
        },
        components: {
          LineWorker: () => import("../components/LineWorker")
        },
        mounted () {
            if(this.userLogin !== null) {
                axios.get(`http://localhost:3000/api/worker`, {}, {
                    "Access-Control-Allow-Origin": "*"
                }).then(response => {
                    this.workers = response.data;
                    this.$store.commit('setWorkers', response.data);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style lang="scss">
    .table{
        width: 100%;
        text-align: center;


        &__head{
            background-color: #dddddd;

            &-tr{

            }
            &-td{

            }
        }
    }
</style>
