import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵɵtext, ɵɵnextContext, ɵɵadvance, ɵɵtextInterpolate, EventEmitter, ɵɵdefineComponent, ɵɵstaticViewQuery, ElementRef, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵtemplate, ɵɵlistener, ɵɵproperty, ɵɵsanitizeUrl, Component, ViewEncapsulation, ViewChild, Input, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import Cropper from 'cropperjs';
import { NgIf, CommonModule } from '@angular/common';

class AngularCropperjsService {
    constructor() { }
}
/** @nocollapse */ AngularCropperjsService.ɵfac = function AngularCropperjsService_Factory(t) { return new (t || AngularCropperjsService)(); };
/** @nocollapse */ AngularCropperjsService.ɵprov = ɵɵdefineInjectable({ token: AngularCropperjsService, factory: AngularCropperjsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AngularCropperjsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

const _c0 = ["image"];
function CropperComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵelement(1, "div", 7);
    ɵɵelementEnd();
} }
function CropperComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r1.loadImageErrorText);
} }
class CropperComponent {
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
/** @nocollapse */ CropperComponent.ɵcmp = ɵɵdefineComponent({ type: CropperComponent, selectors: [["angular-cropper"]], viewQuery: function CropperComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵstaticViewQuery(_c0, true, ElementRef);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.image = _t.first);
    } }, inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, decls: 6, vars: 3, consts: [[1, "cropper-wrapper"], ["class", "loading-block", 4, "ngIf"], ["class", "alert alert-warning", 4, "ngIf"], [1, "cropper"], ["alt", "image", 3, "src", "load", "error"], ["image", ""], [1, "loading-block"], [1, "spinner"], [1, "alert", "alert-warning"]], template: function CropperComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, CropperComponent_div_1_Template, 2, 0, "div", 1);
        ɵɵtemplate(2, CropperComponent_div_2_Template, 2, 1, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "img", 4, 5);
        ɵɵlistener("load", function CropperComponent_Template_img_load_4_listener($event) { return ctx.imageLoaded($event); })("error", function CropperComponent_Template_img_error_4_listener($event) { return ctx.imageLoadError($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isLoading);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.loadError);
        ɵɵadvance(2);
        ɵɵproperty("src", ctx.imageUrl, ɵɵsanitizeUrl);
    } }, directives: [NgIf], styles: [":host{display:block}.cropper img{height:auto;max-height:100%;max-width:100%}.cropper-wrapper{min-height:80px;position:relative}.cropper-wrapper .loading-block{height:100%;left:0;position:absolute;top:0;width:100%}.cropper-wrapper .loading-block .spinner{-webkit-animation:cssload-spin 425ms linear infinite;animation:cssload-spin 425ms linear infinite;border-color:rgba(97,100,193,.98) transparent;border-radius:50%;border-style:solid;border-width:2px;height:31px;left:calc(50% - 15px);margin:0 auto;position:absolute;top:calc(50% - 15px);width:31px}@-webkit-keyframes cssload-spin{to{transform:rotate(1turn)}}@keyframes cssload-spin{to{transform:rotate(1turn)}}\n\n/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CropperComponent, [{
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

class AngularCropperjsModule {
}
/** @nocollapse */ AngularCropperjsModule.ɵmod = ɵɵdefineNgModule({ type: AngularCropperjsModule });
/** @nocollapse */ AngularCropperjsModule.ɵinj = ɵɵdefineInjector({ factory: function AngularCropperjsModule_Factory(t) { return new (t || AngularCropperjsModule)(); }, imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(AngularCropperjsModule, { declarations: [CropperComponent], imports: [CommonModule], exports: [CropperComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(AngularCropperjsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                declarations: [CropperComponent],
                exports: [CropperComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of angular-cropperjs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularCropperjsModule, AngularCropperjsService, CropperComponent };
//# sourceMappingURL=angular-cropperjs.js.map
