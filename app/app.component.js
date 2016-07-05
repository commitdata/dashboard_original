System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'angular2/router', './pages/products/product-list.component', './pages/products/product.service', './pages/home/home.component', './pages/bulkdata/bulkdata.component', './pages/staar/staar.component', './pages/aeis/aeis.component', './pages/scorecard/scorecard.component', './pages/donorschoose/donorschoose.component', './pages/products/product-detail.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, product_list_component_1, product_service_1, home_component_1, bulkdata_component_1, staar_component_1, aeis_component_1, scorecard_component_1, donorschoose_component_1, product_detail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (product_list_component_1_1) {
                product_list_component_1 = product_list_component_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (bulkdata_component_1_1) {
                bulkdata_component_1 = bulkdata_component_1_1;
            },
            function (staar_component_1_1) {
                staar_component_1 = staar_component_1_1;
            },
            function (aeis_component_1_1) {
                aeis_component_1 = aeis_component_1_1;
            },
            function (scorecard_component_1_1) {
                scorecard_component_1 = scorecard_component_1_1;
            },
            function (donorschoose_component_1_1) {
                donorschoose_component_1 = donorschoose_component_1_1;
            },
            function (product_detail_component_1_1) {
                product_detail_component_1 = product_detail_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pageTitle = 'Commit! Data';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app-begin',
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [product_service_1.ProductService,
                            http_1.HTTP_PROVIDERS,
                            http_1.JSONP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        { path: '/home', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/bulkdata', name: 'BulkData', component: bulkdata_component_1.BulkDataComponent },
                        { path: '/staar', name: 'Staar', component: staar_component_1.StaarComponent },
                        { path: '/aeis', name: 'Aeis', component: aeis_component_1.AeisComponent },
                        { path: '/scorecard', name: 'Scorecard', component: scorecard_component_1.ScorecardComponent },
                        { path: '/donorschoose/:id', name: 'DonorsChoose', component: donorschoose_component_1.DonorsChooseComponent },
                        { path: '/products', name: 'Products', component: product_list_component_1.ProductListComponent },
                        { path: '/product/:id', name: 'ProductDetail', component: product_detail_component_1.ProductDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map