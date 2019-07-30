import {Injectable} from '@angular/core';
import * as getUserMedia from 'getusermedia';

@Injectable()
export class UserMediaService
{
  getUserMedia(audio: boolean, video: boolean)
  {
    return new Promise((resolve, reject) => {

      getUserMedia({ audio, video }, (error, stream) => {

        if (error)
        {
          reject(error);
          return;
        }

        resolve(stream);

      });

    });
  }

  async getAvailableAudioDevices()
  {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const result = devices.map(device => device.kind === 'audioinput');

    return result;
  }

  async getAvailableVideoDevices()
  {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const result = devices.map(device => device.kind === 'videoinput');

    return result;
  }
}
