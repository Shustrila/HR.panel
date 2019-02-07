	<template lang="html">
		<div class="registration">
			<form class="registration__form"
						id="form-registration"
						action="/user/registration"
						@submit.prevent="formSubmit">
				<div class="registration__form-title">
						Форма регистрации
				</div>

				<div class="registration__wpapper-name">
					<label class="registration__label-name registration__label">
						<span class="registration__error" v-if="validation.registration.name">
							{{ validation.registration.name }}
						</span>
						<input class="registration__field-name registration__field"
									 v-model="form.name"
									 :style="{ borderColor: (validation.registration.name)? 'red': 'transparent' }"
									 type="text"
									 name="name"
									 placeholder="Имя">
					</label>

					<label class="registration__label-surname registration__label">
						<span class="registration__error" v-if="validation.registration.surname">
							{{ validation.registration.surname }}
						</span>
						<input class="registration__field-surname registration__field"
									 v-model="form.surname"
									 :style="{ borderColor: (validation.registration.surname)? 'red': 'transparent' }"
									 type="text"
									 name="surname"
									 placeholder="Фамилия">
					</label>
				</div>

					<div class="registration__wpapper-auth">
						<label class="registration__label-email registration__label">
							<span class="registration__error" v-if="validation.registration.email">
								{{ validation.registration.email }}
							</span>
							<input class="registration__field-email registration__field js-registration-error"
										 v-model="form.email"
										 :style="{ borderColor: (validation.registration.email)? 'red': 'transparent' }"
										 type="email"
										 name="email"
										 placeholder="E-mail">
						</label>
						<label class="registration__label-password registration__label">
							<span class="registration__error" v-if="validation.registration.password">
								{{ validation.registration.password }}
							</span>
							<span class="registration__wrapper-field">
								<input class="registration__field-password registration__field js-registration-error"
											 v-model="form.password"
											 :style="{ borderColor: (validation.registration.password)? 'red': 'transparent' }"
											 :type="(!visiblePass)? 'password': 'text'"
											 name="password"
											 placeholder="Пароль">
								<div class="registration__wrapper-visible-icon" @click="visiblePass = !visiblePass">
									<font-awesome-icon class="login__visible-icon" icon="eye" v-if="!visiblePass"/>

									<font-awesome-icon class="login__visible-icon" icon="eye-slash" v-if="visiblePass"/>
								</div>
							</span>
						</label>
						<label class="registration__label-password registration__label">
							<span class="registration__error" v-if="validation.registration.repeatPassword">
								{{ validation.registration.repeatPassword }}
							</span>
							<input class="registration__field-password registration__field js-registration-error"
										 v-model="form.repeatPassword"
										 :style="{ borderColor: (validation.registration.repeatPassword)? 'red': 'transparent' }"
										 :type="(!visiblePass)? 'password': 'text'"
										 name="repeatPassword"
										 placeholder="Повторить пароль">
						</label>
					</div>

					<input class="registration__submit"
								 type="submit"
								 value="Регистрироваться">
			</form>
		</div>
	</template>

<script>
    import { mapActions, mapGetters, mapMutations } from "vuex"

    export default {
			name: "Registration",
			data() {
				return {
						form: {},
						visiblePass: false
				}
			},
			computed: {
					...mapGetters({
							validation: "auth/valiationErrors"
					})
			},
			methods: {
				...mapActions({
					registration: "auth/registration"
				}),
				...mapMutations({
						errorValiationForm: "auth/errorValiationForm"
				}),
				formSubmit(e){
					this.registration(this.form).then(res => {
						if(res.data.status === 200){
							this.$router.push("/login");
						}else {
							this.errorValiationForm({
								type: "registration",
								data: res.data.errors
							});
						}
					})
				},
			}
    }
</script>

<style lang="scss">
    .registration{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        &__form-title{
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ffffff;
            text-align: center;
            color: #ffffff;
        }
        &__form{
            width: 400px;
            padding: 20px;
            background-color: darkolivegreen;
        }
        &__wpapper-name{
            display: flex;
            position: relative;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        &__wpapper-field{
            display: block;
            position: relative;
        }
        &__error{
						display: inline-block;
						width: 100%;
						font-size: 12px;
            color: red;
        }

        &__wpapper-auth{
            margin-bottom: 10px;
        }
        &__field{
            width: 100%;
            padding: 10px 5px;
            border: 1px solid transparent;
            color: darkolivegreen;
            outline: transparent;
        }
        &__wrapper-field{
            position: relative;
        }
        &__wrapper-visible-icon{
            display: flex;
            align-items: center;
            position: absolute;
						top: 50%;
						right: 0;
						padding: 0 10px;
						color: #000000;
						cursor: pointer;
						transform: translateY(-50%);
        }
        &__label{
            display: inline-block;
            position: relative;
            width: 100%;
            text-align: left;
            color: #ffffff;
            margin-bottom: 5px;
        }
        &__label:last-child{
            margin-bottom: 0;
        }
        &__label-name{
            width: 50%;
            padding-right: 5px;
        }
        &__label-surname{
            width: 50%;
            padding-left: 5px;
        }
        &__submit{
            padding: 10px 30px;
        }
    }
</style>
