// import ffmpeg from 'fluent-ffmpeg';
import { readFile, readdir, stat } from 'node:fs/promises';
import { basename, join, resolve } from 'path';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
// import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffprobePath = require('@ffprobe-installer/ffprobe').path;

// console.log(ffmpegPath);
// ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg.setFfprobePath(ffprobePath);

const FOLDERS = {
    // INPUT: resolve('./files/input/citzen'),
    INPUT: resolve('/Users/paulaceron/ALGA/360/2023-06-08_citzenship'),
    OUTPUT: resolve('./files/output'),
    TEMP: resolve('./files/temp'),
}

const OUTPUT = `${FOLDERS.OUTPUT}/generated.mp4`;

const OPTIONS = {
  // video coddec
  videoCodec: '-c:v libx265 hevc_nvenc',
  copy: '-c copy'
};
async function run() {
    try {
        const files = ((await readdir(FOLDERS.INPUT)) || []).sort().filter(file => !file.match(/(^|\/)\.[^\/\.]/g)).map((file) => join(FOLDERS.INPUT, file));

        if (files.length === 0) {
            throw new Error(`no files found on ${FOLDERS.INPUT}`)
        }
          
        // console.log(files.reduce((reduced, file) => { reduced += ` -i ./files/input/citzen/${file}`; return reduced; }, ''));

          // for (let index = 1; index < files.length; index++) {
            // console.log('####', files[index]);
            // ffmpeg().addInput(files[index]);
          //   // videoProcess.input(files[index]);
          // }
  
      //     ffmpeg().mergeToFile(`${FOLDERS.OUTPUT}/final.mp4`, FOLDERS.TEMP)

      console.log(`${ffmpegPath} -f concat ${files.map(file => `-i ${file}`).join(' ')} ${OPTIONS.copy} -strict unofficial ${OUTPUT}`);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }

}

await run();

[SIDE_DATA]
side_data_type="Stereo 3D"
type=2D
inverted=0
[/SIDE_DATA]
[SIDE_DATA]
side_data_type=Spherical Mapping
projection=equirectangular
yaw=0
pitch=0
roll=0
[/SIDE_DATA]
