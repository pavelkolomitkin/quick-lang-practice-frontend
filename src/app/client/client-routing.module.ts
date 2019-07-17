import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {SearchComponent} from './components/search/search.component';
import {LayoutComponent} from './components/common/layout/layout.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', component: SearchComponent },
            { path: 'profile/:id', component: ProfileComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule
{

}
