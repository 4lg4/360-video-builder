

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