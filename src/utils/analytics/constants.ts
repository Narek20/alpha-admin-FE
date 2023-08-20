import analytics_1 from '@assets/SVG/analytics_1.svg'
import analytics_2 from '@assets/SVG/analytics_2.svg'
import analytics_3 from '@assets/SVG/analytics_3.svg'
import analytics_4 from '@assets/SVG/analytics_4.svg'
import analytics_5 from '@assets/SVG/analytics_5.svg'
import analytics_6 from '@assets/SVG/analytics_6.svg'
import analytics_7 from '@assets/SVG/analytics_7.svg'
import analytics_8 from '@assets/SVG/analytics_8.svg'
import Logistics from '@features/Analytics/Logistics'
import ProductSales from '@features/Analytics/ProductSales'
import RegionSales from '@features/Analytics/RegionSales'
import Sales from '@features/Analytics/Sales'
import SummaryReport from '@features/Analytics/SummaryReport'
import TurnoverAnalytics from '@features/Analytics/TurnoverAnalytics'
import WarehouseRemains from '@features/Analytics/WarehouseRemains'
import WeeklySales from '@features/Analytics/WeeklySales'

export const analyticsSections = [
  {
    title: 'Շրջանառության դինամիկա',
    description:
      'Որքան արագ է վաճառվում ձեր ապրանքը, և երբ է լավագույն ժամանակը նոր առաքում պլանավորելու համար',
    image: analytics_1,
    link: '/analytics/turnover',
    component: TurnoverAnalytics,
  },
  {
    title: 'Շաբաթական դինամիկա և վաճառքի վերլուծություն',
    description:
      'Հոդվածին մանրամասնած վաճառքները, պահեստներում մնացորդը և գնումներից ստացված շահույթը',
    image: analytics_2,
    link: '/analytics/weekly-sales',
    component: WeeklySales,
  },
  {
    title: 'Վաճառք',
    description:
      'Ձեր արտադրանքի հիմնական շարժումները և դրա հավասարակշռությունը:',
    image: analytics_3,
    link: '/analytics/sales',
    component: Sales,
  },
  {
    title: 'Ապրանքանիշի մասնաբաժինը վաճառքում',
    description: 'Ձեր ապրանքանիշի դիրքը մյուսների նկատմամբ:',
    image: analytics_4,
    link: '/analytics/product-sales',
    component: ProductSales,
  },
  {
    title: 'Վաճառք ըստ տարածաշրջանների',
    description:
      'Ինչպե՞ս են ընթանում ձեր վաճառքները տարբեր երկրներում, և որ շրջաններում են նրանք ավելի շատ գնումներ կատարում:',
    image: analytics_5,
    link: 'analytics/region-sales',
    component: RegionSales,
  },
  // {
  //   title: 'Ամփոփում վաճառողի կողմից',
  //   description:
  //     'Ընդհանուր ցուցանիշներ ամիսների և օրերի համար՝ առանց անվանացանկի:',
  //   image: analytics_6,
  //   link: '/analytics/summary-report',
  //   component: SummaryReport,
  // },
  {
    title: 'Հաշվետվություն բաժնետոմսերի մնացորդների մասին',
    description: 'Ընթացիկ ապրանքային մնացորդներ ըստ պահեստների.',
    image: analytics_7,
    link: '/analytics/warehouse-remains',
    component: WarehouseRemains,
  },
]
