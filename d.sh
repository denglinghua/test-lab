#!/bin/sh

script_file="$1"
pause_time=5 #5 seconds
voices=(Alex Fred Samantha Victoria Karen Fiona)
this_time_voice=Alex

function set_voice() {
  let random_voice=$RANDOM%${#voices[*]}
  #echo $random_voice
  this_time_voice=${voices[$random_voice]}
}

function say_message() {
  say -v $this_time_voice $1
}

set_voice
say_message "this is $this_time_voice"
sleep 1
say_message "Dictation will be start, please listen careflly"
sleep 2

while IFS= read -r line; do
    say_message "$line"
    sleep $pause_time
done < $script_file

say_message "The dictation is over, good_bye"
