import ffmpeg from 'fluent-ffmpeg';
import { readFile, readdir, stat } from 'node:fs/promises';
import { basename, join, resolve } from 'path';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const FOLDERS = {
    INPUT: resolve('./files/input/citzen'),
    OUTPUT: resolve('./files/output'),
    TEMP: resolve('./files/temp'),
}

async function run() {
    try {
        const files = ((await readdir(FOLDERS.INPUT)) || []).sort()//.map((file) => join(FOLDERS.INPUT, file));

        if (files.length === 0) {
            throw new Error(`no files found on ${FOLDERS.INPUT}`)
        }

      //   return new Promise((resolve, reject)=> {
      //     ffmpeg(files[0])
      //       // .input(files[1], files[2])
      //       // .input(files[1])
      //       .on('error', reject)
      //       .on('stderr', function(stderrLine) {
      //         console.log('Stderr output: ' + stderrLine);
      //       })
      //       .on('progress', function(progress) {
      //         console.log('Processing: ' + progress.percent + '% done');
      //       })
      //       .on('codecData', function(data) {
      //         console.log('Input is ' + data.audio + ' audio ' +
      //         'with ' + data.video + ' video');
      //       })
      //       .on('start', function(commandLine) {
      //         console.log('Spawned Ffmpeg with command: ' + commandLine);
      //       })
      //       .on('end', function(stdout, stderr) {
      //         console.log('Transcoding succeeded !');
      //       })
      //       // .mergeToFile(`${FOLDERS.OUTPUT}/final.mp4`, FOLDERS.TEMP)
      //       // .ffprobe(function(err, data) {
      //       //   console.log('file2 metadata:');
      //       //   console.dir(data);
      //       // });


      //       // console.log('###', ffmpeg); 
          
            console.log(files.reduce((reduced, file) => { reduced += ` -i ./files/input/citzen/${file}`; return reduced; }, ''));

            

          // for (let index = 1; index < files.length; index++) {
            // console.log('####', files[index]);
            // ffmpeg().addInput(files[index]);
          //   // videoProcess.input(files[index]);
          // }
  
      //     ffmpeg().mergeToFile(`${FOLDERS.OUTPUT}/final.mp4`, FOLDERS.TEMP)
    
      // });
    } catch(e) {
        console.error(e);
        process.exit(1);
    }

}

// console.log(ffmpeg);
await run();


// ./node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg -i files/input/VID_20230523_093340_00_047.mp4 -vf scale=3840x2160,setdar=16:9 -r 30 -c:v libx265 -b:v 15M -pix_fmt yuv420p -c:a aac -b:a 192K files/output/test.mp4
// ./node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg -i files/input/VID_20230523_093340_00_047.mp4 -c:v libx264 files/output/test.mp4




// ./node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg -i ./files/input/citzen/VID_20230608_153903_00_002.insv -i ./files/input/citzen/VID_20230608_153903_10_002.insv -i ./files/input/citzen/VID_20230608_163558_00_003.insv -i ./files/input/citzen/VID_20230608_163558_10_003.insv -i ./files/input/citzen/VID_20230608_170515_00_004.insv -i ./files/input/citzen/VID_20230608_170515_10_004.insv -i ./files/input/citzen/VID_20230608_171115_00_005.insv -i ./files/input/citzen/VID_20230608_171115_10_005.insv -c:v libx265 -strict unofficial files/output/test_final.mp4