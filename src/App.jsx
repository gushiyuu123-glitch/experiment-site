// src/App.jsx
import { useState, useEffect } from "react";
import IntroScene from "./components/IntroScene";
import Navigation from "./components/Navigation";

export default function App() {
  const [navReady, setNavReady] = useState(false);

  // ナビを “一定時間後に” 出したい場合（例: 1.4秒後）
  useEffect(() => {
    const t = setTimeout(() => {
      setNavReady(true);
    }, 3500); // ← 好きに調整できる

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ① イントロ（背景として常時流し続ける） */}
      <div className="background-layer">
        <IntroScene />
      </div>

      {/* ② 断片メッセージ専用レイヤー（最前面の behind UI） */}
      <div
        id="fragment-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 8000,
          pointerEvents: "none",
        }}
      />

      {/* ③ ナビゲーション（イントロとは独立） */}
      <div className="foreground-layer">
        <Navigation show={navReady} />
      </div>

      {/* ④ 実験ページ（メイン） */}
      <div className="content-layer"></div>
    </>
  );
}
