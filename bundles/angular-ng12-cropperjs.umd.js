(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('cropperjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-ng12-cropperjs', ['exports', '@angular/core', 'cropperjs', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["angular-ng12-cropperjs"] = {}, global.ng.core, global.Cropper, global.ng.common));
})(this, (function (exports, i0, Cropper, i1) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Cropper__default = /*#__PURE__*/_interopDefaultLegacy(Cropper);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var AngularCropperjsService = /** @class */ (function () {
        function AngularCropperjsService() {
        }
        return AngularCropperjsService;
    }());
    /** @nocollapse */ AngularCropperjsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ AngularCropperjsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var CropperComponent = /** @class */ (function () {
        function CropperComponent() {
            this.cropperOptions = {};
            this.export = new i0.EventEmitter();
            this.ready = new i0.EventEmitter();
            this.isLoading = true;
        }
        CropperComponent.prototype.ngOnInit = function () { };
        CropperComponent.prototype.ngOnDestroy = function () {
            if (this.cropper) {
                this.cropper.destroy();
                this.cropper = null;
            }
        };
        /**
         * Image loaded
         * @param ev
         */
        CropperComponent.prototype.imageLoaded = function (ev) {
            var _this = this;
            //
            // Unset load error state
            this.loadError = false;
            //
            // Setup image element
            var image = ev.target;
            this.imageElement = image;
            //
            // Add crossOrigin?
            if (this.cropperOptions.checkCrossOrigin) {
                image.crossOrigin = 'anonymous';
            }
            //
            // Image on ready event
            image.addEventListener('ready', function () {
                //
                // Emit ready
                _this.ready.emit(true);
                //
                // Unset loading state
                _this.isLoading = false;
                //
                // Validate cropbox existance
                if (_this.cropbox) {
                    //
                    // Set cropbox data
                    _this.cropper.setCropBoxData(_this.cropbox);
                }
            });
            //
            // Setup aspect ratio according to settings
            var aspectRatio = NaN;
            if (this.settings) {
                var _a = this.settings, width = _a.width, height = _a.height;
                aspectRatio = width / height;
            }
            //
            // Set crop options
            // extend default with custom config
            this.cropperOptions = Object.assign({
                aspectRatio: aspectRatio,
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
            this.cropper = new Cropper__default["default"](image, this.cropperOptions);
        };
        /**
         * Image load error
         * @param event
         */
        CropperComponent.prototype.imageLoadError = function (event) {
            //
            // Set load error state
            this.loadError = true;
            //
            // Unset loading state
            this.isLoading = false;
        };
        /**
         * Export canvas
         * @param base64
         */
        CropperComponent.prototype.exportCanvas = function (base64) {
            var _this = this;
            //
            // Get and set image, crop and canvas data
            var imageData = this.cropper.getImageData();
            var cropData = this.cropper.getCropBoxData();
            var canvas = this.cropper.getCroppedCanvas();
            var data = { imageData: imageData, cropData: cropData };
            //
            // Create promise to resolve canvas data
            var promise = new Promise(function (resolve) {
                //
                // Validate base64
                if (base64) {
                    //
                    // Resolve promise with dataUrl
                    return resolve({
                        dataUrl: canvas.toDataURL('image/png')
                    });
                }
                canvas.toBlob(function (blob) { return resolve({ blob: blob }); });
            });
            //
            // Emit export data when promise is ready
            promise.then(function (res) {
                _this.export.emit(Object.assign(data, res));
            });
        };
        return CropperComponent;
    }());
    /** @nocollapse */ CropperComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: CropperComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ CropperComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: CropperComponent, selector: "angular-cropper", inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, viewQueries: [{ propertyName: "image", first: true, predicate: ["image"], descendants: true, read: i0.ElementRef, static: true }], ngImport: i0__namespace, template: "<!-- CROPPER WRAPPER -->\n<div class=\"cropper-wrapper\">\n\n    <!-- LOADING -->\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\n        <div class=\"spinner\"></div>\n    </div>\n\n    <!-- LOAD ERROR -->\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\n\n    <!-- CROPPER -->\n    <div class=\"cropper\">\n        <img #image alt=\"image\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\n    </div>\n</div>\n", styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: CropperComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'angular-cropper',
                        templateUrl: './cropper.component.html',
                        styleUrls: ['./cropper.component.css'],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { image: [{
                    type: i0.ViewChild,
                    args: ['image', { read: i0.ElementRef, static: true }]
                }], imageUrl: [{
                    type: i0.Input
                }], settings: [{
                    type: i0.Input
                }], cropbox: [{
                    type: i0.Input
                }], loadImageErrorText: [{
                    type: i0.Input
                }], cropperOptions: [{
                    type: i0.Input
                }], export: [{
                    type: i0.Output
                }], ready: [{
                    type: i0.Output
                }] } });

    var AngularCropperjsModule = /** @class */ (function () {
        function AngularCropperjsModule() {
        }
        return AngularCropperjsModule;
    }());
    /** @nocollapse */ AngularCropperjsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ AngularCropperjsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsModule, declarations: [CropperComponent], imports: [i1.CommonModule], exports: [CropperComponent] });
    /** @nocollapse */ AngularCropperjsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsModule, imports: [[
                i1.CommonModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: AngularCropperjsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule
                        ],
                        declarations: [CropperComponent],
                        exports: [CropperComponent]
                    }]
            }] });

    /*
     * Public API Surface of angular-cropperjs
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AngularCropperjsModule = AngularCropperjsModule;
    exports.AngularCropperjsService = AngularCropperjsService;
    exports.CropperComponent = CropperComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular-ng12-cropperjs.umd.js.map
