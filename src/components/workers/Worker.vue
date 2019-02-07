<template lang="html">
  <tr class="worker" >
    <td class="worker__col">
      <p>
        {{`${worker.surname} ${worker.name} ${worker.patronymic}`}}
      </p>
    </td>
    <td class="worker__col">
      <p>
        {{`${worker.thePost}`}}
      </p>
    </td>
    <td class="worker__col">
      <p>
        {{`${worker.salary}`}}
      </p>
    </td>
    <td class="worker__col">
      <p>
        {{`${worker.status}`}}
      </p>
    </td>
    <td class="worker__col">
      <p>
        {{`${worker.dateEmployment}`}}
      </p>
    </td>
    <td class="worker__col">
      <button class="worker__button" v-if="!change" @click="changeToggl">
        <font-awesome-icon icon="exchange-alt" />
      </button>

      <button class="worker__button" v-if="change" @click="updateWorker">
        <font-awesome-icon icon="save" />
      </button>
      <button class="worker__button" v-if="change" @click="deleteWorker">
        <font-awesome-icon icon="times" />
      </button>
    </td>
    <div class="worker__wrapper">
        {{`
           HR ${worker.userEmail}
        `}}
    </div>
  </tr>
</template>

<script lang="js">
  import axios from "axios";

  export default {
    name: "Worker",
    props: {
        worker: Object,
    },
    data () {
      return {
        change: false,
        changeForm: {
          name: this.worker.name,
          surname: this.worker.surname,
          patronymic: this.worker.patronymic,
          thePost: this.worker["the_post"],
          salary: this.worker.salary,
          status: this.worker.status,
          dateEmployment: this.worker["date_employment"]
        }
      }
    },
    computed: {
      sockets () {
        return this.$store.getters.ioRoom;
      },
      userOnline () {
        return this.$store.getters.getUserLogin;
      }
    },
    methods: {
      changeToggle() {
        this.change = !this.change;

        this.$store.dispatch("changeWorker", {
          type: "change",
          workerID: this.userOnline.id
        })
      },
      // updateWorker (id) {
      //
      //   axios.put(`http://localhost:3000/api/v1/worker/${this.worker["worker_id"]}`, this.changeForm, {
      //     "Access-Control-Allow-Origin": "*"
      //   }).then(res => {
      //     let socket =  this.sockets["hrs"];
      //
      //     socket.emit("add worker");
      //     // this.$store.dispatch("changeWorker", {
      //     //   type: "delete",
      //     //   workerID: id
      //     // });
      //     this.change = !this.change
      //   })
      // },
      // deleteWorker () {
      //   axios.delete(`http://localhost:3000/api/v1/worker/${this.worker["worker_id"]}`, {}, {
      //     "Access-Control-Allow-Origin": "*"
      //   }).then(res => {
      //     let socket =  this.sockets["hrs"];
      //
      //     socket.emit("add worker");
      //   })
      // }

    }
  }
</script>

<style lang="scss">
  .worker{
    position: relative;
    height: 40px;
    border-left: 3px solid;
    border-right: 3px solid;
    border-color: #333;

    &__wrapper{
      position: absolute;
      left: 0;
      width: 100%;
    }

    &__button{
      border: 0;
      padding: 5px;
      outline: transparent;
    }
    &__icon{
      font-size: 20px;
      color: darkolivegreen;
    }
  }
</style>
