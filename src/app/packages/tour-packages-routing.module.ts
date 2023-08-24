import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AmarnathYatraComponent } from './tours/amarnath-yatra/amarnath-yatra.component';


const routes: Routes = [
  {
    path:'chardhaam-packages',
    component: ChardhaamPackagesComponent
  },
  {
    path:'do-dhaam-packages',
    component: DodhaamPackagesComponent
  },
  // {
  //   path:'dodham-packages',
  //   component: DodhaamPackagesComponent
  // },
  {
    path:'kedarnath-packages',
    component: KedarnathPackagesComponent
  },
  {
    path:'badrinath-packages',
    component: BadrinathPackagesComponent
  },
  {
    path:'kedarnath-badrinath-packages',
    component: KedarnathBadrinathPackagesComponent
  },
  {
    path:'auli-chopta-packages',
    component: AuliChoptaPackagesComponent
  },
  {
    path:'badrinath-auli-chopta-packages',
    component: BadrinathAuliChoptaPackageComponent
  },
  {
    path:'chardham-packages',
    component: ChardhaamPackagesComponent
  },
  {
    path:'mussorie-auli-chopta-packages',
    component: MussorieAuliChoptaPackagesComponent
  },
  {
    path:'ayodhya-packages',
    component: AyodhyaPackagesComponent
  },
  {
    path:'varanasi-packages',
    component: VaranasiPackagesComponent
  },
  {
    path:'prayagraj-packages',
    component: PrayagrajPackagesComponent
  },
  {
    path:'kashi-packages',
    component: KashiPackagesComponent
  },
  {
    path:'jaipur-packages',
    component: JaipurPackagesComponent
  },
  {
    path:'manali-packages',
    component: ManaliPackagesComponent
  },
  {
    path:'kerala-packages',
    component: KeralaPackagesComponent
  },
  {
    path:'uttarakhand-packages',
    component: UttarakhandPackagesComponent
  },
  {
    path:'ladakh-packages',
    component: LadakhPackagesComponent
  },
  {
    path:'coorg-packages',
    component: CoorgPackagesComponent
  } ,
  {
    path:'chardham-family-packages',
    component: ChardhamFamilyPackagesComponent
  } ,
  {
    path:'chardham-adventure-packages',
    component: ChardhamAdventurePackagesComponent
  } ,
  {
    path:'chardham-packages-from-delhi',
    component: ChardhamPackagesFromDelhiComponent
  } ,
  {
    path:'chardham-packages-from-mumbai',
    component: ChardhamPackagesFromMumbaiComponent
  } ,
  {
    path:'chardham-packages-from-haridwar',
    component: ChardhamPackagesFromHaridwarComponent
  } ,
  {
    path:'chardham-packages-from-banagalore',
    component: ChardhamPackagesFromBanagaloreComponent
  } ,
  {
    path:'chardham-packages-from-kolkata',
    component: ChardhamPackagesFromKolkataComponent
  } ,
  {
    path:'chardham-packages-from-pune',
    component: ChardhamPackagesFromPuneComponent
  } ,
  {
    path:'chardham-packages-from-chennai',
    component: ChardhamPackagesFromChennaiComponent
  } ,
  {
    path:'chardham-packages-from-hyderabad',
    component: ChardhamPackagesFromHyderabadComponent
  } ,
  {
    path:'chardham-packages-from-ahmedabad',
    component: ChardhamPackagesFromAhmedabadComponent
  } ,
  {
    path:'chardham-packages-from-kerala',
    component: ChardhamPackagesFromKeralaComponent
  } 
  ,
  {
    path:'chardham-packages-from-vadodara',
    component: ChardhamPackagesFromVadodaraComponent
  } ,
  {
    path:'amarnath-yatra',
    component: AmarnathYatraComponent
  } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPackagesRoutingModule { }
