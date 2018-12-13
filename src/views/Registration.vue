<template>
    <div class="registration">
        <form class="registration__form" ref="registration-form">
            <div class="registration__form-title">
                Форма регистрации
            </div>
            <div class="registration__wpapper-name">
                <label class="registration__label-name registration__label">
                    Имя
                    <input class="registration__field-name registration__field" type="text" name="name">
                </label>
                <label class="registration__label-surname registration__label">
                    Фамилия
                    <input class="registration__field-surname registration__field" type="text" name="surname">
                </label>
            </div>
            <div class="registration__wpapper-auth">
                <label class="registration__label-email registration__label">
                    email
                    <input class="registration__field-email registration__field" type="email" name="email">
                </label>
                <label class="registration__label-password registration__label">
                    Пароль
                    <div class="registration__wrapper-field">
                        <input class="registration__field-password registration__field"
                               :type="(!visiblePass)? 'password': 'text'"
                               name="password">
                        <div class="registration__wrapper-visible-icon" @click="visiblePass = !visiblePass">
                            <font-awesome-icon class="login__visible-icon"
                                               icon="eye"
                                               v-if="!visiblePass"/>
                            <font-awesome-icon class="login__visible-icon"
                                               icon="eye-slash"
                                               v-if="visiblePass"/>
                        </div>
                    </div>
                </label>
                <label class="registration__label-password registration__label">
                    Повторить пароль
                    <input class="registration__field-password registration__field"
                           :type="(!visiblePass)? 'password': 'text'"
                           name="repeatPassword">

                </label>
            </div>

            <input class="registration__submit"
                   type="submit"
                   value="Регистрироваться"
                   @click.prevent="registrationUser()">
        </form>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        name: "Registration",
        data() {
          return {
              visiblePass: false,
              formError: {

              }
          }
        },
        methods: {
            registrationUser () {
                let formReg            = this.$refs['registration-form'];
                let elemForn           = formReg.elements;
                let passVerification   = elemForn.repeatPassword.value === elemForn.password.value;
                let minVal             = elemForn.password.value.length > 4;

                if(passVerification && minVal) {
                    $.ajax({
                        method: "POST",
                        url: '/api/user',
                        data: {
                            name: elemForn.name.value,
                            surname: elemForn.surname.value,
                            email: elemForn.email.value,
                            password: elemForn.password.value
                        },
                        success (data) {
                            console.log(data)
                        }
                    });
                }
            }
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
            flex-wrap: wrap;
            margin-bottom: 10px;
        }

        &__wpapper-auth{
            margin-bottom: 10px;
        }

        &__field{
            width: 100%;
            padding: 10px 5px;
            border: 2px solid #ffffff;
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
            top: 0;
            right: 0;
            height: (16px + 22px);
            padding: 0 10px;
            color: #000000;
            cursor: pointer;
        }

        &__field:focus{
            border: 2px solid darkolivegreen;
            color: #000000;
        }

        &__label{
            display: inline-block;
            width: 100%;
            text-align: left;
            color: #ffffff;
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
