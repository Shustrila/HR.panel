<template>
    <div class="user-list user-list--hidden js-user-list">
        <div class="user-list__label">Пользователей онлайн {{ numberOfUsers }}</div>
        <ul class="user-list__list" v-if="login">
            <li class="user-list__item" v-for="user in usersList" :key="user">
                <div class="user-list__img">

                </div>
                <div class="user-list__wpapper">
                    <div class="user-list__name">
                        {{ user.name }}
                    </div>
                    <div class="user-list__email">
                        {{ user.email }}
                    </div>
                </div>
            </li>
        </ul>
        <div class="user-list__info" v-if="!login">
            Что бы видеть активных<br>
            пользовотелей нужно<br>
            <router-link to="/registration"> зарегистрироваться </router-link>
        </div>
        <div class="user-list__info" v-if="login && usersList.length  === 0">
            Нет пользователей онлайн
        </div>
    </div>
</template>
s
<script>
    export default {
        name: "UserList",
        data () {
            return {
                login:  this.$store.state.userLogin,
                usersList: this.$store.state.usersList
            }
        },
        computed: {
            numberOfUsers(){
                let usersList = this.usersList;

                if( this.usersList !== null ){
                    return usersList.length
                }else{
                    return 0
                }
            }
        }
    }
</script>

<style lang="scss">
    .user-list{
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        background-color: #333;
        box-shadow: -5px 5px 20px 0px #333333;
        transition: 0.3s;
        max-width: 600px;
        z-index: 2;

        &--hidden{
            transform: translateX(150%);
        }

        &__label{
            padding: 10px 0;
            margin: 0 10px 10px 10px;
            border-bottom:1px solid #dddddd;
            font-size: 18px;
            color: #ffffff;
        }

        &__list{
            padding: 0 10px;
            width: 100%;
        }

        &__item{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 10px;
        }
        &__item:last-child{
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
        &__info{
            color: #ffffff;
        }
    }
</style>
