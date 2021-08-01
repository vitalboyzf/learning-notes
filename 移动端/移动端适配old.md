### ppi表示每英寸的像素点数 计算公式为：屏幕对角线像素点数/英寸大小
 - ppi越大，屏幕更清晰，ppi超过400，人的眼睛无法分辨
### dpr表示物理像素/css像素 表示一个css像素表示几个物理像素，一般超过2人眼很难捕捉差异
### viewport 视口，通过meta标签设置
 1. 未设置：
  - 大多数屏幕默认980
  - 用window.innerWidth获取视口宽度，window.screen.width获取屏幕宽度
 2. 设置content视口里的相关设置
  - width:视口的宽度，值为一个数字，或者字符串***device-width***（设备实际宽度）
  - initial-scale 页面初识缩放值，值为数字
  - minimum-scale 页面最小缩放的比例，值为数字
  - maximum-scale 页面最大缩放的比例，值为数字
  - user-scalable 值为yes,no， 用户或者浏览器是否允许缩放
3. 缩放比=css像素/viewport宽度 => viewport宽度=css像素/缩放比
### meta标签
  - <meta name="format-detection" content="telephone=no,email=no">禁止识别电话和邮箱
  - <meta name="app-mobile-web-app-title" content="标题">添加到主屏的标题（ios)
  - <link rel="apple-touch-icon-precomposed" href="图片路径">桌面上的logo
   		**手机中打开电脑的页面，一定要保证手机与电脑在同一wifi下**
			禁止识别电话与邮箱(但是邮箱没效果)
			<meta name="format-detection" content="telephone=no,email=no" />

			设置添加到主屏后的标题(ios)
			<meta name="apple-mobile-web-app-title" content="标题">

			添加到主屏幕后，全屏显示，删除苹果默认的工具栏和菜单栏（无用）
			<meta name="apple-mobile-web-app-capable" content="yes" />

			放在桌面上的logo
			<link rel="apple-touch-icon-precomposed" href="iphone_logo.png" />

			启动时候的画面（无用）
			<link rel="apple-touch-startup-image" href="logo_startup.png" />
			
			设置x5内核浏览器只能竖屏浏览（只有UC有效）
			<meta name="x5-orientation" content="portrait" />
			
			设置x5内核浏览器全屏浏览
			<meta name="x5-fullscreen" content="true" />
			
			设置UC浏览器只能竖屏浏览
			<meta name="screen-orientation" content="portrait">
			
			设置UC浏览器全屏浏览
			<meta name="full-screen" content="yes">
			如果想屏蔽所有浏览器的横屏的话，需要在后面陀螺仪那章节讲

			windows => ipconfig 找ipv4地址
			mac	=>  ifconfig 
### 样式重置
 - -webkit-user-select:none 禁止用户选中文字
 - -webkit-touch-callout 禁止长按出菜单
 - -webkit-tap-highlight-color:rgba(0,0,0,0) 去掉a,button,input默认样式
 - -webkit-text-size-adjust:100% 切换横竖屏
 - -webkit-appearance:none border-radius:0
 - ::-webkit-input-placeholder
### 适配
 - 适配：在不同尺寸的手机设备上，页面相对性的达到合理的展示（自适应）或者保持统一效果的等比缩放（看起来差不多）
        - 适配的元素：
					1、字体
					2、宽高
					3、间距
					4、图像（图标、图片）	
				
		- 适配的方法：
					1、百分比适配
					2、viewport缩放
					3、DPR缩放
					4、rem适配
					5、vw、vh适配
 ### 适配计算函数
 ```js
(function(dos,win,designWidth){
    const html = dos.document.documentElement;
     const refresRem = ()=>{
     const clientWidth = html.clientWidth
     if(clientWidth>designWidth){
         html.style.fontSize = 100 + "px"
     }else{
         html.style.fontSize = 100*(clientWidth/designWidth) + "px";
     }
 }
})()
 ```                   
 ### 媒体查询 @media (@主要有 @import @charset @font-face @keyframes @media)
  - 媒体特性：min-width(max-width)最小最大宽度
  - @media  (orientation: landscape) landscape（宽度大于高度->横屏）
  - @media  (orientation: landscape) portrait（宽度小于高度->竖屏）
  - @media (aspect-ratio:4/3) 宽高比为4/3
  - -webkit-device-pixel-ratio 像素比（webkit内核独有）
 