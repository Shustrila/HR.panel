<template>
    <tr>
        <td>{{`${worker.surname} ${worker.name} ${worker.patronymic}`}}</td>
        <td>{{`${worker["the_post"]}`}}</td>
        <td>{{`${worker.salary}`}}</td>
        <td>{{`${worker["dateEmployment"]}`}}</td>
        <td>...</td>
    </tr>
</template>

<script>
    export default {
        name: "LineWorker",
        props: {
            worker: Object
        }
    }
</script>

<style lang="scss">

</style>
