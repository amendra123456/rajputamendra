import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPackagesRoutingModule } from './tour-packages-routing.module';
import { ChardhaamPackagesComponent } from './tours/chardhaam-packages/chardhaam-packages.component';
import { DodhaamPackagesComponent } from './tours/dodhaam-packages/dodhaam-packages.component';
import { KedarnathPackagesComponent } from './tours/kedarnath-packages/kedarnath-packages.component';
import { BadrinathPackagesComponent } from './tours/badrinath-packages/badrinath-packages.component';
import { KedarnathBadrinathPackagesComponent } from './tours/kedarnath-badrinath-packages/kedarnath-badrinath-packages.component';
import { AuliChoptaPackagesComponent } from './tours/auli-chopta-packages/auli-chopta-packages.component';
import { BadrinathAuliChoptaPackageComponent } from './tours/badrinath-auli-chopta-package/badrinath-auli-chopta-package.component';
import { MussorieAuliChoptaPackagesComponent } from './tours/mussorie-auli-chopta-packages/mussorie-auli-chopta-packages.component';
import { AyodhyaPackagesComponent } from './tours/ayodhya-packages/ayodhya-packages.component';
import { VaranasiPackagesComponent } from './tours/varanasi-packages/varanasi-packages.component';
import { PrayagrajPackagesComponent } from './tours/prayagraj-packages/prayagraj-packages.component';
import { KashiPackagesComponent } from './tours/kashi-packages/kashi-packages.component';
import { JaipurPackagesComponent } from './tours/jaipur-packages/jaipur-packages.component';
import { ManaliPackagesComponent } from './tours/manali-packages/manali-packages.component';
import { KeralaPackagesComponent } from './tours/kerala-packages/kerala-packages.component';
import { UttarakhandPackagesComponent } from './tours/uttarakhand-packages/uttarakhand-packages.component';
import { LadakhPackagesComponent } from './tours/ladakh-packages/ladakh-packages.component';
import { CoorgPackagesComponent } from './tours/coorg-packages/coorg-packages.component';
import { ChardhamFamilyPackagesComponent } from './tours/chardham-family-packages/chardham-family-packages.component';
import { ChardhamAdventurePackagesComponent } from './tours/chardham-adventure-packages/chardham-adventure-packages.component';
import { ChardhamPackagesFromDelhiComponent } from './tours/chardham-packages-from-delhi/chardham-packages-from-delhi.component';
import { ChardhamPackagesFromMumbaiComponent } from './tours/chardham-packages-from-mumbai/chardham-packages-from-mumbai.component';
import { ChardhamPackagesFromHaridwarComponent } from './tours/chardham-packages-from-haridwar/chardham-packages-from-haridwar.component';
import { ChardhamPackagesFromBanagaloreComponent } from './tours/chardham-packages-from-banagalore/chardham-packages-from-banagalore.component';
import { ChardhamPackagesFromKolkataComponent } from './tours/chardham-packages-from-kolkata/chardham-packages-from-kolkata.component';
import { ChardhamPackagesFromPuneComponent } from './tours/chardham-packages-from-pune/chardham-packages-from-pune.component';
import { ChardhamPackagesFromChennaiComponent } from './tours/chardham-packages-from-chennai/chardham-packages-from-chennai.component';
import { ChardhamPackagesFromHyderabadComponent } from './tours/chardham-packages-from-hyderabad/chardham-packages-from-hyderabad.component';
import { ChardhamPackagesFromAhmedabadComponent } from './tours/chardham-packages-from-ahmedabad/chardham-packages-from-ahmedabad.component';
import { ChardhamPackagesFromKeralaComponent } from './tours/chardham-packages-from-kerala/chardham-packages-from-kerala.component';
import { ChardhamPackagesFromVadodaraComponent } from './tours/chardham-packages-from-vadodara/chardham-packages-from-vadodara.component';
import { MainSearchComponent } from '../main-search/main-search.component';
import { MainSearchModule } from '../main-search/main-search.module';
import { AmarnathYatraComponent } from './tours/amarnath-yatra/amarnath-yatra.component';



@NgModule({
  declarations: [
    ChardhaamPackagesComponent,
    DodhaamPackagesComponent,
    KedarnathPackagesComponent,
    BadrinathPackagesComponent,
    KedarnathBadrinathPackagesComponent,
    AuliChoptaPackagesComponent,
    BadrinathAuliChoptaPackageComponent,
    MussorieAuliChoptaPackagesComponent,
    AyodhyaPackagesComponent,
    VaranasiPackagesComponent,
    PrayagrajPackagesComponent,
    KashiPackagesComponent,
    JaipurPackagesComponent,
    ManaliPackagesComponent,
    KeralaPackagesComponent,
    UttarakhandPackagesComponent,
    LadakhPackagesComponent,
    CoorgPackagesComponent,
    ChardhamFamilyPackagesComponent,
    ChardhamAdventurePackagesComponent,
    ChardhamPackagesFromDelhiComponent,
    ChardhamPackagesFromMumbaiComponent,
    ChardhamPackagesFromHaridwarComponent,
    ChardhamPackagesFromBanagaloreComponent,
    ChardhamPackagesFromKolkataComponent,
    ChardhamPackagesFromPuneComponent,
    ChardhamPackagesFromChennaiComponent,
    ChardhamPackagesFromHyderabadComponent,
    ChardhamPackagesFromAhmedabadComponent,
    ChardhamPackagesFromKeralaComponent,
    ChardhamPackagesFromVadodaraComponent,
    AmarnathYatraComponent,
    
  ],
  imports: [
    CommonModule,
    TourPackagesRoutingModule,
    MainSearchModule
  ]
})
export class TourPakagesModule { 
  constructor(){
    console.log("chardhaam");
  }
}
