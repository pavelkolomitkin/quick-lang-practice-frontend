import {Injectable} from '@angular/core';
import * as getUserMedia from 'getusermedia';

@Injectable()
export class UserMediaService
{
  getUserMedia(audio: boolean, video: boolean)
  {
    return new Promise((resolve, reject) => {

      getUserMedia((error, stream) => {

        if (error)
        {
          reject(error);
          return;
        }

        resolve(stream);

      });

    });
  }
}
