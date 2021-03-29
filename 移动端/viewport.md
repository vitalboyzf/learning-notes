# viewport 视口，通过meta标签设置

- 未设置 

  1. 屏幕的默认宽度为980
  
  2. 用window.innerWidth获取 	
  
- 设置 
  3. 设置viewport <meta name="viewport" content="width=device-width">
   - content: 视口的相关内容
   - width: 视口的宽度 值为建议为device-width(设备的实际宽度->css像素)
   - user-scalable 设置视口是否可缩放值为yes,no (如果设置yes默认)视口缩放为0.5
   - initial-scalable=1 设置这个属性和设置width=device-width效果相同，两者取最大值
    + initial-scale有值的计算公式：缩放比=css像素/viewport宽度 => viewport宽度=css像素/缩放比
   - maximum-scale minimum-scale最大最小缩放值
*注意*当ios的position:fixed 遇到input框会出现问题
