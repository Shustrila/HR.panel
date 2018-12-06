<template>
    <div class="control-panel">
        <table class="table">
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
            <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "ControlPanel"
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
