export const listDATA: any = [
  {
    name: "Quick view",
    icon: "quick-view",
    routerLink: "dashboard",
    id: "quickview",
    sublist: [],
  },
  {
    // name: "Search Your Audience",
    name: "Consumer Search",
    icon: "search-your_audience",
    showSubList: "false",
    routerLink: "search-audience/demographic",
    id: "audiance",
    sublist: [
      /*
      {
        // name: "Level 1 - Demographic and Industry",
        name: "Basic",
        routerLink: "search-audience/demographic",
      },
      {
        // name: "Level 2 - Persona and Behaviour",
        name: "Advance",
        routerLink: "search-audience/person",
      },
      {
        // name: "Level 3 - Keyword Based",
        name: "Pro",
        routerLink: "search-audience/keyword",
      },
      */
    ],
  },
  {
    // name: "Know Your Audience (Consumer 360° view)",
    name: "Consumer Understanding",
    icon: "know-your-yudienc",
    showSubList: "false",
    // routerLink: "know-audience/persona",
    id: "knowurAd",
    sublist: [
      {
        // name: "Level 1 - Demographic (Limited Search queries)​",
        name: "Basic",
        routerLink: "know-audience/demographic",
      },
      {
        // name: "Level 2 - Persona and Behaviour (Limited Search Queries)",
        name: "Advance",
        routerLink: "know-audience/persona",
      },
      {
        // name: "Level 3 - Keywords (Unlimited Search Queries)",
        name: "Pro",
        routerLink: "know-audience/keyword",
      },
    ],
  },
  {
    // name: "Reach Your Audience",
    name: "Consumer Engagement",
    icon: "reach-your-audience",
    showSubList: "false",
    // routerLink: "reach-audience/level1",
    id: "reachurAd",
    sublist: [
      { 
        name: "Level 1",
        // name: "Advance",
         routerLink: "reach-audience/level1" },
      { 
        name: "Level 2",
        // name: "Pro",
       routerLink: "reach-audience/level2" },
    ],
  },
  {
    // name: "Research & Insights",
    name: "Consumer Insights",
    icon: "research-Insights",
    routerLink: "insight/insight",
    id: "research",
    sublist: [
      // { 
      //   // name: "Level 1",
      //   name: "Pro",
      //    routerLink: "reach-audience/level1" },
    ]
    ,
  },
];
