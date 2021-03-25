/*
import Cesium from 'cesium/Cesium';
*/
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');



(function () {
    "use strict";

    // TODO: Add your ion access token from cesium.com/ion/
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMmJiOTM0NC01MGQ1LTQ4NzctYWU5NS1hN2FhYzVlZjI0ZTQiLCJpZCI6NDQzMjcsImlhdCI6MTYxMzg1MzU1OX0.1UAaSvwiTrgLzmhGOfB6DuxCqm9im_xw8wBi6e2yXsA';

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer


    var viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        selectionIndicator: false,
        baseLayerPicker: false
    });

    //////////////////////////////////////////////////////////////////////////
    // Loading Imagery



    viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

    // Add Sentinel-2 imagery
    viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 2 }));

    //////////////////////////////////////////////////////////////////////////
    // Loading Terrain


    // // Load Cesium World Terrain
    viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask : true,
        requestVertexNormals : true
    });

    //////////////////////////////////////////////////////////////////////////
    // Configuring the Scene



    viewer.scene.globe.enableLighting = true;


    var initialPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
    var homeCameraView = {
        destination : initialPosition,
        orientation : {
            heading : initialOrientation.heading,
            pitch : initialOrientation.pitch,
            roll : initialOrientation.roll
        }
    };
    // // Vue intiale
    viewer.scene.camera.setView(homeCameraView);


    homeCameraView.duration = 2.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    // Override the default home button
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    });


    //////////////////////////////////////////////////////////////////////////
    // Load 3D Tileset



    var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(96188) }));

    var heightOffset = -5;



    // Style 3D Tileset



    city.style = new Cesium.Cesium3DTileStyle({
        color: "color('white')",
        show: true
    });





}());


