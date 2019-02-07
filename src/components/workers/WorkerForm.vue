<template>
	<form class="worker-form">
		<input class="worker-form__field"
					 type="text"
					 name="name"
					 v-model="newWorkerForm.name"
					 placeholder="Имя">

		<input class="worker-form__field"
					 type="text"
					 name="surname"
					 v-model="newWorkerForm.surname"
					 placeholder="Фамилия">

		<input class="worker-form__field"
					 type="text"
					 name="patronymic"
					 v-model="newWorkerForm.patronymic"
					 placeholder="Отчество">

		<input class="worker-form__field"
					 type="text"
					 name="thePost"
					 v-model="newWorkerForm.thePost"
					 placeholder="Должность">

		<input class="worker-form__field"
					 type="number"
					 name="salary"
					 v-model="newWorkerForm.salary"
					 placeholder="Оклад">

		<select class="worker-form__field"
						name="status"
						v-model="newWorkerForm.status">
			<option>-Статус-</option>
			<option> соискатель </option>
			<option> сотрудник </option>
			<option> уволен </option>
		</select>

		<input type="submit" @click.prevent="newWorkerformPost()" value="Добавить">
	</form>
</template>

<script>
	import axios from "axios";

	export default {
		name: "WorkerForm",
		props: {
        socketHrProps: Object
		},
		data () {
			return {
					newWorkerForm : {}
			}
		},
		computed: {
			sokets () {
			    return this.$store.getters.ioRoom;
			}
		},
		methods: {
			newWorkerformPost () {
				axios.post("http://localhost:3000/api/v1/worker", this.newWorkerForm, {
						"Access-Control-Allow-Origin": "*"
				}).then(res => {
				    let socket = this.sokets["hrs"];

            socket.emit("add worker");
            this.newWorkerForm = {};
				})
			}
		}
  }
</script>

<style lang="scss">
	.worker-form{
		display: flex;
		flex-wrap: wrap;
		width: 100%;

		&__field{
			flex-grow: 1;
		}
	}
</style>
