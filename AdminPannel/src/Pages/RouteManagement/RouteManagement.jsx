import React, { useState, useEffect, useRef } from 'react';
import {
  FaPlus,
  FaTimes,
  FaRoute,
  FaClock,
  FaLocationArrow,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaUpload,
  FaCalendarAlt,
  FaImage,
  FaSatelliteDish,
  FaTruck
} from 'react-icons/fa';
import './RouteManagement.css';
import API from '../../api/axios';

// Default hub location (Bhubaneswar) — only used as the map's starting
// center point until a real route with its own hubCoords is loaded.
const DEFAULT_HUB_COORDS = [20.3050, 85.8280];

const ROUTE_API = '/routeRoutes';

const RouteManagement = () => {
  // Modal & Route States
  const [showModal, setShowModal] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [stops, setStops] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('0m');
  const [baseHubCoords, setBaseHubCoords] = useState(DEFAULT_HUB_COORDS);
  const [loadingStops, setLoadingStops] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Leaflet Map Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null); // holds hub/stop markers + polyline so they can be redrawn without recreating the map
  const dateInputRef = useRef(null);

  // Table Data State
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableError, setTableError] = useState(null);

  const [showTableForm, setShowTableForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for delivery partners names from Delivery API
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);

  // State for vehicles from Vehicle API
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // Tracks whether we're currently compressing a selected image, so the
  // submit button / file label can reflect that briefly.
  const [processingImage, setProcessingImage] = useState(false);

  // Live clock for the console header — cosmetic only.
  const [clockNow, setClockNow] = useState(new Date());

  // Table Form Controls
  const emptyFormData = {
    date: new Date().toISOString().split('T')[0],
    name: '',
    order: '',
    locations: [],
    vehicleNo: '',
    vehicle: '',
    image: null,
    imagePreview: ''
  };
  const [formData, setFormData] = useState(emptyFormData);

  // Locations available for the "Add New Entry" dropdown — derived ONLY
  // from stops that have actually been added to the route. No preset list.
  const routeLocations = stops.map((s) => s.name);

  // --- Fetch Delivery Partners from Delivery API ---
  const fetchDeliveryPartners = async () => {
    try {
      setLoadingPartners(true);
      const response = await API.get('/delivery');
      if (response.data?.success) {
        setDeliveryPartners(response.data.data);
      } else {
        setDeliveryPartners([]);
      }
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
      setDeliveryPartners([]);
    } finally {
      setLoadingPartners(false);
    }
  };

  // --- Fetch Vehicles from Vehicle API ---
  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const response = await API.get('/vehicle');

      let vehicleData = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        vehicleData = response.data.data;
      } else if (Array.isArray(response.data)) {
        vehicleData = response.data;
      }

      setVehicles(vehicleData);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // --- Fetch Table Records from Backend (/api/routeRoutes/assignments) ---
  const fetchTableRecords = async () => {
    try {
      setLoadingTable(true);
      setTableError(null);

      const response = await API.get(`${ROUTE_API}/assignments`);
      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item) => ({
          id: item._id,
          date: item.date,
          name: item.name,
          order: item.order,
          locations: item.locations || [],
          vehicleNo: item.vehicleNo,
          vehicle: item.vehicle,
          image: item.image || ''
        }));
        setTableData(formatted);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching route assignment records:', error);
      setTableError(error.message || 'Failed to fetch data from server');
      setTableData([]);
    } finally {
      setLoadingTable(false);
    }
  };

  // --- Fetch Active Route ---
  const fetchActiveRoute = async () => {
    setLoadingStops(true);
    try {
      const response = await API.get(`${ROUTE_API}/active`);
      const result = response.data;

      if (result.success && result.data) {
        const routeData = result.data;
        setStops(routeData.stops || []);
        setTotalDistance(routeData.totalDistance || 0);
        setEstimatedTime(routeData.estimatedTime || '0m');
        setBaseHubCoords(routeData.hubCoords || DEFAULT_HUB_COORDS);
      }
      setMapReady(true);
    } catch (err) {
      console.error('Error fetching active route:', err);
      setMapReady(true);
    } finally {
      setLoadingStops(false);
    }
  };

  // Load Initial Data
  useEffect(() => {
    fetchActiveRoute();
    fetchTableRecords();
    fetchDeliveryPartners();
    fetchVehicles();
  }, []);

  // Live clock tick — purely cosmetic, does not touch any backend state.
  useEffect(() => {
    const timer = setInterval(() => setClockNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* -----------------------------------------------------------------
     MAP INITIALIZATION — runs once when mapReady flips true.
     Creates the map + a single layerGroup ONCE, then only touches
     the layerGroup's contents when stops/hub change (see next effect),
     avoiding the Leaflet "_leaflet_pos" race from recreating the map.
  ----------------------------------------------------------------- */
  useEffect(() => {
    if (!mapReady || !mapContainerRef.current) return;

    let cancelled = false;

    const initMap = () => {
      if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(baseHubCoords, 13);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);

      // Dark "control room" basemap to match the console theme.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      setTimeout(() => {
        if (!cancelled && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    };

    const loadLeafletAssets = () => {
      if (window.L) {
        initMap();
        return;
      }

      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      const jsScript = document.createElement('script');
      jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      jsScript.onload = () => {
        if (!cancelled) initMap();
      };
      document.head.appendChild(jsScript);
    };

    loadLeafletAssets();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
      }
    };
  }, [mapReady]);

  /* -----------------------------------------------------------------
     MARKER / ROUTE REDRAW — runs whenever stops or hub coords change.
     Only clears and repopulates the layerGroup; the map instance
     itself is never destroyed.
  ----------------------------------------------------------------- */
  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!L || !map || !layerGroup) return;

    try {
      layerGroup.clearLayers();

      const hubIcon = L.divIcon({
        className: 'route-management-hub-marker',
        html: `<div class="hub-marker-wrapper"><span class="hub-icon">◎</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      L.marker(baseHubCoords, { icon: hubIcon })
        .addTo(layerGroup)
        .bindPopup('<b>Main Dispatch Hub</b>');

      const routePoints = [baseHubCoords];

      stops.forEach((stop, index) => {
        if (!stop.coords || !Array.isArray(stop.coords) || stop.coords.length !== 2) return;

        const stopIcon = L.divIcon({
          className: 'route-management-stop-marker',
          html: `<div class="stop-marker-wrapper">${index + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker(stop.coords, { icon: stopIcon })
          .addTo(layerGroup)
          .bindPopup(`<b>Stop ${index + 1}: ${stop.name}</b>`);

        routePoints.push(stop.coords);
      });

      routePoints.push(baseHubCoords);

      if (routePoints.length > 1) {
        L.polyline(routePoints, {
          color: '#F2A93B',
          weight: 3.5,
          opacity: 0.9,
          lineJoin: 'round',
          dashArray: '1, 8'
        }).addTo(layerGroup);

        const bounds = L.latLngBounds(routePoints);
        map.fitBounds(bounds, { padding: [40, 40], animate: false });
      }

      map.invalidateSize();
    } catch (error) {
      console.error('Error redrawing map layers:', error);
    }
  }, [stops, baseHubCoords]);

  // Handle Adding Stop via Backend API (`/add-stop`)
  // Coordinates are placed as a small random offset around the hub since
  // there is no geocoding service wired up — no location is pre-mapped.
  const handleGenerateRoute = async (e) => {
    e.preventDefault();
    const trimmedName = locationInput.trim();

    if (!trimmedName) {
      alert('Please enter a location');
      return;
    }

    if (stops.some((s) => s.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert(`⚠️ Location "${trimmedName}" already exists in the route.`);
      return;
    }

    const offsetLat = (Math.random() - 0.5) * 0.045;
    const offsetLng = (Math.random() - 0.5) * 0.045;
    const coords = [baseHubCoords[0] + offsetLat, baseHubCoords[1] + offsetLng];
    const calculatedDistance = parseFloat((Math.random() * 3 + 1.2).toFixed(1));

    try {
      setLoadingStops(true);

      const response = await API.post(`${ROUTE_API}/add-stop`, {
        name: trimmedName,
        distance: calculatedDistance,
        coords
      });
      const result = response.data;

      if (result.success) {
        setStops(result.data.stops);
        setTotalDistance(result.data.totalDistance);
        setEstimatedTime(result.data.estimatedTime);
        setBaseHubCoords(result.data.hubCoords || baseHubCoords);

        setLocationInput('');
        setShowModal(false);
        alert(`✅ Location "${trimmedName}" added successfully!`);
      } else {
        alert(result.message || 'Failed to add stop');
      }
    } catch (error) {
      console.error('API Error adding stop:', error);
      alert(error.response?.data?.message || 'Error adding location. Please try again.');
    } finally {
      setLoadingStops(false);
    }
  };

  // Handle Removing Stop via Backend API (`/stop/:stopId`)
  const removeStop = async (id) => {
    if (!window.confirm('Are you sure you want to remove this stop?')) return;

    try {
      setLoadingStops(true);
      const response = await API.delete(`${ROUTE_API}/stop/${id}`);
      const result = response.data;

      if (result.success) {
        setStops(result.data.stops);
        setTotalDistance(result.data.totalDistance);
        setEstimatedTime(result.data.estimatedTime);
        alert('✅ Stop removed successfully!');
      } else {
        alert(result.message || 'Failed to delete stop');
      }
    } catch (error) {
      console.error('API Error deleting stop:', error);
      alert('Error removing stop. Please try again.');
    } finally {
      setLoadingStops(false);
    }
  };

  // --- Table Form Operations ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Compresses/resizes the image on a canvas before storing it as a base64
  // data URL. This keeps the JSON payload small so it never hits Express's
  // body-size limit (which was causing the 500/413 error previously).
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setProcessingImage(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new window.Image();

      img.onload = () => {
        try {
          const MAX_WIDTH = 800;
          const scale = Math.min(1, MAX_WIDTH / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 0.7 quality JPEG keeps most photos well under ~200-400KB
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

          setFormData((prev) => ({
            ...prev,
            image: file,
            imagePreview: compressedDataUrl
          }));
        } catch (err) {
          console.error('Error compressing image:', err);
          alert('Could not process this image. Please try a different file.');
        } finally {
          setProcessingImage(false);
        }
      };

      img.onerror = () => {
        console.error('Error loading image for compression.');
        alert('Could not read this image file. Please try a different one.');
        setProcessingImage(false);
      };

      img.src = reader.result;
    };

    reader.onerror = () => {
      console.error('FileReader error.');
      alert('Could not read the selected file. Please try again.');
      setProcessingImage(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSelectAllLocations = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, locations: [...routeLocations] }));
    } else {
      setFormData((prev) => ({ ...prev, locations: [] }));
    }
  };

  const handleLocationCheckboxChange = (location) => {
    setFormData((prev) => {
      const isSelected = prev.locations.includes(location);
      return isSelected
        ? { ...prev, locations: prev.locations.filter((loc) => loc !== location) }
        : { ...prev, locations: [...prev.locations, location] };
    });
  };

  const handleVehicleSelect = (e) => {
    const selectedVehicleNumber = e.target.value;
    setFormData((prev) => ({
      ...prev,
      vehicle: selectedVehicleNumber,
      vehicleNo: selectedVehicleNumber
    }));
  };

  // Submit form - Save to backend
  const handleTableSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.order || !formData.vehicleNo || !formData.vehicle) {
      alert('Please fill out all required fields.');
      return;
    }

    if (processingImage) {
      alert('Please wait, the image is still being processed.');
      return;
    }

    try {
      setLoadingTable(true);

      const payload = {
        date: formData.date,
        name: formData.name,
        order: formData.order,
        locations: formData.locations,
        vehicleNo: formData.vehicleNo,
        vehicle: formData.vehicle,
        image: formData.imagePreview || undefined // only send when a new image was picked
      };

      if (editingId) {
        const response = await API.put(`${ROUTE_API}/assignments/${editingId}`, payload);
        const result = response.data;

        if (!result.success) {
          alert(result.message || 'Failed to update record');
          return;
        }

        alert('✅ Record updated successfully!');
        setEditingId(null);
      } else {
        const response = await API.post(`${ROUTE_API}/assignments`, payload);
        const result = response.data;

        if (!result.success) {
          alert(result.message || 'Failed to create record');
          return;
        }

        alert('✅ Record created successfully!');
      }

      // Refetch from backend so the table always reflects real DB state
      await fetchTableRecords();

      setFormData(emptyFormData);
      setShowTableForm(false);
    } catch (error) {
      console.error('Error saving record:', error);

      // Surface the real backend message when available (e.g. "Image too
      // large" from the global error handler), instead of a generic string.
      const backendMessage = error.response?.data?.message;
      if (error.response?.status === 413) {
        alert(backendMessage || 'Image too large. Please choose a smaller image.');
      } else {
        alert(backendMessage || 'Failed to save record. Please try again.');
      }
    } finally {
      setLoadingTable(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date,
      name: item.name,
      order: item.order,
      locations: item.locations,
      vehicleNo: item.vehicleNo,
      vehicle: item.vehicle,
      image: null,
      imagePreview: item.image
    });
    setShowTableForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await API.delete(`${ROUTE_API}/assignments/${id}`);
      const result = response.data;

      if (!result.success) {
        alert(result.message || 'Failed to delete record');
        return;
      }

      alert('✅ Record deleted successfully!');
      await fetchTableRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Error deleting record. Please try again.');
    }
  };

  const clockLabel = clockNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateLabel = clockNow.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="rm-shell">
      {/* ================= TOP CONSOLE BAR ================= */}
      <header className="rm-topbar">
        <div className="rm-topbar__brand">
          <span className="rm-topbar__mark"><FaSatelliteDish /></span>
          <div className="rm-topbar__title-group">
            <h1 className="rm-topbar__title">Route Command</h1>
            <span className="rm-topbar__subtitle">Live dispatch &amp; fleet routing console</span>
          </div>
        </div>

        <div className="rm-topbar__status">
          <span className="rm-live-dot" aria-hidden="true"></span>
          <span className="rm-topbar__status-text">LIVE</span>
        </div>

        <div className="rm-topbar__clock">
          <span className="rm-topbar__clock-time">{clockLabel}</span>
          <span className="rm-topbar__clock-date">{dateLabel}</span>
        </div>

        <button
          className="rm-btn rm-btn--primary"
          onClick={() => setShowModal(true)}
          disabled={loadingStops}
        >
          <FaPlus /> {loadingStops ? 'Loading…' : 'Add Stop'}
        </button>
      </header>

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="rm-main">
        <section className="rm-hero">
          {/* Map stage — full bleed */}
          <div className="rm-map-pane">
            <div ref={mapContainerRef} className="rm-map-canvas"></div>

            {/* Floating glass HUD card */}
            <div className="rm-hud-card">
              <div className="rm-hud-card__details">
                <span className="rm-hud-card__label">Dispatch Hub</span>
                <span className="rm-hud-card__coords">
                  {baseHubCoords[0].toFixed(4)}, {baseHubCoords[1].toFixed(4)}
                </span>
              </div>
              <div className="rm-hud-card__actions">
                <button className="rm-icon-btn" title="Open Map Link">
                  <FaExternalLinkAlt />
                </button>
                <button className="rm-icon-btn rm-icon-btn--active" title="Get Directions">
                  <FaLocationArrow />
                </button>
              </div>
            </div>

            {/* Floating stat readouts, bottom-left of the map stage */}
            <div className="rm-hud-stats">
              <div className="rm-hud-stats__item">
                <FaRoute className="rm-hud-stats__icon" />
                <div className="rm-hud-stats__text">
                  <span className="rm-hud-stats__value">{Number(totalDistance).toFixed(1)} KM</span>
                  <span className="rm-hud-stats__label">Total distance</span>
                </div>
              </div>
              <div className="rm-hud-stats__divider" />
              <div className="rm-hud-stats__item">
                <FaClock className="rm-hud-stats__icon" />
                <div className="rm-hud-stats__text">
                  <span className="rm-hud-stats__value">{estimatedTime}</span>
                  <span className="rm-hud-stats__label">Est. time</span>
                </div>
              </div>
              <button
                className="rm-btn rm-btn--ghost-accent rm-hud-stats__navigate"
                onClick={() => alert(`Initiating navigation sequences for ${stops.length} locations!`)}
                disabled={stops.length === 0}
              >
                <FaLocationArrow /> Start Navigation
              </button>
            </div>
          </div>

          {/* Right rail — stop queue */}
          <aside className="rm-queue-rail">
            <div className="rm-queue-rail__header">
              <span className="rm-queue-rail__title">Stop Queue</span>
              <span className="rm-queue-rail__count">{stops.length}</span>
            </div>

            <div className="rm-queue-rail__list">
              {loadingStops ? (
                <div className="rm-empty-state">
                  <p>Loading stops…</p>
                </div>
              ) : stops.length > 0 ? (
                stops.map((stop, index) => (
                  <div key={stop.id} className="rm-queue-card">
                    <div className="rm-queue-card__left">
                      <div className="rm-queue-card__num">{index + 1}</div>
                      <div className="rm-queue-card__info">
                        <h4 className="rm-queue-card__name">{stop.name}</h4>
                      </div>
                    </div>
                    <div className="rm-queue-card__right">
                      <span className="rm-queue-card__distance">{stop.distance} KM</span>
                      <button
                        className="rm-queue-card__remove"
                        onClick={() => removeStop(stop.id)}
                        title="Remove stop"
                        disabled={loadingStops}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rm-empty-state">
                  <p>No stops assigned.<br />Tap “Add Stop” to populate checkpoints.</p>
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* ================= Add Stop Modal ================= */}
        {showModal && (
          <div className="rm-modal-backdrop" onClick={() => setShowModal(false)}>
            <div className="rm-modal-pane" onClick={(e) => e.stopPropagation()}>
              <div className="rm-modal-header">
                <div>
                  <span className="rm-modal-eyebrow">Route Mapping</span>
                  <h3 className="rm-modal-title">Assign New Stop</h3>
                </div>
                <button className="rm-icon-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleGenerateRoute} className="rm-modal-form">
                <div className="rm-field">
                  <label className="rm-field__label">Location Name</label>
                  <input
                    type="text"
                    className="rm-field__input"
                    placeholder="Enter a location name"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    required
                  />
                  <span className="rm-field__tip">
                    This location will be added as a stop and will appear in the Route Assignment
                    Directory's location list below.
                  </span>
                </div>

                <div className="rm-modal-actions">
                  <button
                    type="button"
                    className="rm-btn rm-btn--outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rm-btn rm-btn--primary"
                    disabled={loadingStops}
                  >
                    {loadingStops ? 'Adding…' : 'Generate Map Route'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MANIFEST / TABLE SECTION ================= */}
        <section className="rm-manifest">
          <div className="rm-manifest__header">
            <div>
              <span className="rm-manifest__eyebrow">Directory</span>
              <h3 className="rm-manifest__title">Route Assignment Manifest</h3>
            </div>
            <button
              className="rm-btn rm-btn--dark"
              onClick={() => {
                setEditingId(null);
                setFormData(emptyFormData);
                setShowTableForm(!showTableForm);
              }}
            >
              <FaPlus /> {showTableForm ? 'Close Form' : 'Add Data'}
            </button>
          </div>

          {/* Collapsible Add / Edit Form */}
          {showTableForm && (
            <form className="rm-entry-form" onSubmit={handleTableSubmit}>
              <h4 className="rm-entry-form__heading">
                {editingId ? 'Edit Entry' : 'Add New Entry'}
              </h4>
              <div className="rm-entry-form__grid">

                <div className="rm-field rm-field--date">
                  <label className="rm-field__label">Date</label>
                  <div
                    className="rm-calendar-field"
                    onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                  >
                    <input
                      ref={dateInputRef}
                      type="date"
                      name="date"
                      className="rm-calendar-field__input"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                    <FaCalendarAlt className="rm-calendar-field__icon" />
                  </div>
                </div>

                {/* NAME DROPDOWN - Fetched from Delivery API */}
                <div className="rm-field">
                  <label className="rm-field__label">Name</label>
                  <select
                    name="name"
                    className="rm-field__select"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      {loadingPartners ? 'Loading delivery partners…' : 'Select Driver / Personnel'}
                    </option>
                    {deliveryPartners.map((partner) => (
                      <option key={partner._id} value={partner.name}>
                        {partner.name} {partner.loginId ? `(${partner.loginId})` : ''}
                      </option>
                    ))}
                  </select>
                  {deliveryPartners.length === 0 && !loadingPartners && (
                    <small className="rm-field__warning">
                      ⚠️ No delivery partners found. Please add partners in Delivery ID section first.
                    </small>
                  )}
                </div>

                <div className="rm-field">
                  <label className="rm-field__label">Order</label>
                  <input
                    type="text"
                    name="order"
                    className="rm-field__input"
                    placeholder="Order Type/Details"
                    value={formData.order}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="rm-field rm-dropdown-group">
                  <label className="rm-field__label">Location</label>
                  <div className="rm-dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span>
                      {formData.locations.length === 0
                        ? 'Select Locations'
                        : `${formData.locations.length} Selected`}
                    </span>
                    <FaChevronDown className={isDropdownOpen ? 'rm-chevron rm-chevron--open' : 'rm-chevron'} />
                  </div>

                  {isDropdownOpen && (
                    <div className="rm-dropdown-menu">
                      {routeLocations.length === 0 ? (
                        <p className="rm-dropdown-menu__empty">
                          No stops added yet. Add a stop from "Add Stop" above first.
                        </p>
                      ) : (
                        <>
                          <label className="rm-dropdown-option rm-dropdown-option--all">
                            <input
                              type="checkbox"
                              checked={formData.locations.length === routeLocations.length}
                              onChange={handleSelectAllLocations}
                            />
                            <strong>Select All ({routeLocations.length})</strong>
                          </label>
                          <hr className="rm-dropdown-divider" />
                          {routeLocations.map((loc) => (
                            <label key={loc} className="rm-dropdown-option">
                              <input
                                type="checkbox"
                                checked={formData.locations.includes(loc)}
                                onChange={() => handleLocationCheckboxChange(loc)}
                              />
                              {loc}
                            </label>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* VEHICLE SELECTION - Fetched from Vehicle API */}
                <div className="rm-field">
                  <label className="rm-field__label">Select Vehicle</label>
                  <select
                    name="vehicle"
                    className="rm-field__select"
                    value={formData.vehicle}
                    onChange={handleVehicleSelect}
                    required
                  >
                    <option value="" disabled>
                      {loadingVehicles ? 'Loading vehicles…' : 'Select Vehicle'}
                    </option>
                    {vehicles.map((vehicle) => {
                      const vehicleId = vehicle._id || vehicle.id;
                      const vehicleNumber = vehicle.number || vehicle.vehicleNo || '';
                      const driverName = vehicle.driver || 'No Driver';
                      const capacity = vehicle.capacity || 'N/A';
                      const status = vehicle.status || 'Active';

                      return (
                        <option key={vehicleId} value={vehicleNumber}>
                          {vehicleNumber} - {driverName} (Capacity: {capacity}, Status: {status})
                        </option>
                      );
                    })}
                  </select>
                  {vehicles.length === 0 && !loadingVehicles && (
                    <small className="rm-field__warning">
                      ⚠️ No vehicles found. Please add vehicles in Vehicle Management section first.
                    </small>
                  )}
                </div>

                {/* VEHICLE NUMBER - Auto-filled from vehicle selection */}
                <div className="rm-field">
                  <label className="rm-field__label">Vehicle Number</label>
                  <input
                    type="text"
                    name="vehicleNo"
                    className="rm-field__input rm-field__input--readonly"
                    placeholder="Auto-filled from vehicle selection"
                    value={formData.vehicleNo}
                    onChange={handleInputChange}
                    required
                    readOnly
                  />
                  <small className="rm-field__hint">
                    Vehicle number is auto-filled when you select a vehicle above
                  </small>
                </div>

                <div className="rm-field rm-file-upload-group">
                  <label className="rm-field__label">Upload Image</label>
                  <label
                    htmlFor="image-file-input"
                    className={processingImage ? 'rm-file-label rm-file-label--busy' : 'rm-file-label'}
                  >
                    <FaUpload />{' '}
                    {processingImage
                      ? 'Processing image…'
                      : formData.image
                      ? formData.image.name
                      : 'Choose File'}
                  </label>
                  <input
                    id="image-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    disabled={processingImage}
                  />
                  {formData.imagePreview && (
                    <img src={formData.imagePreview} alt="Preview" className="rm-image-preview" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="rm-btn rm-btn--primary rm-entry-form__submit"
                disabled={loadingTable || processingImage}
              >
                {loadingTable ? 'Saving…' : (editingId ? 'Update Record' : 'Submit Record')}
              </button>
            </form>
          )}

          {/* Data Table - Connected to Backend */}
          <div className="rm-table-container">
            <table className="rm-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Order</th>
                  <th>Location</th>
                  <th>Vehicle No.</th>
                  <th>Vehicle</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingTable ? (
                  <tr>
                    <td colSpan="8" className="rm-table__notice">
                      Loading records from server…
                    </td>
                  </tr>
                ) : tableError ? (
                  <tr>
                    <td colSpan="8" className="rm-table__notice rm-table__notice--error">
                      ⚠️ Error: {tableError}
                    </td>
                  </tr>
                ) : tableData.length > 0 ? (
                  tableData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="rm-table-img" />
                        ) : (
                          <div className="rm-table-img rm-table-img--placeholder">
                            <FaImage />
                          </div>
                        )}
                      </td>
                      <td className="rm-mono">{item.date}</td>
                      <td>{item.name}</td>
                      <td>{item.order}</td>
                      <td>
                        <div className="rm-location-tags">
                          {item.locations && item.locations.length > 0 ? (
                            item.locations.map((loc, idx) => (
                              <span key={idx} className="rm-badge rm-badge--teal">
                                {typeof loc === 'object' ? loc.name : loc}
                              </span>
                            ))
                          ) : (
                            <span className="rm-badge">None</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="rm-badge rm-badge--amber rm-mono">
                          {item.vehicleNo || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="rm-vehicle-cell">
                          <FaTruck /> {item.vehicle || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div className="rm-action-buttons">
                          <button
                            className="rm-action-btn rm-action-btn--edit"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="rm-action-btn rm-action-btn--delete"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="rm-table__notice">
                      No data records available. Click "+ Add Data" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RouteManagement;