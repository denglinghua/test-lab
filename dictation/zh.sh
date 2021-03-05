voices=(Ting-Ting Mei-Jia)
this_time_voice=Ting-Ting
greeting="Hi, 你好，我是"
will_be_start="听写开始了，请听仔细了"
over="听写结束，再见！"

function say_message() {
  say -v $this_time_voice -r 120 $1
  #echo $1
}
