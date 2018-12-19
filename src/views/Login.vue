<template>
    <div class="login">
        <form class="login__form" ref="login-form">
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
                   @click.prevent="loginForm()">
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
              form: {}
          }
        },
        methods: {
            loginForm () {
                axios.post('http://localhost:3000/api/login', this.form, {
                    "Access-Control-Allow-Origin": "*"
                })
                .then((response) => {
                    console.log(response.data);
                    Cookies("outh_key", response.data.token)
                })
                .catch((e) => {
                    console.log(e)
                })
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
