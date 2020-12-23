#!/bin/sh

script_file="$1"
repeat_times=${2:-1}
pause_time=15 #5 seconds
voices=(Ting-Ting Mei-Jia)
this_time_voice=Ting-Ting

function set_voice() {
  let random_voice=$RANDOM%${#voices[*]}
  #echo $random_voice
  this_time_voice=${voices[$random_voice]}
}

function say_message() {
  say -v $this_time_voice $1
}

function print_args() {
  echo "file  : $script_file"
  echo "voice : $this_time_voice"
  echo "repeat: $repeat_times"
}

set_voice
print_args
say_message "Hi, 你好，我是$this_time_voice"
sleep 1
say_message "听写开始了，请听仔细了"
sleep 2

while IFS= read -r line; do
  for((i=1;i<=$repeat_times;i++))
  do
    say_message "$line"
    sleep $pause_time
  done
done < $script_file

say_message "听写结束，再见！"
