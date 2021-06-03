import React from 'react';
import './App.css';

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.control.opacity";

function App() {
  const refMapContainer = React.useRef<HTMLDivElement>(null);
  let map: L.Map;
  let baseLayer: L.TileLayer;
  let overlays: { [key: string]: L.Layer };
  let layerControl: L.Control.Layers;
  let opacityControl: L.Control.Opacity;

  // コンポーネント読み込み時に実行
  React.useEffect(() => {
    // ベースレイヤーと地図コンテナを準備
    baseLayer = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png");
    map = L.map(refMapContainer.current!!, {
      center: [35, 135],
      zoom: 15,
      layers: [baseLayer]
    });
    // 重ねるレイヤーを追加する
    overlays = {
      "aerialPhoto": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png"),
      "aerialPhoto2": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg")
    };
    // レイヤーコントロールを追加
    layerControl = L.control.layers({ "ベースマップ": baseLayer }, overlays, {
      position: "topleft",
      collapsed: false
    }).addTo(map);
    // 透明度コントロールを追加
    opacityControl = L.control.opacity(overlays, {
      position: "topleft",
      label: "透明度を変更"
    }).addTo(map);
  }, []);

  const mapStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh"
  }
  return (
    <div className="App">
      <div ref={refMapContainer} style={mapStyle}></div>
    </div>
  );
}

export default App;
