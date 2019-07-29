import * as Peer from 'simple-peer';
import {Injectable} from '@angular/core';

@Injectable()
export class PeerConnectionFactoryService
{
  createInitiator(stream: MediaStream, options: {} = {})
  {
    const params = this.getOptions(stream, {...options, initiator: true});

    return new Peer(params);
  }

  createCallee(stream: MediaStream, options: {} = {})
  {
    const params = this.getOptions(stream, {...options, initiator: false});

    return new Peer(params);
  }

  getOptions(stream: MediaStream, params: Object)
  {
    // TODO add stun and turn servers to the configuration
    const result = {
      ...params,
      stream: stream,
      trickle: false
    };

    return result;
  }
}
