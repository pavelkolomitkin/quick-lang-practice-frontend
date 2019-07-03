export class UploadItem<UploadableType>
{
    public uploaded: UploadableType = null;

    public uploadedBytes: number;
    public totalSizeBytes: number;

    public errors: Object = null;

    public percentageProgress: number = 0;

    public constructor(public id: string, public file: File) {}

    public setProgress(uploadedBytes: number, totalSizeBytes: number)
    {
        this.uploadedBytes = uploadedBytes;
        this.totalSizeBytes = totalSizeBytes;

        this.percentageProgress = Math.round(100 * this.uploadedBytes / this.totalSizeBytes);

        return this;
    }
}
