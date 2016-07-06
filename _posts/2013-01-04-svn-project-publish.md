---
layout: post
title:  "[SVN] 项目部署脚本"
categories: [git, linux]
---

以下为一个SVN项目发布脚本，主要涉及的命令有`svn`, `rsync`，另外需要一个邮件发送脚本

```
#!/bin/sh

#vars for project
dest_path='/web/xxx_project/wwwroot/'
target_svn='svn://xxx_project/truck'
target_path='./publish_folder/trunk/'

#vars for mail
mail_title='这是一个邮件的标题'
mail_from='xxx'
mail_smtp='xxx'
mail_username='xxx'
mail_password='xxx'

#svn checkout || up
if [ ! -d $target_path ]
  then
  svn checkout $target_svn $target_path 2>&1 | tee /tmp/svn.log
else
  cd $target_path
  svn up 2>&1 | tee /tmp/svn.log
  cd -
fi

#update config for online
/bin/cp -f $target_path'xxx_online.php' $target_path'xxx.php'

#rsync
rsync -auv --stats --progress --exclude-from 'publish_exclude' $target_path $dest_path

#sending publish mail to security group
echo '-------------------------------- Mail --------------------------------'
sed -i '/Skipped/d' /tmp/svn.log
sed -i '/Summary/d' /tmp/svn.log
echo "本次发布信息：`date` 环境：http://xxx.com" > /tmp/mail_tmp.log
echo "线上环境变更情况:" >> /tmp/mail_tmp.log
cat /tmp/svn.log >> /tmp/mail_tmp.log

for i in a@mail.com a@mail.com
do
./sendEmail -f $mail_from -t $i -s $mail_smtp -xu $mail_username -xp $mail_password -u $mail_title -m "`cat /tmp/mail_tmp.log`"
done

echo "ok"
```

其中

* `publish_folder`为存放本地的SVN代码的目录；
* `publish_exclude`为rsync过滤的文件或文件夹列表；
* 另该脚本不涉及代码回滚，可以在每次版本发布后将上一个版本打一个Tag用于回滚；
