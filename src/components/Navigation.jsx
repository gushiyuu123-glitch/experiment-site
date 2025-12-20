// src/components/Navigation.jsx
import { useRef, useEffect, useState } from "react";
import "./Navigation.css";

export default function Navigation({ show }) {
  const navRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const [visible, setVisible] = useState(false);

  // show === true で初回オープン
  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [show]);

  const logs = [
    {
      title: "LOG_01：動と静の境界",
      chapters: [
        { name: "Ⅰ.Light & Motion", link: "/lab1/lab1.html" },
        { name: "Ⅱ.Canvasの効果（肉体）", link: "/lab1/lab2.html" },
        { name: "Ⅲ.JavaScriptの制御（意識）", link: "/lab1/lab3.html" },
        { name: "Ⅳ.連動と関係（群体）", link: "/lab1/lab4.html" },
        { name: "Ⅴ.終息と再生（呼吸する静寂）", link: "/lab1/lab5.html" },
      ],
    },
    {
      title: "LOG_02：意識の相互作用",
      chapters: [
        { name: "Ⅰ—思想と理論", link: "/lab2/design.html" },
        { name: "Ⅱ—言葉の呼吸", link: "/lab2/design2.html" },
        { name: "Ⅲ—JavaScriptの制御", link: "/lab2/design3.html" },
        { name: "Ⅳ—境界と静止", link: "/lab2/design4.html" },
        { name: "Ⅴ—Dynamic Harmony", link: "/lab2/design5.html" },
      ],
    },
    {
      title: "LOG_03：three.js の実験",
      chapters: [
        { name: "Ⅰ—Crystal Knot", link: "/lab3d/three1.html" },
        { name: "Ⅱ—Particle Field", link: "/lab3d/three2.html" },
        { name: "Ⅲ—Text Wave", link: "/lab3d/three3.html" },
      ],
    },
  ];

  return (
    <>
      {/* ▼ メニューを開くオープンボタン（visible=false のときだけ表示） */}
      {!visible && (
        <button
          className="nav-open-btn"
          onClick={() => setVisible(true)}
        >
          ≡
        </button>
      )}

      {/* ▼ メニュー本体 */}
      <aside ref={navRef} className={`lab-menu ${visible ? "visible" : ""}`}>
        {/* 閉じるボタン */}
        <button
          className="nav-close-btn"
          onClick={() => setVisible(false)}
        >
          ✕
        </button>

        <h2>LAB LOG</h2>

        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item">
              <div
                className={`log-title ${openIndex === index ? "open" : ""}`}
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              >
                {log.title}
              </div>

              <ul
                className="log-sub"
                style={{
                  maxHeight: openIndex === index ? "260px" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                {log.chapters.map((ch, j) => (
                  <li key={j}>
                    <a
                      href={ch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ch.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
