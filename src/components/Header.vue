<template>
    <header class="header">
        <div class="header__overlay" v-if="$store.state.personalAccount"></div>
        <div class="header__panel">
            <ul class="header__menu">
                <li class="header__menu-item">
                    <router-link class="header__menu-link" to="/">
                        Главная
                    </router-link>
                </li>
                <li class="header__menu-item" v-if="userLogin !== null">
                    <router-link class="header__menu-link" to="/panel">
                        Панель
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="header__auth"  v-if="Object.keys(userLogin).length === 0">
            <router-link class="header__auth-login header__auth-link" to="/login">
                Вход
            </router-link>
            <span class="header__auth-line">|</span>
            <router-link class="header__auth-reg header__auth-link" to="/registration">
                Регистрация
            </router-link>
        </div>
        <div class="header__user" v-if="Object.keys(userLogin).length !== 0"  @click.prevent="personalAccountActive()">
            <div class="header__user-img"></div>
            <a class="header__user-name">
                {{userLogin.name+" "+userLogin.surname}}
            </a>
        </div>
        <div class="header__user-list" @click="activeMenu()">
            <font-awesome-icon icon="ellipsis-v" />
        </div>
    </header>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import Cookies from 'js-cookie';

export default {
    name: "Header",
    computed: {
        ...mapGetters({
            userLogin: "auth/userLogin"
        })
    },
    methods: {
        ...mapActions({
            user : "auth/user"
        }),
        activeMenu(){
            document.querySelector('.js-user-list')
                    .classList
                    .toggle('user-list--hidden');
        },
        personalAccountActive(){
            this.$store.commit("setPersonalAccount", true)
        }
    },
    mounted(){
        let token = Cookies.get("auth_key");
        let refreshToken = Cookies.get("refresh_key");

        if (refreshToken && token) {
            this.user();
        }

    }
}
</script>

<style lang="scss">
    .header{
        display: flex;
        position: relative;
        flex-wrap: wrap;
        padding: 15px;
        background-color: darkolivegreen;

        &__panel{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            flex-grow: 1;
            text-align: left;
        }
        &__auth{
            color: #ffffff;
            &-link{
                color: #ffffff;
                text-decoration: none;
                font-size: 20px;
            }
            &-login{

            }

            &-line{
                margin: 0 5px;
            }
            &-reg{


            }
        }
        &__user-list{
            display: flex;
            align-items: center;
            margin-left: 10px;
            padding: 0 10px;
            font-size: 25px;
            color: #ffffff;
            cursor: pointer;
            z-index: 2;
        }
        &__user-list:hover{
            transform: scale(1.2);
        }
        &__user-list:active{
            transform: scale(0.98);
        }
        &__menu{
            display: inline-block;

            &-item:first-child{
                padding-left: 0;
            }
            &-item{
                display: inline-block;
                position: relative;
                color: #ffffff;
                padding: 0 10px;
                list-style: none;
            }
            &-item:after{
                content: '|';
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(50%);

            }
            &-item:last-child:after{
                padding-right: 0;
                content: none;
            }
            &-link{
                padding: 5px 0;
                border-bottom: 1px solid transparent;
                color: #ffffff;
                text-decoration: none;
                text-transform: uppercase;
                transition: 0.2s;
            }
            &-link:hover{
                border-bottom: 1px solid #ffffff;
            }
        }
        &__user{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            cursor: pointer;

            &-img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
                background-color: #dddddd;

            }
            &-name{
                color: #ffffff;
            }
        }
        &__overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            cursor: not-allowed;
        }
    }
</style>
