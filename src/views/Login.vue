<template>
    <div class="login">
        <form class="login__form"
              id="login"
              action="http://localhost:3000/api/v1/user/login"
              @submit.prevent="loginForm">
            <label class="login__label-email login__label">
                E-mail
                <span class="login__wrapper-field">
                    <div class="login__error" v-if="validation.login.email">
											{{ validation.login.email }}
										</div>
                    <input class="login__field-email login__field"
                           v-model="form.email"
                           type="email"
                           name="email">
                </span>
            </label>
            <label class="login__label-password login__label">
                Пароль
                <span class="login__wrapper-field">
                    <div class="login__error" v-if="validation.login.password">
												{{ validation.login.password }}
										</div>
                    <input class="login__field-password login__field"
                           v-model="form.password"
                           :type="(!visiblePass)? 'password': 'text'"
                           name="password" >
                    <div class="login__wrapper-visible-icon" @click="visiblePass = !visiblePass">
                        <font-awesome-icon class="login__visible-icon"
                                           icon="eye"
                                           v-if="!visiblePass"/>
                        <font-awesome-icon class="login__visible-icon"
                                           icon="eye-slash"
                                           v-if="visiblePass"/>
                    </div>
                </span>
            </label>
            <input class="login__submit" type="submit" value="Вход">
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from "vuex";
    import Cookies from 'js-cookie';

    export default {
        name: "Login",
        data () {
          return {
              visiblePass: false,
              form: {},
          }
        },
        computed: {
            ...mapGetters({
              validation: "auth/valiationErrors"
            })
        },
        methods: {
            ...mapActions({
                login: "auth/login",
                user: "auth/user"
            }),
            ...mapMutations({
                errorValiationForm: "auth/errorValiationForm"
            }),
            loginForm () {
                this.login(this.form)
                    .then((res) => {
                        if (res.data.status === 200) {
                            Cookies.set("auth_key", res.data.token);
                            Cookies.set("refresh_key", res.data.refreshToken);

                            this.user();
                            this.$store.dispatch("getUsers");
                            this.$router.push("/")
                        } else {
                            this.errorValiationForm({
                                type: "login",
                                data: res.data.errors
                            });
                        }
                    });
            }
        }
    }
</script>

<style lang="scss">
    .login{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &__form{
            width: 300px;
            padding: 20px;
            background-color: darkolivegreen;
        }

        &__field{
            padding: 10px 5px;
            width: 100%;
            z-index: 1;
            outline: transparent;
        }

        &__label{
            display: inline-block;
            width: 100%;
            color: #ffffff;
            text-align: center;
        }

        &__label-email{
            margin-bottom: 10px;
        }

        &__label-password{
            margin-bottom: 15px;
        }

        &__wrapper-field{
            display: block;
            position: relative;
        }

        &__error{
            position: absolute;
            top: 50%;
            left: 0;
            padding: 5px 25px;
            border-radius: 5px;
            background-color: red;
            transform: translate(-107%, -50%);
        }
        &__error:after{
            content: "";
            position: inherit;
            top: 50%;
            right: 1px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-left: 10px solid red;
            border-bottom: 7px solid transparent;
            transform: translate(100%, -50%);
        }
        &__error-massege{
            display: inline-flex;
            align-items: center;
            position: relative;
            text-align: center;
            padding: 10px 20px;
            margin-bottom: 15px;
            border-radius: 5px;
            background-color: red;
            color: #fff;
        }
        &__error-massege:after{
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-left: 10px solid red;
            border-bottom: 7px solid transparent;
            transform: translate(100%, -50%);
        }

        &__wrapper-visible-icon{
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            height: (16px + 20);
            padding: 0 10px;
            color: #000000;
            border: 0;
            z-index: 2;
            cursor: pointer;
        }

        &__wrapper-visible-icon:hover{
            color: darkolivegreen;
        }
    }
</style>
