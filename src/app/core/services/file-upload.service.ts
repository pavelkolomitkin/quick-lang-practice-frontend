import {Observable} from 'rxjs';
import {HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable()
export class FileUploadService extends BaseService
{
    static UPLOAD_EVENT_TYPE_PROGRESS = 'UPLOAD_EVENT_TYPE_PROGRESS';
    static UPLOAD_EVENT_TYPE_COMPLETE = 'UPLOAD_EVENT_TYPE_COMPLETE';
    static UPLOAD_EVENT_TYPE_ERROR = 'UPLOAD_EVENT_TYPE_ERROR';

    upload(url: string, file: File, formFieldName = 'file')
    {
        return new Observable((observer) => {

            const formData: FormData = new FormData();
            formData.append(formFieldName, file);

            const request = new HttpRequest(
                'POST', url,
                formData,
                {
                    reportProgress: true,
                    headers: new HttpHeaders({ 'enctype':  'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'})
                }
            );

            this.http.request(request).subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress)
                    {
                        observer.next({
                            loaded: event.loaded,
                            total: event.total,
                            type: FileUploadService.UPLOAD_EVENT_TYPE_PROGRESS
                        });
                    }
                    else if (event instanceof HttpResponse)
                    {
                        observer.next({
                            body: event.body,
                            type: FileUploadService.UPLOAD_EVENT_TYPE_COMPLETE
                        });
                    }
                },
                (errors) => {
                    observer.error({
                        errors: errors.error.errors,
                        type: FileUploadService.UPLOAD_EVENT_TYPE_ERROR
                    });

                },
                () => {
                }
            );
        });
    }
}