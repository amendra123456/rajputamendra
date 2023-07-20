import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountToModule } from 'angular-count-to';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from './apps/apps.module';
import { ExtraspagesModule } from './extraspages/extraspages.module';
import { ComponentsModule } from './components/components.module';
import { ExtendedModule } from './extended/extended.module';
import { TablesModule } from './tables/tables.module';
// import { ChartModule } from './chart/chart.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { PagesRoutingModule } from './pages-routing.module';
import { ChartsModule  } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { CampaignDashComponent } from './dashboard-collections/campaign-dash/campaign-dash.component';
import { HttpClientModule } from '@angular/common/http';
import { Top5CompetitionComponent } from './dashboard-collections/top5-competition/top5-competition.component';
import { ConsumerDropComponent } from './dashboard-collections/consumer-drop/consumer-drop.component';
import { ConsumerPlanDistributionComponent } from './dashboard-collections/consumer-plan-distribution/consumer-plan-distribution.component';
import { Top5CampaignComponent } from './dashboard-collections/top5-campaign/top5-campaign.component';
import { ClientDashboardComponent } from './dashboard-collections/client-dashboard/client-dashboard.component';
import { TrafficDistributionComponent } from './dashboard-collections/traffic-distribution/traffic-distribution.component';
// import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { CampaignListDataComponent } from './dashboard-collections/campaign-list-data/campaign-list-data.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AffiliateDashbordComponent } from './dashboard-collections/affiliate-dashbord/affiliate-dashbord.component';
import { CommingSoonComponent } from './dashboard-collections/comming-soon/comming-soon.component';
import { Top5CompetitionListComponent } from './dashboard-collections/top5-competition-list/top5-competition-list.component';
// import { ChartModule } from './pages/chart/chart.module';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { HighchartsChartModule } from 'highcharts-angular';
import {ChartModule}  from 'angular-highcharts';
import { ConsumerPlanDistListComponent } from './dashboard-collections/consumer-plan-dist-list/consumer-plan-dist-list.component';
import { ConsumerDropListComponent } from './dashboard-collections/consumer-drop-list/consumer-drop-list.component';
import { TopFiveCampaignListComponent } from './dashboard-collections/top-five-campaign-list/top-five-campaign-list.component';
import { TrafficOrganicListComponent } from './dashboard-collections/traffic-organic-list/traffic-organic-list.component';
import { CampaignRevenueListComponent } from './dashboard-collections/campaign-revenue-list/campaign-revenue-list.component';

import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { RevenueDashboardComponent } from './dashboard-collections/revenue-dashboard/revenue-dashboard.component';
import { DemographicComponent } from './dashboard-collections/coming-soon/demographic/demographic.component';
import { PersonaComponent } from './dashboard-collections/coming-soon/persona/persona.component';
import { KeywordBasedComponent } from './dashboard-collections/coming-soon/keyword-based/keyword-based.component';
import { KnowAudiencePersonaComponent } from './dashboard-collections/coming-soon/know-audience-persona/know-audience-persona.component';
import { KnowAudienceKeywordComponent } from './dashboard-collections/coming-soon/know-audience-keyword/know-audience-keyword.component';
import { ReachAudienceL1Component } from './dashboard-collections/coming-soon/reach-audience-l1/reach-audience-l1.component';
import { ReachAudienceL2Component } from './dashboard-collections/coming-soon/reach-audience-l2/reach-audience-l2.component';
import { InsightsComponent } from './dashboard-collections/coming-soon/insights/insights.component';
import { ComingSoonImageComponent } from './dashboard-collections/coming-soon/coming-soon-image/coming-soon-image.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailViewComponent } from './dashboard-collections/detail-view/detail-view.component';
import { KnowAudienceDemographicComponent } from './dashboard-collections/coming-soon/know-audience-demographic/know-audience-demographic.component';
import { NotificationDetailComponent } from './dashboard-collections/notification-detail/notification-detail.component';
import { TransformstringPipe } from './transformstring.pipe';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CampaignDashComponent,
    Top5CompetitionComponent,
    ConsumerDropComponent,
    ConsumerPlanDistributionComponent,
    Top5CampaignComponent,
    ClientDashboardComponent,
    TrafficDistributionComponent,
    CampaignDashboardComponent,
    CampaignListDataComponent,
    AffiliateDashbordComponent,
    CommingSoonComponent,
    Top5CompetitionListComponent,
    ConsumerPlanDistListComponent,
    ConsumerDropListComponent,
    TopFiveCampaignListComponent,
    TrafficOrganicListComponent,
    CampaignRevenueListComponent,
    RevenueDashboardComponent,
    DemographicComponent,
    PersonaComponent,
    KeywordBasedComponent,
    KnowAudiencePersonaComponent,
    KnowAudienceKeywordComponent,
    ReachAudienceL1Component,
    ReachAudienceL2Component,
    InsightsComponent,
    ComingSoonImageComponent,
    DetailViewComponent,
    KnowAudienceDemographicComponent,
    NotificationDetailComponent,
    TransformstringPipe,
    BlockCopyPasteDirective
  ],
  imports: [
    CommonModule,
    WidgetModule,
    CountToModule,
    SharedModule,
    NgApexchartsModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    AppsModule,
    ExtraspagesModule,
    ComponentsModule,
    ExtendedModule,
    LightboxModule,
    FormsModule,
    ReactiveFormsModule,
    TablesModule,
    ChartModule,
    LeafletModule,
    ChartsModule,
    HttpClientModule,
    HighchartsChartModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers:[ToastrService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ]
})
export class PagesModule { }
