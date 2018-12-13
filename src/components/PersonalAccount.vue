<template>
    <div class="personal-account">
        <div class="personal-account__wrapper">
            <div class="personal-account__header">
                Личный кабинет
            </div>
            <div class="personal-account__body">
                <div class="personal-account__b-card">
                    <div class="personal-account__b-card-img"></div>
                    <div class="personal-account__b-card-name">
                        {{`${login.name} ${login.surname}`}}
                    </div>
                </div>
                <label class="personal-account__b-label">
                    Имя
                    <input type="text" name="name" :placeholder="login.name">
                </label>
                <label class="personal-account__b-label">
                    Фамилия
                    <input type="text" name="surname" :placeholder="login.surname">
                </label>
                <label class="personal-account__b-label">
                    E-mail
                    <input type="email" name="email" :placeholder="login.email">
                </label>
            </div>
            <div class="personal-account__footer">
                <button class="personal-account__save personal-account__footer-button">
                    Сохранить
                </button>
                <button class="personal-account__close personal-account__footer-button"
                        @click.prevent="closePersonalAccount()">
                    Выйти
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalAccount",
        data () {
            return {
                login: this.$store.state.userLogin
            }
        },
        methods: {
            closePersonalAccount () {
                this.$store.commit("personalAccount", this.login = !this.login)
            }
        }
    }
</script>

<style lang="scss">
    .personal-account{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.5);
        z-index: 1;
        overflow: auto;

        &__wrapper{
            display: inline-block;
            padding: 20px;
            min-width: 350px;
            background-color: #fff;
        }
        &__header{
            border-bottom: 1px solid #ddd;
        }
        &__body{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0;
        }
        &__footer{
            display: flex;
            justify-content: flex-end;
            padding-top: 5px;
            border-top: 1px solid #ddd;

            &-button{
                display: inline-block;
                margin-right: 10px;
                padding: 10px 20px;
                border: 0;
                color: #ffffff;
            }
            &-button:last-child{
                margin-right: 0;
            }
        }
        &__b-card{
            flex-basis: 100%;
            max-width: 100%;

            &-img{
                width: 150px;
                height: 150px;
                margin:0 auto 20px;
                border-radius: 50%;
                background-color: #ddd;
            }
            &-name{
                margin-bottom: 30px;
            }
        }
        &__b-label{
            flex-basis: 100%;
            max-width: 100%;
            margin-bottom: 15px;
        }
        &__b-label:last-child{
            margin-bottom: 0;
        }
        &__save{
            background-color: forestgreen;
        }
        &__close{
            background-color: brown;
        }
    }
</style>
