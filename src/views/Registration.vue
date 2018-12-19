<template>
    <div class="registration">
        <form class="registration__form" ref="form-registration">
            <div class="registration__form-title">
                Форма регистрации
            </div>
            <div class="registration__error-massege" v-if="errorsForm.length > 0">
                Проверьте форму возможно вы где-то ошиблись
            </div>
            <div class="registration__wpapper-name">
                <label class="registration__label-name registration__label">
                    Имя
                    <input class="registration__field-name registration__field"
                           v-model="form.name"
                           type="text"
                           name="name">
                </label>
                <label class="registration__label-surname registration__label">
                    Фамилия
                    <input class="registration__field-surname registration__field"
                           v-model="form.surname"
                           type="text"
                           name="surname">
                </label>
            </div>
            <div class="registration__wpapper-auth">
                <label class="registration__label-email registration__label">
                    email
                    <input class="registration__field-email registration__field js-registration-error"
                           v-model="form.email"
                           type="email"
                           name="email"
                           required>
                </label>
                <label class="registration__label-password registration__label">
                    Пароль
                    <div class="registration__wrapper-field">
                        <input class="registration__field-password registration__field js-registration-error"
                               v-model="form.password"
                               :type="(!visiblePass)? 'password': 'text'"
                               name="password"
                               required>
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
                    <input class="registration__field-password registration__field js-registration-error"
                           v-model="form.repeatPassword"
                           :type="(!visiblePass)? 'password': 'text'"
                           name="repeatPassword">

                </label>
            </div>

            <input class="registration__submit"
                   type="submit"
                   value="Регистрироваться"
                   @click.prevent="registration()">
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Registration",
        state:{
            error: 'qwdwqdqwd'
        },
        data() {
          return {
              visiblePass: false,
              form: {},
              errorsForm: []
          }
        },
        methods: {
            registration: async function () {
                this.errorsForm = [];

                let email = this.form.email;

                if (email === undefined || email === "") {
                    this.errorsForm.push({
                        name: "email",
                        massege: `
                            Поле E-mail нужно для того что бы
                            войти в акант и для уведомлений на почту
                        `
                    })
                }else{
                    let regExp = new RegExp(".*[@][a-z]+[.][a-z]+");

                    if(!regExp.test(email)){
                        this.errorsForm.push({
                            name: "email",
                            massege: `
                               E-mail должен быть: exemple@mail.com
                            `
                        })
                    }
                }

                let pass = this.form.password;

                if (pass === undefined || pass === "") {
                    this.errorsForm.push({
                        name: "password",
                        massege: "Пароль нужен дя беопасности"
                    });
                }

                if(pass === undefined || pass.length < 4){
                    let num = (pass !== undefined)?pass.length: 0;
                    this.errorsForm.push({
                        name: "password",
                        massege: `Минимальное кол-во символов 4 а увас ${num}`
                    });
                }

                let repeatPass = this.form.repeatPassword;

                if (repeatPass === undefined || repeatPass === "") {
                    this.errorsForm.push({
                        name: "repeatPassword",
                        massege: `Нужно заполнить это поле`
                    });
                }


                for (let val of document.querySelectorAll(".js-registration-error")) {
                    val.classList.remove("registration__error")
                }

                for (let val of document.querySelectorAll(".js-reg-error-massege")) {
                    val.remove();
                }

                if (this.form.password === this.form.repeatPassword
                    && this.errorsForm.length === 0) {
                        axios.post('http://localhost:3000/api/registration' , this.form, {
                            "Access-Control-Allow-Origin": "*"
                        })
                        .then((response) => {
                            if (!response.data.error){
                                this.$router.push({
                                    name: "login"
                                });
                            }else{
                                this.errorsForm.push({
                                    name: "email",
                                    massege: "Email уже существует"
                                });
                            }
                        })
                        .catch((e) => {
                            console.log(e)
                        });
                } else {
                    this.errorsForm.push({
                        name: "repeatPassword",
                        massege: "Вы вели не верный пароль"
                    });
                }

                let formReg = this.$refs["form-registration"];

                for (let val of this.errorsForm) {
                    let formRegElem = formReg.elements[val.name];
                    let div = document.createElement("div");

                    div.className = "registration__error-massege-field js-reg-error-massege";
                    div.innerHTML = val.massege;
                    formRegElem.classList.add('registration__error');
                    formRegElem.parentElement.appendChild(div);
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
        &__error-massege{
            position: relative;
            padding: 5px 15px;
            margin-bottom: 10px;
            background-color: brown;
            color: #ffffff;
            font-size: 14px;
            text-align: center;
            animation: slideInDown 1s forwards;

            &-field{
                position: relative;
                padding: 2.5px 10px;
                background-color: brown;
                font-size: 12px;
            }
            &-field:before{
                content: "";
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #ffffff;
            }
        }
        &__error-massege:after{
            content: "";
            display: inline-block;
            position: absolute;
            left: 50%;
            bottom: -10px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid brown;
        }
        &__error{
            border: 2px solid brown;
            border-radius: 2px;
        }
    }
</style>
