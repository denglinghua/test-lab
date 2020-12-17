#!/bin/sh
cd /Users/deng/Desktop/dictation_text/
echo
echo
echo
read -p 'dictation file:' file
read -p 'repeat times:' repeat_times
sh ./d.sh $file $repeat_times
