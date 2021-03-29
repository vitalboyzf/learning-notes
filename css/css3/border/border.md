 ```css
            border-top-right-radius: 100px 100px;
            /*上右水平 上右垂直*/ 
            border-radius:10px 10px 10px 10px/20px 20px 20px 20px;
            /*上左水平 上右水平 下右水平 下左水平/上左垂直 上右垂直 下右垂直 下左垂直*/
            border-radius: 10px 40px;
            /*上左下右 上右下左*/
            border-radius: 10px 20px 30px;
            /*上左 上右下左 下右*/
 ```
 ```css
   box-shadow:[inset] x y blur d color;
   /*
   会生成和原图相同大小的阴影在原图的下面，阴影在祖先背景的上面，在文字的下面
   a:阴影水平偏移量
   b:阴影垂直偏移量
   blur:阴影基于原来的位置向两边模糊的模糊程度（扩散）
   d:阴影向四个方向同时改变（增加/减少）d像素的大小
   color:阴影颜色
   */
 ```
   
   ***inset 内阴影:注意d的值负数为扩大，正数为缩小***

