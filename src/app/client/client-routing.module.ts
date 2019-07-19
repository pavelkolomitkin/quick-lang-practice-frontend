import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {SearchComponent} from './components/search/search.component';
import {LayoutComponent} from './components/common/layout/layout.component';
import {AboutPageComponent} from './components/profile/about-page/about-page.component';
import {ContactListPageComponent} from './components/profile/contact-list-page/contact-list-page.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', component: SearchComponent },
            { path: 'profile/:id', component: ProfileComponent, children: [
                    { path: '', component: AboutPageComponent },
                    { path: 'contacts', component: ContactListPageComponent },
                ]
            }
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
