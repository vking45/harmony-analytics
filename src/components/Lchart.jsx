import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, YAxis } from "recharts";
import { getHistorical } from "../covalent/api";
import { historical_bal } from "../covalent/funcs";


export const Earnings = () => {
  const [checked, setCheck] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const bal = await getHistorical(30);
      setTempData(bal);
      setData(historical_bal(bal,30));
    })();
  })

  const handleChange = () => {
    if(!checked){
      setCheck(true);
      let t = historical_bal(tempData,7);
      setData(t);
    }
    else{
      setCheck(false);
      setData(historical_bal(tempData,30));
      console.log(data);
    }
  }

  return (
    <>
  <div className="p-0.5">
    <label htmlFor="default-toggle" className="inline-flex relative cursor-pointer mb-10">
      <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onChange={handleChange}/>
      <div className="w-11 h-6 bg-hot peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-spicy"></div>
      <span className="ml-3 text-sm font-medium text-mild">7D</span>
    </label>
            
          <AreaChart
            width={400}
            height={250}
            data={data.reverse()}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="value"
              stroke="#28B78D"
              fill="#3a504b"
              strokeWidth={4}
            />
          </AreaChart>
          </div>
          <div className="mt-4 text-2xl text-spicy text-semibold font-barlow">Portfolio Value</div>
          <div className="text-l text-spicy text-semibold font-barlow">Date-Wise</div>
          </>
    );
}