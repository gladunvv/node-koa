# Node Koa
Разработка серверной части приложения на Koa.

## О проекте:

Проект состоит из трех страниц:    
+ index.html
+ login.html
+ admin.html

На странице index.html - POST запрос url = '/'     
Отправляется на сервер поля
```
    {
      name - 'Имя отправителя',
      email - 'Email пользователя',
      message - 'Сообщение от пользователя'
    }
```

На странице login.html - POST запрос url = '/login'      
Отправляет на сервер поля
```
    {
      email - 'Email пользователя',
      password - 'Пароль пользователя'
    }

```
На странице admin.html       
POST запрос url = '/admin/upload'     

Отправляется FormData объект на сервер с картинкой товара и описанием
```
    в поле photo - Картинка товара
    в поле name - Название товара
    в поле price - Цена товара
```

POST запрос url = '/admin/skills'      

Отправляется поля на сервер с значением скиллов
```
    в поле age - Возраст
    в поле concerts - Концертов
    в поле cities - Число городов
    в поле years - Лет на сцене

```
