import {
  DomSanitizer
} from "./chunk-W4XWCQSP.js";
import {
  NgClass
} from "./chunk-W64MAQ4E.js";
import {
  Component,
  Directive,
  ElementRef,
  Injectable,
  NgModule,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  setClassMetadata,
  viewChild,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵhostProperty,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵviewQuerySignal
} from "./chunk-XAF5YQQW.js";

// node_modules/@coreui/icons-angular/fesm2022/coreui-icons-angular.mjs
var _c0 = ["svgElement"];
function IconComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 1, 0);
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerHtml", ctx_r0.innerHtml(), ɵɵsanitizeHtml)("ngClass", ctx_r0.computedClasses())("cHtmlAttr", ctx_r0.attributes());
    ɵɵattribute("width", ctx_r0.width())("height", ctx_r0.height() || ctx_r0.width())("viewBox", (tmp_7_0 = ctx_r0.viewBox()) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : ctx_r0.scale());
  }
}
function IconComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2, 0);
    ɵɵelement(2, "use");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.computedClasses())("cHtmlAttr", ctx_r0.attributes());
    ɵɵattribute("width", ctx_r0.width())("height", ctx_r0.height() || ctx_r0.width());
    ɵɵadvance(2);
    ɵɵattribute("href", ctx_r0.use());
  }
}
var IconSetService = class _IconSetService {
  get iconNames() {
    return this.#iconNames;
  }
  #iconNames = {};
  get icons() {
    return this.#icons;
  }
  set icons(iconSet) {
    for (const iconsKey in iconSet) {
      this.#iconNames[iconsKey] = iconsKey;
    }
    this.#icons = iconSet;
  }
  #icons = {};
  getIcon(name) {
    const icon = this.icons[name];
    if (!icon) {
      console.warn(`CoreUI WARN: Icon ${name} is not registered in IconService`);
    }
    return this.icons[name];
  }
  static {
    this.ɵfac = function IconSetService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconSetService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _IconSetService,
      factory: _IconSetService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconSetService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IconSetModule = class _IconSetModule {
  constructor() {
    const parentModule = inject(_IconSetModule, {
      optional: true,
      skipSelf: true
    });
    if (parentModule) {
      throw new Error("CoreUI IconSetModule is already loaded. Import it in the AppModule only");
    }
  }
  static forRoot() {
    return {
      ngModule: _IconSetModule,
      providers: [{
        provide: IconSetService
      }]
    };
  }
  static {
    this.ɵfac = function IconSetModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconSetModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _IconSetModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [IconSetService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconSetModule, [{
    type: NgModule,
    args: [{
      providers: [IconSetService]
    }]
  }], () => [], null);
})();
function toCamelCase(value) {
  return value.replace(/([-_][a-z0-9])/ig, ($1) => {
    return $1.toUpperCase().replace("-", "");
  });
}
function transformName(value) {
  return value && value.includes("-") ? toCamelCase(value) : value;
}
var IconDirective = class _IconDirective {
  constructor() {
    this.#sanitizer = inject(DomSanitizer);
    this.#iconSet = inject(IconSetService);
    this.content = input(void 0, {
      alias: "cIcon"
    });
    this.customClasses = input();
    this.size = input("");
    this.title = input();
    this.height = input();
    this.width = input();
    this.name = input("", {
      transform: transformName
    });
    this.viewBoxInput = input(void 0, {
      alias: "viewBox"
    });
    this.xmlns = input("http://www.w3.org/2000/svg");
    this.pointerEvents = input("none", {
      alias: "pointer-events"
    });
    this.role = input("img");
    this.hostClasses = computed(() => {
      const computedSize = this.computedSize();
      const classes = {
        icon: true,
        [`icon-${computedSize}`]: !!computedSize
      };
      return this.customClasses() ?? classes;
    });
    this.viewBox = computed(() => {
      return this.viewBoxInput() ?? this.scale();
    });
    this.innerHtml = computed(() => {
      const codeVal = this.code();
      const code = Array.isArray(codeVal) ? codeVal?.[1] ?? codeVal?.[0] ?? "" : codeVal || "";
      return this.#sanitizer.bypassSecurityTrustHtml(this.#titleCode() + code || "");
    });
    this.#titleCode = computed(() => {
      return this.title() ? `<title>${this.title()}</title>` : "";
    });
    this.code = computed(() => {
      const content = this.content();
      if (content) {
        return content;
      }
      const name = this.name();
      if (this.#iconSet && name) {
        return this.#iconSet.getIcon(name);
      }
      if (name && !this.#iconSet?.icons[name]) {
        console.warn(`cIcon directive: The '${name}' icon not found. Add it to the IconSet service for use with the 'name' property. 
`, name);
      }
      return "";
    });
    this.scale = computed(() => {
      return Array.isArray(this.code()) && (this.code()?.length ?? 0) > 1 ? `0 0 ${this.code()?.[0]}` : "0 0 64 64";
    });
    this.computedSize = computed(() => {
      const addCustom = !this.size() && (this.width() || this.height());
      return this.size() === "custom" || addCustom ? "custom-size" : this.size();
    });
  }
  #sanitizer;
  #iconSet;
  #titleCode;
  static {
    this.ɵfac = function IconDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _IconDirective,
      selectors: [["svg", "cIcon", ""]],
      hostVars: 8,
      hostBindings: function IconDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("innerHtml", ctx.innerHtml(), ɵɵsanitizeHtml);
          ɵɵattribute("viewBox", ctx.viewBox())("xmlns", ctx.xmlns())("pointer-events", ctx.pointerEvents())("role", ctx.role())("aria-hidden", true);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        content: [1, "cIcon", "content"],
        customClasses: [1, "customClasses"],
        size: [1, "size"],
        title: [1, "title"],
        height: [1, "height"],
        width: [1, "width"],
        name: [1, "name"],
        viewBoxInput: [1, "viewBox", "viewBoxInput"],
        xmlns: [1, "xmlns"],
        pointerEvents: [1, "pointer-events", "pointerEvents"],
        role: [1, "role"]
      },
      exportAs: ["cIcon"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconDirective, [{
    type: Directive,
    args: [{
      exportAs: "cIcon",
      selector: "svg[cIcon]",
      host: {
        "[innerHtml]": "innerHtml()",
        "[class]": "hostClasses()",
        "[attr.viewBox]": "viewBox()",
        "[attr.xmlns]": "xmlns()",
        "[attr.pointer-events]": "pointerEvents()",
        "[attr.role]": "role()",
        "[attr.aria-hidden]": "true"
      }
    }]
  }], null, null);
})();
var HtmlAttributesDirective = class _HtmlAttributesDirective {
  constructor() {
    this.cHtmlAttr = input();
    this.#renderer = inject(Renderer2);
    this.#elementRef = inject(ElementRef);
    this.attrEffect = effect(() => {
      const attribs = this.cHtmlAttr();
      for (const attr in attribs) {
        if (attr === "style" && typeof attribs[attr] === "object") {
          this.setStyle(attribs[attr]);
        } else if (attr === "class") {
          this.addClass(attribs[attr]);
        } else {
          this.setAttrib(attr, attribs[attr]);
        }
      }
    });
  }
  #renderer;
  #elementRef;
  setStyle(styles) {
    for (const style in styles) {
      if (style) {
        this.#renderer.setStyle(this.#elementRef.nativeElement, style, styles[style]);
      }
    }
  }
  addClass(classes) {
    const classArray = Array.isArray(classes) ? classes : classes.split(" ");
    classArray.filter((element) => element.length > 0).forEach((element) => {
      this.#renderer.addClass(this.#elementRef.nativeElement, element);
    });
  }
  setAttrib(key, value) {
    value !== null ? this.#renderer.setAttribute(this.#elementRef.nativeElement, key, value) : this.#renderer.removeAttribute(this.#elementRef.nativeElement, key);
  }
  static {
    this.ɵfac = function HtmlAttributesDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HtmlAttributesDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _HtmlAttributesDirective,
      selectors: [["", "cHtmlAttr", ""]],
      inputs: {
        cHtmlAttr: [1, "cHtmlAttr"]
      },
      exportAs: ["cHtmlAttr"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HtmlAttributesDirective, [{
    type: Directive,
    args: [{
      selector: "[cHtmlAttr]",
      exportAs: "cHtmlAttr"
    }]
  }], null, null);
})();
var IconComponent = class _IconComponent {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#elementRef = inject(ElementRef);
    this.#sanitizer = inject(DomSanitizer);
    this.#iconSet = inject(IconSetService);
    this.content = input();
    this.attributes = input({
      role: "img"
    });
    this.customClasses = input();
    this.size = input("");
    this.title = input();
    this.use = input("");
    this.height = input();
    this.width = input();
    this.name = input("", {
      transform: transformName
    });
    this.viewBoxInput = input(void 0, {
      alias: "viewBox"
    });
    this.svgElementRef = viewChild("svgElement");
    this.#svgElementEffect = effect(() => {
      const svgElementRef = this.svgElementRef();
      const hostElement = this.#elementRef.nativeElement;
      if (svgElementRef && hostElement) {
        const svgElement = svgElementRef.nativeElement;
        hostElement.classList?.forEach((item) => {
          this.#renderer.addClass(svgElement, item);
        });
        const parentElement = this.#renderer.parentNode(hostElement);
        this.#renderer.insertBefore(parentElement, svgElement, hostElement);
        this.#renderer.removeChild(parentElement, hostElement);
      }
    });
    this.viewBox = computed(() => {
      return this.viewBoxInput() ?? this.scale();
    });
    this.innerHtml = computed(() => {
      const codeVal = this.code();
      const code = Array.isArray(codeVal) ? codeVal?.[1] ?? codeVal?.[0] ?? "" : codeVal || "";
      return this.#sanitizer.bypassSecurityTrustHtml(this.#titleCode() + code || "");
    });
    this.#titleCode = computed(() => {
      return this.title() ? `<title>${this.title()}</title>` : "";
    });
    this.code = computed(() => {
      const content = this.content();
      if (content) {
        return content;
      }
      const name = this.name();
      if (this.#iconSet && name) {
        return this.#iconSet.getIcon(name);
      }
      if (name && !this.#iconSet?.icons[name]) {
        console.warn(`c-icon component: The '${name}' icon not found. Add it to the IconSet service for use with the 'name' property. 
`, name);
      }
      return "";
    });
    this.scale = computed(() => {
      return Array.isArray(this.code()) && (this.code()?.length ?? 0) > 1 ? `0 0 ${this.code()?.[0]}` : "0 0 64 64";
    });
    this.computedSize = computed(() => {
      const addCustom = !this.size() && (this.width() || this.height());
      return this.size() === "custom" || addCustom ? "custom-size" : this.size();
    });
    this.computedClasses = computed(() => {
      const classes = {
        icon: true,
        [`icon-${this.computedSize()}`]: !!this.computedSize()
      };
      return this.customClasses() ?? classes;
    });
  }
  #renderer;
  #elementRef;
  #sanitizer;
  #iconSet;
  #svgElementEffect;
  #titleCode;
  static {
    this.ɵfac = function IconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _IconComponent,
      selectors: [["c-icon"]],
      viewQuery: function IconComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.svgElementRef, _c0, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: ["ngSkipHydration", "true", 2, "display", "none"],
      inputs: {
        content: [1, "content"],
        attributes: [1, "attributes"],
        customClasses: [1, "customClasses"],
        size: [1, "size"],
        title: [1, "title"],
        use: [1, "use"],
        height: [1, "height"],
        width: [1, "width"],
        name: [1, "name"],
        viewBoxInput: [1, "viewBox", "viewBoxInput"]
      },
      exportAs: ["cIconComponent"],
      decls: 2,
      vars: 1,
      consts: [["svgElement", ""], ["xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true", "pointer-events", "none", "role", "img", 3, "innerHtml", "ngClass", "cHtmlAttr"], ["xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true", "pointer-events", "none", "role", "img", 3, "ngClass", "cHtmlAttr"]],
      template: function IconComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, IconComponent_Conditional_0_Template, 2, 6, ":svg:svg", 1)(1, IconComponent_Conditional_1_Template, 3, 5, ":svg:svg", 2);
        }
        if (rf & 2) {
          ɵɵconditional(!ctx.use() && !!ctx.code() ? 0 : ctx.use() ? 1 : -1);
        }
      },
      dependencies: [NgClass, HtmlAttributesDirective],
      styles: [".icon[_ngcontent-%COMP%]{display:inline-block;color:inherit;text-align:center;vertical-align:-.125rem;fill:currentColor}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size){width:1rem;height:1rem;font-size:1rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-xxl{width:2rem;height:2rem;font-size:2rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-xl{width:1.5rem;height:1.5rem;font-size:1.5rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-lg{width:1.25rem;height:1.25rem;font-size:1.25rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-sm{width:.875rem;height:.875rem;font-size:.875rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-3xl{width:3rem;height:3rem;font-size:3rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-4xl{width:4rem;height:4rem;font-size:4rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-5xl{width:5rem;height:5rem;font-size:5rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-6xl{width:6rem;height:6rem;font-size:6rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-7xl{width:7rem;height:7rem;font-size:7rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-8xl{width:8rem;height:8rem;font-size:8rem}.icon[_ngcontent-%COMP%]:not(.icon-c-s):not(.icon-custom-size).icon-9xl{width:9rem;height:9rem;font-size:9rem}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconComponent, [{
    type: Component,
    args: [{
      exportAs: "cIconComponent",
      imports: [NgClass, HtmlAttributesDirective],
      selector: "c-icon",
      host: {
        ngSkipHydration: "true",
        style: "display: none"
      },
      template: '@if (!use() && !!code()) {\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    [attr.width]="width()"\n    [attr.height]="height() || width()"\n    [attr.viewBox]="viewBox() ?? scale()"\n    [innerHtml]="innerHtml()"\n    [ngClass]="computedClasses()"\n    [cHtmlAttr]="attributes()"\n    aria-hidden="true"\n    pointer-events="none"\n    role="img"\n    #svgElement\n  >\n  </svg>\n} @else if (use()) {\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    [attr.width]="width()"\n    [attr.height]="height() || width()"\n    [ngClass]="computedClasses()"\n    [cHtmlAttr]="attributes()"\n    aria-hidden="true"\n    pointer-events="none"\n    role="img"\n    #svgElement\n  >\n    <use [attr.href]="use()"></use>\n  </svg>\n}\n',
      styles: [".icon{display:inline-block;color:inherit;text-align:center;vertical-align:-.125rem;fill:currentColor}.icon:not(.icon-c-s):not(.icon-custom-size){width:1rem;height:1rem;font-size:1rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-xxl{width:2rem;height:2rem;font-size:2rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-xl{width:1.5rem;height:1.5rem;font-size:1.5rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-lg{width:1.25rem;height:1.25rem;font-size:1.25rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-sm{width:.875rem;height:.875rem;font-size:.875rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-3xl{width:3rem;height:3rem;font-size:3rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-4xl{width:4rem;height:4rem;font-size:4rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-5xl{width:5rem;height:5rem;font-size:5rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-6xl{width:6rem;height:6rem;font-size:6rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-7xl{width:7rem;height:7rem;font-size:7rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-8xl{width:8rem;height:8rem;font-size:8rem}.icon:not(.icon-c-s):not(.icon-custom-size).icon-9xl{width:9rem;height:9rem;font-size:9rem}\n"]
    }]
  }], null, null);
})();
var IconModule = class _IconModule {
  static {
    this.ɵfac = function IconModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _IconModule,
      imports: [IconComponent, IconDirective],
      exports: [IconComponent, IconDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconModule, [{
    type: NgModule,
    args: [{
      imports: [IconComponent, IconDirective],
      exports: [IconComponent, IconDirective]
    }]
  }], null, null);
})();

export {
  IconSetService,
  IconSetModule,
  IconDirective,
  IconComponent,
  IconModule
};
//# sourceMappingURL=chunk-IZQGUJUQ.js.map
