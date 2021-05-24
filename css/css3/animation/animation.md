# animation
### 属性
- animation-name:关键帧名字;
- animation-duration:动画执行时间
- animation-timing-function:运动曲线
    + 贝塞尔曲线 cubic-bezier
    + steps (1,start) === step-start 保留下一帧状态
    + steps (1,end) === step-end 保留当前帧状态，到下一帧
- animation-delay:动画延迟执行时间;
- animation-iteration-count:动画执行次数;
- animation-direction
    + normal :正常方向;
    + reverse: 反向;
    + alternate:动画先正常运行，再反向运行，并持续交替运行;
    + alternate-reverse:动画先反向运行，再正常运行，并持续交替运行;
- animation-fill-mode
    + none : 默认
    + forwards:设置动画最终状态为动画结束时的状态
    + backwards:设置动画开始状态为第一帧状态
    + both:保持两种状态(相当于同时设置forwards和backwards)
- animation-play-state
    + running运动 | paused暂停
#### 初识默认值
- animation-name: none
- animation-duration: 0s
- animation-timing-function: ease
- animation-delay: 0s
- animation-iteration-count: 1
- animation-direction: normal
- animation-fill-mode: none
- animation-play-state: running
#### 补充
- steps 跳动变化
    + steps(跳转几次到位,end/start)  end保留当前帧状态，start保留下一帧状态