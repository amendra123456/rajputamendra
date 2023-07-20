import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDashComponent } from './dashboard-collections/campaign-dash/campaign-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumerDropComponent } from './dashboard-collections/consumer-drop/consumer-drop.component';
// import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { ConsumerPlanDistributionComponent } from './dashboard-collections/consumer-plan-distribution/consumer-plan-distribution.component';
import { Top5CampaignComponent } from './dashboard-collections/top5-campaign/top5-campaign.component';
import { Top5CompetitionComponent } from './dashboard-collections/top5-competition/top5-competition.component';
import { TrafficDistributionComponent } from './dashboard-collections/traffic-distribution/traffic-distribution.component';
import { CampaignListDataComponent } from './dashboard-collections/campaign-list-data/campaign-list-data.component';
import { ClientDashboardComponent } from './dashboard-collections/client-dashboard/client-dashboard.component';
import { AffiliateDashbordComponent } from './dashboard-collections/affiliate-dashbord/affiliate-dashbord.component';
import { CommingSoonComponent } from './dashboard-collections/comming-soon/comming-soon.component';
import { Top5CompetitionListComponent } from './dashboard-collections/top5-competition-list/top5-competition-list.component';
import { ConsumerPlanDistListComponent } from './dashboard-collections/consumer-plan-dist-list/consumer-plan-dist-list.component';
import { ConsumerDropListComponent } from './dashboard-collections/consumer-drop-list/consumer-drop-list.component';
import { TopFiveCampaignListComponent } from './dashboard-collections/top-five-campaign-list/top-five-campaign-list.component';
import { TrafficOrganicListComponent } from './dashboard-collections/traffic-organic-list/traffic-organic-list.component';
import { CampaignRevenueListComponent } from './dashboard-collections/campaign-revenue-list/campaign-revenue-list.component';

import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { DemographicComponent } from './dashboard-collections/coming-soon/demographic/demographic.component';
import { PersonaComponent } from './dashboard-collections/coming-soon/persona/persona.component';
import { KeywordBasedComponent } from './dashboard-collections/coming-soon/keyword-based/keyword-based.component';
import { KnowAudiencePersonaComponent } from './dashboard-collections/coming-soon/know-audience-persona/know-audience-persona.component';
import { KnowAudienceKeywordComponent } from './dashboard-collections/coming-soon/know-audience-keyword/know-audience-keyword.component';

import { KnowAudienceDemographicComponent } from './dashboard-collections/coming-soon/know-audience-demographic/know-audience-demographic.component';

import { ReachAudienceL1Component } from './dashboard-collections/coming-soon/reach-audience-l1/reach-audience-l1.component';
import { ReachAudienceL2Component } from './dashboard-collections/coming-soon/reach-audience-l2/reach-audience-l2.component';
import { InsightsComponent } from './dashboard-collections/coming-soon/insights/insights.component';
import { NotificationDetailComponent } from './dashboard-collections/notification-detail/notification-detail.component';

const routes: Routes = [
 
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'dashboard/campaign-dash',component:CampaignDashboardComponent },
  { path: 'dashboard/consumer-drop',component:ConsumerDropComponent},
  { path: 'dashboard/consumer-plan-distribution',component:ConsumerPlanDistributionComponent},
  { path: 'dashboard/client-dashboard',component:ClientDashboardComponent},
  { path: 'dashboard/top-5campains',component:Top5CampaignComponent},
  { path: 'dashboard/top-5competitions',component:Top5CompetitionComponent},
  { path: 'dashboard/trafic-distribution',component:TrafficDistributionComponent}, 

  { path: 'dashboard/campaign-list-data', component:CampaignListDataComponent},
  { path: 'dashboard/top5-competition-list', component:Top5CompetitionListComponent},
  { path: 'dashboard/consumer-pland-list',component:ConsumerPlanDistListComponent},
  { path: 'dashboard/consumer-drop-list',component:ConsumerDropListComponent},
  { path: 'dashboard/top5-Campaign-list',component:TopFiveCampaignListComponent},
  { path: 'dashboard/traffic-organic-list',component:TrafficOrganicListComponent},
  { path: 'dashboard/campaign-revenue-list',component: CampaignRevenueListComponent},
  // {
  //   path: 'campaign-dash',
  //   component:CampaignDashboardComponent
  // },
  // {
  //   path:'consumer-drop',
  //   component:ConsumerDropComponent
  // },
  // {
  //   path:'consumer-plan-distribution',
  //   component:ConsumerPlanDistributionComponent
  // },
  // {
  //   path:'campaign-list-data',
  //   component:CampaignListDataComponent
  //  },
  //  {
  //   path:'client-dashboard',
  //   component:ClientDashboardComponent
  //  }
  //  ,
  // {
  //   path:'top-5campains',
  //   component:Top5CampaignComponent
  // },
  // {
  //   path:'top-5competitions',
  //   component:Top5CompetitionComponent
  // },
  // {
  //   path:'trafic-distribution',
  //   component:TrafficDistributionComponent
  // },
  // {
  //   path:'affiliate-dashboard',
  //   component:AffiliateDashbordComponent
  // },
  {
    path:"cm-dash1",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash2",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash3",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash4",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash5",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash6",
    component:CommingSoonComponent
  },
  {
    path:"cm-dash7",
    component:CommingSoonComponent
  },

  {
    path:"search-audience/demographic",
    component:DemographicComponent
  },

  {
    path:"search-audience/person",
    component:PersonaComponent
  },

  {
    path:"search-audience/keyword",
    component:KeywordBasedComponent
  },
  {
    path:"know-audience/demographic",
    component:KnowAudienceDemographicComponent
  },

  {
    path:"know-audience/persona",
    component:KnowAudiencePersonaComponent
  },
  {
    path:"know-audience/keyword",
    component:KnowAudienceKeywordComponent
  },
  {
    path:"reach-audience/level1",
    component:ReachAudienceL1Component
  },
  {
    path:"reach-audience/level2",
    component:ReachAudienceL2Component
  },
  {
    path:"insight/insight",
    component:InsightsComponent
  },


  



  // {
  //   path:"top5-competition-list",
  //   component:Top5CompetitionListComponent
  // },
  // {
  //   path:"consumer-pland-list",
  //   component:ConsumerPlanDistListComponent
  // },
  // {
  //   path:"consumer-drop-list",
  //   component:ConsumerDropListComponent
  // },
  // {
  //   path:"top5-Campaign-list",
  //   component:TopFiveCampaignListComponent
  // },
  // {
  //   path:"traffic-organic-list",
  //   component:TrafficOrganicListComponent
  // },
  // {
  //  path:"campaign-revenue-list",
  //  component: CampaignRevenueListComponent
  // },
  // un implemented route modules below !!
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)
  },
  {
    path: 'ui', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: 'extended', loadChildren: () => import('./extended/extended.module').then(m => m.ExtendedModule)
  },
  {
    path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },
  { path: 'dashboard/notification-detail',component: NotificationDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
