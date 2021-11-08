import { Component, ViewEncapsulation, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import Cropper from 'cropperjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["image"];
function CropperComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "div", 7);
    i0.ɵɵelementEnd();
} }
function CropperComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.loadImageErrorText);
} }
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
/** @nocollapse */ CropperComponent.ɵfac = function CropperComponent_Factory(t) { return new (t || CropperComponent)(); };
/** @nocollapse */ CropperComponent.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: CropperComponent, selectors: [["angular-cropper"]], viewQuery: function CropperComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.image = _t.first);
    } }, inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, decls: 6, vars: 3, consts: [[1, "cropper-wrapper"], ["class", "loading-block", 4, "ngIf"], ["class", "alert alert-warning", 4, "ngIf"], [1, "cropper"], ["alt", "image", 3, "src", "load", "error"], ["image", ""], [1, "loading-block"], [1, "spinner"], [1, "alert", "alert-warning"]], template: function CropperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, CropperComponent_div_1_Template, 2, 0, "div", 1);
        i0.ɵɵtemplate(2, CropperComponent_div_2_Template, 2, 1, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "img", 4, 5);
        i0.ɵɵlistener("load", function CropperComponent_Template_img_load_4_listener($event) { return ctx.imageLoaded($event); })("error", function CropperComponent_Template_img_error_4_listener($event) { return ctx.imageLoadError($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.loadError);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("src", ctx.imageUrl, i0.ɵɵsanitizeUrl);
    } }, directives: [i1.NgIf], styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CropperComponent, [{
        type: Component,
        args: [{
                selector: 'angular-cropper',
                templateUrl: './cropper.component.html',
                styleUrls: ['./cropper.component.css'],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return []; }, { image: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixpQkFBaUIsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQzs7Ozs7SUNHNUIsOEJBQTZDO0lBQ3pDLHlCQUEyQjtJQUMvQixpQkFBTTs7O0lBR04sOEJBQW1EO0lBQUEsWUFBd0I7SUFBQSxpQkFBTTs7O0lBQTlCLGVBQXdCO0lBQXhCLCtDQUF3Qjs7QURZL0UsTUFBTSxPQUFPLGdCQUFnQjtJQWtCekI7UUFWUyxtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUV4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDaEQsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsY0FBUyxHQUFZLElBQUksQ0FBQztJQUtqQixDQUFDO0lBRVYsUUFBUSxLQUFVLENBQUM7SUFFbkIsV0FBVztRQUNoQixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxFQUFTO1FBRXhCLEVBQUU7UUFDRix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxL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UTtrQkFBaEIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLGtCQUFrQjtrQkFBMUIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFFSSxNQUFNO2tCQUFmLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBDcm9wcGVyIGZyb20gJ2Nyb3BwZXJqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyU2V0dGluZyB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNyb3BwZXJSZXN1bHQge1xuICAgIGltYWdlRGF0YTogQ3JvcHBlci5JbWFnZURhdGE7XG4gICAgY3JvcERhdGE6IENyb3BwZXIuQ3JvcEJveERhdGE7XG4gICAgYmxvYj86IEJsb2I7XG4gICAgZGF0YVVybD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhbmd1bGFyLWNyb3BwZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jcm9wcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jcm9wcGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENyb3BwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdpbWFnZScsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgaW1hZ2VVcmw6IGFueTtcbiAgICBASW5wdXQoKSBzZXR0aW5nczogSW1hZ2VDcm9wcGVyU2V0dGluZztcbiAgICBASW5wdXQoKSBjcm9wYm94OiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIEBJbnB1dCgpIGxvYWRJbWFnZUVycm9yVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBhbnkgPSB7fTtcblxuICAgIEBPdXRwdXQoKSBleHBvcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlQ3JvcHBlclJlc3VsdD4oKTtcbiAgICBAT3V0cHV0KCkgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3JvcHBlcjogQ3JvcHBlcjtcbiAgICBwdWJsaWMgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHB1YmxpYyBsb2FkRXJyb3I6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgaWYodGhpcy5jcm9wcGVyKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY3JvcHBlciA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZGVkXG4gICAgICogQHBhcmFtIGV2XG4gICAgICovXG4gICAgcHVibGljIGltYWdlTG9hZGVkKGV2OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVuc2V0IGxvYWQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBpbWFnZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGltYWdlID0gZXYudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW1hZ2VFbGVtZW50ID0gaW1hZ2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQWRkIGNyb3NzT3JpZ2luP1xuICAgICAgICBpZiAodGhpcy5jcm9wcGVyT3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luKSB7XG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW1hZ2Ugb24gcmVhZHkgZXZlbnRcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRW1pdCByZWFkeVxuICAgICAgICAgICAgdGhpcy5yZWFkeS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGNyb3Bib3ggZXhpc3RhbmNlXG4gICAgICAgICAgICBpZiAodGhpcy5jcm9wYm94KSB7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIFNldCBjcm9wYm94IGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIuc2V0Q3JvcEJveERhdGEodGhpcy5jcm9wYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgYXNwZWN0IHJhdGlvIGFjY29yZGluZyB0byBzZXR0aW5nc1xuICAgICAgICBsZXQgYXNwZWN0UmF0aW8gPSBOYU47XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNyb3Agb3B0aW9uc1xuICAgICAgICAvLyBleHRlbmQgZGVmYXVsdCB3aXRoIGN1c3RvbSBjb25maWdcbiAgICAgICAgdGhpcy5jcm9wcGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgICAgICAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZVxuICAgICAgICB9LCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcHBlcmpzXG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcm9wcGVyID0gbmV3IENyb3BwZXIoaW1hZ2UsIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltYWdlIGxvYWQgZXJyb3JcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgaW1hZ2VMb2FkRXJyb3IoZXZlbnQ6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gdHJ1ZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwb3J0IGNhbnZhc1xuICAgICAqIEBwYXJhbSBiYXNlNjRcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwb3J0Q2FudmFzKGJhc2U2ND86IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IGltYWdlLCBjcm9wIGFuZCBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNyb3BEYXRhID0gdGhpcy5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGltYWdlRGF0YSwgY3JvcERhdGEgfTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBDcmVhdGUgcHJvbWlzZSB0byByZXNvbHZlIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGJhc2U2NFxuICAgICAgICAgICAgaWYgKGJhc2U2NCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2Ugd2l0aCBkYXRhVXJsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHJlc29sdmUoeyBibG9iIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRW1pdCBleHBvcnQgZGF0YSB3aGVuIHByb21pc2UgaXMgcmVhZHlcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cG9ydC5lbWl0KE9iamVjdC5hc3NpZ24oZGF0YSwgcmVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjwhLS0gQ1JPUFBFUiBXUkFQUEVSIC0tPlxuPGRpdiBjbGFzcz1cImNyb3BwZXItd3JhcHBlclwiPlxuXG4gICAgPCEtLSBMT0FESU5HIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJsb2NrXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTE9BRCBFUlJPUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiICpuZ0lmPVwibG9hZEVycm9yXCI+e3sgbG9hZEltYWdlRXJyb3JUZXh0IH19PC9kaXY+XG5cbiAgICA8IS0tIENST1BQRVIgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNyb3BwZXJcIj5cbiAgICAgICAgPGltZyAjaW1hZ2UgYWx0PVwiaW1hZ2VcIiBbc3JjXT1cImltYWdlVXJsXCIgKGxvYWQpPVwiaW1hZ2VMb2FkZWQoJGV2ZW50KVwiIChlcnJvcik9XCJpbWFnZUxvYWRFcnJvcigkZXZlbnQpXCIgLz5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19