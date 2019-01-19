<template>
    <div class="login">
        <form class="login__form" ref="login-form">
            <div class="login__error-message" v-if="errorForm.state">
                <p>{{ errorForm.massege }}</p>
            </div>
            <label class="login__label-email login__label">
                E-mail
                <input class="login__field-email login__field"
                       v-model="form.email"
                       type="email"
                       name="email">
            </label>
            <label class="login__label-password login__label">
                Пароль
                <span class="login__wrapper-field">
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
            <input class="login__submit"
                   type="submit"
                   @click.prevent="loginForm"
                   value="Вход">
        </form>
    </div>
</template>

<script>
    import axios from "axios"
    import Cookies from 'js-cookie';

    export default {
        name: "Login",
        data () {
          return {
              visiblePass: false,
              form: {},
              errorForm: {
                  state: false,
                  massege: null
              }
          }
        },
        methods: {
            loginForm () {
                axios.post('http://localhost:3000/api/v1/user/login', this.form, {
                    "Access-Control-Allow-Origin": "*"
                }).then((response) => {
                    let data = response.data;

                    if(data.token !== undefined && data.refreshToken !== undefined) {
                        Cookies("outh_key", data.token);
                        Cookies("refresh_key",data.refreshToken);

                        this.$store.dispatch("login", {
                            token: Cookies.get("outh_key"),
                            refreshToken: Cookies.get("refresh_key")
                        });

                        this.$router.push({
                            name: "home"
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
            position: relative;
        }

        &__wrapper-visible-icon{
            display: flex;
            align-items: center;
            position: absolute;
            top: 11.5px;
            right: 0;
            height: (16px + 20);
            padding: 0 10px;
            color: #000000;
            border: 0;
            transform: translateY(-50%);
            z-index: 2;
            cursor: pointer;
        }

        &__wrapper-visible-icon:hover{
            color: darkolivegreen;
        }
    }
</style>
