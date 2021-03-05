#!/bin/sh

lang="$1"
script_file="$2"
repeat_times=${3:-1}
shuffle=${4:-"y"}
pause_time=15 #15 seconds

source $lang.sh

function set_voice() {
  let random_voice=$RANDOM%${#voices[*]}
  #echo $random_voice
  this_time_voice=${voices[$random_voice]}
}

function print_args() {
  echo "file  : $script_file"
  echo "repeat: $repeat_times"
  echo "shuffle: $shuffle"
  echo "voice : $this_time_voice"
  echo "Language : $lang"
}

set_voice
print_args
say_message "$greeting$this_time_voice"
sleep 1
say_message "$will_be_start"
sleep 2

title="$(head -n 1 $script_file)";
say_message "$title"
sleep 3

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

say_message "$over"
