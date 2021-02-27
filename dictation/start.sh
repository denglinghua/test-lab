#!/bin/sh
cd /Users/deng/Desktop/education/dictation/
echo
echo
echo
read -p 'dictation file:' file
read -p 'repeat times:' repeat_times

if [[ "$file" =~ ^c.* ]]; then
    sh ./dc.sh $file $repeat_times
else
  sh ./d.sh $file $repeat_times
fi
