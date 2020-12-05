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
/** @nocollapse */ CropperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CropperComponent, selectors: [["angular-cropper"]], viewQuery: function CropperComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵstaticViewQuery(_c0, true, ElementRef);
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
    } }, directives: [i1.NgIf], styles: [":host{display:block}.cropper img{height:auto;max-height:100%;max-width:100%}.cropper-wrapper{min-height:80px;position:relative}.cropper-wrapper .loading-block{height:100%;left:0;position:absolute;top:0;width:100%}.cropper-wrapper .loading-block .spinner{-webkit-animation:cssload-spin 425ms linear infinite;animation:cssload-spin 425ms linear infinite;border-color:rgba(97,100,193,.98) transparent;border-radius:50%;border-style:solid;border-width:2px;height:31px;left:calc(50% - 15px);margin:0 auto;position:absolute;top:calc(50% - 15px);width:31px}@-webkit-keyframes cssload-spin{to{transform:rotate(1turn)}}@keyframes cssload-spin{to{transform:rotate(1turn)}}\n\n/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CropperComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jcm9wcGVyanMvc3JjLyIsInNvdXJjZXMiOlsibGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCJsaWIvY3JvcHBlci9jcm9wcGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDOzs7OztJQ0c1Qiw4QkFDSTtJQUFBLHlCQUEyQjtJQUMvQixpQkFBTTs7O0lBR04sOEJBQW1EO0lBQUEsWUFBd0I7SUFBQSxpQkFBTTs7O0lBQTlCLGVBQXdCO0lBQXhCLCtDQUF3Qjs7QURZL0UsTUFBTSxPQUFPLGdCQUFnQjtJQWtCekI7UUFWUyxtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUV4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDaEQsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsY0FBUyxHQUFZLElBQUksQ0FBQztJQUtqQixDQUFDO0lBRVYsUUFBUSxLQUFVLENBQUM7SUFFMUIsV0FBVztRQUNULElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLEVBQVM7UUFFeEIsRUFBRTtRQUNGLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixFQUFFO1FBQ0Ysc0JBQXNCO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLEVB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RyxjQUFjO2tCQUF0QixLQUFLO1lBRUksTUFBTTtrQkFBZixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb24sIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQ3JvcHBlciBmcm9tICdjcm9wcGVyanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclNldHRpbmcge1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyUmVzdWx0IHtcbiAgICBpbWFnZURhdGE6IENyb3BwZXIuSW1hZ2VEYXRhO1xuICAgIGNyb3BEYXRhOiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIGJsb2I/OiBCbG9iO1xuICAgIGRhdGFVcmw/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYW5ndWxhci1jcm9wcGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3JvcHBlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3JvcHBlci5jb21wb25lbnQuY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgnaW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBpbWFnZTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGltYWdlVXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IEltYWdlQ3JvcHBlclNldHRpbmc7XG4gICAgQElucHV0KCkgY3JvcGJveDogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBASW5wdXQoKSBsb2FkSW1hZ2VFcnJvclRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjcm9wcGVyT3B0aW9uczogYW55ID0ge307XG5cbiAgICBAT3V0cHV0KCkgZXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUNyb3BwZXJSZXN1bHQ+KCk7XG4gICAgQE91dHB1dCgpIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNyb3BwZXI6IENyb3BwZXI7XG4gICAgcHVibGljIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwdWJsaWMgbG9hZEVycm9yOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge31cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgaWYodGhpcy5jcm9wcGVyKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY3JvcHBlciA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZGVkXG4gICAgICogQHBhcmFtIGV2XG4gICAgICovXG4gICAgcHVibGljIGltYWdlTG9hZGVkKGV2OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVuc2V0IGxvYWQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBpbWFnZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGltYWdlID0gZXYudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW1hZ2VFbGVtZW50ID0gaW1hZ2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQWRkIGNyb3NzT3JpZ2luP1xuICAgICAgICBpZiAodGhpcy5jcm9wcGVyT3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luKSB7XG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW1hZ2Ugb24gcmVhZHkgZXZlbnRcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRW1pdCByZWFkeVxuICAgICAgICAgICAgdGhpcy5yZWFkeS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGNyb3Bib3ggZXhpc3RhbmNlXG4gICAgICAgICAgICBpZiAodGhpcy5jcm9wYm94KSB7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIFNldCBjcm9wYm94IGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIuc2V0Q3JvcEJveERhdGEodGhpcy5jcm9wYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgYXNwZWN0IHJhdGlvIGFjY29yZGluZyB0byBzZXR0aW5nc1xuICAgICAgICBsZXQgYXNwZWN0UmF0aW8gPSBOYU47XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNyb3Agb3B0aW9uc1xuICAgICAgICAvLyBleHRlbmQgZGVmYXVsdCB3aXRoIGN1c3RvbSBjb25maWdcbiAgICAgICAgdGhpcy5jcm9wcGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgICAgICAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZVxuICAgICAgICB9LCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcHBlcmpzXG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcm9wcGVyID0gbmV3IENyb3BwZXIoaW1hZ2UsIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltYWdlIGxvYWQgZXJyb3JcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgaW1hZ2VMb2FkRXJyb3IoZXZlbnQ6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gdHJ1ZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwb3J0IGNhbnZhc1xuICAgICAqIEBwYXJhbSBiYXNlNjRcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwb3J0Q2FudmFzKGJhc2U2ND86IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IGltYWdlLCBjcm9wIGFuZCBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNyb3BEYXRhID0gdGhpcy5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGltYWdlRGF0YSwgY3JvcERhdGEgfTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBDcmVhdGUgcHJvbWlzZSB0byByZXNvbHZlIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGJhc2U2NFxuICAgICAgICAgICAgaWYgKGJhc2U2NCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2Ugd2l0aCBkYXRhVXJsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHJlc29sdmUoeyBibG9iIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRW1pdCBleHBvcnQgZGF0YSB3aGVuIHByb21pc2UgaXMgcmVhZHlcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cG9ydC5lbWl0KE9iamVjdC5hc3NpZ24oZGF0YSwgcmVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjwhLS0gQ1JPUFBFUiBXUkFQUEVSIC0tPlxuPGRpdiBjbGFzcz1cImNyb3BwZXItd3JhcHBlclwiPlxuXG4gICAgPCEtLSBMT0FESU5HIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJsb2NrXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTE9BRCBFUlJPUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiICpuZ0lmPVwibG9hZEVycm9yXCI+e3sgbG9hZEltYWdlRXJyb3JUZXh0IH19PC9kaXY+XG5cbiAgICA8IS0tIENST1BQRVIgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNyb3BwZXJcIj5cbiAgICAgICAgPGltZyAjaW1hZ2UgYWx0PVwiaW1hZ2VcIiBbc3JjXT1cImltYWdlVXJsXCIgKGxvYWQpPVwiaW1hZ2VMb2FkZWQoJGV2ZW50KVwiIChlcnJvcik9XCJpbWFnZUxvYWRFcnJvcigkZXZlbnQpXCIgLz5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19