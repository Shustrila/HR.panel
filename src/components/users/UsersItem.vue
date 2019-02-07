<template lang="html">
	<li class="users-item">
		<div class="users-item__img">

		</div>
		<div class="users-item__wpapper">
			<div class="users-item__name">
				{{ name }}
			</div>
			<div class="users-item__email">
				{{ email }}
			</div>
		</div>
	</li>
</template>

<script lang="js">
	export default {
		name: "UsersItem",
		props: {
			email: String,
			name: String
		}
	}
</script>

<style lang="scss">
	.users-item{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 10px;

		&:last-child{
			margin-bottom: 0;
		}

		&__img{
			width: 60px;
			height: 60px;
			margin-right: 15px;
			background-color: #dddddd;
			border-radius: 50%;
		}
		&__wpapper{
			flex-grow: 1;
			text-align: left;
			color: #ffffff;
		}
	}
</style>
