# BLOG Project

## Loyihaning maqsadi:🐦‍🔥
- Bu loyiha foydalanuvchiga ko'plab imkoniyatlar beradi: rasm qo'yish yoki post yozish

## Funksional talablar:👌
- Foydalanuvchi ro'yxatdan o'tadi
- Login qila oladi
- Rasm va shunga o'xshagan ma'lumotlar yuklay oladi

## No funksional talablar:
- Yangilasa bo'ladi
- Tezlik 
- xavfsizlik

## Databse Models:
1. user:
    - id (int),
    - name (string),
    - email (string),
    - password (string),
    - phoneNumber (string)
    - created_at (timestamp),
    - updated_at (timestamp)

2. post:
    - id (int),
    - user_id (int) ref : user
    - title (text),
    - content (string),
    - created_at (timestamp),
    - updated_at (timestamp)

3. comments.
    - id (int),
    - post_id (int),
    - user_id (int),
    - content (text),
    - created_at (timestamp)