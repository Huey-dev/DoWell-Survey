import React from "react";
import CardStats from "components/Cards/CardStats.js";

// components

import CardTable from "components/Cards/CardTable.js";

export default function Tables() {

  return (
    <>

<div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ONGOING"
                  statTitle="SURVEYS"
                  statArrow=""
                  statPercent="348"
                  statPercentColor="text-emerald-500"
                  statDescripiron=" Ongoing Surveys"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="COMPLETED "
                  statTitle="SURVEYS"
                  statArrow=""
                  statPercent="48"
                  statPercentColor="text-red-500"
                  statDescripiron="completed surveys"
                  statIconName="fas fa-check-circle"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL"
                  statTitle="RESPONDENTS"
                  statArrow=""
                  statPercent="110"
                  statPercentColor="text-orange-500"
                  statDescripiron="total respondents"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PAUSED"
                  statTitle="SURVEYS"
                  statArrow=""
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="paused surveys"
                  statIconName="fas fa-pause"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
          
        </div>


      </div>
    </>
  );
}
