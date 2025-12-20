import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroScene({ onIntroComplete }) {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const linesRef = useRef(null);
  const bgRef = useRef(null);
  const ringRef = useRef(null);

  const hasPlayedRef = useRef(false);

  /* ===========================================================
     砕けタイトル
  =========================================================== */
  function shatterDiagonal() {
    const chars = document.querySelectorAll(".title-char");
    chars.forEach((ch, index) => {
      const isTop = index % 2 === 0;

      gsap.set(ch, {
        opacity: 1,
        x: (Math.random() - 0.5) * 10,
        y: isTop ? -28 : 24,
        rotate: (Math.random() - 0.5) * 8 - 18,
      });

      ch.classList.add(isTop ? "slice-top" : "slice-bottom");
    });
  }

  /* ===========================================================
     青い稲妻
  =========================================================== */
  function blueLightning() {
    const bolt = document.createElement("div");
    bolt.className = "blue-bolt";
    document.body.appendChild(bolt);

    gsap.timeline({
      onComplete: () => bolt.remove()
    })
      .fromTo(bolt, { opacity: 0, scaleX: 0.7 }, {
        opacity: 0.9,
        scaleX: 1,
        duration: 0.09,
        ease: "power2.out",
      })
      .to(bolt, {
        opacity: 0,
        scaleX: 1.12,
        duration: 0.22,
        ease: "power2.inOut",
      });
  }

  /* ===========================================================
     歪みパルス
  =========================================================== */
  function distortScreen() {
    const d = document.createElement("div");
    d.className = "distort-layer";
    document.body.appendChild(d);

    gsap.timeline({
      onComplete: () => d.remove()
    })
      .fromTo(d, { opacity: 0 }, { opacity: 0.14, duration: 0.07 })
      .to(d, { opacity: 0, duration: 0.18 });
  }

  /* ===========================================================
     斬撃
  =========================================================== */
  function slashBlade() {
    const blade = document.createElement("div");
    blade.className = "blue-blade";
    document.body.appendChild(blade);

    gsap.set(blade, { rotate: -18, xPercent: -50, yPercent: -50 });

    gsap.fromTo(blade, { opacity: 0, x: "-60vw" }, {
      opacity: 1,
      x: "60vw",
      duration: 0.22,
      ease: "power4.out",
      onComplete: () => {
        gsap.to(blade, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => blade.remove()
        });
      },
    });
  }

  /* ===========================================================
     断片メッセージ（完全版）
  =========================================================== */
  function spawnFragment() {
    const messages = [
      "silent sync: stabilized…",
      "blue field: harmonizing",
      "noa-core: breathing…",
      "scanning motion vectors",
      "phase shift: completed",
      "mind-layer: online",
      "fractal-node: alive",
      "deep field: awake",
      "vector-map: flowing",
      "neural tide: rising",
    ];

    const msg = document.createElement("div");
    msg.className = "noa-fragment";
    msg.textContent =
      messages[Math.floor(Math.random() * messages.length)];

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const angle = Math.random() * Math.PI * 2;
    const radius = 140 + Math.random() * 200;

    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    gsap.set(msg, {
      opacity: 0,
      x,
      y,
      position: "fixed",
    });

    document.body.appendChild(msg);

    gsap.timeline({ onComplete: () => msg.remove() })
      .to(msg, { opacity: 1, y: y - 10, duration: 1.6 })
      .to(msg, { opacity: 0, y: y - 20, duration: 2.4 });
  }

  /* 複数まとめて出す */
/* 複数まとめて出す（静かで控えめ） */
function spawnBatch() {
  // 1〜2個だけ
  const count = 1 + Math.floor(Math.random() * 2);

  for (let i = 0; i < count; i++) {
    // 出現間隔も 200〜600ms の範囲で小さく
    const delay = 200 + Math.random() * 400;

    setTimeout(() => {
      spawnFragment();
    }, i * delay);
  }
}

  /* ランダム間隔でループ */
  function loopFragments() {
    spawnBatch();
    const delay = 3500 + Math.random() * 2500;
    setTimeout(loopFragments, delay);
  }

  /* ===========================================================
     メインタイムライン
  =========================================================== */
  useEffect(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const root = rootRef.current;
    const lines = linesRef.current;
    const title = titleRef.current;
    const sub = subRef.current;

    /* ① コードフラッシュ */
    const codeLines = [
      "<init motion-core>",
      "<awake noa-system>",
      "<loading aurora-field>",
    ];
    let i = 0;

    function flashNextLine() {
      if (i >= codeLines.length) return;
      const line = document.createElement("div");
      line.className = "intro-line";
      line.textContent = codeLines[i];
      lines.appendChild(line);

      gsap.fromTo(line, { opacity: 0, filter: "blur(6px)" }, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.16,
        onComplete: () =>
          setTimeout(() => {
            gsap.to(line, {
              opacity: 0,
              duration: 0.25,
              onComplete: () => line.remove()
            });
          }, 130)
      });

      i++;
      setTimeout(flashNextLine, 190);
    }
    flashNextLine();

    /* ② 背景フラッシュ */
    setTimeout(() => {
      const flash = document.createElement("div");
      flash.className = "intro-flash";
      root.appendChild(flash);

      gsap.fromTo(flash, { opacity: 0 }, {
        opacity: 0.35,
        duration: 0.28,
        onComplete: () => {
          gsap.to(flash, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => flash.remove()
          });
        },
      });

      gsap.to(bgRef.current, {
        opacity: 1, scale: 1, duration: 1.4,
      });

      gsap.to(ringRef.current, {
        opacity: 0.6, scale: 1.22, duration: 1.6,
      });
    }, 900);

    /* ③ タイトル */
    setTimeout(() => {
      gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 1.4 });
      gsap.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 1.7 });

      gsap.fromTo(title, { skewX: 0 }, {
        skewX: 7, repeat: 1, yoyo: true, duration: 0.08,
      });
    }, 1500);

    /* ④ 斬撃系 */
    setTimeout(() => {
      slashBlade();
      shatterDiagonal();
      blueLightning();
      distortScreen();
    }, 2000);

    /* ⑤ Fragment Loop */
    loopFragments();

  }, []);

  /* ===========================================================
     Render
  =========================================================== */
  return (
    <div ref={rootRef} className="intro-root">
      <div ref={linesRef} className="intro-lines" />
      <div ref={bgRef} className="intro-bg" />
      <div ref={ringRef} className="intro-ring" />

      <h1 ref={titleRef} className="intro-title">
        {"BLUE AWAKE".split("").map((c, i) => (
          <span key={i} className="title-char">{c}</span>
        ))}
      </h1>

      <p ref={subRef} className="intro-sub">
        Silent Motion Atelier
      </p>
    </div>
  );
}
