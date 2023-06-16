#!/bin/bash

FOLDER_INPUT="/Users/paulaceron/ALGA/dev/360-video-builder/files/input"
FOLDER_OUTPUT="/Users/paulaceron/ALGA/dev/360-video-builder/files/input"
COUNT=$(ls $FOLDER_OUTPUT/final*.mp4 | wc -l | sed 's/ //g')
LENS_ANGLE=188 # iv_fov / ih_fov
VIDEO_WIDTH=3840
VIDEO_HEIGHT="1920"
VIDEO_METATAGS="$FOLDER_INPUT/data_tags.mp4"
ORIENTATION=90 # roll=90

# VIDEO_INPUT="\"concat:$FOLDER_INPUT/1.insv|$FOLDER_INPUT/2.insv\""
VIDEO_FILES="$FOLDER_INPUT/files.txt"
echo "" > $VIDEO_FILES
# for f in $FOLDER_INPUT/*.insv; do echo "file '$FOLDER_INPUT/$f' >> $VIDEO_FILES"; done
echo "file $FOLDER_INPUT/1.insv" >> $VIDEO_FILES
echo "file $FOLDER_INPUT/2.insv" >> $VIDEO_FILES
VIDEO_INPUT="$VIDEO_FILES"

VIDEO_OUTPUT="$FOLDER_INPUT/final_$COUNT.mp4"
MERGE_MAP="$FOLDER_INPUT/mergemap.png"
FFMPEG="/Users/paulaceron/ALGA/dev/360-video-builder/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg"
YAW=180

createMergeMap () {
  V360="v360=input=fisheye:output=e:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE"

  $FFMPEG -f lavfi \
      -i nullsrc=size="${VIDEO_HEIGHT}x$VIDEO_HEIGHT" \
      -vf "format=gray8,geq='clip(128-128/(6)*($YAW-$LENS_ANGLE/($VIDEO_HEIGHT/2)*hypot(X-$VIDEO_HEIGHT/2,Y-$VIDEO_HEIGHT/2)),0,255)',$V360,format=rgb24" \
      -frames 1 -y $MERGE_MAP
}

# cd $FOLDER_INPUT && \
# pwd && FUCK && \
# createMergeMap && FUCK && \
# createMergeMap && \

COMMAND="$FFMPEG \
-i $VIDEO_INPUT -i $MERGE_MAP -profile:v High -pix_fmt yuv420p \
-lavfi \"[0]format=rgb24,split[a][b];[a]crop=ih:iw/2:0:0, v360=input=fisheye:output=e:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE:roll=$ORIENTATION[c]; [b]crop=ih:iw/2:iw/2:0,v360=input=fisheye:output=e:yaw=$YAW:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE:roll=$ORIENTATION[d]; [c][d][1]maskedmerge,format=rgb24\" \
-y $VIDEO_OUTPUT && \ "

echo $COMMAND
# $($COMMAND)

COMMAND_SINGLE="$FFMPEG -f concat -safe 0 -i $VIDEO_INPUT \
 -vf v360=dfisheye:e:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE:roll=$ORIENTATION \
 $VIDEO_OUTPUT"

echo  "------"
echo $COMMAND_SINGLE
echo  "------"
# cd $FOLDER_INPUT
# echo  "------"
# pwd
# echo  "------"

$($COMMAND_SINGLE)

function injectMetadata() {
# exiftool -tagsFromFile $VIDEO_METATAGS -all:all $VIDEO_OUTPUT && \
# open -a "VLC" $VIDEO_OUTPUT
}
