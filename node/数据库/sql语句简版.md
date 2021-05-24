[TOC]
## dml
###  查看建表语句
```sql
  show create table table_name;
```
### 查看表结构
```sql
desc table_name;
```
### 查看建表语句
```SQL
show create table company;
```
###  修改表名
```sql
 alter table table_name rename to new_table_name;
```
### 修改字段类型
```sql
 alter table table_name
     modify name varchar(25)
```
### 添加一个字段
```sql
 alter table table_name
     add age int not null;
```

### 删除一个字段
```sql
 alter table table_name
     drop age;
```
### 修改一个字段名
```sql
 alter table table_name
     change name p_name varchar(10)
```
### 当更新数据的时候更新这个字段值
```sql
 alter table table_name add updateTime timestamp default  current_timestamp on update current_timestamp;
 alter table table_name modify createTime timestamp default current_timestamp
```
### 删除数据
```sql
# 删除person中所有的数据
 delete from table_name;
# 删除person中id为3这一条数据
 delete from table_name where id = 3;
```

### 更新数据
```sql
update table_name set p_name = "zf",age=19 where p_name = "zb"
```

## dql
==运行顺序 from join...on where group by  select  having order by limit==

- select * from table_name;
### 条件判断语句
```sql
select * from employee where salary > 10000;
select * from employee where salary ==19413.45;
select * from employee where salary !=19413.45;
```


### 逻辑运算语句
```sql
select * from employee where salary > 10000 and  deptId > 8;
select * from employee where salary > 10000 or  deptId > 8;
select  * from employee where salary between 10000 and 15000;#包含10000和15000
select * from employee where  location is null;
select * from employee where  location is not null;
```


### 模糊查询 %匹配任意个，_匹配到任意一个
```sql
select * from employee where name like '%涂%';
select * from employee where location like '天_';
```


### in关键字 表示取多个值其中一个即可
```sql
select * from employee where salary in (14684.16,7543,5735.77);
```
### 结果排序 asc升序排序 desc降序排序
```sql
# 先以deptId排序，如果depId相同，按照salary排序，默认为asc升序排序
select * from employee order by deptId, salary;
```
### limit关键字使用 下面两种写法效果相同
```sql
select * from employee limit 10 offset 20;
select * from employee limit 20,10;
# 分页查询公式 limit((page-1)*pageSize,pageSize)
```

###  使用case end
```sql
select name,
       location,
       case ismale when 0 then "男" else "女" end as sex
from employee;
```


### 去重
```sql
select distinct name from employee;
```

##  聚合函数
```sql
select avg(salary) as "平均薪资",
	   sum(salary) as "总薪资",
       min(salary) as "最低薪资",
       max(salary) as "最高薪资",
       count(id) as "总人数" 
       from employee;
```
- 查询目标字段个数 distinct不同的(去重)
```sql
select count(distinct name) count
from employee;
```

- 查询年龄
```sql
select name, timestampdiff(year, birthday, curdate()) as age
from employee;
```

### 分组查询
- 查询渡一每个部门的员工数量
```sql
select d.name 部门名称,count(e.name) 员工数量
from company inner join department d on company.id = d.companyId
inner join employee e on d.id = e.deptId
where company.name="渡一教育"
group by d.id,d.name;
```

- 查看一个地方的平均工资和人数
```sql
select location, avg(salary) 平均工资, count(name) 人数
from employee
group by location;
```

- 条件查询 先查询，再分组
```sql
select location, avg(salary) salaryAvg, count(name) personCount
from employee
where salary > 12000
group by location;
```

- having的使用 对分组之后的数据进行筛选
```sql
select location, avg(salary) salaryAvg, count(name) personCount
from employee
group by location
having personCount > 30;
```
###  外键
- 给表添加一个字段
```sql
alter table employee add brand_id int;
```
- 将这个字段设置为外键
```sql
alter table employee add foreign key (xxx_id) references xxx(id);
```
### 多表查询
- 建表
```sql
show databases;
create database if not exists stu;
use stu;
create table student
(
    id   int primary key auto_increment,
    name varchar(30) not null,
    age  int         not null
);
create table classes
(
    id         int primary key auto_increment,
    class_name varchar(30) not null
);
create table student_class_map
(
    class_id   int not null,
    student_id int not null,
    primary key (class_id, student_id),
    foreign key (class_id) references classes (id) on update cascade,
    foreign key (student_id) references student (id) on update cascade
);
insert into student(name, age)
values ('刘毅', 14),
       ('张辉', 16),
       ('刘鑫', 19),
       ('王明', 20);
insert into classes (class_name)
values ('语文'),
       ('数学'),
       ('英语'),
       ('物理'),
       ('化学');
insert into student_class_map(student_id, class_id)
values (1, 2),
       (1, 3),
       (2, 4),
       (3, 5),
       (4, 1);
```

- 左连接 (将左边的表全部显示出来，如果右边的表没有对应的数据，显示null)
```sql
select s.name, s.age, c.class_name
from student s
         left join student_class_map scm on s.id = scm.student_id
         left join classes c on scm.class_id = c.id;
```
- 右连接(将右边的边全部展示出来，如果左边的表没有对象数据，显示null)
```sql
from student s
         right join student_class_map scm on s.id = scm.student_id
         right join classes c on scm.class_id = c.id;
```

- 内连接查询(关联表都有数据才显示出来)
```sql
select s.name, s.age, c.class_name
from student s
         inner join student_class_map scm on s.id = scm.student_id
         inner join classes c on scm.class_id = c.id;
```
## 远程连接mysql
```sql
# 使用mysql数据库
use mysql；

# 查询用户信息
select  User,Host from user

# 123456为你给新增权限用户设置的密码，%代表所有主机，也可以具体到你的主机ip地址
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456'  

# 从mysql数据库的grant表中重新加载权限数据
flush privileges; 
```

