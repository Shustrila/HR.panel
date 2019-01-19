<template>
    <div class="control-panel">
        <div class="control-panel__top" v-if="workers.length !== 0">
            <form class="control-panel__filter">
                <h3 class="control-panel__filter-title"> Фильтр</h3>
                <label>
                    <input type="text">
                </label>
            </form>
            <form class="control-panel__worker">
                <h3>Создать пользовотеля</h3>
                <div class="control-panel__worker-group">
                    <label>
                        <p>Имя: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>
                    <label>
                        <p>Фамилия: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>
                    <label>
                        <p>Отчество: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>
                </div>
                <div class="control-panel__worker-group">
                    <label>
                        <p>Должность: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>

                    <label>
                        <p>Статус: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>

                    <label>
                        <p>Должность: </p>
                        <input class="control-panel__worker-field" type="text">
                    </label>
                </div>
                <input class="control-panel__worker-submit" type="submit" value="Создать">
            </form>
        </div>
        <table class="table" v-if="workers.length !== 0">
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
        <div class="control-panel__not-login"  v-if="workers.length === 0">
            вы не можите видеть эту страницу по тому что вы еще не зашли в акаунт
        </div>
    </div>
</template>

<script>
    export default {
        name: "ControlPanel",
        data () {
            return {
                form: {
                    dateCreated: ""
                }
            }
        },
        computed: {
            workers (){
                return this.$store.getters.getWorkers
            }
        },
        components: {
          LineWorker: () => import("../components/LineWorker")
        }
    }
</script>

<style lang="scss">
    .control-panel{
        &__top {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            background-color: #ddd;
        }
        &__filter{
            flex-grow: 1;
        }
        &__worker{
            padding: 5px 60px;
            background-color: darkolivegreen;
            color: #fff;

            &-group{
                display: flex;
                flex-wrap: wrap;
                margin:0  -10px;
                margin-bottom: 10px;
            }
            &-group:last-child{
                margin-bottom: 15px;
            }
            &-submit{
                margin-left: auto;
                padding: 5px 30px;
                font-size: 20px;
            }
            &-field{
                padding: 5px 5px;
                margin: 0 10px;
            }
        }
    }
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
