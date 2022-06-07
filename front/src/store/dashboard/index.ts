import { defineStore } from 'pinia'
import lineDatas from './line'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: (): any => ({
    dataSet: {
      table: [],
      line: [],
      scope12_data: [],
      scope3_data: [],
      site_data: [],
      cate_data: [],
      stacked1_data: [],
      stacked2_data: [],
      majorPrcTrend_data: [],
      worldEmmit_data: [],
    },
    tableData: [],
  }),
  actions: {
    async loadData(payload, selYear) {
      try {
        let lineData
        // 시연용 주석 처리
        // if (`${payload}` == 'line') {
        //   lineData = await this.api({
        //     method: 'get',
        //     url: `/api/data/${payload}`,
        //   })
        // }

        const scope12_data = [
          {
            baseDt: '1월',
            scope1: 459.5,
            scope2: 236.7,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '2월',
            scope1: 569.2,
            scope2: 195.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '3월',
            scope1: 594.0,
            scope2: 217.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '4월',
            scope1: 630.8,
            scope2: 277.6,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '5월',
            scope1: 452.4,
            scope2: 183.8,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '6월',
            scope1: 484.5,
            scope2: 266.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '7월',
            scope1: 389.5,
            scope2: 218.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '8월',
            scope1: 476.1,
            scope2: 171.2,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '9월',
            scope1: 552.0,
            scope2: 261.2,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '10월',
            scope1: 543.3,
            scope2: 190.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '11월',
            scope1: 427.5,
            scope2: 160.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '12월',
            scope1: 566.0,
            scope2: 267.0,
            netZeroVAl: 130.0,
          },
        ]

        const scope3_data = [
          {
            baseDt: '1월',
            scope3: 1057.410132,
            netZeroVal: 130.0,
          },
          {
            baseDt: '2월',
            scope3: 921.743786,
            netZeroVal: 130.0,
          },
          {
            baseDt: '3월',
            scope3: 1319.546022,
            netZeroVal: 130.0,
          },
          {
            baseDt: '4월',
            scope3: 1144.053421,
            netZeroVal: 130.0,
          },
          {
            baseDt: '5월',
            scope3: 1371.912624,
            netZeroVal: 130.0,
          },
          {
            baseDt: '6월',
            scope3: 1004.750643,
            netZeroVal: 130.0,
          },
          {
            baseDt: '7월',
            scope3: 1239.149112,
            netZeroVal: 130.0,
          },
          {
            baseDt: '8월',
            scope3: 1376.402513,
            netZeroVal: 130.0,
          },
          {
            baseDt: '9월',
            scope3: 1440.778482,
            netZeroVal: 130.0,
          },
          {
            baseDt: '10월',
            scope3: 1360.943782,
            netZeroVal: 130.0,
          },
          {
            baseDt: '11월',
            scope3: 1295.595282,
            netZeroVal: 130.0,
          },
          {
            baseDt: '12월',
            scope3: 1113.027712,
            netZeroVal: 130.0,
          },
        ]

        let site_data
        if (selYear > 2020) {
          site_data = [
            {
              baseDt: '2021/05',
              item: 'SKI',
              value: 171.55981,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCJ',
              value: 182.434371,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCNB',
              value: 107.297586,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCSH',
              value: 2185.081308,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCSP',
              value: 732.313321,
            },
            {
              baseDt: '2021/05',
              item: 'SKPA',
              value: 11.316608,
            },
            {
              baseDt: '2021/05',
              item: 'SKPE',
              value: 76.485133,
            },
            {
              baseDt: '2021/05',
              item: 'UAC',
              value: 75.081412,
            },
          ]
        } else {
          site_data = [
            {
              baseDt: '2021/05',
              item: 'SKI',
              value: 171.55981,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCJ',
              value: 182.434371,
            },
            {
              baseDt: '2021/05',
              item: 'SKGCNB',
              value: 107.297586,
            },
          ]
        }

        const cate_data = [
          {
            baseDt: '2021/05',
            item: 'CAT1',
            value: 5130.249986,
          },
          {
            baseDt: '2021/05',
            item: 'CAT2',
            value: 982.976431,
          },
          {
            baseDt: '2021/05',
            item: 'CAT3',
            value: 8501.634246,
          },
          {
            baseDt: '2021/05',
            item: 'CAT4',
            value: 384.898058,
          },
          {
            baseDt: '2021/05',
            item: 'CAT5',
            value: 227.55479,
          },
        ]

        const stacked1_data = [
          {
            item: 'base',
            scope12: 1180,
            scope3: 990,
          },
          {
            item: 'item',
            scope12: 920,
            scope3: 1070,
          },
        ]

        const stacked2_data = [
          {
            item: 'base',
            scope12: 1280,
            scope3: 1090,
          },
          {
            item: 'item',
            scope12: 920,
            scope3: 770,
          },
        ]

        const majorPrcTrend_data = [
          {
            baseDt: '5/1',
            REC: 39823,
            KAU21: 33260,
            EU_ETS: 24871,
          },
          {
            baseDt: '5/2',
            REC: 41825,
            KAU21: 32251,
            EU_ETS: 29879,
          },
          {
            baseDt: '5/3',
            REC: 37841,
            KAU21: 34257,
            EU_ETS: 25872,
          },
          {
            baseDt: '5/4',
            REC: 35893,
            KAU21: 31852,
            EU_ETS: 21872,
          },
          {
            baseDt: '5/5',
            REC: 33850,
            KAU21: 41255,
            EU_ETS: 33872,
          },
          {
            baseDt: '5/6',
            REC: 34713,
            KAU21: 33286,
            EU_ETS: 34451,
          },
          {
            baseDt: '5/7',
            REC: 32817,
            SKGCJ: 33311,
            EU_ETS: 28836,
          },
          {
            baseDt: '5/8',
            REC: 35867,
            KAU21: 41091,
            EU_ETS: 22780,
          },
          {
            baseDt: '5/9',
            REC: 36598,
            KAU21: 31204,
            EU_ETS: 41856,
          },
          {
            baseDt: '5/10',
            REC: 38881,
            KAU21: 33458,
            EU_ETS: 24875,
          },
        ]

        const worldEmmit_data = [
          {
            engNm: 'Afghanistan',
            korNm: '아프가니스탄',
            value: 649,
          },
          {
            engNm: 'Angola',
            korNm: '앙골라',
            value: 784,
          },
          {
            engNm: 'Albania',
            korNm: '알바니아',
            value: 363,
          },
          {
            engNm: 'United Arab Emirates',
            korNm: '아랍에미리트',
            value: 304,
          },
          {
            engNm: 'Argentina',
            korNm: '아르헨티나',
            value: 346,
          },
          {
            engNm: 'Armenia',
            korNm: '아르메니아',
            value: 513,
          },
          {
            engNm: 'Antarctica',
            korNm: '남극',
            value: 881,
          },
          {
            engNm: 'Fr. S. Antarctic Lands',
            korNm: 'Fr. S. Antarctic Lands',
            value: 1116,
          },
          {
            engNm: 'Australia',
            korNm: '오스트레일리아',
            value: 1022,
          },
          {
            engNm: 'Austria',
            korNm: '오스트리아',
            value: 1226,
          },
          {
            engNm: 'Azerbaijan',
            korNm: '아제르바이잔',
            value: 422,
          },
          {
            engNm: 'Burundi',
            korNm: '부룬디',
            value: 902,
          },
          {
            engNm: 'Belgium',
            korNm: '벨기에',
            value: 1122,
          },
          {
            engNm: 'Benin',
            korNm: '베냉',
            value: 877,
          },
          {
            engNm: 'Burkina Faso',
            korNm: '부르키나파소',
            value: 571,
          },
          {
            engNm: 'Bangladesh',
            korNm: '방글라데시',
            value: 1438,
          },
          {
            engNm: 'Bulgaria',
            korNm: '불가리아',
            value: 866,
          },
          {
            engNm: 'Bahamas',
            korNm: '바하마',
            value: 346,
          },
          {
            engNm: 'Bosnia and Herz.',
            korNm: '보스니아 헤르체코비나',
            value: 379,
          },
          {
            engNm: 'Belarus',
            korNm: '벨라루스',
            value: 1345,
          },
          {
            engNm: 'Belize',
            korNm: '벨리즈',
            value: 368,
          },
          {
            engNm: 'Bolivia',
            korNm: '볼리비아',
            value: 644,
          },
          {
            engNm: 'Brazil',
            korNm: '브라질',
            value: 674,
          },
          {
            engNm: 'Brunei',
            korNm: '브루나이',
            value: 839,
          },
          {
            engNm: 'Bhutan',
            korNm: '부탄',
            value: 1231,
          },
          {
            engNm: 'Botswana',
            korNm: '보츠와나',
            value: 967,
          },
          {
            engNm: 'Central African Rep.',
            korNm: '중앙아프리카 공화국',
            value: 1097,
          },
          {
            engNm: 'Canada',
            korNm: '캐나다',
            value: 995,
          },
          {
            engNm: 'Switzerland',
            korNm: '스위스',
            value: 1217,
          },
          {
            engNm: 'Chile',
            korNm: '칠레',
            value: 1337,
          },
          {
            engNm: 'China',
            korNm: '중화인민공화국',
            value: 1001,
          },
          {
            engNm: "Côte d'Ivoire",
            korNm: '코트디부아르',
            value: 1185,
          },
          {
            engNm: 'Cameroon',
            korNm: '카메룬',
            value: 966,
          },
          {
            engNm: 'Dem. Rep. Congo',
            korNm: '콩고 민주 공화국',
            value: 594,
          },
          {
            engNm: 'Congo',
            korNm: '콩고 공화국',
            value: 1357,
          },
          {
            engNm: 'Colombia',
            korNm: '콜롬비아',
            value: 957,
          },
          {
            engNm: 'Costa Rica',
            korNm: '코스타리카',
            value: 979,
          },
          {
            engNm: 'Cuba',
            korNm: '쿠바',
            value: 1385,
          },
          {
            engNm: 'N. Cyprus',
            korNm: '북키프로스',
            value: 314,
          },
          {
            engNm: 'Cyprus',
            korNm: '키프로스',
            value: 656,
          },
          {
            engNm: 'Czech Rep.',
            korNm: '체코',
            value: 1348,
          },
          {
            engNm: 'Germany',
            korNm: '독일',
            value: 464,
          },
          {
            engNm: 'Djibouti',
            korNm: '지부티',
            value: 651,
          },
          {
            engNm: 'Denmark',
            korNm: '덴마크',
            value: 603,
          },
          {
            engNm: 'Dominican Rep.',
            korNm: '도미니카 공화국',
            value: 790,
          },
          {
            engNm: 'Algeria',
            korNm: '알제리',
            value: 532,
          },
          {
            engNm: 'Ecuador',
            korNm: '에콰도르',
            value: 1044,
          },
          {
            engNm: 'Egypt',
            korNm: '이집트',
            value: 1005,
          },
          {
            engNm: 'Eritrea',
            korNm: '에리트레아',
            value: 1364,
          },
          {
            engNm: 'Spain',
            korNm: '스페인',
            value: 1314,
          },
          {
            engNm: 'Estonia',
            korNm: '에스토니아',
            value: 1152,
          },
          {
            engNm: 'Ethiopia',
            korNm: '에티오피아',
            value: 513,
          },
          {
            engNm: 'Finland',
            korNm: '핀란드',
            value: 320,
          },
          {
            engNm: 'Fiji',
            korNm: '피지',
            value: 1306,
          },
          {
            engNm: 'Falkland Is.',
            korNm: '포클랜드 제도',
            value: 637,
          },
          {
            engNm: 'France',
            korNm: '프랑스',
            value: 1479,
          },
          {
            engNm: 'Gabon',
            korNm: '가봉',
            value: 380,
          },
          {
            engNm: 'United Kingdom',
            korNm: '영국',
            value: 1071,
          },
          {
            engNm: 'Georgia',
            korNm: '조지아',
            value: 1098,
          },
          {
            engNm: 'Ghana',
            korNm: '가나',
            value: 1016,
          },
          {
            engNm: 'Guinea',
            korNm: '기니',
            value: 827,
          },
          {
            engNm: 'Gambia',
            korNm: '감비아',
            value: 774,
          },
          {
            engNm: 'Guinea-Bissau',
            korNm: '기니비사우',
            value: 1138,
          },
          {
            engNm: 'Eq. Guinea',
            korNm: '적도 기니',
            value: 1279,
          },
          {
            engNm: 'Greece',
            korNm: '그리스',
            value: 1437,
          },
          {
            engNm: 'Greenland',
            korNm: '그린란드',
            value: 683,
          },
          {
            engNm: 'Guatemala',
            korNm: '과테말라',
            value: 868,
          },
          {
            engNm: 'Guyana',
            korNm: '가이아나',
            value: 979,
          },
          {
            engNm: 'Honduras',
            korNm: '온두라스',
            value: 1445,
          },
          {
            engNm: 'Croatia',
            korNm: '크로아티아',
            value: 1407,
          },
          {
            engNm: 'Haiti',
            korNm: '아이티',
            value: 1456,
          },
          {
            engNm: 'Hungary',
            korNm: '헝가리',
            value: 751,
          },
          {
            engNm: 'Indonesia',
            korNm: '인도네시아',
            value: 1198,
          },
          {
            engNm: 'India',
            korNm: '인도',
            value: 1069,
          },
          {
            engNm: 'Ireland',
            korNm: '아일랜드',
            value: 560,
          },
          {
            engNm: 'Iran',
            korNm: '이란',
            value: 648,
          },
          {
            engNm: 'Iraq',
            korNm: '이라크',
            value: 578,
          },
          {
            engNm: 'Iceland',
            korNm: '아이슬란드',
            value: 1153,
          },
          {
            engNm: 'Israel',
            korNm: '이스라엘',
            value: 349,
          },
          {
            engNm: 'Italy',
            korNm: '이탈리아',
            value: 408,
          },
          {
            engNm: 'Jamaica',
            korNm: '자메이카',
            value: 1417,
          },
          {
            engNm: 'Jordan',
            korNm: '요르단',
            value: 313,
          },
          {
            engNm: 'Japan',
            korNm: '일본',
            value: 1378,
          },
          {
            engNm: 'Kazakhstan',
            korNm: '카자흐스탄',
            value: 1216,
          },
          {
            engNm: 'Kenya',
            korNm: '케냐',
            value: 336,
          },
          {
            engNm: 'Kyrgyzstan',
            korNm: '키르기스스탄',
            value: 616,
          },
          {
            engNm: 'Cambodia',
            korNm: '캄보디아',
            value: 759,
          },
          {
            engNm: 'Korea',
            korNm: '대한민국',
            value: 1019,
          },
          {
            engNm: 'Kosovo',
            korNm: '코소보',
            value: 1305,
          },
          {
            engNm: 'Kuwait',
            korNm: '쿠웨이트',
            value: 313,
          },
          {
            engNm: 'Lao PDR',
            korNm: '라오스',
            value: 1327,
          },
          {
            engNm: 'Lebanon',
            korNm: '레바논',
            value: 317,
          },
          {
            engNm: 'Liberia',
            korNm: '라이베리아',
            value: 1274,
          },
          {
            engNm: 'Libya',
            korNm: '리비아',
            value: 736,
          },
          {
            engNm: 'Sri Lanka',
            korNm: '스리랑카',
            value: 558,
          },
          {
            engNm: 'Lesotho',
            korNm: '레소토',
            value: 1354,
          },
          {
            engNm: 'Lithuania',
            korNm: '리투아니아',
            value: 765,
          },
          {
            engNm: 'Luxembourg',
            korNm: '룩셈부르크',
            value: 1034,
          },
          {
            engNm: 'Latvia',
            korNm: '라트비아',
            value: 501,
          },
          {
            engNm: 'Morocco',
            korNm: '모로코',
            value: 847,
          },
          {
            engNm: 'Moldova',
            korNm: '몰도바',
            value: 302,
          },
          {
            engNm: 'Madagascar',
            korNm: '마다가스카르',
            value: 1051,
          },
          {
            engNm: 'Mexico',
            korNm: '멕시코',
            value: 1450,
          },
          {
            engNm: 'Macedonia',
            korNm: '북마케도니아',
            value: 1256,
          },
          {
            engNm: 'Mali',
            korNm: '말리',
            value: 827,
          },
          {
            engNm: 'Myanmar',
            korNm: '미얀마(버마',
            value: 1403,
          },
          {
            engNm: 'Montenegro',
            korNm: '몬테네그로',
            value: 662,
          },
          {
            engNm: 'Mongolia',
            korNm: '몽골',
            value: 773,
          },
          {
            engNm: 'Mozambique',
            korNm: '모잠비크',
            value: 1500,
          },
          {
            engNm: 'Mauritania',
            korNm: '모리타니',
            value: 1220,
          },
          {
            engNm: 'Malawi',
            korNm: '말라위',
            value: 1377,
          },
          {
            engNm: 'Malaysia',
            korNm: '말레이시아',
            value: 1044,
          },
          {
            engNm: 'Namibia',
            korNm: '나미비아',
            value: 307,
          },
          {
            engNm: 'New Caledonia',
            korNm: '누벨칼레도니',
            value: 1171,
          },
          {
            engNm: 'Niger',
            korNm: '니제르',
            value: 681,
          },
          {
            engNm: 'Nigeria',
            korNm: '나이지리아',
            value: 312,
          },
          {
            engNm: 'Nicaragua',
            korNm: '니카라과',
            value: 420,
          },
          {
            engNm: 'Netherlands',
            korNm: '네덜란드',
            value: 652,
          },
          {
            engNm: 'Norway',
            korNm: '노르웨이',
            value: 557,
          },
          {
            engNm: 'Nepal',
            korNm: '네팔',
            value: 509,
          },
          {
            engNm: 'New Zealand',
            korNm: '뉴질랜드',
            value: 610,
          },
          {
            engNm: 'Oman',
            korNm: '오만',
            value: 863,
          },
          {
            engNm: 'Pakistan',
            korNm: '파키스탄',
            value: 698,
          },
          {
            engNm: 'Panama',
            korNm: '파나마',
            value: 1361,
          },
          {
            engNm: 'Peru',
            korNm: '페루',
            value: 643,
          },
          {
            engNm: 'Philippines',
            korNm: '필리핀',
            value: 664,
          },
          {
            engNm: 'Papua New Guinea',
            korNm: '파푸아뉴기니',
            value: 364,
          },
          {
            engNm: 'Poland',
            korNm: '폴란드',
            value: 1226,
          },
          {
            engNm: 'Puerto Rico',
            korNm: '푸에르토리코',
            value: 1167,
          },
          {
            engNm: 'Dem. Rep. Korea',
            korNm: '북한',
            value: 1180,
          },
          {
            engNm: 'Portugal',
            korNm: '포르투갈',
            value: 1088,
          },
          {
            engNm: 'Paraguay',
            korNm: '파라과이',
            value: 474,
          },
          {
            engNm: 'Palestine',
            korNm: '팔레스타인',
            value: 1410,
          },
          {
            engNm: 'Qatar',
            korNm: '카타르',
            value: 931,
          },
          {
            engNm: 'Romania',
            korNm: '루마니아',
            value: 485,
          },
          {
            engNm: 'Russia',
            korNm: '러시아',
            value: 1366,
          },
          {
            engNm: 'Rwanda',
            korNm: '르완다',
            value: 914,
          },
          {
            engNm: 'W. Sahara',
            korNm: '서사하라',
            value: 801,
          },
          {
            engNm: 'Saudi Arabia',
            korNm: '사우디아라비아',
            value: 339,
          },
          {
            engNm: 'Sudan',
            korNm: '수단',
            value: 1291,
          },
          {
            engNm: 'S. Sudan',
            korNm: '남수단',
            value: 842,
          },
          {
            engNm: 'Senegal',
            korNm: '세네갈',
            value: 1329,
          },
          {
            engNm: 'Solomon Is.',
            korNm: '솔로몬 제도',
            value: 1166,
          },
          {
            engNm: 'Sierra Leone',
            korNm: '시에라리온',
            value: 1419,
          },
          {
            engNm: 'El Salvador',
            korNm: '엘살바도르',
            value: 1406,
          },
          {
            engNm: 'Somaliland',
            korNm: '소말릴란드',
            value: 331,
          },
          {
            engNm: 'Somalia',
            korNm: '소말리아',
            value: 976,
          },
          {
            engNm: 'Serbia',
            korNm: '세르비아',
            value: 701,
          },
          {
            engNm: 'Suriname',
            korNm: '수리남',
            value: 774,
          },
          {
            engNm: 'Slovakia',
            korNm: '슬로바키아',
            value: 1211,
          },
          {
            engNm: 'Slovenia',
            korNm: '슬로베니아',
            value: 903,
          },
          {
            engNm: 'Sweden',
            korNm: '스웨덴',
            value: 1353,
          },
          {
            engNm: 'Swaziland',
            korNm: '스와질란드',
            value: 635,
          },
          {
            engNm: 'Syria',
            korNm: '시리아',
            value: 1476,
          },
          {
            engNm: 'Chad',
            korNm: '차드',
            value: 1276,
          },
          {
            engNm: 'Togo',
            korNm: '토고',
            value: 470,
          },
          {
            engNm: 'Thailand',
            korNm: '태국',
            value: 1424,
          },
          {
            engNm: 'Tajikistan',
            korNm: '타지키스탄',
            value: 838,
          },
          {
            engNm: 'Turkmenistan',
            korNm: '투르크메니스탄',
            value: 532,
          },
          {
            engNm: 'Timor-Leste',
            korNm: '동티모르',
            value: 1120,
          },
          {
            engNm: 'Trinidad and Tobago',
            korNm: '트리니다드 토바고',
            value: 443,
          },
          {
            engNm: 'Tunisia',
            korNm: '튀니지',
            value: 657,
          },
          {
            engNm: 'Turkey',
            korNm: '터키',
            value: 1317,
          },
          {
            engNm: 'Taiwan',
            korNm: '대만',
            value: 767,
          },
          {
            engNm: 'Tanzania',
            korNm: '탄자니아',
            value: 764,
          },
          {
            engNm: 'Uganda',
            korNm: '우간다',
            value: 1063,
          },
          {
            engNm: 'Ukraine',
            korNm: '우크라이나',
            value: 1430,
          },
          {
            engNm: 'Uruguay',
            korNm: '우루과이',
            value: 1392,
          },
          {
            engNm: 'United States',
            korNm: '미국',
            value: 678,
          },
          {
            engNm: 'Uzbekistan',
            korNm: '우즈베키스탄',
            value: 454,
          },
          {
            engNm: 'Venezuela',
            korNm: '베네수엘라',
            value: 1270,
          },
          {
            engNm: 'Vietnam',
            korNm: '베트남',
            value: 332,
          },
          {
            engNm: 'Vanuatu',
            korNm: '바누아투',
            value: 596,
          },
          {
            engNm: 'Yemen',
            korNm: '예멘',
            value: 1242,
          },
          {
            engNm: 'South Africa',
            korNm: '남아프리카 공화국',
            value: 419,
          },
          {
            engNm: 'Zambia',
            korNm: '잠비아',
            value: 908,
          },
          {
            engNm: 'Zimbabwe',
            korNm: '짐바브웨',
            value: 844,
          },
        ]

        if (payload) {
          if (payload == 'line') {
            // this.dataSet[payload] = this.dataSet[payload].concat(lineData.data.rows)
            this.dataSet[payload] = this.dataSet[payload].concat(lineDatas)
          } else {
            if (this.dataSet[payload].length < eval(payload).length) {
              this.dataSet[payload] = this.dataSet[payload].concat(eval(payload))
            }
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})
