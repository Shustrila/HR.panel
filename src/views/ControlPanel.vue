<template>
    <div class="control-panel">
        <div class="control-panel__options" v-if="workers.length !== 0 || user !== null">
            <div class="control-panel__options-info">
                Какая то информация
            </div>
            <div class="control-panel__options-add">
                <button @click="newWorker = !newWorker">
                    Добавить нового работника
                </button>
            </div>
            <form class="control-panel__options-form">
                <label class="control-panel__options-label">
                    Поиск:
                    <input class="control-panel__options-field"
                           type="search"
                           v-model="filter.search"
                           name="search">
                </label>
                <label class="control-panel__options-label">
                    Должность:
                    <input class="control-panel__options-field"
                           type="text"
                           v-model="filter.post"
                           name="post">
                </label>
                <label class="control-panel__options-label">
                    Оклад:
                    <input class="control-panel__options-field"
                           type="number"
                           v-model="filter.salary"
                           name="salary">
                </label>
                <label class="control-panel__options-label">
                    Cтатус:
                    <select class="control-panel__options-field" name="status">
                        <option>-Статус-</option>
                        <option> соискатель </option>
                        <option> сотрудник </option>
                        <option> уволен </option>
                    </select>
                </label>
                <div class="control-panel__options-buttons">
                    <button class="control-panel__options-button control-panel__options-button--blue" type="submit">
                        Фильтровать
                    </button>
                    <button class="control-panel__options-button control-panel__options-button--red"
                            @click.prevent="filter = {}">
                        Сбросить
                    </button>
                </div>
            </form>
        </div>

        <div class="control-panel__workers" v-if="workers.length !== 0 || user !== null">

            <div class="control-panel__new-worker" v-if="newWorker">
                <h3 class="control-panel__title">
                    Добавьте нового пользователя
                </h3>
                <worker-form />
            </div>

            <table class="control-panel__table">
                <thead class="control-panel__table-head">
                    <tr>
                        <td class="control-panel__table-head-row">
                            ФИО
                        </td>
                        <td class="control-panel__table-head-row">
                            Должность
                        </td>
                        <td class="control-panel__table-head-row">
                            Оклад
                        </td>
                        <td class="control-panel__table-head-row">
                            Статус
                        </td>
                        <td class="control-panel__table-head-row">
                            Дата приема на работу
                        </td>
                        <td class="control-panel__table-head-row">
                            edit
                        </td>
                    </tr>
                </thead>
                <tbody class="control-panel__table-body">
                    <worker v-for="worker in workers" :worker="worker" :key="worker['worker_id']"/>
                </tbody>
            </table>

        </div>
        <div class="control-panel__not-login"  v-if="workers.length === 0 && user === null">
            вы не можите видеть эту страницу по тому что вы еще не зашли в акаунт
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import io from 'socket.io-client';

    export default {
        name: "ControlPanel",
        data() {
            return{
                newWorker: false,
                filter: {}
            }
        },
        computed: {
            ...mapGetters({
                user: "auth/userLogin",
                workers: "workers/list"
            })
        },
        methods: {
          ...mapActions({
              getWorkers: "workers/getWorkers"
          })
        },
        mounted() {
            this.getWorkers();
            // let socketHr = io("http://localhost:3000/hrs");
            // this.$store.dispatch("workers");
            //
            // socketHr.on("get worker", () => {
            //     this.$store.dispatch("workers");
            // });
        },
        components: {
            Worker: () => import("../components/workers/Worker"),
            WorkerForm: () => import("../components/workers/WorkerForm")
        }
    }
</script>

<style lang="scss">
    .control-panel{
        &__table{
            width: 100%;

            &-head{
                background-color: darkolivegreen;

                &-row{
                    color: #fff;
                }
            }

            &-body{

            }
        }
    }
    .control-panel{
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        &__options{
            padding: 10px 20px;
            background-color: #333;

            &-form{
                display: flex;
                flex-direction: column;
            }
            &-label{
                max-width: 500px;
                margin-bottom: 15px;
                color: #fff;
                text-align: left;
            }
            &-label:last-child{
                margin-bottom: 0;
            }
            &-field{
                padding: 5px 10px;
                margin-top: 5px;
                width: 100%;
            }
            &-buttons{
                display: flex;
            }
            &-button{
                flex-grow: 1;
                padding: 5px;
                color: #fff;
                border: 0;
                outline: transparent;
            }
            &-button--blue{
                background-color: darkcyan;
            }
            &-button--red{
                background-color: darkred;
            }
        }
        &__title{
            width: 100%;
        }
        &__workers{
            flex-grow: 1;
            overflow-y: scroll;
        }
    }
</style>
