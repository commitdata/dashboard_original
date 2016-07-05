import { Component }                from 'angular2/core';
import { HTTP_PROVIDERS, 
    JSONP_PROVIDERS }               from 'angular2/http';
import 'rxjs/Rx';                   // Load all features
import { ROUTER_PROVIDERS, RouteConfig, 
    ROUTER_DIRECTIVES }             from 'angular2/router';

import { ProductListComponent }     from './pages/products/product-list.component';
import { ProductService }           from './pages/products/product.service'; 

import { HomeComponent }            from './pages/home/home.component';
import { BulkDataComponent }        from './pages/bulkdata/bulkdata.component'
import { StaarComponent }           from './pages/staar/staar.component';
import { AeisComponent }            from './pages/aeis/aeis.component';
import { ScorecardComponent }       from './pages/scorecard/scorecard.component';
import { DonorsChooseComponent }    from './pages/donorschoose/donorschoose.component';
import { ProductDetailComponent }	from './pages/products/product-detail.component';

@Component({
    selector: 'app-begin',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService,
                HTTP_PROVIDERS,
                JSONP_PROVIDERS,
                ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/bulkdata', name: 'BulkData', component: BulkDataComponent },
    { path: '/staar', name: 'Staar', component: StaarComponent },
    { path: '/aeis', name: 'Aeis', component: AeisComponent },
    { path: '/scorecard', name: 'Scorecard', component: ScorecardComponent },
    { path: '/donorschoose/:id', name: 'DonorsChoose', component: DonorsChooseComponent },
    { path: '/products', name: 'Products', component: ProductListComponent },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetailComponent }
])
export class AppComponent {
    pageTitle: string = 'Commit! Data';
}
