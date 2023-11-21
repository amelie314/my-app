/** @format */

import React, { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Map = (props) => {
  // const [activeCounty, setActiveCounty] = useState(null);
  const { activeCounty, setActiveCounty } = props;
  const [venues, setVenues] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handlePathClick = (countyName) => {
    console.log("點擊", countyName); // 加入此行來調試
    setActiveCounty(countyName);
    setIsTooltipVisible(false);
  };

  const handleMouseMove = (e, countyName) => {
    console.log("移入", countyName); // 加入此行來調試
    setTooltipPosition({ x: e.pageX + 8, y: e.pageY - 35 });
    setTooltipContent(countyName);
    setIsTooltipVisible(true);
  };

  const handleMouseOut = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="wrapper bg-primary-color">
      <div className="map bg-primary-color">
        <svg
          viewBox="0 0 400 535"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          className="overflow-visible z-10"
        >
          {/* <svg width="100" height="100">
            <path d="M10 10 H 90 V 90 H 10 Z" fill="blue" />
          </svg> */}
          <path
            data-name="屏東縣"
            d="M214.8,473.1c0.9,0.5,3.4,2.8,5.6,4.6c0.8,6.5,1.7,12.7,1.9,15.6c0.6,6.5,0.1,14.3-3.4,15.2
            c-3.5,0.9-3.5,5.3-1.9,8.4c1.6,3.1,0.5,10.3-1,8.6c-1.5-1.7-3.7-4.5-6.5-5.8c-2.8-1.2-5.3-2.2-6.5-4c-1.2,2.8,0,5.6-4,5.3
            c-4-0.3-5-3.1-3.1-9.3c-3.1-3.1-3.7-6.8-3.1-11.8c0.6-5-1.2-17.7-6.8-26.7c-2.2-3.4,1.2-6.5-3.1-9c-4.3-2.5-3.1-9-7.1-10.6
            c-4-1.5-12.2-4.9-17.8-11.9c2.2-3.8,3.7-10.2,3.2-15.2c-0.6-6.6,0.6-12.4,1.7-16.2c1-3.7,0.8-13.5,1.2-15.1c0.4-1.7,1.7-5.8,2.7-5.2
            c1,0.6,8.5,1,10.6,1.5c2.1,0.4,5.2-4.8,7.5-6.6c2.3-1.9,4.6-1.4,5,0.4c0.4,1.9,4.1,0.6,6.6-1.2c2.5-1.9,7.7-0.4,7.7,3.3
            c0,3.7,2.5,2.9,4.3,2.1c1.9-0.8,3.1-4.8,5-4.1c1.3,0.4,2.7,1,5,0.7c0.2,0.7,0.3,1.3-0.1,2c-0.8,1.7,0.6,3.5,5,6.2
            c4.3,2.7-1.2,6-1.2,9.1c0,3.1-3.3,4.8-6,4.8c-2.7,0-0.2,2.7-6.6,3.3c-1.7-0.4-1.7,0.8-1.7,2.3c0,1.5-3.5,8.1-4.3,9.9
            c-0.8,1.9,0.2,10.1,1.2,13.9c1,3.7-0.4,6.8,2.7,10.1c3.1,3.3-4.1,2.9-4.2,4.3c-0.1,1.5-0.7,7.2,1.1,8.1c1.9,0.8,6.2-0.4,4.1,4.8
            c-2.1,5.2,2.1,4.1,1.5,7C209.2,474.8,213.3,472.3,214.8,473.1z M141.3,456c-2.8,6.5-0.9,8.4,3.4,10.3c4.4,1.9,9-7.4,9-11.8
            C153.7,444.3,144.1,449.5,141.3,456z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "屏東縣" ? "is-active" : ""
            }`}
            onClick={() => {
              handlePathClick("屏東縣");
            }}
            onMouseMove={(e) => handleMouseMove(e, "屏東縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="臺南市"
            d="M122.6,372c0.1-0.9,0.2-1.5,0.4-2c0.9-2.5,3.4-6.8,1.9-8.1c-1.6-1.2-5,1.2-5.6,3.7c-0.6,2.5-2.8-2.5-2.2-5.3
                c0.6-2.8-0.9-2.8-5-0.3c-4.1,2.5-6.2-4.4-1.6-6.5c-2.6-3.4-1.9-6.2,0-13.7c1.9-7.5,1.9-15.8,3.4-16.5c1.6-0.6,5-0.3,4-2.8
                c-0.4-1.2-1.4-1.9-1.8-2.7c2.3,0,5.6,0.6,7.3,1.6c2.5,1.5,3.5,4.1,5.8,3.7c2.3-0.4,7.2-6.8,8.1-7.4c0.8-0.5,5.2-5.5,8.5-7.8
                c3.3-2.3,7.7-1.2,11-2.1c3.3-0.8,5.4,1,9.3,1.5c3.9,0.4,1.5,1.7,1.7,3.3c0.2,1.7,1.2,3.9,3.6,4.1c2.4,0.2,2,2.9,0.9,3.7
                c-1.1,0.8,0.5,1.9,0.1,7.5c-0.4,5.6,0.8,4.4,1,5c0.2,0.6,4.3,3.1,6,3.1c1.7,0,0.8-3.7,1.2-2.5c0.4,1.2,1.9,0.4,4.7,0.8
                c1.3,0.2,2.5,0.8,3.3,1.2c-3.1,1.7-1.6,8.3-3.3,9.6c-1.9,1.5-8.2,10.8-10.7,13.9c-2.5,3.1-8.7,8.3-11.8,9.5
                c-3.1,1.2-2.3,4.1-2.1,6.6c0.2,2.5-2.1,3.9-4.3,4.1c-2.3,0.2-2.9,1-4.6,3.3c-1.7,2.3-4.6,1.7-7,0c-2.5-1.7-6.8-0.8-8.7-1
                c-1.9-0.2-6.4-1.9-7.9-2.9C127.1,376,124.5,374.1,122.6,372z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "臺南市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("臺南市")}
            onMouseMove={(e) => handleMouseMove(e, "臺南市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="宜蘭縣"
            d="M356.3,77.1c1.5,0.2,3.3,0.5,5.1,0.8c-1.1,0.8-2.2,1.6-3.2,2.1c-3.7,2-9.6,5.1-10.3,10.3
                c-0.6,5.3-11.8-0.3-5.6,26.7c0,5-0.3,15.3-0.3,15.3s5.3-2.2,8.4,1.8c3.1,4-9.6-0.1-1.6,4.9c2.6,3.1-5.3,7-5.3,7s2.5,3.2,2.2,4.5
                c-0.3,1.2-9,4-9.3,7.5c-0.3,3.4,1.2,6.5-0.9,10.9c-1,2-0.7,3.4-0.2,4.5c-6.4,1.2-9.9-1.5-11.2-3.2c-1.4-1.9-9-4.8-8.4-3.3
                c0.6,1.4,1.2,3.7-0.9,4.6c-2.1,0.8-4.1,2.3-5.6,0.8c-1.4-1.5-7-1.5-9.9-2.3c-2.2-0.6-3.8-0.7-4.8-1.7l0,0c-0.3-0.3-0.6-0.8-0.8-1.4
                c-0.8-2.4-2.7-3-4.4-3s-4.1,3.5-6,2.9c-1.9-0.6-2.5-3.3-3.5-2.7c-1,0.6-3.3-1.2-3.4-3.1c0-0.8-0.4-2.2-0.8-3.4
                c3.5-0.9,0.7-2.7,0.7-4.4c0-1.9,4.1-5.6,7.5-7.4c3.3-1.8,3.7-3.4,3.1-5.4c-0.4-1.4,0.4-3.4,1-5.3c0.4,0,0.9-0.1,1.5-0.3
                c2.1-0.6,5.2-0.6,6.1-2.9c0.8-2.3-2.5-5-1.7-7.2c0.3-0.7,0.5-1.5,0.8-2.3c0,0,0,0,0,0c0.8,0.6,7.9,1.5,8.8-1.4
                c0.9-2.9,3.4-4.1,6.1-5c2.7-0.8,4.1-1,2.3-4.4c-1.9-3.3-1.4-3.5,0.8-5.8c2.3-2.3,4.5-3.7,6.4-3.7c1.9,0,6.6-1.2,7.3-3.3
                c0.6-2.1,0.2-2.5,4.3-2.9c4.1-0.4,6.2-4.6,6.6-6c0.4-1.4,2.5-1.9,5-1.9c2.5,0,3.5-3.1,2.1-5c-1.5-1.9-1-3.9,3.7-3.3
                C352.7,80.4,352.5,76.7,356.3,77.1z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "宜蘭縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("宜蘭縣")}
            onMouseMove={(e) => handleMouseMove(e, "宜蘭縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="嘉義縣"
            d="M129.3,323.2c2.3-0.4,7.2-6.8,8.1-7.4c0.8-0.5,5.2-5.5,8.5-7.8c3.3-2.3,7.7-1.2,11-2.1c3.3-0.8,5.4,1,9.3,1.5
                c3.9,0.4,1.5,1.7,1.7,3.3c0.2,1.7,1.2,3.9,3.6,4.1c2.4,0.2,2,2.9,0.9,3.7c-1.1,0.8,0.5,1.9,0.1,7.5c-0.4,5.6,0.8,4.4,1,5
                c0.2,0.6,4.3,3.1,6,3.1c1.7,0,0.8-3.7,1.2-2.5c0.4,1.2,1.9,0.4,4.7,0.8c1.3,0.2,2.5,0.8,3.3,1.2c0.3-0.2,0.7-0.3,1.1-0.4
                c-0.8-2.1,0.4-2.9-0.4-4.1c-0.8-1.2-2.3-6.8,0-6.4c2.3,0.4,3.9,4.6,4.6,2.7c0.6-1.9,2.9-3.7,5-3.9c2.1-0.2,3.3-0.6,4.1-2.9
                c0.8-2.3,8.5-6.4,10.1-7.2c1.7-0.8,3.3-6,4.6-7.6c1.1-1.3,3.3-3.3,8.9-5.3c-4-0.2-12.2-1-14.1-1c-2.1,0-0.8-1-1.7-5.4
                c-0.8-4.4-3.1-5.2,0-9.1c3.1-3.9-0.8-2.9-2.9-3.5c-1.6-0.5-5.2-2.4-7-3.4c0.1,2.3,0.1,5.1-1.1,5.4c-1.9,0.6-7.7,1.5-10.4,1.5
                c-2.7,0,0.5-5.2-4.2-3.5c-4.7,1.7-7,2.1-10.3,0.7c-3.3-1.3-4.3-3.8-5.2-4.9c-0.8-1-3.7-2.1-7-0.8c-3.3,1.2-9.5,0.6-11.6,3.6
                c-2.1,3-5,1.8-5,3.6c0,1.9,0,2.7-2.3,2.5c-2.3-0.2-2.3,0.6-2.9,2.5c-0.6,1.9-3.7,3.5-5.2,2.1c-1.4-1.4,1.5,5.4-3.9,5
                c-5.4-0.4-6.6-3.7-9.5-2.9c-1.4,0.4-2.9,1.1-4,1.8c0.2,1.1,0.3,2.1,0.5,3.1c1.2,9.3,3.7,14-0.6,18c-2.2,2.1-2.5,3.2-2.1,4.1
                c2.3,0,5.6,0.6,7.3,1.6C125.9,320.9,127,323.6,129.3,323.2z M158.8,291.3c3.8-0.4,4.6,0.4,7.1,1.8c2.5,1.3,6.6,4.9,5.2,5.9
                c-1.4,1-2.7,0.6-4.8,1.7c-2.1,1-5.4,4.4-5.9,2.8c-0.5-1.6-1.6-4-3-4.3c-1.4-0.2-5.6,0.2-5.6-4.3C151.8,293.1,155,291.7,158.8,291.3z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "嘉義縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("嘉義縣")}
            onMouseMove={(e) => handleMouseMove(e, "嘉義縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="臺東縣"
            d="M296.6,302.5c0.9,0,1.8,0.1,2.6,0.2c-0.1,1-0.1,1.9-0.1,2.7c0,6.5-2.5,15.2-6.2,16.8
                c-3.7,1.6-5,9.9-2.8,16.2c2.2,6.2-3.1,13-9.9,17.7c-1.2,5-0.6,10.3-4.7,14.9c-4,4.7-8.1,11.8-12.7,15.2c-2.5,5-2.8,6.5-4,10.9
                c-1.2,4.3-4,8.4-8.4,8.7c-4.3,0.3-5.9,2.2-5.6,4.7c0.3,2.5-3.4,2.8-5,4c-1.6,1.2-1.1,6.8-3.8,9.6c-2.7,2.8-6.1,3.1-6.8,5.3
                c-0.6,2.2,0.3,8.4-1.9,14.9c-2.2,6.5-6.8,8.4-8.1,13.7c-0.7,2.9,0.2,11.6,1.2,19.8c-2.2-1.8-4.7-4.1-5.6-4.6c-1.4-0.8-5.6,1.7-5-1.2
                c0.6-2.9-3.5-1.9-1.5-7c2.1-5.2-2.3-3.9-4.1-4.8c-1.9-0.8-1.2-6.6-1.1-8.1c0.1-1.5,7.3-1,4.2-4.3c-3.1-3.3-1.7-6.4-2.7-10.1
                c-1-3.7-2.1-12-1.2-13.9c0.8-1.9,4.3-8.5,4.3-9.9c0-1.5,0-2.7,1.7-2.3c6.4-0.6,3.9-3.3,6.6-3.3c2.7,0,6-1.7,6-4.8
                c0-3.1,5.6-6.4,1.2-9.1c-4.3-2.7-5.8-4.6-5-6.2c0.3-0.7,0.3-1.3,0.1-2l0,0c-0.4-1-1.3-2.2-2.6-3.8c-2.1-2.7-2.9-5.6-3.5-7.7
                c-0.6-2.1-0.2-5.6,1.2-6.8c1.5-1.2,5.4-3.1,7-4.8c1.7-1.7-2.7-4.4-1.2-5.2c1.5-0.8,2.5-5.6,2.1-8.7c-0.4-3.1-2.3-4.3,0-6
                c2.3-1.7,3.5-2.7,3.5-4.6c0-1.9-1.5-6.4,0-7c1.4-0.6,3.1-0.2,4.8-2.5c1.7-5.8,3.5-3.1,6.2-3.6c1.9-0.4,3.7-1.7,5.3-3.3
                c0.1,1.9,0.3,4,1.3,6.3c1.7,3.5,4.3,4.1,7.9,5c3.5,0.8,5.6,2.9,7.7,2.5c2.1-0.4,2.9,0.4,2.7,2.9c-0.2,2.5,2.3,4.1,3.7,5.6
                c1.4,1.4,2.5,3.1,4.1,3.3c1.7,0.2,0.6,3.3,2.3,3.1c1.7-0.2,4.6-1.2,6.6-2.5c2.1-1.2,1.2-5.4,1.4-8.3c0.2-2.9,2.7-3.3,2.9-4.8
                c0.2-1.5,3.7-6.6,3.9-8.5c0.2-1.9,0.4-5.6,2.3-7.9c1.9-2.3,1.2-6.4,0-9.1c-1.2-2.7,3.1-3.7,3.9-5
                C292.9,303.5,292.3,302.3,296.6,302.5z M302.5,407c1.4,2.9,2.5,4.3,2.5,9.9c0,5.6,16.8,12.7,17.7,10.6c0.9-2.2-2.8-12.7-2.8-22.4
                C318.9,402,301,404,302.5,407z M288.5,487.1c-0.9,3.4,3.7,6.8,6.5,9c2.8,2.2,3.7-0.9,7.4,1.2c3.6,2.2,8.2,6.5,10.2,4.3
                c2-2.2,1.4-9-1.4-9.3c-2.8-0.3-8.7-2.2-5.9-3.4c2.8-1.2,2.5-9.9,0-11.3c-2.5-1.3-15-0.7-19,0C281.6,478.6,289.5,483.7,288.5,487.1z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "臺東縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("臺東縣")}
            onMouseMove={(e) => handleMouseMove(e, "臺東縣")}
            onMouseOut={handleMouseOut}
          ></path>

          <path
            data-name="澎湖縣"
            d="M30.7,283.9c-2.2-3.7,4.7-11.2,5.3-6.5c0.6,4.7,1.6,5.2,7.8,0.9c6.2-4.4,10.9,8.7,7.8,8.1
                c-3.1-0.6-6.2,0.9-8.1,4.8c-1.9,3.8-5.6,9.8-11.5,8.6c-5.9-1.2-2.2-8.1,0-8.6C31.9,291.2,32.8,287.7,30.7,283.9z M28.7,272.4
                c-0.1-3.7-7.4-6.8-6.5-1.8c0.9,5-1.2,4.9-4.7,9.9c-3.4,5,2.2,9.1,6.2,7.4C27.6,286.4,28.8,276.2,28.7,272.4z M30,270.6
                c0.9,2.5,9,6.9,10.6,5.3c1.6-1.6,4-6.2,0-9.8C36.6,262.5,27.6,264,30,270.6z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "澎湖縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("澎湖縣")}
            onMouseMove={(e) => handleMouseMove(e, "澎湖縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="金門縣"
            d="M9.5,176.7c2.8-0.6,6.5,3.4,3.4,6.8c-3.1,3.4-6.6,5.3-7.8,0C4.1,178.3,6.4,177.4,9.5,176.7z M20.7,176.7
                c0,3.1,6,3.2,1.9,7.8c-4.1,4.7-4.1,10.6,1.6,12.1c5.8,1.6,6.1-10.6,18.5-10c4,0,5.4,3.8,9.7,3.8c4.3,0,9-5.1,6.5-8.6
                c-2.5-3.5-0.9-9.4-3.1-12.2c-2.2-2.8-5.6-4.7-9.3-3c-3.7,1.7-0.9,6.4-5.9,7.6c-5,1.2-5.8,3.7-11,0.9
                C24.4,172.4,20.7,171.3,20.7,176.7z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "金門縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("金門縣")}
            onMouseMove={(e) => handleMouseMove(e, "金門縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="連江縣"
            d="M26.5,105.6c0,0,0.3,5.3,4.1,3.2c0,0,1.8-5,6.2-5.1c0,0,4.4-0.8,4.7,1.9c0,0,0.8,5-1.8,6.8c0,0-6-0.3-5.6,2.9
                c0,0-1.4,4.4-5.8,2.9c0,0-2.2-0.1-3,1.1c0,0-2.5,1.2-4.5-1.1c0,0-0.9-0.6-2-0.7c0,0-3.5-0.4-3.2-3.3c0,0-0.6-4.4,0.7-5.1
                c0,0,1.2-0.6,1.5-3.1c0,0-0.1-5,2.9-5.6C20.6,100.6,25,99.3,26.5,105.6z M40.6,85.9c-1.1,3.6,2.1,5.9,2.1,5.9
                c4.5,1.2,4.4-3.9,4.4-3.9c-0.4-2.3,1.8-5.1,1.8-5.1c0.9-2.5,4.4-3.1,4.4-3.1c3.5,1.4,4.9-1.1,4.9-1.1c1.3-1.7,5.7-1.1,5.7-1.1
                c1.3,0.4,2.6-0.3,2.6-0.3c0.9-0.1,1.1-5.5,1.1-5.5c-0.3-3.9-6.2-2.5-6.2-2.5c-2.2-0.7-4.2-3-4.2-3c-3.4-3-3.5-0.4-5.4,0
                C50.1,66.8,41.6,74,41.6,74c-2.3,2.3,0,4.7,0,4.7C44.6,80.2,40.6,85.9,40.6,85.9z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "連江縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("連江縣")}
            onMouseMove={(e) => handleMouseMove(e, "連江縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="臺北市"
            d="M317.1,71.5c1.2,4.1-2.5,2.9-4.1,3.9c-1.7,1,2.3,5.2,0,5.8c-7.7,0.4-8.1-3.1-11-5c-2.9-1.9-4.3-3.9-4.3-7
                    c0-3-1.4-5.5-5.6-8.4c-4.1-2.9-2.9-5.2-0.8-5.6c2.1-0.4,15-8.2,16.4-8.7c1.4-0.5,2.7,1.9,1.9,3.7c-0.8,1.9,0.2,3.9,1,7.7
                    c0.8,3.7,4.4,2.9,4.3,4.1C314.8,63.4,315.9,67.4,317.1,71.5z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "臺北市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("臺北市")}
            onMouseMove={(e) => handleMouseMove(e, "臺北市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="嘉義市"
            d="M151.8,294.8c0-1.7,3.2-3.1,7-3.5c3.8-0.4,4.6,0.4,7.1,1.8c2.5,1.3,6.6,4.9,5.2,5.9c-1.4,1-2.7,0.6-4.8,1.7
                    c-2.1,1-5.4,4.4-5.9,2.8c-0.5-1.6-1.6-4-3-4.3C156,298.9,151.8,299.4,151.8,294.8z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "嘉義市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("嘉義市")}
            onMouseMove={(e) => handleMouseMove(e, "嘉義市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="臺中市"
            d="M168.4,194.1c-2.1-0.6-3-1-3.9-1.4c3-4.8,6.1-10.3,6.3-12.2c0.3-3.4,5.3-15.2,8.4-18.6c2-2.2,1.9-5.5,3.1-7.5
                 c1.7,1.5,4,3.8,4.8,5.7c1.2,2.9,7.7,7.2,13,11.8c5.4,4.6,5.6,2.3,8.3,3.9c2.7,1.7,3.9,3.1,8.7,3.7c4.8,0.6,7.5-1.9,7.5-4.1
                 c0-2.3,2.7-2.1,6.4-1.9c3.7,0.2,5.8,1.2,6.2,2.7c0.4,1.4,3.9,2.1,4.5,0c0.6-2.1,4.2-1.2,7.1-1.2c2.9,0,1.2-2.3,3.9-3.7
                 c2.7-1.5,4.8-3.1,6.3-6c1.5-2.9,3.7-0.4,6.8-1c3.1-0.6,1.2-2.3,1.9-4.1c0.1-0.2,0.1-0.4,0.1-0.6c2.1-0.4,4.8-0.9,7.4-1.4
                 c0.2,0,0.4-0.1,0.5-0.1c0.5,1.3,0.8,2.6,0.8,3.4c0.1,1.9,2.4,3.7,3.4,3.1c1-0.6,1.7,2.1,3.5,2.7c1.9,0.6,4.2-2.9,6-2.9
                 s3.6,0.6,4.4,3c0.2,0.6,0.5,1,0.8,1.4c-1.3,4.5-3.2,7.7-4.5,8.5c-1.7,1-4.1,4.8-5,7.3c-0.8,2.5-2.1,0.8-3.5,2.9
                 c-0.5,0.7-0.9,1-1.3,1.2l0,0c-0.8,0.4-1.8,0-3.8-0.2c-3-0.2-5.7-1.9-8.7-0.4c-3,1.4-5.5-0.8-8.7,0.8c-3.2,1.5-4.4,2.1-6.3,3.8
                 c-1.9,1.7-3.1,1-4.8,1.7c-1.7,0.6-2.3,3.9-4.8,4.1c-2.5,0.2-5.4-0.2-5.6,1.9c-0.2,2.1-2.9,4.6-5,4.6c-2.1,0-2.1,0.2-3.5-1.2
                 c-1.5-1.5-1,0.8-3.7,1.3c-2.7,0.4-7.9,0.6-9.7,0c-1.9-0.6-1.9,2.9-2.5,3.7c-0.6,0.8-3.7,10.1-7,12.4c-3.3,2.3-7.5,0.6-11.4,0
                 c-3.5-0.5-4.2-0.6-5.8-1.6l0,0c-0.2-0.1-0.4-0.3-0.7-0.4c-2.1-1.5-2.7-2.1-2.5-4.3c0.2-2.3-1.7-5.6-3.9-6.4
                 c-2.3-0.8-9.5-2.7-9.7-6.6C171.9,197.2,172.1,195.2,168.4,194.1z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "臺中市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("臺中市")}
            onMouseMove={(e) => handleMouseMove(e, "臺中市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="雲林縣"
            d="M131.9,293.8c5.4,0.4,2.5-6.4,3.9-5c1.5,1.5,4.6-0.2,5.2-2.1c0.6-1.9,0.6-2.7,2.9-2.5c2.3,0.2,2.3-0.6,2.3-2.5
                 c0-1.9,2.9-0.6,5-3.6c2.1-3,8.3-2.4,11.6-3.6c3.3-1.2,6.2-0.2,7,0.8c0.8,1,1.9,3.5,5.2,4.9c3.3,1.3,5.6,0.9,10.3-0.7
                 c4.7-1.7,1.5,3.5,4.2,3.5c2.7,0,8.5-0.8,10.4-1.5c1.1-0.4,1.2-3.2,1.1-5.4c-0.5-0.3-0.9-0.5-1.1-0.6c-0.8-0.4-3.3,0-6.4,1
                 c-3.1,1-3.3,1.4-5.6-1c-2.3-2.5-3.7-2.5-1.2-6.2c2.5-3.7,1.4-5.6,0.6-7c-0.8-1.4,0.6-1,1.7-1.7c1-0.6,1.4-1.4-0.2-3.1
                 c-0.6-0.6-0.8-1.3-0.8-1.9c-2.3-0.5-4.9-1-6.3-1c-2.5,0-7-0.6-8.5-2.1c-1.5-1.5-7.7-1.9-11.2-1.9s-4.8-3.7-7.5-3.1
                 c-2.7,0.6-12.4,0.8-16.2,1c-2.5,0.1-4.6-0.3-6.5-0.6c-5.7,6-7.7,10.5-7.7,15.8c-8.9,8.6-7.1,19.9-5.7,28.9c1.1-0.6,2.5-1.4,4-1.8
                 C125.3,290,126.6,293.3,131.9,293.8z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "雲林縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("雲林縣")}
            onMouseMove={(e) => handleMouseMove(e, "雲林縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="高雄市"
            d="M157.9,441.7c-0.1-0.1-0.1-0.2-0.2-0.2c-8.1-0.9-14.6-8.7-17.7-13.7c-3.1-5-9-9.6-7.5-11.5
                 c1.6-1.9,4-7.1,1.9-9.9c-2.2-2.8-9.3-9-6.2-15.8c-4.8-7.8-5.9-14.8-5.6-18.5c1.9,2.2,4.5,4,5.6,4.8c1.5,1,6,2.7,7.9,2.9
                 c1.9,0.2,6.2-0.6,8.7,1c2.5,1.7,5.4,2.3,7,0c1.7-2.3,2.3-3.1,4.6-3.3c2.3-0.2,4.6-1.7,4.3-4.1c-0.2-2.5-1-5.4,2.1-6.6
                 c3.1-1.2,9.3-6.4,11.8-9.5c2.5-3.1,8.8-12.4,10.7-13.9c1.7-1.3,0.2-7.9,3.3-9.6c1,0.5,1.6,0.8,1.1-0.4c-0.8-2.1,0.4-2.9-0.4-4.1
                 c-0.8-1.2-2.3-6.8,0-6.4c2.3,0.4,3.9,4.6,4.6,2.7c0.6-1.9,2.9-3.7,5-3.9c2.1-0.2,3.3-0.6,4.1-2.9c0.8-2.3,8.5-6.4,10.1-7.2
                 c1.7-0.8,3.3-6,4.6-7.6c1.1-1.3,3.3-3.3,8.9-5.3c0.4,0,0.8,0,1.1,0c3.3,0,7.5-0.2,8.3,0.6c0.8,0.8,1.4,5,3.1,4.1
                 c0.2-0.1,0.3-0.2,0.5-0.2c0.2,1.8,0,3.4-0.7,4.4c-1,1.5-3.1,1-4.6,2.5c-1.5,1.5-2.5,6.2,0.8,5.9c3.3-0.3,5.8,0.5,6,3.2
                 c0.1,1,0.1,2,0.1,3.1c-1.6,1.6-3.4,2.9-5.3,3.3c-2.7,0.5-4.6-2.2-6.2,3.6c-1.7,2.3-3.3,1.9-4.8,2.5c-1.5,0.6,0,5.2,0,7
                 c0,1.9-1.2,2.9-3.5,4.6c-2.3,1.7-0.4,2.9,0,6c0.4,3.1-0.6,7.9-2.1,8.7c-1.4,0.8,2.9,3.5,1.2,5.2c-1.7,1.7-5.6,3.5-7,4.8
                 c-1.5,1.2-1.9,4.8-1.2,6.8c0.6,2.1,1.4,5,3.5,7.7c1.2,1.6,2.2,2.8,2.6,3.8c-2.3,0.3-3.7-0.3-5-0.7c-1.9-0.6-3.1,3.3-5,4.1
                 c-1.9,0.8-4.3,1.6-4.3-2.1c0-3.7-5.2-5.1-7.7-3.3c-2.5,1.9-6.2,3.1-6.6,1.2c-0.4-1.9-2.7-2.3-5-0.4c-2.3,1.9-5.4,7-7.5,6.6
                 c-2.1-0.4-9.5-0.8-10.6-1.5c-1-0.6-2.3,3.5-2.7,5.2c-0.4,1.7-0.2,11.4-1.2,15.1c-1,3.7-2.3,9.5-1.7,16.2
                 C161.6,431.5,160.1,437.9,157.9,441.7z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "高雄市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("高雄市")}
            onMouseMove={(e) => handleMouseMove(e, "高雄市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="新北市"
            d="M361.5,72.3c-6.8-0.3-9,0.3-9.3-6.2c1.2-11.2-6.2-9.3-13.7-9.3c-2.4,0-4.5-0.4-6.4-1c1.2,2.3,0.3,3.6,0.7,6.3
                    c0.4,2.9,0.6,4.4,0,6.4c-0.6,2.1-11.8-0.6-15.3-6c-3.5-5.4-3.1-7.9-1.7-8.7c1.1-0.7,4.2-1.7,7.7-3.2c-0.8-1.8-0.2-4.7-3.1-4.4
                    c-3.4,0.3-5.3-2.5-6.2-8.1c-0.9-5.6-15.8-3.1-18.3-2.2c-2.5,0.9-13,13.4-15.8,15.6c0,0-2.2,4.6-3.7,6.1c-1,1-4.1,1.5-7.5,1.6
                    c4.1,3.4,5.5,4.9,8.2,5.9c3.3,1.2,5.6,0.6,6.6,2.9c1,2.3,2.7,5.4,0.8,7.3c-1.9,1.9-5.8,4.3-7.7,3.9c-1.9-0.4-2.1,7.9-1.3,10.4
                    c0.7,2.5,3.8,2.5,2.6,4.6c-1.2,2.1-0.4,5,3.1,4.8c3.5-0.2,5.2,1.4,6.8,2.7c1.7,1.2,3,7,1.2,7.7c-1.8,0.6-1.8,2.5,0.9,5.4
                    c2.7,2.9,3.4,6.8,4.2,7.5c0.4,0.3,0.9,0.5,0.9,0.5c0,0,7,1.1,8-1.8c0.9-2.9,3.4-4.1,6.1-5c2.7-0.8,4.1-1,2.3-4.4
                    c-1.9-3.3-1.4-3.5,0.8-5.8c2.3-2.3,4.5-3.7,6.4-3.7c1.9,0,6.6-1.2,7.3-3.3c0.6-2.1,0.2-2.5,4.3-2.9c4.1-0.4,6.2-4.6,6.6-6
                    c0.4-1.4,2.5-1.9,5-1.9c2.5,0,3.5-3.1,2.1-5c-1.5-1.9-1-3.9,3.7-3.3c4.8,0.6,4.6-3.1,8.3-2.7c1.5,0.2,3.3,0.5,5.1,0.8
                    C364.4,75.6,366.6,72.6,361.5,72.3z M313,75.4c-1.7,1,2.3,5.2,0,5.8c-7.7,0.4-8.1-3.1-11-5c-2.9-1.9-4.3-3.9-4.3-7
                    c0-3-1.4-5.5-5.6-8.4c-4.1-2.9-2.9-5.2-0.8-5.6c2.1-0.4,15-8.2,16.4-8.7c1.4-0.5,2.7,1.9,1.9,3.7c-0.8,1.9,0.2,3.9,1,7.7
                    c0.8,3.7,4.4,2.9,4.3,4.1c0,1.2,1.1,5.2,2.3,9.3C318.4,75.7,314.6,74.4,313,75.4z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "新北市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("新北市")}
            onMouseMove={(e) => handleMouseMove(e, "新北市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="新竹市"
            d="M215.3,113.5c0.3-0.3,0.6-0.5,0.9-0.8c3.7-3.7,4-8.4,4-14c0-0.2,0-0.3,0-0.5c5.4,0.5,14.6,4.1,17.2,5.3
                    c2.9,1.5,6.2,6.4,2.9,6.8c-3.3,0.4-5.6-0.6-7.7,2.3c-2.1,2.9-3.9,6-3.9,7c0,0.4-0.2,1.4-0.5,2.5c-2.4-2.1-4.8-4.4-5.7-5.6
                    C221.1,114.9,218.8,114.4,215.3,113.5z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "新竹市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("新竹市")}
            onMouseMove={(e) => handleMouseMove(e, "新竹市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="新竹縣"
            d="M275.1,157.9c-0.2,0-5.3,1.1-7.4,1.4c0-2-2.5-5.5-3.4-8.1c-1-2.9-2.7-4.4-4.3-5c-1.7-0.6-3.5,1.5-4.6,2.2
                   c-1,0.7-6.4-0.9-10.8-0.1c-4.4,0.8,0.2-4.1-1.5-5c-1.7-0.8-2.3-1.5-1.5-3.7c0.8-2.3,3-7.7,0-8.5c-3-0.8-5.9-4.1-7.8-4.8
                   c-0.9-0.3-3.3-2.1-5.6-4.1c0.2-1.1,0.5-2.1,0.5-2.5c0-1,1.9-4.1,3.9-7c2.1-2.9,4.3-1.9,7.7-2.3c3.3-0.4,0-5.4-2.9-6.8
                   c-2.6-1.3-11.8-4.8-17.2-5.3c0.3-4.7,4.2-10.8,7.6-13.6c3.8,0.6,6.9,1.2,8.4,0.5c2.2-1,4.7-2.7,5.7,1.9c1,4.6,4.6,4.3,7.7,5.2
                   c3.1,0.8,5,1,4.6,3.3c-0.4,2.3,1,6,5.6,6.8c4.6,0.8,6.6,1.7,8.1,4.4c1.4,2.7,2.5,2.7,5,2.5c2.5-0.2,1.2,6,0,9.1
                   c-1.2,3.1-4.1,6.8-1.7,8.1c2.5,1.2,6.4,1.9,7.7,3.5c1.2,1.7,3.5,5,5.4,5c1.4,0,2.4,0.3,3.7,0.3c-0.6,1.9-1.4,3.9-1,5.3
                   c0.6,2.1,0.2,3.6-3.1,5.4c-3.3,1.8-7.5,5.6-7.5,7.4c0,1.8,3.5,3.3,0,4.2L275.1,157.9z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "新竹縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("新竹縣")}
            onMouseMove={(e) => handleMouseMove(e, "新竹縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="基隆市"
            d="M315.9,53.9c1.1-0.7,4.2-1.7,7.7-3.2c0.2,0.4,0.4,0.7,0.7,0.9c1.3,1,4,3.1,7.9,4.3c1.2,2.3,0.3,3.6,0.7,6.3
                   c0.4,2.9,0.6,4.4,0,6.4c-0.6,2.1-11.8-0.6-15.3-6C314,57.2,314.4,54.7,315.9,53.9z M371.8,12.4c0.9,2.2,4,2.5,7.1,2.5
                   c3.1,0,0.3,2.5,9,2.5c8.7,0,8.7-2.5,4-5c-4.7-2.5-17.7-7.1-18.6-5.6C372.4,8.3,371.8,12.4,371.8,12.4z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "基隆市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("基隆市")}
            onMouseMove={(e) => handleMouseMove(e, "基隆市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="苗栗縣"
            d="M182.3,154.3c0.6-1.1,1.6-1.8,3.4-1.8c2.2-0.3,2.5-5.9,3.7-9.3c1.2-3.4,1.6-11.2,6.5-11.5c5-0.3,3.4-3.7,5-5.6
                 c1.6-1.9,3.1-2.8,7.5-2.2c4.3,0.6,1.6-3.1,1.6-5c0-1.7,2.1-2.4,5.4-5.4c3.5,0.8,5.8,1.3,7.2,3.1c0.9,1.3,3.3,3.6,5.7,5.6l0,0
                 c2.4,2,4.7,3.8,5.6,4.1c1.9,0.6,4.8,3.9,7.8,4.8c3,0.8,0.8,6.2,0,8.5c-0.8,2.3-0.2,2.9,1.5,3.7c1.7,0.8-2.9,5.8,1.5,5
                 c4.3-0.8,9.7,0.8,10.8,0.1c1-0.7,2.9-2.8,4.6-2.2c1.7,0.6,3.3,2.1,4.3,5c0.9,2.6,3.4,6,3.4,8.1l0,0c0,0.2,0,0.4-0.1,0.6
                 c-0.6,1.9,1.2,3.5-1.9,4.1c-3.1,0.6-5.3-1.9-6.8,1c-1.5,2.9-3.6,4.6-6.3,6c-2.7,1.5-1,3.7-3.9,3.7c-2.9,0-6.6-0.8-7.1,1.2
                 c-0.6,2.1-4.1,1.4-4.5,0c-0.4-1.5-2.5-2.5-6.2-2.7c-3.7-0.2-6.4-0.4-6.4,1.9c0,2.3-2.7,4.8-7.5,4.1c-4.8-0.6-6-2.1-8.7-3.7
                 c-2.7-1.7-2.9,0.6-8.3-3.9c-5.4-4.6-11.8-8.9-13-11.8C186.2,158.1,184,155.8,182.3,154.3z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "苗栗縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("苗栗縣")}
            onMouseMove={(e) => handleMouseMove(e, "苗栗縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="桃園市"
            d="M287.8,135.2c-1.3,0.1-2.3-0.3-3.7-0.3c-1.9,0-4.1-3.3-5.4-5c-1.2-1.7-5.2-2.3-7.7-3.5c-2.5-1.2,0.4-5,1.7-8.1
                    c1.2-3.1,2.5-9.3,0-9.1c-2.5,0.2-3.5,0.2-5-2.5c-1.5-2.7-3.5-3.5-8.1-4.4c-4.6-0.8-6-4.6-5.6-6.8c0.4-2.3-1.4-2.5-4.6-3.3
                    c-3.1-0.8-6.6-0.6-7.7-5.2c-1-4.6-3.5-2.9-5.7-1.9c-1.5,0.7-4.7,0.1-8.4-0.5c0.6-0.5,1.2-0.9,1.7-1.2c2.2-6.8,14.3-20.5,23.6-19.6
                    c3.4-1.6,5.3-5,10.3-4.7c1.8,0.1,3.7,0.1,5.6,0.1c4.1,3.4,5.5,4.9,8.2,5.9c3.3,1.2,5.6,0.6,6.6,2.9c1,2.3,2.7,5.4,0.8,7.3
                    c-1.9,1.9-5.8,4.3-7.7,3.9c-1.9-0.4-2.1,7.9-1.3,10.4c0.7,2.5,3.8,2.5,2.6,4.6c-1.2,2.1-0.4,5,3.1,4.8c3.5-0.2,5.2,1.4,6.8,2.7
                    c1.7,1.2,3,7,1.2,7.7c-1.8,0.6-1.8,2.5,0.9,5.4c2.7,2.9,3.5,6.9,4.3,7.6c-0.3,0.8-0.5,1.6-0.8,2.3c-0.8,2.3,2.5,5,1.7,7.2
                    c-0.8,2.3-3.6,2.2-5.7,2.8L287.8,135.2"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "桃園市" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("桃園市")}
            onMouseMove={(e) => handleMouseMove(e, "桃園市")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="彰化縣"
            d="M131.9,248c0.3-0.3,0.7-0.7,1-1c6.5-6.5,11.5-19.3,11.5-23.9c0-4.7,11.2-10.3,11.2-13c0-2.8,0.9-7.1,3.4-9.6
                    c1.1-1,3.3-4.2,5.5-7.7c0.9,0.4,1.9,0.9,3.9,1.4c3.7,1,3.5,3.1,3.7,7c0.2,3.9,7.5,5.8,9.7,6.6c2.3,0.8,4.1,4.1,3.9,6.4
                    c-0.2,2.3,0.4,2.9,2.5,4.3c0.2,0.2,0.5,0.3,0.7,0.4c-0.3,0.6-0.4,1.4-0.2,2.8c0.4,3.2,0.8,3.4-0.2,5s-0.4,2.9-1.2,5
                    c-0.8,2.1-2.5,8.3-1,10.4c1.5,2.1,1.9,5.6,4.1,6.2c2.3,0.6,5-0.4,5.6,2.3c0.6,2.7-2.9,2.3-5.4,2.7c-1.6,0.3-2.6,1.2-2.7,2.2
                    c-2.3-0.5-4.9-1-6.3-1c-2.5,0-7-0.6-8.5-2.1c-1.5-1.5-7.7-1.9-11.2-1.9s-4.8-3.7-7.5-3.1c-2.7,0.6-12.4,0.8-16.2,1
                    C135.9,248.7,133.8,248.3,131.9,248z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "彰化縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("彰化縣")}
            onMouseMove={(e) => handleMouseMove(e, "彰化縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="花蓮縣"
            d="M335.2,173.5c0.5,1.3,1.1,2.2-0.1,3.6c-2.2,2.5-16.5,18-15.2,25.8c-0.3,3.4-11.2,4.7-2.5,13.5
                    c1.2,2.9-0.9,5.1-2.2,8.8c-1.2,3.7-2.8,8.7-1.2,12.1c1.6,3.4-5.3,9.6-8.7,29.2c-3,17.1-5.5,29-6.1,36.1c-0.8-0.1-1.7-0.1-2.6-0.2
                    c-4.3-0.2-3.7,1-4.6,2.3c-0.8,1.2-5.2,2.3-3.9,5c1.2,2.7,1.9,6.8,0,9.1c-1.9,2.3-2.1,6-2.3,7.9c-0.2,1.9-3.7,7-3.9,8.5
                    c-0.2,1.4-2.7,1.9-2.9,4.8c-0.2,2.9,0.6,7-1.4,8.3c-2.1,1.2-5,2.3-6.6,2.5c-1.7,0.2-0.6-2.9-2.3-3.1c-1.7-0.2-2.7-1.9-4.1-3.3
                    c-1.4-1.4-3.9-3.1-3.7-5.6c0.2-2.5-0.6-3.3-2.7-2.9c-2.1,0.4-4.1-1.7-7.7-2.5c-3.5-0.8-6.2-1.5-7.9-5c-1.1-2.3-1.3-4.3-1.3-6.3l0,0
                    c0-1.1,0-2.1-0.1-3.1c-0.2-2.7-2.7-3.5-6-3.2c-3.3,0.3-2.3-4.4-0.8-5.9c1.4-1.4,3.5-1,4.6-2.5c0.7-0.9,0.9-2.5,0.7-4.4
                    c1.3-0.5,1.9-0.3,2.7-1.6c0.9-1.5,0.5-2.7,0.1-4.1c-0.4-1.5,0.2-3.3,1.5-4.9c1.2-1.6,6.6-0.4,9.7,0c3.1,0.4,1.9-3.3,1.9-5.6
                    c0-2.3,0.6-4.6,2.9-5.2c2.3-0.6,4.6-2.7,7-8.1c2.5-5.4,1.2-13.3-0.8-16c-2.1-2.7,0.6-3.9,1.2-6.2c0.6-2.3,2.1-8.9,4.6-10.8
                    c2.5-1.9,2.8-10.8,1-14.5c-1.9-3.7-0.6-5,0-6.8c0.6-1.9,2.9-6.6,4.9-8.1c2-1.4,2.2-4.8,0.2-6c-2-1.2-4.2-3.7-4.2-7.7
                    c0-3.9,3.1-2.9,5.8-3.5c2-0.4,2.4-2.5,2.2-5.6c0.4-0.2,0.8-0.5,1.3-1.2c1.5-2.1,2.7-0.4,3.5-2.9c0.8-2.5,3.3-6.2,5-7.3
                    c1.3-0.8,3.2-4,4.5-8.5c1,1,2.6,1.1,4.8,1.7c2.9,0.8,8.5,0.8,9.9,2.3c1.5,1.5,3.5,0,5.6-0.8c2.1-0.8,1.5-3.1,0.9-4.6
                    c-0.6-1.5,7,1.4,8.4,3.3C325.3,172,328.8,174.7,335.2,173.5z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "花蓮縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("花蓮縣")}
            onMouseMove={(e) => handleMouseMove(e, "花蓮縣")}
            onMouseOut={handleMouseOut}
          ></path>
          <path
            data-name="南投縣"
            d="M280.2,188.3c0.1,3.1-0.3,5.2-2.2,5.6c-2.7,0.6-5.8-0.4-5.8,3.5c0,3.9,2.3,6.4,4.2,7.7c2,1.2,1.7,4.6-0.2,6
                 c-2,1.4-4.2,6.2-4.9,8.1c-0.6,1.9-1.9,3.1,0,6.8c1.9,3.7,1.6,12.6-1,14.5c-2.5,1.9-4,8.5-4.6,10.8c-0.6,2.3-3.3,3.5-1.2,6.2
                 c2.1,2.7,3.3,10.6,0.8,16c-2.5,5.4-4.8,7.5-7,8.1c-2.3,0.6-2.9,2.9-2.9,5.2c0,2.3,1.2,6-1.9,5.6c-3.1-0.4-8.5-1.6-9.7,0
                 c-1.2,1.6-1.9,3.5-1.5,4.9c0.4,1.5,0.8,2.7-0.1,4.1c-0.8,1.3-1.4,1.1-2.7,1.6c0,0-0.3,0.1-0.5,0.2c-1.7,0.8-2.2-3.3-3.1-4.1
                 c-0.8-0.8-5-0.6-8.3-0.6c-0.3,0-0.7,0-1.1,0l0,0c-4-0.2-12.2-1-14.1-1c-2.1,0-0.8-1-1.7-5.4c-0.8-4.4-3.1-5.2,0-9.1
                 c3.1-3.9-0.8-2.9-2.9-3.5c-1.6-0.5-5.2-2.4-7-3.4l0,0c-0.5-0.3-0.9-0.5-1.1-0.6c-0.8-0.4-3.3,0-6.4,1c-3.1,1-3.3,1.4-5.6-1
                 c-2.3-2.5-3.7-2.5-1.2-6.2c2.5-3.7,1.4-5.6,0.6-7c-0.8-1.4,0.6-1,1.7-1.7c1-0.6,1.4-1.4-0.2-3.1c-0.6-0.6-0.8-1.3-0.8-1.9l0,0
                 c0.1-1.1,1.1-2,2.7-2.2c2.5-0.4,6,0,5.4-2.7c-0.6-2.7-3.3-1.7-5.6-2.3c-2.3-0.6-2.7-4.1-4.1-6.2c-1.4-2.1,0.2-8.3,1-10.4
                 c0.8-2.1,0.2-3.3,1.2-5s0.6-1.8,0.2-5c-0.2-1.3,0-2.2,0.2-2.8c1.6,1,2.3,1.1,5.8,1.6c3.9,0.6,8.1,2.3,11.4,0
                 c3.3-2.3,6.4-11.6,7-12.4c0.6-0.8,0.6-4.3,2.5-3.7c1.9,0.6,7,0.4,9.7,0c2.7-0.4,2.3-2.7,3.7-1.3c1.4,1.5,1.4,1.2,3.5,1.2
                 c2.1,0,4.8-2.5,5-4.6c0.2-2.1,3.1-1.7,5.6-1.9c2.5-0.2,3.1-3.5,4.8-4.1c1.7-0.6,2.9,0,4.8-1.7c1.9-1.7,3.1-2.3,6.3-3.8
                 c3.2-1.5,5.7,0.7,8.7-0.8c3-1.5,5.7,0.2,8.7,0.4C278.4,188.3,279.4,188.7,280.2,188.3z"
            className={`stroke-white cursor-pointer fill-transparent opacity-75 hover:opacity-100 hover:fill-[rgba(236,181,126,0.8)] ${
              activeCounty === "南投縣" ? "is-active" : ""
            }`}
            onClick={() => handlePathClick("南投縣")}
            onMouseMove={(e) => handleMouseMove(e, "南投縣")}
            onMouseOut={handleMouseOut}
          ></path>
        </svg>
      </div>
      <div
        className="tooltip"
        style={{
          display: isTooltipVisible ? "block" : "none",
          backgroundColor: "primary-color",
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          position: "absolute",
          fontSize: "12px",
        }}
      >
        {tooltipContent}
      </div>

      {/* <div className="flex-1 p-6 rounded-lg shadow-md bg-primary-color ml-[100px]">
        {venues.map((venue) => (
          <div key={venue.id}>
            <h3>{venue.Name}</h3>
            <p>
              {venue.City} {venue.District} {venue.Address}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Map;
