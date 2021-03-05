#!/bin/sh
cd $(dirname "$0")
echo
echo
echo
read -p 'dictation file:' file
read -p 'repeat times:' repeat_times
read -p 'shuffle(y/n):' shuffle

repeat_times=${repeat_times:-1}
shuffle=${shuffle:-y}

lang="en"
if [[ "$file" =~ ^c.* ]]; then
    lang="zh"
else
    lang="en"
fi

sh ./d.sh $lang $file $repeat_times $shuffle
