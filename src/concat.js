import ffmpeg from 'fluent-ffmpeg';
import { readFile, readdir, stat } from 'node:fs/promises';
import { basename, join, resolve } from 'path';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const unlink = path =>
  new Promise((resolve, reject) =>
    fs.unlink(path, err => (err ? reject(err) : resolve()))
  )

const createIntermediate = file =>
  new Promise((resolve, reject) => {
    const out = `${Math.random()
      .toString(13)
      .slice(2)}.ts`

    ffmpeg(file)
      .outputOptions('-c', 'copy', '-bsf:v', 'h264_mp4toannexb', '-f', 'mpegts')
      .output(out)
      .on('end', () => resolve(out))
      .on('error', reject)
      .run()
  })

const concat = async (files, output) => {
  const names = await Promise.all(files.map(createIntermediate))
  const namesString = names.join('|')

  await new Promise((resolve, reject) =>
    ffmpeg(`concat:${namesString}`)
      .outputOptions('-c', 'copy', '-bsf:a', 'aac_adtstoasc')
      .output(output)
      .on('end', resolve)
      .on('error', reject)
      .run()
  )

  names.map(unlink)
}

concat(['file1.mp4', 'file2.mp4', 'file3.mp4'], 'output.mp4').then(() =>
  console.log('done!')
)