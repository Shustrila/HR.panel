# HR.panel
## install project
```
npm run bulde
npm run serve:up
```
## API docs

## Users

``
POST
``

/api/v1/user/registration

Body 

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| name | String | Имя (до 16 символов) |
| surname | String | Отчество (до 16 символов) |
| email | String | Email (до 45 символов уникальный)  |
| pasword | String | Пароль (до 60 символов) |

Meta

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| error | Boolean | Состояние ошибки | 
| status | Number | Статус ответа | 
| massege | String | Описание ответа | 

##

``
POST
``

/api/v1/user/login

Body

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| email | String | Email пользователя |
| password | String | Пароль пользователя |

Meta

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| error | Boolean | Состояние ошибки | 
| status | Number | Статус ответа | 
| nameField | String | Поле ошибки | 
| token | String | токен для входа |
| massege | String | Описание ответа | 
##

``
GET
``

/api/v1/user/:token

Param

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| Token | String | токен предоваемый в URI как :token |

Respons 

| Название| Тип | Описание | 
| :---: | :---: | :--- |
| name | String | Имя |
| surname | String | Фамилия |
| email | String | Email |
##
