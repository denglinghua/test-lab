#!/bin/sh

script_file="$1"
repeat_times=${2:-1}
shuffle=${3:-"y"}
pause_time=15 #15 seconds
voices=(Alex Fred Samantha Victoria Karen Fiona Daniel)
this_time_voice=Alex

function set_voice() {
  let random_voice=$RANDOM%${#voices[*]}
  #echo $random_voice
  this_time_voice=${voices[$random_voice]}
}

function say_message() {
  say -v $this_time_voice -r 160 $1
  #echo $1
}

function print_args() {
  echo "file  : $script_file"
  echo "repeat: $repeat_times"
  echo "shuffle: $shuffle"
  echo "voice : $this_time_voice"
}

set_voice
print_args
say_message "Hi, this is $this_time_voice"
sleep 1
say_message "Dictation will be start, please listen careflly"
sleep 2

title="$(head -n 1 $script_file)";
say_message "$title"

body=""
if [[ "$shuffle" == "y" ]]; then
  body="$(tail -n +2 $script_file | sort -R)"
else
  body="$(tail -n +2 $script_file)"
fi

IFS=$'\n'
lines=($body)

for line in "${lines[@]}"
do
  for((i=1;i<=$repeat_times;i++))
  do
    say_message "$line"
    sleep $pause_time
  done
done

say_message "The dictation is over, good_bye"
