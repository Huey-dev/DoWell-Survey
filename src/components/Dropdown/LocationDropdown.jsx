import { useGlobalContext } from "../../Context/PreviewContext";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import FetchCountryRegion from "../../data/fetchCountryRegion";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
export default function LocationDropdown({ country }) {
  const { inputData, setInputData, setCenterCoords, centerCoords, api_key } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [all_cities, setCities] = useState();
  // const { data:regions } = useQuery({
  //     queryFn: async () => FetchCountryRegion( "e0ab32cf-7bd2-47e7-b2af-2448262ec41e", country),
  //     queryKey: 'regions',

  //     enabled: !!inputData.country
  // })

  useEffect(() => {
    async function getCities() {
      setLoading(true);
      const regions = await FetchCountryRegion(api_key, country);
      setCities(regions?.data?.data);
      // console.log("key",api_key)
      // console.log(country)
      // console.log("all_cities",all_cities)
      setLoading(false);
    }
    getCities();
  }, [country]);
  // const regions = null;
  // console.log("country",country)

  const handleChange = (e) => {
    setInputData({ ...inputData, city: all_cities[e.target.value].name });
    console.log("dsdsdddddddd", all_cities[e.target.value].name.toLowerCase());

    // sessionStorage.setItem("region", JSON.stringify(all_cities[e.target.value].name.toLowerCase()));
    sessionStorage.setItem(
      "region",
      all_cities[e.target.value].name.toLowerCase()
    );

    setCenterCoords({
      ...centerCoords,
      lat: all_cities[e.target.value].lat,
      lon: all_cities[e.target.value].lon,
    });
  };
  const data = {
    data: [
      {
        name: "Ahero",
        coordinates: "-0.17359, 34.9189",
        lat: -0.17359,
        lon: 34.9189,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Athi River",
        coordinates: "-1.4563, 36.97826",
        lat: -1.4563,
        lon: 36.97826,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Baringo",
        coordinates: "0.46667, 35.96667",
        lat: 0.46667,
        lon: 35.96667,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Bondo",
        coordinates: "0.23522, 34.28086",
        lat: 0.23522,
        lon: 34.28086,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Bungoma",
        coordinates: "0.5635, 34.56055",
        lat: 0.5635,
        lon: 34.56055,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Bungoma",
        coordinates: "0.58333, 34.58333",
        lat: 0.58333,
        lon: 34.58333,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Busia",
        coordinates: "0.46005, 34.11169",
        lat: 0.46005,
        lon: 34.11169,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Butere",
        coordinates: "0.20694, 34.49006",
        lat: 0.20694,
        lon: 34.49006,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Chepareria",
        coordinates: "1.30583, 35.20365",
        lat: 1.30583,
        lon: 35.20365,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Chuka",
        coordinates: "-0.33316, 37.64587",
        lat: -0.33316,
        lon: 37.64587,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Eldama Ravine",
        coordinates: "0.05196, 35.72734",
        lat: 0.05196,
        lon: 35.72734,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Eldoret",
        coordinates: "0.52036, 35.26993",
        lat: 0.52036,
        lon: 35.26993,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Embu",
        coordinates: "-0.53987, 37.45743",
        lat: -0.53987,
        lon: 37.45743,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Garissa",
        coordinates: "-0.45275, 39.64601",
        lat: -0.45275,
        lon: 39.64601,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Gazi",
        coordinates: "-4.42402, 39.50588",
        lat: -4.42402,
        lon: 39.50588,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Hola",
        coordinates: "-1.48256, 40.03341",
        lat: -1.48256,
        lon: 40.03341,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Homa Bay",
        coordinates: "-0.52731, 34.45714",
        lat: -0.52731,
        lon: 34.45714,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Isiolo",
        coordinates: "0.35462, 37.58218",
        lat: 0.35462,
        lon: 37.58218,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Iten",
        coordinates: "0.67028, 35.50806",
        lat: 0.67028,
        lon: 35.50806,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kabarnet",
        coordinates: "0.49194, 35.74303",
        lat: 0.49194,
        lon: 35.74303,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kajiado",
        coordinates: "-1.85238, 36.77683",
        lat: -1.85238,
        lon: 36.77683,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kakamega",
        coordinates: "0.28422, 34.75229",
        lat: 0.28422,
        lon: 34.75229,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kangema",
        coordinates: "-0.68553, 36.96463",
        lat: -0.68553,
        lon: 36.96463,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kangundo",
        coordinates: "-1.30342, 37.34813",
        lat: -1.30342,
        lon: 37.34813,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kapenguria",
        coordinates: "1.23889, 35.11194",
        lat: 1.23889,
        lon: 35.11194,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kapsabet",
        coordinates: "0.20387, 35.105",
        lat: 0.20387,
        lon: 35.105,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kapsowar",
        coordinates: "0.9789, 35.55854",
        lat: 0.9789,
        lon: 35.55854,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Karuri",
        coordinates: "-0.7, 37.18333",
        lat: -0.7,
        lon: 37.18333,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kathwana",
        coordinates: "-0.33139, 37.86861",
        lat: -0.33139,
        lon: 37.86861,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kericho",
        coordinates: "-0.36774, 35.28314",
        lat: -0.36774,
        lon: 35.28314,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Keroka",
        coordinates: "-0.77612, 34.94678",
        lat: -0.77612,
        lon: 34.94678,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kerugoya",
        coordinates: "-0.49887, 37.28031",
        lat: -0.49887,
        lon: 37.28031,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kiambu",
        coordinates: "-1.17139, 36.83556",
        lat: -1.17139,
        lon: 36.83556,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kihancha",
        coordinates: "-1.19347, 34.61967",
        lat: -1.19347,
        lon: 34.61967,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kijabe",
        coordinates: "-0.93334, 36.57233",
        lat: -0.93334,
        lon: 36.57233,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kikuyu",
        coordinates: "-1.24627, 36.66291",
        lat: -1.24627,
        lon: 36.66291,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kilifi",
        coordinates: "-3.63045, 39.84992",
        lat: -3.63045,
        lon: 39.84992,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kinango",
        coordinates: "-4.13723, 39.31528",
        lat: -4.13723,
        lon: 39.31528,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kipini",
        coordinates: "-2.52565, 40.5262",
        lat: -2.52565,
        lon: 40.5262,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kipkelion",
        coordinates: "-0.19982, 35.46735",
        lat: -0.19982,
        lon: 35.46735,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kisii",
        coordinates: "-0.68174, 34.76666",
        lat: -0.68174,
        lon: 34.76666,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kisumu",
        coordinates: "-0.10221, 34.76171",
        lat: -0.10221,
        lon: 34.76171,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kitale",
        coordinates: "1.01572, 35.00622",
        lat: 1.01572,
        lon: 35.00622,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kitui",
        coordinates: "-1.36696, 38.01055",
        lat: -1.36696,
        lon: 38.01055,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Konza",
        coordinates: "-1.73947, 37.13195",
        lat: -1.73947,
        lon: 37.13195,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Kwale",
        coordinates: "-4.17375, 39.45206",
        lat: -4.17375,
        lon: 39.45206,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Lamu",
        coordinates: "-2.27169, 40.90201",
        lat: -2.27169,
        lon: 40.90201,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Limuru",
        coordinates: "-1.1136, 36.64205",
        lat: -1.1136,
        lon: 36.64205,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Litein",
        coordinates: "-0.58249, 35.18969",
        lat: -0.58249,
        lon: 35.18969,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Lodwar",
        coordinates: "3.11988, 35.59642",
        lat: 3.11988,
        lon: 35.59642,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Lokichokio",
        coordinates: "4.20771, 34.35378",
        lat: 4.20771,
        lon: 34.35378,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Londiani",
        coordinates: "-0.16552, 35.59359",
        lat: -0.16552,
        lon: 35.59359,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Luanda",
        coordinates: "0.31354, 34.07146",
        lat: 0.31354,
        lon: 34.07146,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Lugulu",
        coordinates: "0.39337, 34.30399",
        lat: 0.39337,
        lon: 34.30399,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Machakos",
        coordinates: "-1.52233, 37.26521",
        lat: -1.52233,
        lon: 37.26521,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Magadi",
        coordinates: "-1.90122, 36.287",
        lat: -1.90122,
        lon: 36.287,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Makueni Boma",
        coordinates: "-1.80388, 37.62405",
        lat: -1.80388,
        lon: 37.62405,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Malaba",
        coordinates: "0.63513, 34.28165",
        lat: 0.63513,
        lon: 34.28165,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Malikisi",
        coordinates: "0.67694, 34.42167",
        lat: 0.67694,
        lon: 34.42167,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Malindi",
        coordinates: "-3.21799, 40.11692",
        lat: -3.21799,
        lon: 40.11692,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mandera",
        coordinates: "3.93726, 41.85688",
        lat: 3.93726,
        lon: 41.85688,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Maragua",
        coordinates: "-0.79602, 37.13292",
        lat: -0.79602,
        lon: 37.13292,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Maralal",
        coordinates: "1.09667, 36.69806",
        lat: 1.09667,
        lon: 36.69806,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mariakani",
        coordinates: "-3.86261, 39.47458",
        lat: -3.86261,
        lon: 39.47458,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Marsabit",
        coordinates: "2.33468, 37.99086",
        lat: 2.33468,
        lon: 37.99086,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Maua",
        coordinates: "0.2332, 37.94086",
        lat: 0.2332,
        lon: 37.94086,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mbale",
        coordinates: "0.08213, 34.72139",
        lat: 0.08213,
        lon: 34.72139,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Meru",
        coordinates: "0.04626, 37.65587",
        lat: 0.04626,
        lon: 37.65587,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Migori",
        coordinates: "-1.06343, 34.47313",
        lat: -1.06343,
        lon: 34.47313,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Molo",
        coordinates: "-0.24849, 35.73194",
        lat: -0.24849,
        lon: 35.73194,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mombasa",
        coordinates: "-4.05466, 39.66359",
        lat: -4.05466,
        lon: 39.66359,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Moyale",
        coordinates: "3.52661, 39.0561",
        lat: 3.52661,
        lon: 39.0561,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mtito Andei",
        coordinates: "-2.68987, 38.16687",
        lat: -2.68987,
        lon: 38.16687,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Muhoroni",
        coordinates: "-0.15816, 35.19645",
        lat: -0.15816,
        lon: 35.19645,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mumias",
        coordinates: "0.33474, 34.48796",
        lat: 0.33474,
        lon: 34.48796,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Murang’a",
        coordinates: "-0.72104, 37.15259",
        lat: -0.72104,
        lon: 37.15259,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mwatate",
        coordinates: "-3.505, 38.37722",
        lat: -3.505,
        lon: 38.37722,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Mwingi",
        coordinates: "-0.93605, 38.05955",
        lat: -0.93605,
        lon: 38.05955,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nairobi",
        coordinates: "-1.28333, 36.81667",
        lat: -1.28333,
        lon: 36.81667,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Naivasha",
        coordinates: "-0.71383, 36.43261",
        lat: -0.71383,
        lon: 36.43261,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nakuru",
        coordinates: "-0.30719, 36.07225",
        lat: -0.30719,
        lon: 36.07225,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nambare",
        coordinates: "0.45813, 34.25353",
        lat: 0.45813,
        lon: 34.25353,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nandi Hills",
        coordinates: "0.10366, 35.18426",
        lat: 0.10366,
        lon: 35.18426,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nanyuki",
        coordinates: "0.00624, 37.07398",
        lat: 0.00624,
        lon: 37.07398,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Naro Moru",
        coordinates: "-0.16357, 37.01773",
        lat: -0.16357,
        lon: 37.01773,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Narok",
        coordinates: "-1.08083, 35.87111",
        lat: -1.08083,
        lon: 35.87111,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Ngong",
        coordinates: "-1.3527, 36.6699",
        lat: -1.3527,
        lon: 36.6699,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nyahururu",
        coordinates: "0.03813, 36.36339",
        lat: 0.03813,
        lon: 36.36339,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nyamira",
        coordinates: "-0.56333, 34.93583",
        lat: -0.56333,
        lon: 34.93583,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Nyeri",
        coordinates: "-0.42013, 36.94759",
        lat: -0.42013,
        lon: 36.94759,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Ogembo",
        coordinates: "-0.80116, 34.72579",
        lat: -0.80116,
        lon: 34.72579,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Ol Kalou",
        coordinates: "-0.27088, 36.37917",
        lat: -0.27088,
        lon: 36.37917,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Othaya",
        coordinates: "-0.54655, 36.93178",
        lat: -0.54655,
        lon: 36.93178,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Oyugis",
        coordinates: "-0.50974, 34.73067",
        lat: -0.50974,
        lon: 34.73067,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Port Victoria",
        coordinates: "0.09809, 33.97248",
        lat: 0.09809,
        lon: 33.97248,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Pumwani",
        coordinates: "-1.28333, 36.85",
        lat: -1.28333,
        lon: 36.85,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Rongai",
        coordinates: "-0.17344, 35.86313",
        lat: -0.17344,
        lon: 35.86313,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Ruiru",
        coordinates: "-1.14665, 36.96087",
        lat: -1.14665,
        lon: 36.96087,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Rumuruti",
        coordinates: "0.2725, 36.53806",
        lat: 0.2725,
        lon: 36.53806,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Sagana",
        coordinates: "-0.66806, 37.20875",
        lat: -0.66806,
        lon: 37.20875,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Sawa Sawa",
        coordinates: "-4.47166, 39.48463",
        lat: -4.47166,
        lon: 39.48463,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Shimoni",
        coordinates: "-4.64756, 39.38175",
        lat: -4.64756,
        lon: 39.38175,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Siaya",
        coordinates: "0.0607, 34.28806",
        lat: 0.0607,
        lon: 34.28806,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Sotik",
        coordinates: "-0.69069, 35.11102",
        lat: -0.69069,
        lon: 35.11102,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Sotik Post",
        coordinates: "-0.78129, 35.34156",
        lat: -0.78129,
        lon: 35.34156,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Takaungu",
        coordinates: "-3.6835, 39.85687",
        lat: -3.6835,
        lon: 39.85687,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Taveta",
        coordinates: "-3.39879, 37.68336",
        lat: -3.39879,
        lon: 37.68336,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Thika",
        coordinates: "-1.03326, 37.06933",
        lat: -1.03326,
        lon: 37.06933,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Voi",
        coordinates: "-3.39605, 38.55609",
        lat: -3.39605,
        lon: 38.55609,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Wajir",
        coordinates: "1.7471, 40.05732",
        lat: 1.7471,
        lon: 40.05732,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Webuye",
        coordinates: "0.6004, 34.77119",
        lat: 0.6004,
        lon: 34.77119,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Witu",
        coordinates: "-2.38892, 40.43827",
        lat: -2.38892,
        lon: 40.43827,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Wote",
        coordinates: "-1.78079, 37.62882",
        lat: -1.78079,
        lon: 37.62882,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Wundanyi",
        coordinates: "-3.39642, 38.35729",
        lat: -3.39642,
        lon: 38.35729,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
      {
        name: "Yala",
        coordinates: "0.09438, 34.53602",
        lat: 0.09438,
        lon: 34.53602,
        country_code: "254",
        continent: "Africa",
        country: "kenya",
      },
    ],
  };

  // const api_key = ""
  // const country = ""

  // const { data:region_data } = useQuery({
  //     queryFn: async () => FetchCountries(api_key=api_key,country=country),
  //     queryKey: 'countries'
  // }, [])

  const cities = data?.data;
  return (
    <div className="relative w-[15vw]">
      <select
        disabled={loading}
        id="country"
        name="country"
        value={all_cities?.findIndex((city) => city.name === inputData.city)}
       
        autoComplete="country-name"
        onChange={(e) => handleChange(e)}
        className="select w-[15vw] h-[33px] bg-[#D9D9D9]"
      >
        <option>Select region</option>
        {all_cities?.map((item, index) => (
          <option value={index} key={index}>
            {item.name}
          </option>
        ))}
      </select>                                                                                                                                                                                                                                                                                                                             
      {loading && (
        <ClipLoader
          color="#000000"
          loading={loading}
          size={20}
          className="absolute right-6 top-1/4 transform -translate-y-1/2"
        />
      )}
    </div>
  );
}

LocationDropdown.propTypes = {
  loading: PropTypes.bool.isRequired,
};
