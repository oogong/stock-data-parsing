import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

const corp_num = [
  "00126380",
  "00164779",
  "01515323",
  "00164742",
  "00877059",
  "00106641",
  "00413046",
  "00155319",
  "00688996",
  "00266961",
  "00126362",
  "00356361",
  "00149655",
  "00382199",
  "00155276",
  "00164788",
  "00258801",
  "00547583",
  "00401731",
  "00139214",
  "00126256",
  "00860332",
  "00164645",
  "00159193",
  "00120021",
  "00126186",
  "00159616",
  "00760971",
  "00181712",
  "00126371",
  "01390344",
  "00244455",
  "00159023",
  "00149646",
  "01133217",
  "00583424",
  "00126566",
  "01350869",
  "00102858",
  "01596425",
  "01205851",
  "00631518",
  "00190321",
  "00164830",
  "00111704",
  "00124504",
  "01204056",
  "00126478",
  "00113526",
  "00138279",
  "00159102",
  "00360595",
  "00878696",
  "01311408",
  "00145109",
  "00356370",
  "00105855",
  "00155212",
  "00105961",
  "00139889",
  "01032486",
  "00937324",
  "01205709",
  "00904672",
  "00105873",
  "00162461",
  "00635134",
  "00309503",
  "00165413",
  "00106119",
  "00105952",
  "00126292",
  "00126308",
  "00261443",
  "00126955",
  "00983040",
  "01244601",
  "00231363",
  "00170558",
  "00106368",
  "00111722",
  "00261285",
  "00302926",
  "00120182",
  "01319899",
  "00145880",
  "00500254",
  "00828497",
  "00432102",
  "00503668",
  "00148540",
  "00164478",
  "01238169",
  "00296290",
  "00255619",
  "00104856",
  "00117212",
  "00339391",
  "00138224",
  "01386916",
  "00113207",
  "00164973",
  "00164609",
  "00108241",
  "00154462",
  "01568413",
  "00159209",
  "00858364",
  "00161125",
  "00105271",
  "00120562",
  "00980122",
  "00113058",
  "00195229",
  "00122737",
  "01042775",
  "00113410",
  "00113997",
  "00165680",
  "00161426",
  "00158501",
  "00140177",
  "00148276",
  "00481454",
  "00670340",
  "01263022",
  "00140955",
  "00144395",
  "00148896",
  "01009789",
  "00160588",
  "00120526",
  "00160843",
  "00872984",
  "00684714",
  "00125521",
  "00162586",
  "00141529",
  "00133858",
  "00106623",
  "00164724",
  "00136378",
  "00117300",
  "00160047",
  "01316254",
  "01316227",
  "01258507",
  "00939331",
  "00776820",
  "00159218",
  "00124540",
  "01412725",
  "00344287",
  "00150244",
  "00126779",
  "00129679",
  "00120030",
  "00161693",
  "00132637",
  "00427483",
  "00878915",
  "00992871",
  "01524093",
  "00138242",
  "00131780",
  "00109693",
  "00140964",
  "00120076",
  "00160302",
  "00428251",
  "00157681",
  "00117188",
  "00120571",
  "00526599",
  "00854997",
  "00795135",
  "00260383",
  "01319808",
  "01267170",
  "00111810",
  "00972503",
  "00117577",
  "00145260",
  "01010110",
  "00269940",
  "00767460",
  "00557508",
  "00728638",
  "00595191",
  "00426086",
  "00231372",
  "00138792",
  "00137359",
  "00115676",
  "00115977",
  "00173078",
  "00121941",
  "00106669",
  "00141307",
  "00108135",
];

// console.log(corp_num[1]);

async function fetchfunction(url) {
  const resp = await axios.get(url);
  const html = resp.data;

  const $ = cheerio.load(html);
  const stockData = [];

  $("sc-2921aadf-1 hzcGUQ").each((index, element) => {
    const eachobject = {};
    eachobject["ROE"] = $(element).text().trim();
    eachobject["영업이익률"] = $(element).text().trim();
    stockData.push(eachobject);
  });
  return stockData;
}

async function fetchData() {
  // for(const code of corp_num) {
  const result = {};
  const url = `https://www.butler.works/reports/report?corpCode=00126380`;
  const code_content = await fetchfunction(url);
  result["0"] = code_content;
  const all_data = JSON.stringify(result, null, 2);
  fs.writeFile("stock.json", all_data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data successfully written to stock.json");
    }
  });
  // }
}

fetchData().then(() => {
  console.log("All data fetched and written to file.");
});