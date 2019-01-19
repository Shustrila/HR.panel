<template lang="html">
    <div class="user-list user-list--hidden js-user-list">
        <div class="user-list__label">Пользователей онлайн: {{ users.length }}</div>
        <input type="search" name="" v-model="users.email" v-if="!users">
        <ul class="user-list__list" v-if="users">
            <li class="user-list__item" v-for="user in users" :key="user.id">
                <div class="user-list__img">

                </div>
                <div class="user-list__wpapper">
                    <div class="user-list__name">
                        {{user.name}}
                    </div>
                    <div class="user-list__email">
                        {{user.email}}
                    </div>
                </div>
            </li>
        </ul>
        <div class="user-list__info" v-if="users.length == 0">
            Нет пользователей <br>
            Онлайн
        </div>
    </div>
</template>

<script lang="js">
    export default {
        name: "UserList",
        computed: {
            users () {
                return this.$store.getters.getUsersOnline
            }
        },
        mounted () {
            this.$store.dispatch("usersOnline");
        },
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
            font-size: 20px;

            &-link{
                display: block;
                color: #ddd;
            }
        }
    }
</style>
