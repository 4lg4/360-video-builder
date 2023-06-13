

ffmpeg Useful docs

ffmpeg sheet
https://gist.github.com/nickkraakman/e351f3c917ab1991b7c9339e10578049


stitching 360 files
https://www.trekview.org/blog/2022/using-ffmpeg-process-gopro-fusion-fisheye/
https://github.com/trek-view/fusion2sphere


fisheye to square
https://ffmpeg.org/ffmpeg-filters.html#v360

https://stackoverflow.com/questions/37796911/is-there-a-fisheye-or-dual-fisheye-to-equirectangular-filter-for-ffmpeg

ffmpeg -y -i in.mp4 -vf v360=dfisheye:e:yaw=-90 -c:v libx265 -b:v 40000k -bufsize 5000k -preset ultrafast -c:a copy out.mp4

```
y : overwrite output without wanring
i xxx : input file
vf yyy: use filter
  yyy: filter parameters

  v360 : filter name
    dfisheye : double fisheye (rectangular image containing two spheres/fisheye); use "fisheye" to use single sphere/fisheye
    e : abbreviation for "equirectangular"
    yaw : view direction (=azimut) of center of equirectangular output (=look left/right); use "pitch" to look up/down
    ih_fov : input horizontal Field Of View; half sphere is 180°, but some cameras arrive to 235°
    iv_fov : input vertical Field Of View, usually identical to ih_fov
    h_fov : output horizontal FOV
    v_fov : output vertical FOV
```



https://stackoverflow.com/questions/44642227/how-do-i-resolve-ffmpeg-concat-command-error-unknown-keyword


```
create input.txt in this folder - content looks like this:
file 'input1.mp4'
file 'input2.mp4'
file 'input3.mp4'
file 'input4.mp4'
Note:
file encoding must be UTF-8
file keyword must be present
filename must not be fully qualified (I got exceptions using '/path/to/input1.mp4')
filename must be enclosed by '
navigate to this folder in the terminal
execute ffmpeg -f concat -i input.txt -c copy ffmpegOUT.mp4
```

```
// -safe 0 for absolute paths
// ffmpeg -f concat -safe 0 -i vidlist.txt -c copy output
```


https://marceauka.github.io/ffmpeg-generator/


// to concatenate multiple mp4 files it's required to transform it to a transport stream type before concat
https://trac.ffmpeg.org/wiki/Concatenate

```
copy -bsf:v h264_mp4toannexb -f mpegts intermediate1.ts
ffmpeg -i input2.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate2.ts
ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy -bsf:a aac_adtstoasc output.mp4
```




----------------------------------------
1. convert .insv to .mp4
  1.1. remove original sound track
  1.2. add sound track
2. concatenate all video files
3. correct metadata
----------------------------------------

2. concat mp4 360 files
```bash
ffmpeg -i "concat:vid1.mp4|vid2.mp4|vid3.mp4"  -c copy ./generated200.mp4
```

> -safe 0 for absolute paths
// cat files.txt
```txt
file 'VID_20230608_170515_00_004.mp4'
file 'VID_20230608_171115_00_005.mp4'
```

```bash
ffmpeg -f concat  -i ./files.txt -c copy ./generated200.mp4
```

3. problem with concat was the missing 360 metadata

// prerequisite exiftool
``` bash
brew install exiftool
```

```bash
exiftool -tagsFromFile first-video-file.mp4 -all:all final-generated-file.mp4
```