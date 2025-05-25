---
subtitle: 
tags: 
date created: 2025-05-25T01:06
date modified: 2025-05-25T01:28
---
  
1. Генерируем ssh ключ  
	```no-highlight  
	ssh-keygen  
	```  
  
	Получим сообщение вида:  
	  
	```no-highlight  
	Generating public/private rsa key pair.  
	Enter file in which to save the key (/Users/mikhail/.ssh/id_rsa):  
	```  
  
	По умолчанию, предлагается название `id_rsa` - согласимся с предложением, нажав Enter. Будет создана директория `.ssh`, а также предложено ввести дополнительно **passphrase** для дополнительной защиты самой пары ключей.  
	  
	```no-highlight  
	Created directory '/Users/mikhail/.ssh'.  
	Enter passphrase (empty for no passphrase):   
	```  
  
	Можно ничего не вводить, а просто два раза нажать Enter.  
  
	```no-highlight  
	Enter passphrase (empty for no passphrase):   
	Enter same passphrase again:   
	Your identification has been saved in /Users/mikhail/.ssh/id_rsa.  
	Your public key has been saved in /Users/mikhail/.ssh/id_rsa.pub.  
	The key fingerprint is:  
	SHA256:+f49gd7YeKew0IE2TFGptjMafiXMY1OIHD/m2S5FaSQ mikhail@Air-Mihail  
	The key's randomart image is:  
	+---[RSA 3072]----+  
	|          ....   |  
	|        . E.o    |  
	|       . +.= .   |  
	|        o+B.=    |  
	|        S*=O..   |  
	|        .o&o=..  |  
	|       . +o@o= . |  
	|        o.o.=+= .|  
	|         ..oo.o+ |  
	+----[SHA256]-----+  
	```  
  
	Была сгенерирована пара ключей. Закрытый хранится в файле `id_rsa`, а открытый в файле `id_rsa.pub`.  В гитхаб требудется именно ОТКРЫТЫЙ  
  
2. Отрываем файл с публичным ключом и копируем его содержимое  
	```no-highlight  
	cat <путь_к_файлу_с_публичным_ключом>  
	```  
  
3. Идем на GitHub в свой профиль и переходим в настройки (**Settings**).  
  
	![](https://ucarecdn.com/49d10e3c-8981-472b-b625-59c278cc1a56/-/preview/-/enhance/88/)  
  
4. На открывшейся странице нужно найти пункт **SSH и GPG keys**. Нажимаем на него.  
  
	![](https://ucarecdn.com/717459b1-481a-41a6-8ee7-fbf7367e3bf1/-/preview/-/enhance/85/)  
  
5. Нажимаем на кнопку **New SSH key**, дать название ключу и в специальное поле **key** вставить содержимое буфера обмена.  
  
	![](https://ucarecdn.com/f9a5c2c2-220c-458b-a4f6-66279e30e166/-/preview/-/enhance/81/)  
	  
	![](https://ucarecdn.com/60d962ce-4f67-4a8f-a260-69e273278293/-/preview/-/enhance/75/)  
	  
	> [!note]- title, key type  
	> Поле **Title** заполняется только для того, чтобы вы сами могли различать какие ключи с каким компьютером используются. Можете назвать как угодно. **Key type** оставляем в позиции **Authentication Key**, потому что пока нам нужен именно доступ к репозиториям (**Signing Key** нужен для защиты ваших коммитов, поэтому пока его заполнять не будем).   
6. Нажимаем на **Add SSH key**. GitHub попросит ввести пароль от аккаунта.  
  
	![](https://ucarecdn.com/691a871b-d333-456a-8885-3e22159abad7/-/preview/-/enhance/78/)  
	  
	Вводим пароль и теперь в списке SSH ключей есть новый ключ.  
	  
	![](https://ucarecdn.com/44ec2613-a4ab-47e2-b8cb-5a4ff0320401/-/preview/-/enhance/88/)  
  
> [!faq] Permission denied (publickey)?  
> Попробуйте воспользоваться командой ssh-add или ssh-add <путь до приватного ключа>, если путь к нему не стандартный