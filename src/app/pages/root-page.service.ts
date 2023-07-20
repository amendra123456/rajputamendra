import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MfuelExtensionService } from "./mfuel-extension.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class RootPageService {
  tempObj = {
    line_name: "Landings",
    x_axis_data: 26,
    y_axis_data: "8/2020",
  };

  // base_url: string = "https://nodestagingapi-2030379580.eu-west-1.elb.amazonaws.com/api/";
  //java url
  // base_url1: string = "https://javaapi-184759981.eu-west-1.elb.amazonaws.com/api/";
  // radha http://192.168.40.135:8086

  //base_url: string = "http://localhost:9090/api/";

  base_url: string = environment.base_url_node;
  base_url1: string = environment.base_url_java;


  // https://javastaing.encashoffers.com/
  // https://nodestaging.encashoffers.com/
  // base_url: string = "http://192.168.40.241:9090/api/";
  // base_url="http://192.168.40.241:9090/api"

  dashboardUrl: string = "dashboard/";
  totalLandingConversionRevenue: string = "total-landing-conversion-revenue";
  drillDownCustomer: string = "drill-down-customer";
  client: string = "client/";
  campaignList: string = "campaign-list";
  campaignStatusCount: string = "campaign-status-count";
  topFiveCampaignList: string = "top-five-campaign-list";
  conversion_revenue_expense: string = "conversion-revenue-expense";
  conversion_revenue_expense_by_affiliate: string =
    "conversion-revenue-expense-by-affiliate";
  campaign_status_count_by_affiliate: string =
    "campaign-status-count-by-affiliate";
  getCover: string = "master/get-cover";
  getConsumerPlanDistributionPercentageReport: string =
    "getConsumerPlanDistributionPercentageReport";
  // client dashboard Apis
  //localhost:9090/api/dashboard/client/client-list
  //localhost:9090/api/dashboard/client/campaign-list?clientId=5d11fd7768d3820aa7a3f5b3
  //localhost:9090/api/dashboard/client/campaign-status-count?clientId=5d11fd7768d3820aa7a3f5b3
  //localhost:9090/api/dashboard/client/top-five-campaign-list?campaignId=5f9a83f313e7950e0bcf49d2&day=2020-10-29
  //localhost:9090/api/dashboard/client/conversion-revenue-expense?campaignId=5f9a83f313e7950e0bcf49d2

  alarmNotificationUrl: string = "notification/";
  alamnotificationList:string = "unread-notification-list";
  updatenotification:string = "update-notification-status";
  countnotification:string = "unread-notification-list-count";

  campaignData = new BehaviorSubject(this.tempObj);
  consumerPlanDistData = new BehaviorSubject(null);
  topFiveCompitionApiParams = new BehaviorSubject(null);
  consumerDropData = new BehaviorSubject(null);
  topFiveCampaignData = new BehaviorSubject(null);
  trafficDistAffiliate_Organic = new BehaviorSubject(null);
  revenueDetailsList = new BehaviorSubject(null);

  current_date: any;
  getTopComptetion: string = "getTopComptetion";

  constructor(private http: MfuelExtensionService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() - 1).padStart(2, "0");
    this.current_date = `${year}-${month}-${day}`;
  }

  getCampaignData$(data: any) {
    this.campaignData.next(data);
  }

  shareCampaignData() {
    return this.campaignData;
  }
  loadIntialDataForDay(current_date: any, clientId: any) {
    if (clientId == "null") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?day=" +
        current_date
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?day=" +
        current_date +
        "&clientId=" +
        clientId
      );
    }
  }
  loadIntialDataForMonth(current_date: any, clientId: any) {
    if (clientId == "null") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?month=" +
        current_date
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?month=" +
        current_date +
        "&clientId=" +
        clientId
      );
    }
  }
  loadIntialDataForTotal(clientId: any) {
    if (clientId == "null") {
      return this.http.s_get(
        this.base_url + this.dashboardUrl + this.totalLandingConversionRevenue
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        clientId
      );
    }
  }
  getTotalData(client: any, campaign: any, yearParams: any) {
    if (campaign == "null") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        "" +
        yearParams
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        "&campaignId=" +
        campaign +
        "" +
        yearParams
      );
    }
  }
  getMonthlyData(client: any, campaign: any, ybcParams: any = "") {
    console.log("ybcParams ???????????????????????????????", ybcParams);
    if (campaign == "null") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        ybcParams
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        "&campaignId=" +
        campaign +
        "" +
        ybcParams
      );
    }
  }
  getDailyData(client: any, campaign: any, current_date: any) {
    if (campaign == "null") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        "&day=" +
        current_date
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.totalLandingConversionRevenue +
        "?clientId=" +
        client +
        "&campaignId=" +
        campaign +
        "&day=" +
        current_date
      );
    }
  }
  getDrillCountDataForTotal(api_params: string) {
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.drillDownCustomer +
      "?" +
      api_params
    );
  }
  getDrillCountDataForMonth(api_params: string) {
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.drillDownCustomer +
      "?" +
      api_params
    );
  }
  getDrillCountDataForDay(api_params: string) {
   if(api_params == null){
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.drillDownCustomer
    );
   }
   else{
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.drillDownCustomer +
      "?" +
      api_params
    );
   }
  }
 

  // CLIENT DASHBOARD API'S

  getClientsList() {
    return this.http.s_get(
      this.base_url + this.dashboardUrl + this.client + "client-list"
    );
  }
  // campaign-list?clientId=5d11fd7768d3820aa7a3f5b3
  getClientCampignList(clientId: any) {
    // return this.http.s_get(this.base_url + this.dashboardUrl + this.client + this.campaignList + '?clientId=' + clientId);
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.client +
      this.campaignList +
      "?clientId=" +
      clientId
    );
  }
  // campaign-status-count?clientId=5d11fd7768d3820aa7a3f5b3
  getCampaignStatusCount(clientId: any, dayOrMonth: any) {
    //should pass patnerId instead of _id
    if (dayOrMonth == ("" || undefined || null)) {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.campaignStatusCount +
        "?clientId=" +
        clientId
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.campaignStatusCount +
        "?clientId=" +
        clientId +
        dayOrMonth
      );
    }
  }
  // top-five-campaign-list?campaignId=5f9a83f313e7950e0bcf49d2&day=2020-10-29
  getTopFiveCampaignList(campaignId: any, dayOrMonth: any) {
    // bar graph
    if (dayOrMonth == ("" || undefined || null)) {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.topFiveCampaignList +
        "?campaignId=" +
        campaignId
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.topFiveCampaignList +
        "?campaignId=" +
        campaignId +
        dayOrMonth
      );
    }
  }
  // http://localhost:9090/api/dashboard/client/conversion-revenue-expense?campaignId=5f9a83f313e7950e0bcf49d2

  getConversionRevenueExpense(campaignId: any, dayOrMonth: any) {
    if (dayOrMonth == ("" || undefined || null)) {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.conversion_revenue_expense +
        "?campaignId=" +
        campaignId
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.client +
        this.conversion_revenue_expense +
        "?campaignId=" +
        campaignId +
        dayOrMonth
      );
    }
  }

  getAffiliateList() {
    //dashboard/affiliate-list
    return this.http.s_get(
      this.base_url + this.dashboardUrl + "affiliate-list"
    );
  }

  getConversion_Revenue_Expenses_By_affiliate(
    affiliateId: any,
    current_date: any,
    str: string
  ) {
    if (str == "yesterday") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.conversion_revenue_expense_by_affiliate +
        "?affiliateId=" +
        affiliateId +
        "&day=" +
        current_date
      );
    } else if (str == "monthly") {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.conversion_revenue_expense_by_affiliate +
        "?affiliateId=" +
        affiliateId +
        "&month=" +
        current_date
      );
    } else {
      return this.http.s_get(
        this.base_url +
        this.dashboardUrl +
        this.conversion_revenue_expense_by_affiliate +
        "?affiliateId=" +
        affiliateId
      );
    }
  }
  // campaign-status-count-by-affiliate?affiliateId=5d12f0103b77505613d388a6&day=2020-10-23
  getCampaign_Status_Count_By_affiliate(affiliateId: any) {
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.campaign_status_count_by_affiliate +
      "?affiliateId" +
      affiliateId
    );
  }

  // http://localhost:8086/api/getTopComptetion?month=22/02/2021&day=10/09/2020&clientId=5d1c4e6a87f6c79304a9e053
  getIntialTopCompetitions(current_date: any, str: string) {
    // https://javaapi-184759981.eu-west-1.elb.amazonaws.com/api/getTopComptetion

    if (str == "monthly") {
      return this.http.s_get(
        this.base_url1 + this.getTopComptetion + "?month=" + current_date
      );
    } else if (str == "yesterday") {
      return this.http.s_get(
        this.base_url1 + this.getTopComptetion + "?day=" + current_date
      );
    } else {
      return this.http.s_get(this.base_url1 + this.getTopComptetion);
    }
  }
  // http://localhost:8086/api/getTopComptetion?month=22/02/2021&day=10/09/2020&clientId=5d1c4e6a87f6c79304a9e053
  getClientTopCompetitions(clientID: any, current_date: any, str: string) {
    if (str == "monthly") {
      return this.http.s_get(
        this.base_url1 +
        this.getTopComptetion +
        "?month=" +
        current_date +
        "&clientId=" +
        clientID
      );
    } else if (str == "yesterday") {
      return this.http.s_get(
        this.base_url1 +
        this.getTopComptetion +
        "?day=" +
        current_date +
        "&clientId=" +
        clientID
      );
    } else {
      return this.http.s_get(
        this.base_url1 + this.getTopComptetion + "?clientId=" + clientID
      );
    }
  }

  getTopFiveComptetionDetailReport: string = "getTopFiveComptetionDetailReport";
  getConsumerDropPerReport: string = "getConsumerDropPerReport";

  // https://javaapi-184759981.eu-west-1.elb.amazonaws.com/api
  // /getTopFiveComptetionDetailReport?month=03&year=2021
  // &day=21&hour=10:26:09&clientId=5d1c4e6a87f6c79304a9e053
  // getTop5CompetitionDetailReport(obj:any){
  //   //let obj= {line_name: 'Conversion', x_axis_data: 49, y_axis_data: '12/2020', date_title: 'Year'}
  // if(obj.date_title == "Year"){
  //   let [m,y]=obj.y_axis_data.split('/')
  //   // let y=dd[1]; let m=dd[0];
  //   return this.http.s_get(this.base_url1+this.getTopFiveComptetionDetailReport+"?month="+m+"&year="+y);
  // }
  // else if(obj.date_title == "Days"){
  //   let monthData = obj.month;
  //   let m = monthData[obj.line_name].find((x:any)=>x._id.Day == obj.y_axis_data)?.Month;
  //   let yy = monthData[obj.line_name].find((x:any)=>x._id.Day == obj.y_axis_data)?.Year;
  //   return this.http.s_get(this.base_url1+this.getTopFiveComptetionDetailReport+"?day="+obj.y_axis_data+"&month="+m+"&year="+yy);
  // }
  // else if(obj.date_title == "Hour"){
  //   let dayData = obj.day;
  //   let d = dayData[obj.line_name].find((x:any)=>x._id.Hour == obj.y_axis_data)?.Day;
  //   let mm = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Month;
  //   let yy = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Year;
  //   let min = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Minute;
  //   let sec = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Second;
  //   let milSec = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.MilliSecond;

  //  return this.http.s_get(this.base_url1+this.getTopFiveComptetionDetailReport+"?month="+mm+"&day="+d+"&year="+yy+"&hour="+`${obj.y_axis_data}:${min}:${sec}.${milSec}`)
  // }
  // }

  getTop5CompetitionDetailReport(apiParams: any) {
    return this.http.s_get(
      this.base_url1 + this.getTopFiveComptetionDetailReport + apiParams
    );
  }

  getConsumerDropDetails(api_params: any) {
    if (api_params == null) {
      return this.http.s_get(this.base_url1 + this.getConsumerDropPerReport);
    } else {
      return this.http.s_get(
        this.base_url1 + this.getConsumerDropPerReport + api_params
      );
    }
  }

  getCoverListData() {
    // https://nodestaging.encashoffers.com/api/master/get-cover
    return this.http.s_get(this.base_url + this.getCover);
  }

  //  http://localhost:8086/api/getConsumerPlanDistributionPercentageReport
  // ?month=2023-04-20&day=2023-04-20&coverId=6423184b6b3bdf874651fba3

  consumerPlanDistributionData(api_params: any) {
    return this.http.s_get(
      this.base_url1 +
      this.getConsumerPlanDistributionPercentageReport +
      api_params
    );
  }
  // consumerCoverDistributionData(api_params:any){
  //   return this.http.s_get(this.base_url1);
  // }

  // consumerCoverDistributionDataForTotal(){
  //   return this.http.s_get(this.base_url1) // need to add other params
  // }
  // consumerCoverDistributionDataForMonth(api_params:any){
  //   return this.http.s_get(this.base_url1) // need to add other params
  // }
  // consumerCoverDistributionDataForDay(api_params:any){
  //   return this.http.s_get(this.base_url1) // need to add other params
  // }

  consumerPlanDistributionDataForTotal(api_params: any) {
    if (api_params == "null") {
      return this.http.s_get(
        this.base_url1 + this.getConsumerPlanDistributionPercentageReport
      );
    } else {
      return this.http.s_get(
        this.base_url1 +
        this.getConsumerPlanDistributionPercentageReport +
        api_params
      );
    }
  }
  consumerPlanDistributionDataForMonth(api_params: any) {
    return this.http.s_get(
      this.base_url1 +
      this.getConsumerPlanDistributionPercentageReport +
      api_params
    );
  }
  consumerPlanDistributionDataForDay(api_params: any) {
    return this.http.s_get(
      this.base_url1 +
      this.getConsumerPlanDistributionPercentageReport +
      api_params
    );
  }
  // http://localhost:8086/api/getConsumerPlanDistributionDetailReport
  // ?month=2023-04-20&day=2023-04-20&planName=3 Yearly
  getConsumerPlanDistributionDetailReport: string =
    "getConsumerPlanDistributionDetailReport";

  getConsumerPlanDistributionDetailReports(api_params: any) {
    //drilldown
    return this.http.s_get(
      this.base_url1 + this.getConsumerPlanDistributionDetailReport + api_params
    );
  }

  // http://localhost:8086/api/getTopFiveComptetionForP
  // ieChart?month=2021-02-22&day=2020-09-10&filter=Revenue
  getTopFiveCompetitionPieChart: string = "getTopFiveComptetionForPieChart";

  getTopFiveCompetitionForPieChart(api_params: any) {
    if (api_params == null) {
      sessionStorage.setItem("basic_params", api_params);
      return this.http.s_get(this.base_url1 + this.getTopFiveCompetitionPieChart);
    }
    else {
      sessionStorage.setItem("basic_params", api_params);
      return this.http.s_get(this.base_url1 + this.getTopFiveCompetitionPieChart + api_params);
    }

    //   sessionStorage.setItem("top5Compt_params", api_params);
    //   return this.http.s_get(
    //     this.base_url1 + this.getTopFiveCompetitionPieChart
    //   );
    // } else {
    //   sessionStorage.setItem("top5Compt_params", api_params);
    //   return this.http.s_get(
    //     this.base_url1 + this.getTopFiveCompetitionPieChart + api_params
    //   );
    // }
  }

  // anju changes
  affiliate_traffic_distribution: string = "affiliate-traffic-distribution";
  organic_traffic_distribution: string = "organic-traffic-distribution";

  // getAffiliateDashboardData() {
  //   return this.http.s_get(this.base_url + "dashboard/client/affiliate-traffic-distribution")
  // }

  // getAffiliateTrafficDataForMonth() {
  //   return this.http.s_get(this.base_url + this.dashboardUrl + this.client + this.affiliate_traffic_distribution + '?month=' + this.current_date);
  // }

  // getAffiliateTrafficeDataForDaily() {
  //   return this.http.s_get(this.base_url + this.dashboardUrl + this.client + this.affiliate_traffic_distribution + '?day=' + this.current_date);
  // }

  // getOrganicDashboardData() {
  //   return this.http.s_get(this.base_url + "dashboard/client/organic-traffic-distribution")
  // }

  // getOrganicTrafficDataForMonth() {
  //   return this.http.s_get(this.base_url + this.dashboardUrl + this.client + this.organic_traffic_distribution + '?month=' + this.current_date);
  // }

  // getOrganicTrafficDataForDay() {
  //   return this.http.s_get(this.base_url + this.dashboardUrl + this.client + this.organic_traffic_distribution + '?day=' + this.current_date);
  // }

  //sravan changes
  getAffiliateData(api_params: any) {
    if (api_params == null) {
      return this.http.s_get(
        this.base_url + "dashboard/client/affiliate-traffic-distribution"
      );
    } else {
      return this.http.s_get(
        this.base_url +
        "dashboard/client/affiliate-traffic-distribution" +
        api_params
      );
    }
  }
  getOrganicData(api_params: any) {
    if (api_params == null) {
      return this.http.s_get(
        this.base_url + "dashboard/client/organic-traffic-distribution"
      );
    } else {
      return this.http.s_get(
        this.base_url +
        "dashboard/client/organic-traffic-distribution" +
        api_params
      );
    }
  }

  // http://localhost:9090/api/dashboard/top-five-campaign-list?state=STARTED&day=2020-10-23
  top_five_campaign_list: string = "top-five-campaign-list";

  getTopFiveCampaignListData(api_params: any) {
    return this.http.s_get(
      this.base_url +
      this.dashboardUrl +
      this.top_five_campaign_list +
      api_params
    );
  }

  // http://localhost:8086/api/getTopFiveComptetionForPieChartDetail?
  // month=2021-02-22&day=2020-09-10&filter=Landing&productName=iPhoneX

  TopFiveComp_DrillDownReport(api_params: any) {
   if(api_params == null){
    return this.http.s_get(
      this.base_url1 + "getTopFiveComptetionForPieChartDetail"
    );
   }
   else{
    return this.http.s_get(
      this.base_url1 + "getTopFiveComptetionForPieChartDetail" + api_params
    );
   }
  }
  // http://localhost:8086/api/getConsumerPlanDistributionDetailReport?
  // month=2023-04-20&day=2023-04-20&planName=3 Yearly

  ConsumerPlanDist_DrillDownReport(api_params: any) {
   if(api_params == null){
    return this.http.s_get(
      this.base_url1 + "getConsumerPlanDistributionDetailReport"
    );
   }
   else{
    return this.http.s_get(
      this.base_url1 + "getConsumerPlanDistributionDetailReport" + api_params
    );
   }
  }
  // http://localhost:8087/api/getConsumerDropPerReportDetails?day=2023-04-19&pageName=YbcLandingPage
  ConsumerDrop_DrillDownReport(api_params: any) {
    if(api_params == null){
      return this.http.s_get(
        this.base_url1 + "getConsumerDropPerReportDetails"
      );
    }
    else {
      return this.http.s_get(
        this.base_url1 + "getConsumerDropPerReportDetails" + api_params
      );
    }
  }
  // http://localhost:9090/api/dashboard/top-five-campaign-detail-list?
  // year=2020&month=10&campaignId=5f927231421aa975c03b33c4&day=23
  TopFiveCampaign_DrillDownReport(api_params: any) {
    if(api_params == null){
      return this.http.s_get(
        this.base_url + "dashboard/top-five-campaign-detail-list"
      );
    }
    else{
      return this.http.s_get(
        this.base_url + "dashboard/top-five-campaign-detail-list?" + api_params
      );
    }
  }
  saveTopFiveCompetitionApiParams(data: any) {
    this.topFiveCompitionApiParams.next(data);
  }
  getTopFiveCompetionApiParamsData() {
    return this.topFiveCompitionApiParams;
  }

  saveConsumerPlanDistData(obj: any) {
    this.consumerPlanDistData.next(obj);
  }
  getConsumerPlanDistData() {
    return this.consumerPlanDistData;
  }
  saveConsumerDropData(obj: any) {
    this.consumerDropData.next(obj);
  }
  getConsumerDropData() {
    return this.consumerDropData;
  }

  getUserLogin(userEmail: any, password: any) {
    return this.http.s_post(this.base_url1 + "mfuelUserLogin", {
      email: userEmail,
      password: password,
    });
  }
  saveTopFiveCampaignData(obj: any) {
    this.topFiveCampaignData.next(obj);

  }
  getTopFiveCampaignData() {
    return this.topFiveCampaignData;
  }
  // &month='+revenuDate

  getRevenuData(campaign: any, revenuDate: any) {
    return this.http.s_get(
      this.base_url + "dashboard/revenue?campaignId=" + campaign + revenuDate
    );
  }

  showDataOfUser(userId: any) {
    return this.http.s_get(
      this.base_url1 + "mfuelUserDetails?userId=" + userId
    );
  }
  saveTrafficDistAffiliate_Organic(obj: any) {
    this.trafficDistAffiliate_Organic.next(obj);
  }
  getTrafficDistAffiliate_Organic() {
    return this.trafficDistAffiliate_Organic;
  }

  // http://localhost:9090/api/dashboard/client/Affiliate-traffic-detail-list?
  //  month=09&year=2020&day=04&clientId=5d11fd7768d3820aa7a3f5b3&campaignId=5f927201421aa975c03b33c3

  getAffiliate_Traffic_DrillDownReport(api_params: any) {
   if(api_params == null){
    return this.http.s_get(
      this.base_url +
      "dashboard/client/Affiliate-traffic-detail-list"
    );
   }
   else{
    return this.http.s_get(
      this.base_url +
      "dashboard/client/Affiliate-traffic-detail-list?" +
      api_params
    );
   }
  }

  getOrganic_Traffic_DrillDownReport(api_params: any) {
   if(api_params == null){
    return this.http.s_get(
      this.base_url +
      "dashboard/client/organic-traffic-detail-list"
    );
   }
   else{
    return this.http.s_get(
      this.base_url +
      "dashboard/client/organic-traffic-detail-list?" +
      api_params
    );
   }
  }

  saveRevenueDetailsList(obj: any) {
    this.revenueDetailsList.next(obj);
  }
  getRevenueDetailsList() {
    return this.revenueDetailsList;
  }
  // http://localhost:9090/api/dashboard/revenue-detail-list?
  // key=Standard_Elite&day=2023-04-20&campaignId="uh43423i3"
  campaign_revenue_DrillDownReport(api_params: any) {
    return this.http.s_get(
      this.base_url + "dashboard/revenue-detail-list?" + api_params
    );
  }
  campaign_revenue_DrillDownReport_forReset(params:any){
    if(params == null){
      return this.http.s_get(
        this.base_url + "dashboard/revenue-detail-list"
      );
    }
    else{
      return this.http.s_get(
        this.base_url + "dashboard/revenue-detail-list" + params
      );
    }
  }

  No_of_landing_data_for_detail_view(api_params: any) {
    if (api_params == null) {
      return this.http.s_get(this.base_url + 'dashboard/' + 'landing-total-last-seven-days')
    }
    else {
      return this.http.s_get(this.base_url + 'dashboard/' + 'landing-total-last-seven-days?' + api_params)
    }
  }

  Total_Revenue_for_detail_view(api_params:any){
   if(api_params == null){
    // https://nodestaging.encashoffers.com/api/dashboard/revenue-total-last-seven-days
    return this.http.s_get(this.base_url+'dashboard/'+'revenue-total-last-seven-days')
   }
   else{
    return this.http.s_get(this.base_url+'dashboard/'+'revenue-total-last-seven-days?'+api_params)
   }
  }

  // https://nodestaging.encashoffers.com/api/dashboard/
  // conversion-total-last-seven-days?clientId=6441020d99a11225005d7d63
  Total_Conversion_for_detail_view(api_params:any){
    if(api_params == null){
      // https://nodestaging.encashoffers.com/api/dashboard/revenue-total-last-seven-days
      return this.http.s_get(this.base_url+'dashboard/'+'conversion-total-last-seven-days')
     }
     else{
      return this.http.s_get(this.base_url+'dashboard/'+'conversion-total-last-seven-days?'+api_params)
     }
  }
  Total_Conversion_percentage_for_detail_view(api_params:any){
    if(api_params == null){
      // https://nodestaging.encashoffers.com/api/dashboard/revenue-total-last-seven-days
      return this.http.s_get(this.base_url+'dashboard/'+'conversion-percentage-total-last-seven-days')
     }
     else{
      return this.http.s_get(this.base_url+'dashboard/'+'conversion-percentage-total-last-seven-days?'+api_params)
     }
  }

  alarmNotificationList(){
     return this.http.s_get(this.base_url+this.alarmNotificationUrl+this.alamnotificationList)
    
   }

   updateAlarmNotificationList(){
    return this.http.s_post(this.base_url+this.alarmNotificationUrl+this.updatenotification, {
    //  id: id,
    });
  }
    getCountOfNotification(){
      return this.http.s_get(this.base_url+this.alarmNotificationUrl+this.countnotification);
    }
   printReport(){
    let newWin:any;
    var divToPrint:any = document.getElementById("excel-table");  
    newWin = window.open("");  
    newWin.document.write(divToPrint.outerHTML);  
    newWin.print();  
    newWin.close(); 
   }

}
