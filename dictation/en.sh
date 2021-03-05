voices=(Alex Fred Samantha Victoria Karen Fiona Daniel)
this_time_voice=Alex
greeting="Hi, this is "
will_be_start="Dictation will be start, please listen careflly"
over="The dictation is over, good_bye"

function say_message() {
  say -v $this_time_voice -r 130 $1
  #echo $1
}
