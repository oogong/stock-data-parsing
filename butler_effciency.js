import axios from "axios";
import fs from "fs";

async function fetchData() {
  const url = `https://api.butler.works/api/analysis/fundamentals/efficiency/summary?corpCode=00126380&fsDiv=MFS&quarterPeriod=accumulated`;

  const response = await axios.get(url, {
    headers: {
      //   Accept: "application/json, text/plain, */*",
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      //   Connection: "keep-alive",
      //   Host: "api.butler.works",
      //   Origin: "https://www.butler.works",
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response.data;
}

async function main() {
  const data = await fetchData();
  const targetDates = ["2024.03", "2023.12", "2023.09", "2023.06", "2023.03"];
  console.log(data);

  const filteredData = data
    .filter((item) => targetDates.includes(item.date))
    .map((item) => ({
      date: item.date,
      effInventoryTurnoverPeriod: item.effInventoryTurnoverPeriod, //재고자산회전일
      effPayablesTurnoverPeriod: item.effPayablesTurnoverPeriod, // 매입채무회전일
      effReceivablesTurnoverPeriod: item.effReceivablesTurnoverPeriod, //매출채권회전일
    }));
    
    
  fs.writeFileSync(
    "stock_effciency.json",
    JSON.stringify(filteredData, null, 2)
  );
}

main();
