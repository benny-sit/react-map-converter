import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { mapColor } from '../assets/constants';

const geoUrl = '/features.json';

const MapChart = ({ setSelectedCountry }) => {
  // const [capitals, setCapitals] = useState([]);

  // useEffect(() => {
  //   import('/worldcities_capitals.json?url&raw').then((data) => {
  //     setCapitals(JSON.parse(data.default));
  //   });
  // }, []);

  function handleClicked(e) {
    setSelectedCountry(e.target.getAttribute('data-iso3'));
  }

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <ZoomableGroup center={[10, 0]} zoom={1.4}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <>
                  <Geography
                    key={geo.rsmKey}
                    className="focus:outline-none fill-[#D6D6DA] hover:fill-blue-500"
                    geography={geo}
                    fill={mapColor}
                    data-tooltip-content=""
                    data-tooltip-id={`map-${geo.id}`}
                    onClick={handleClicked}
                    data-iso3={geo.id}
                  />
                </>
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;

// {capitals.map(({ city, coordinates }) => (
//   <Marker key={city} coordinates={coordinates}>
//     <g
//       fill="none"
//       stroke="#FF5533"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="10" r="1" />
//       {/* <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /> */}
//     </g>
//     <text
//       textAnchor="middle"
//       style={{
//         fontFamily: 'system-ui',
//         fill: '#5D5A6D',
//         fontSize: 2,
//       }}
//     >
//       {city}
//     </text>
//   </Marker>
// ))}
