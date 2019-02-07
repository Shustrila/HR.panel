<template lang="html">

    <div class="user-list user-list--hidden js-user-list">
        <div class="user-list__label">Пользователей онлайн: {{ users.length }}</div>

        <input type="search" name="search" v-model="searchUsers" v-if="users.length > 0">

        <ul class="user-list__list" v-if="filterUsers">
            <users-item v-for="user in filterUsers"
                        :email="user.email"
                        :name="user.name"
                        :key="user['user_id']" />
        </ul>

        <div class="user-list__info" v-if="users.length === 0">
            Нет пользователей <br>
            Онлайн
        </div>

    </div>

</template>

<script lang="js">
    import { mapAction } from "vuex"
    import Cookies from 'js-cookie';
    import axios from "axios";
    import io from "socket.io-client";

    export default {
        name: "UserList",
        data () {
            return{
                searchUsers : ""
            }
        },
        computed: {
            users () {
              return this.$store.getters.users;
            },
            filterUsers: function () {
                let search = this.searchUsers;
                let users = this.users;
                let arr = [];

                if (search !== "") {
                    for (let user of users) {
                        let regexp = new RegExp("^(" + search + ")+", "i");

                        if (regexp.test(user.name)) {
                            arr.push(user);
                        }
                    }

                    return arr;
                }

                return this.users;
            }
        },
        mounted () {
            let authKey = Cookies.get("auth_key");

            if(authKey !== undefined){
                this.$store.dispatch("getUsers");
            }
        },
        components: {
            UsersItem: () => import("./UsersItem")
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
