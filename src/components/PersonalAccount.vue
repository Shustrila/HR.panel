<template>
    <div class="personal-account">
        <div class="personal-account__wrapper">
            <div class="personal-account__header">
                Личный кабинет
            </div>
            <div class="personal-account__body">

            </div>
            <div class="personal-account__footer">
                <button class="personal-account__save personal-account__footer-button">
                    Сохранить
                </button>
                <button class="personal-account__close personal-account__footer-button">
                    Выйти
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalAccount"
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
            min-width: 450px;
            background-color: #fff;
        }
        &__header{
            border-bottom: 1px solid #ddd;
        }
        &__body{
            margin: 10px 0;
        }
        &__footer{
            display: flex;
            justify-content: end;
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
        &__save{
            background-color: forestgreen;
        }
        &__close{
            background-color: brown;
        }
    }
</style>
