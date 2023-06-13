#!/bin/bash

LENS_ANGLE=188
VIDEO_WIDTH=3840
VIDEO_HEIGHT="1920"
VIDEO="./2.insv"
COUNT=$(ls final* | wc -l | sed 's/ //g')
YAW=180

createMergeMap () {
  V360="v360=input=fisheye:output=e:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE"

  /Users/paulaceron/ALGA/dev/360-video-builder/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg -f lavfi \
      -i nullsrc=size="${VIDEO_HEIGHT}x$VIDEO_HEIGHT" \
      -vf "format=gray8,geq='clip(128-128/(6)*($YAW-$LENS_ANGLE/($VIDEO_HEIGHT/2)*hypot(X-$VIDEO_HEIGHT/2,Y-$VIDEO_HEIGHT/2)),0,255)',$V360,format=rgb24" \
      -frames 1 -y mergemap.png
}

# createMergeMap && FUCK && \

createMergeMap && \

/Users/paulaceron/ALGA/dev/360-video-builder/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg \
-i $VIDEO -i mergemap.png -profile:v High -pix_fmt yuv420p \
-lavfi "[0]format=rgb24,split[a][b];[a]crop=ih:iw/2:0:0, v360=input=fisheye:output=e:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE:roll=90[c]; [b]crop=ih:iw/2:iw/2:0,v360=input=fisheye:output=e:yaw=$YAW:ih_fov=$LENS_ANGLE:iv_fov=$LENS_ANGLE:roll=90[d]; [c][d][1]maskedmerge,format=rgb24" \
-y ./final_$COUNT.mp4 && \

# /Users/paulaceron/ALGA/dev/360-video-builder/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg -i $VIDEO \
# -vf v360=dfisheye:e:ih_fov=184:iv_fov=184:roll=-180 \
# final_$COUNT.mp4 && \
exiftool -tagsFromFile data_tags.mp4 -all:all final_$COUNT.mp4 && \
open -a "VLC" ./final_$COUNT.mp4
