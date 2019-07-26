import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {SearchComponent} from './components/search/search.component';
import {LayoutComponent} from './components/common/layout/layout.component';
import {AboutPageComponent} from './components/profile/about-page/about-page.component';
import {ContactListPageComponent} from './components/my-profile/contact-list-page/contact-list-page.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {ContactPageComponent} from './components/my-profile/contact-page/contact-page.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', component: SearchComponent },
            { path: 'profile', component: MyProfileComponent, children: [
                    { path: 'contacts', component: ContactListPageComponent },
                    { path: 'contacts/:id', component: ContactPageComponent },
                ]
            },
            { path: 'profile/:id', component: ProfileComponent, children: [
                    { path: '', component: AboutPageComponent },
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
