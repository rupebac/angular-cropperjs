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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jcm9wcGVyanMvc3JjLyIsInNvdXJjZXMiOlsibGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCJsaWIvY3JvcHBlci9jcm9wcGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDOzs7OztJQ0c1Qiw4QkFDSTtJQUFBLHlCQUEyQjtJQUMvQixpQkFBTTs7O0lBR04sOEJBQW1EO0lBQUEsWUFBd0I7SUFBQSxpQkFBTTs7O0lBQTlCLGVBQXdCO0lBQXhCLCtDQUF3Qjs7QURZL0UsTUFBTSxPQUFPLGdCQUFnQjtJQWtCekI7UUFWUyxtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUV4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDaEQsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsY0FBUyxHQUFZLElBQUksQ0FBQztJQUtqQixDQUFDO0lBRVYsUUFBUSxLQUFVLENBQUM7SUFFbkIsV0FBVztRQUNoQixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxFQUFTO1FBRXhCLEVBQUU7UUFDRix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsRUFBRTtRQUNGLHNCQUFzQjtRQUN0QixNQUFNLEtBQUssR0FBRyxF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Q0csY0FBYztrQkFBdEIsS0FBSztZQUVJLE1BQU07a0JBQWYsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENyb3BwZXIgZnJvbSAnY3JvcHBlcmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNyb3BwZXJTZXR0aW5nIHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclJlc3VsdCB7XG4gICAgaW1hZ2VEYXRhOiBDcm9wcGVyLkltYWdlRGF0YTtcbiAgICBjcm9wRGF0YTogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBibG9iPzogQmxvYjtcbiAgICBkYXRhVXJsPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FuZ3VsYXItY3JvcHBlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nyb3BwZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Nyb3BwZXIuY29tcG9uZW50LmNzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ3JvcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2ltYWdlJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgaW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBpbWFnZVVybDogYW55O1xuICAgIEBJbnB1dCgpIHNldHRpbmdzOiBJbWFnZUNyb3BwZXJTZXR0aW5nO1xuICAgIEBJbnB1dCgpIGNyb3Bib3g6IENyb3BwZXIuQ3JvcEJveERhdGE7XG4gICAgQElucHV0KCkgbG9hZEltYWdlRXJyb3JUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgY3JvcHBlck9wdGlvbnM6IGFueSA9IHt9O1xuXG4gICAgQE91dHB1dCgpIGV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDcm9wcGVyUmVzdWx0PigpO1xuICAgIEBPdXRwdXQoKSByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjcm9wcGVyOiBDcm9wcGVyO1xuICAgIHB1YmxpYyBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHVibGljIGxvYWRFcnJvcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICBpZih0aGlzLmNyb3BwZXIpIHtcbiAgICAgICAgdGhpcy5jcm9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jcm9wcGVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbWFnZSBsb2FkZWRcbiAgICAgKiBAcGFyYW0gZXZcbiAgICAgKi9cbiAgICBwdWJsaWMgaW1hZ2VMb2FkZWQoZXY6IEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVW5zZXQgbG9hZCBlcnJvciBzdGF0ZVxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldHVwIGltYWdlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBldi50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbWFnZUVsZW1lbnQgPSBpbWFnZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBBZGQgY3Jvc3NPcmlnaW4/XG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXJPcHRpb25zLmNoZWNrQ3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBJbWFnZSBvbiByZWFkeSBldmVudFxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdyZWFkeScsICgpID0+IHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBFbWl0IHJlYWR5XG4gICAgICAgICAgICB0aGlzLnJlYWR5LmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgY3JvcGJveCBleGlzdGFuY2VcbiAgICAgICAgICAgIGlmICh0aGlzLmNyb3Bib3gpIHtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gU2V0IGNyb3Bib3ggZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci5zZXRDcm9wQm94RGF0YSh0aGlzLmNyb3Bib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBhc3BlY3QgcmF0aW8gYWNjb3JkaW5nIHRvIHNldHRpbmdzXG4gICAgICAgIGxldCBhc3BlY3RSYXRpbyA9IE5hTjtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncztcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcCBvcHRpb25zXG4gICAgICAgIC8vIGV4dGVuZCBkZWZhdWx0IHdpdGggY3VzdG9tIGNvbmZpZ1xuICAgICAgICB0aGlzLmNyb3BwZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyxcbiAgICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgem9vbWFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld01vZGU6IDEsXG4gICAgICAgICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlXG4gICAgICAgIH0sIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjcm9wcGVyanNcbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlcikge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyb3BwZXIgPSBuZXcgQ3JvcHBlcihpbWFnZSwgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZCBlcnJvclxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBpbWFnZUxvYWRFcnJvcihldmVudDogYW55KTogdm9pZCB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGxvYWQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVuc2V0IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvcnQgY2FudmFzXG4gICAgICogQHBhcmFtIGJhc2U2NFxuICAgICAqL1xuICAgIHB1YmxpYyBleHBvcnRDYW52YXMoYmFzZTY0PzogYW55KTogdm9pZCB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gR2V0IGFuZCBzZXQgaW1hZ2UsIGNyb3AgYW5kIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgY29uc3QgY3JvcERhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcEJveERhdGEoKTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgaW1hZ2VEYXRhLCBjcm9wRGF0YSB9O1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIENyZWF0ZSBwcm9taXNlIHRvIHJlc29sdmUgY2FudmFzIGRhdGFcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgYmFzZTY0XG4gICAgICAgICAgICBpZiAoYmFzZTY0KSB7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgcHJvbWlzZSB3aXRoIGRhdGFVcmxcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4gcmVzb2x2ZSh7IGJsb2IgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBFbWl0IGV4cG9ydCBkYXRhIHdoZW4gcHJvbWlzZSBpcyByZWFkeVxuICAgICAgICBwcm9taXNlLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhwb3J0LmVtaXQoT2JqZWN0LmFzc2lnbihkYXRhLCByZXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiPCEtLSBDUk9QUEVSIFdSQVBQRVIgLS0+XG48ZGl2IGNsYXNzPVwiY3JvcHBlci13cmFwcGVyXCI+XG5cbiAgICA8IS0tIExPQURJTkcgLS0+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRpbmctYmxvY2tcIiAqbmdJZj1cImlzTG9hZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBMT0FEIEVSUk9SIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCIgKm5nSWY9XCJsb2FkRXJyb3JcIj57eyBsb2FkSW1hZ2VFcnJvclRleHQgfX08L2Rpdj5cblxuICAgIDwhLS0gQ1JPUFBFUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY3JvcHBlclwiPlxuICAgICAgICA8aW1nICNpbWFnZSBhbHQ9XCJpbWFnZVwiIFtzcmNdPVwiaW1hZ2VVcmxcIiAobG9hZCk9XCJpbWFnZUxvYWRlZCgkZXZlbnQpXCIgKGVycm9yKT1cImltYWdlTG9hZEVycm9yKCRldmVudClcIiAvPlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=