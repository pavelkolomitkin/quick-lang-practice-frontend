import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {State} from '../../app.state';
import {SocketService} from './socket.service';

@Injectable()
export class BaseSocketService
{
    private unProcessedEmits: {} = {};

    private tokenSubscription: Subscription;

    public socket: SocketService;

    constructor(public store: Store<State>) {

        this.tokenSubscription = this.store.pipe(select(state => state.security.authorizedToken)).subscribe(
            (token: string) => {

                this.socket = new SocketService(this.getNamespace(), token, this.getConnectionOptions());
                this.flushUnprocessedEmits();
            });
    }

    flushUnprocessedEmits()
    {
        for (const event of Object.keys(this.unProcessedEmits))
        {
            const data = this.unProcessedEmits[event];
            this.socket.emit(event, data);
        }
    }

    getNamespace(): string
    {
        throw new Error('You should override this method at the subclass!');
    }

    getConnectionOptions(): any
    {
        return {};
    }

    release()
    {
        if (this.socket)
        {
            this.socket.release();
            this.socket = null;
        }
        this.tokenSubscription.unsubscribe();
    }


    fromEvent(event: string): Observable<any>
    {
        return new Observable((subscriber) => {

            if (!this.socket)
            {
                return;
            }

            this.socket.fromEvent(event).subscribe((data: any) => {

                subscriber.next(data);

            });

        });
    }

    emit(event: string, data: any)
    {
        if (this.socket)
        {
            this.socket.emit(event, data);
        }
        else {
            this.unProcessedEmits[event] = data;
        }
    }

}
