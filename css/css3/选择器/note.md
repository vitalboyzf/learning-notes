# 高级选择器
### 关系选择器
1. e + f 选择e的下一个兄弟元素
2. e ~ f 选择所有e的兄弟元素
### 伪元素选择器
1. ::placeholder 
2. ::selection （color background-color text-shadow）
3. ::before
4. ::after
### 属性选择器
1. [attr~=val] 属性值有一个独立val attr="val a b"
2. [attr|=val] 属性值第一个单词有一个val-    attr="val-xxx"
3. [attr^=val] 属性值第一个单词以val开头
4. [attr$=val] 属性值第一个单词以val结尾
5. [attr*=val] 属性值中包含val
### 伪类选择器 被选择元素的状态
1. 元素:not(选择器) 除了选择器选中的元素
2. :root 跟标签选择器，在html中，等同于html标签
3. :target 被锚点标记的元素 (loaction.hash = 元素的id的元素 )
4. 考虑其他元素的影响
 - 元素:last-child 元素作为他父级的最后一个元素
 - 元素:first-child 元素作为他父级的第一个元素
 - 元素:only-child 元素是独生子，没有兄弟节点
 - 元素:nth-child(作为第几个子元素)

5. 不考虑其他元素的影响 n从0开始
  - 元素:first-of-type 这个类型的第一个元素
  - 元素:last-of-type 这个类型的最后一个元素
  - ***元素:nth-of-type(第几个元素)***
  - 元素:nth-of-last-type(第几个元素) 倒数
  - 元素:only-of-type 父元素只有一个他的类型
6. 元素:empty 元素没有子节点的（注释不算节点）
7. 元素:checked input[type=checkbox||type=radio]元素选中状态
8. input:enable不可输入状态 input:disable可输入状态
9. input:read-only input:read-write
10. a元素专用 link（超链接未访问时的状态） visited（超链接访问后的状态）
11. 元素:hover 鼠标悬停转态 
12. active 激活状态，鼠标按下状态

