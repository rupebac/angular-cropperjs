import { Component, ViewEncapsulation, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import Cropper from 'cropperjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CropperComponent {
    constructor() {
        this.cropperOptions = {};
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
        this.isLoading = true;
    }
    ngOnInit() { }
    ngOnDestroy() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
    /**
     * Image loaded
     * @param ev
     */
    imageLoaded(ev) {
        //
        // Unset load error state
        this.loadError = false;
        //
        // Setup image element
        const image = ev.target;
        this.imageElement = image;
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin) {
            image.crossOrigin = 'anonymous';
        }
        //
        // Image on ready event
        image.addEventListener('ready', () => {
            //
            // Emit ready
            this.ready.emit(true);
            //
            // Unset loading state
            this.isLoading = false;
            //
            // Validate cropbox existance
            if (this.cropbox) {
                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });
        //
        // Setup aspect ratio according to settings
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = undefined;
        }
        this.cropper = new Cropper(image, this.cropperOptions);
    }
    /**
     * Image load error
     * @param event
     */
    imageLoadError(event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    }
    /**
     * Export canvas
     * @param base64
     */
    exportCanvas(base64) {
        //
        // Get and set image, crop and canvas data
        const imageData = this.cropper.getImageData();
        const cropData = this.cropper.getCropBoxData();
        const canvas = this.cropper.getCroppedCanvas();
        const data = { imageData, cropData };
        //
        // Create promise to resolve canvas data
        const promise = new Promise(resolve => {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(blob => resolve({ blob }));
        });
        //
        // Emit export data when promise is ready
        promise.then(res => {
            this.export.emit(Object.assign(data, res));
        });
    }
}
/** @nocollapse */ CropperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: CropperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CropperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: CropperComponent, selector: "angular-cropper", inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, viewQueries: [{ propertyName: "image", first: true, predicate: ["image"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<!-- CROPPER WRAPPER -->\n<div class=\"cropper-wrapper\">\n\n    <!-- LOADING -->\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\n        <div class=\"spinner\"></div>\n    </div>\n\n    <!-- LOAD ERROR -->\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\n\n    <!-- CROPPER -->\n    <div class=\"cropper\">\n        <img #image alt=\"image\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\n    </div>\n</div>\n", styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: CropperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular-cropper',
                    templateUrl: './cropper.component.html',
                    styleUrls: ['./cropper.component.css'],
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { image: [{
                type: ViewChild,
                args: ['image', { read: ElementRef, static: true }]
            }], imageUrl: [{
                type: Input
            }], settings: [{
                type: Input
            }], cropbox: [{
                type: Input
            }], loadImageErrorText: [{
                type: Input
            }], cropperOptions: [{
                type: Input
            }], export: [{
                type: Output
            }], ready: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixpQkFBaUIsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQzs7O0FBb0JoQyxNQUFNLE9BQU8sZ0JBQWdCO0lBa0J6QjtRQVZTLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRXhCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUNoRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixjQUFTLEdBQVksSUFBSSxDQUFDO0lBS2pCLENBQUM7SUFFVixRQUFRLEtBQVUsQ0FBQztJQUVuQixXQUFXO1FBQ2hCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLEVBQVM7UUFFeEIsRUFBRTtRQUNGLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixFQUFFO1FBQ0Ysc0JBQXNCO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUEwQixDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FB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QUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRTtRQUNGLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2lJQXRKUSxnQkFBZ0I7cUhBQWhCLGdCQUFnQix5VUFFRyxVQUFVLDJDQ3ZCMUMseWZBZ0JBOzRGREthLGdCQUFnQjtrQkFONUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixXQUFXLEVBQUUsMEJBQTBCO29CQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDdEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzBFQUcyRCxLQUFLO3NCQUE1RCxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFN0MsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb24sIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQ3JvcHBlciBmcm9tICdjcm9wcGVyanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclNldHRpbmcge1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyUmVzdWx0IHtcbiAgICBpbWFnZURhdGE6IENyb3BwZXIuSW1hZ2VEYXRhO1xuICAgIGNyb3BEYXRhOiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIGJsb2I/OiBCbG9iO1xuICAgIGRhdGFVcmw/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYW5ndWxhci1jcm9wcGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3JvcHBlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3JvcHBlci5jb21wb25lbnQuY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgnaW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBpbWFnZTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGltYWdlVXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IEltYWdlQ3JvcHBlclNldHRpbmc7XG4gICAgQElucHV0KCkgY3JvcGJveDogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBASW5wdXQoKSBsb2FkSW1hZ2VFcnJvclRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjcm9wcGVyT3B0aW9uczogYW55ID0ge307XG5cbiAgICBAT3V0cHV0KCkgZXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUNyb3BwZXJSZXN1bHQ+KCk7XG4gICAgQE91dHB1dCgpIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNyb3BwZXI6IENyb3BwZXI7XG4gICAgcHVibGljIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwdWJsaWMgbG9hZEVycm9yOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge31cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgIGlmKHRoaXMuY3JvcHBlcikge1xuICAgICAgICB0aGlzLmNyb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNyb3BwZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltYWdlIGxvYWRlZFxuICAgICAqIEBwYXJhbSBldlxuICAgICAqL1xuICAgIHB1YmxpYyBpbWFnZUxvYWRlZChldjogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgZWxlbWVudFxuICAgICAgICBjb25zdCBpbWFnZSA9IGV2LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICB0aGlzLmltYWdlRWxlbWVudCA9IGltYWdlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFkZCBjcm9zc09yaWdpbj9cbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlck9wdGlvbnMuY2hlY2tDcm9zc09yaWdpbikge1xuICAgICAgICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEltYWdlIG9uIHJlYWR5IGV2ZW50XG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEVtaXQgcmVhZHlcbiAgICAgICAgICAgIHRoaXMucmVhZHkuZW1pdCh0cnVlKTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFVuc2V0IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBjcm9wYm94IGV4aXN0YW5jZVxuICAgICAgICAgICAgaWYgKHRoaXMuY3JvcGJveCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBTZXQgY3JvcGJveCBkYXRhXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnNldENyb3BCb3hEYXRhKHRoaXMuY3JvcGJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldHVwIGFzcGVjdCByYXRpbyBhY2NvcmRpbmcgdG8gc2V0dGluZ3NcbiAgICAgICAgbGV0IGFzcGVjdFJhdGlvID0gTmFOO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnNldHRpbmdzO1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjcm9wIG9wdGlvbnNcbiAgICAgICAgLy8gZXh0ZW5kIGRlZmF1bHQgd2l0aCBjdXN0b20gY29uZmlnXG4gICAgICAgIHRoaXMuY3JvcHBlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgbW92YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB6b29tYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3TW9kZTogMSxcbiAgICAgICAgICAgIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWVcbiAgICAgICAgfSwgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNyb3BwZXJqc1xuICAgICAgICBpZiAodGhpcy5jcm9wcGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3JvcHBlciA9IG5ldyBDcm9wcGVyKGltYWdlLCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbWFnZSBsb2FkIGVycm9yXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgcHVibGljIGltYWdlTG9hZEVycm9yKGV2ZW50OiBhbnkpOiB2b2lkIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgbG9hZCBlcnJvciBzdGF0ZVxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cG9ydCBjYW52YXNcbiAgICAgKiBAcGFyYW0gYmFzZTY0XG4gICAgICovXG4gICAgcHVibGljIGV4cG9ydENhbnZhcyhiYXNlNjQ/OiBhbnkpOiB2b2lkIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBHZXQgYW5kIHNldCBpbWFnZSwgY3JvcCBhbmQgY2FudmFzIGRhdGFcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5jcm9wcGVyLmdldEltYWdlRGF0YSgpO1xuICAgICAgICBjb25zdCBjcm9wRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpO1xuICAgICAgICBjb25zdCBkYXRhID0geyBpbWFnZURhdGEsIGNyb3BEYXRhIH07XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ3JlYXRlIHByb21pc2UgdG8gcmVzb2x2ZSBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBiYXNlNjRcbiAgICAgICAgICAgIGlmIChiYXNlNjQpIHtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBwcm9taXNlIHdpdGggZGF0YVVybFxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiByZXNvbHZlKHsgYmxvYiB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEVtaXQgZXhwb3J0IGRhdGEgd2hlbiBwcm9taXNlIGlzIHJlYWR5XG4gICAgICAgIHByb21pc2UudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHBvcnQuZW1pdChPYmplY3QuYXNzaWduKGRhdGEsIHJlcykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCI8IS0tIENST1BQRVIgV1JBUFBFUiAtLT5cbjxkaXYgY2xhc3M9XCJjcm9wcGVyLXdyYXBwZXJcIj5cblxuICAgIDwhLS0gTE9BRElORyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy1ibG9ja1wiICpuZ0lmPVwiaXNMb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIExPQUQgRVJST1IgLS0+XG4gICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiAqbmdJZj1cImxvYWRFcnJvclwiPnt7IGxvYWRJbWFnZUVycm9yVGV4dCB9fTwvZGl2PlxuXG4gICAgPCEtLSBDUk9QUEVSIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjcm9wcGVyXCI+XG4gICAgICAgIDxpbWcgI2ltYWdlIGFsdD1cImltYWdlXCIgW3NyY109XCJpbWFnZVVybFwiIChsb2FkKT1cImltYWdlTG9hZGVkKCRldmVudClcIiAoZXJyb3IpPVwiaW1hZ2VMb2FkRXJyb3IoJGV2ZW50KVwiIC8+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==