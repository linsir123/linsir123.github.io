---
layout: post
title:  "[前端] VueJS的mvvm模式体验"
categories: [default]
---

### 需求分析
-----------------------------
目标：
通过Html && js & css设计一个用户信息添加的表单（name, age, sex），以及一个展现用户信息的表格（可以删除单条信息），效果参考下图。

![vue-mvvm](/public/images/vue-mvvm.gif)

分析：
在没有使用mvvm类框架时，我们需要自己编写一机制用于管理以下过程，
基本上要通过js建造大量的html操作以及事件绑定，从代码的分层角度来看耦合度会比较高。

* 表格的初始化显示；
* 用户删除后，表格的重建；
* 表单提交成功后，表格的重建以及添加对应的用户删除事件绑定；

而使用mvvm模式实现的VueJS框架，则可以将视图和模型进行解耦，只需要将两者之间做好绑定，其它的信息同步则由框架处理。

![mvvm](/public/images/mvvm.png)


### 源码
-----------------------------

```html
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="styles/demo.css" />
    </head>

    <body>
        <div id="app">

            <fieldset>
                <legend>
                    Create New Person
                </legend>
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" v-model="newPerson.name"/>
                </div>
                <div class="form-group">
                    <label>Age:</label>
                    <input type="text" v-model="newPerson.age"/>
                </div>
                <div class="form-group">
                    <label>Sex:</label>
                    <select v-model="newPerson.sex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>
                <div class="form-group">
                    <label></label>
                    <button @click="createPerson">Create</button>
                </div>
        </fieldset>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in people">
                    <td>{{ person.name }}</td>
                    <td>{{ person.age }}</td>
                    <td>{{ person.sex }}</td>
                    <td :class="'text-center'"><button @click="deletePerson($index)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </body>
    <script src="js/vue.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                newPerson: {
                    name: '',
                    age: 0,
                    sex: 'Male'
                },
                people: [{
                    name: 'Jack',
                    age: 30,
                    sex: 'Male'
                }, {
                    name: 'Bill',
                    age: 26,
                    sex: 'Male'
                }, {
                    name: 'Tracy',
                    age: 22,
                    sex: 'Female'
                }, {
                    name: 'Chris',
                    age: 36,
                    sex: 'Male'
                }]
            },
            methods:{
                createPerson: function(){
                    this.people.push(this.newPerson);
                    // 添加完newPerson对象后，重置newPerson对象
                    this.newPerson = {name: '', age: 0, sex: 'Male'}
                },
                deletePerson: function(index){
                    // 删一个数组元素
                    this.people.splice(index,1);
                }
            }
        })
    </script>

</html>
```


### 参考
-----------------------------
* [Vue.js——60分钟快速入门](http://www.cnblogs.com/keepfool/p/5619070.html#h1_12){:target="_blank"}
