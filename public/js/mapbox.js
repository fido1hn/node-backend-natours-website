/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZmlkbzFobiIsImEiOiJjbHc5NHd2MHowbGdkMm1udDZ5dzZqdG9yIn0.j07NOzxBSOja89VCV-tmFQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/fido1hn/clw9ackmu00vk01oxdqhl134z',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}</p>: ${loc.description}`)
      .addTo(map);

    // Extends map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
