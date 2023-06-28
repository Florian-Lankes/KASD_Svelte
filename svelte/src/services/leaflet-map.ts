/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as L from "leaflet";
import type { Mapconf, Location } from "./types";

const apiKey = import.meta.env.VITE_openweatherapi;

export class LeafletMap {
    imap = {};
    control = {};
    overlays = {};

    // https://leaflet-extras.github.io/leaflet-providers/preview/

    baseLayers = {
        Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 17,
            attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }),
        Topographic: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            maxZoom: 17
        }),
        Rain: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            maxZoom: 17
        }),
    };


    constructor(id: string, descriptor: Mapconf, activeLayer = "") {
        let defaultLayer = this.baseLayers.Terrain;
        if (activeLayer) {
            defaultLayer = this.baseLayers[activeLayer];
        }
        this.imap = L.map(id, {
            center: [descriptor.location.latitude, descriptor.location.longitude],
            zoom: descriptor.zoom,
            minZoom: descriptor.minZoom,
            zoomControl: false,
            layers: [defaultLayer]
        });
    }

    addLayer(title: string, layer: string) {
        this.overlays[title] = layer;
        this.imap.addLayer(layer);
    }

    addLayerGroup(title: string) {
        this.overlays[title] = L.layerGroup([]);
        this.imap.addLayer(this.overlays[title]);
    }

    showLayerControl(bool: boolean) {
        if(bool){
            this.control = L.control.layers(this.baseLayers, this.overlays).addTo(this.imap);
        };
    }

    showZoomControl(position = "topleft") {
        L.control
            .zoom({
                position: position
            })
            .addTo(this.imap);
    }

    moveTo(zoom, location: Location) {
        this.imap.setZoom(zoom);
        this.imap.panTo(new L.LatLng(location.latitude, location.longitude));
    }

    zoomTo(location: Location) {
        this.imap.setView(new L.LatLng(location.latitude, location.longitude), 8);
    }

    addMarker(location: Location, popupText = "", layerTitle = "default") {
        let group = {};
        const marker = L.marker([location.latitude, location.longitude]);
        if (popupText) {
            const popup = L.popup({ autoClose: false, closeOnClick: false });
            popup.setContent(popupText);
            marker.bindPopup(popup);
        }
        if (!this.overlays[layerTitle]) {
            group = L.layerGroup([]);
            this.overlays[layerTitle] = group;
            this.imap.addLayer(group);
        } else {
            group = this.overlays[layerTitle];
        }
        marker.addTo(group);
    }

    invalidateSize() {
        this.imap.invalidateSize();
        const hiddenMethodMap = this.imap;
        hiddenMethodMap._onResize();
    }
}
