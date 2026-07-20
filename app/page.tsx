"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 横スクロールギャラリー用のRefとState
  const [scrollProgress, setScrollProgress] = useState(0);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  // 1. ローディングカウンターの制御
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5) + 2;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 500);
        setTimeout(() => setLoading(false), 1700);
      }
      setCounter(count);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // ローディング中はスクロールを禁止
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  // 2. カスタムカーソルの制御
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const updateHoverables = () => {
      const hoverables = document.querySelectorAll("a, button, .btn, .insta-box, .room-card, .data-card, .gallery-card");
      const handleMouseOver = () => setIsHovered(true);
      const handleMouseOut = () => setIsHovered(false);

      hoverables.forEach((el) => {
        el.addEventListener("mouseover", handleMouseOver);
        el.addEventListener("mouseout", handleMouseOut);
      });

      return () => {
        hoverables.forEach((el) => {
          el.removeEventListener("mouseover", handleMouseOver);
          el.removeEventListener("mouseout", handleMouseOut);
        });
      };
    };

    const cleanupHover = updateHoverables();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cleanupHover();
    };
  }, [loading]);

  // 3. 桜の花びらキャンバス（3Dひらひら浮遊 ＆ マウス気流スピン ＆ さくらトレイル）の制御
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      offset: number;
      sway: number;
      swaySpeed: number;
      angle: number;
      rotationSpeed: number;
      fadeSpeed?: number;
      color: string;
    }> = [];

    // 背景をゆっくりと斜めに舞い落ちる「桜の花びら」の生成
    for (let i = 0; i < 60; i++) {
      const baseOp = Math.random() * 0.45 + 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 3.5,
        speedX: Math.random() * 0.2 + 0.15,
        speedY: Math.random() * 0.4 + 0.4,
        opacity: baseOp,
        baseOpacity: baseOp,
        offset: Math.random() * 100,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        color: Math.random() > 0.35 ? "#ffccd5" : "#e8c49e",
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (Math.random() > 0.45) {
        const trailOp = Math.random() * 0.3 + 0.6;
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 15,
          y: mouse.y + (Math.random() - 0.5) * 15,
          size: Math.random() * 4.5 + 3,
          speedX: (Math.random() - 0.5) * 0.4 + 0.2,
          speedY: Math.random() * 0.3 + 0.3,
          opacity: trailOp,
          baseOpacity: trailOp,
          offset: Math.random() * 100,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.03 + 0.01,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          fadeSpeed: Math.random() * 0.007 + 0.005,
          color: Math.random() > 0.4 ? "#ffccd5" : "#ffb3c1",
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.sway) * 0.35;
        p.sway += p.swaySpeed;
        p.angle += p.rotationSpeed;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;

        if (dist < repulsionRadius) {
          const force = (repulsionRadius - dist) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          
          p.x += Math.cos(angle) * force * 3.5;
          p.y += Math.sin(angle) * force * 1.8;
          
          p.angle += Math.cos(angle) * force * 0.04;
        }

        if (p.fadeSpeed) {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0) {
            particles.splice(i, 1);
            i--;
            continue;
          }
        } else {
          p.opacity = p.baseOpacity + Math.sin(Date.now() * 0.003 + p.offset) * 0.08;
          if (p.opacity < 0.05) p.opacity = 0.05;
          if (p.opacity > 0.8) p.opacity = 0.8;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 10) {
            p.x = -10;
            p.y = Math.random() * height;
          }
        }

        ctx.beginPath();
        const radiusX = p.size;
        const radiusY = p.size * 0.55 * Math.abs(Math.sin(p.sway * 1.2)); 
        
        ctx.ellipse(p.x, p.y, radiusX, radiusY, p.angle, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 4. スクロール連動フェードインの制御
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll(".reveal-on-scroll");
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [loading]);

  // 5. sticky横スクロールギャラリーの制御
  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const section = gallerySectionRef.current;
      const track = galleryTrackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (sectionTop <= 0) {
        const scrolled = -sectionTop;
        const maxScrollable = sectionHeight - viewportHeight;
        let progress = scrolled / maxScrollable;
        
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        setScrollProgress(progress);

        const trackWidth = track.scrollWidth;
        const maxTranslate = trackWidth - window.innerWidth;
        const translateAmount = -progress * maxTranslate;

        track.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
      } else {
        setScrollProgress(0);
        track.style.transform = `translate3d(0px, 0, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [loading]);

  return (
    <>
      {/* 🌸 カスタムカーソル（桜のベクター形状 ＆ スピン演出） */}
      <div
        className={`custom-cursor ${isHovered ? "cursor-hover" : ""}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
          {/* 美しい5弁の桜の花びらパス */}
          <path d="M50,35 C50,35 44,17 44,10 C44,7 46.5,5 50,8 C53.5,5 56,7 56,10 C56,17 50,35 50,35 Z M61,42 C61,42 77,32 83.5,29.5 C86.5,28.5 89,30.5 88.5,34 C88,37.5 85,39 80,41 C75,43 61,42 61,42 Z M57,55 C57,55 70,68 74.5,74 C76.5,77 75,80 71.5,80.5 C68,81 65.5,78 62.5,73 C59.5,68 57,55 57,55 Z M43,55 C43,55 30,68 25.5,74 C23.5,77 25,80 28.5,80.5 C32,81 34.5,78 37.5,73 C40.5,68 43,55 43,55 Z M39,42 C39,42 23,32 16.5,29.5 C13.5,28.5 11,30.5 11.5,34 C12,37.5 15,39 20,41 C25,43 39,42 39,42 Z"/>
          <circle cx="50" cy="50" r="3.5" fill="#ffffff" opacity="0.85"/>
        </svg>
      </div>

      {/* 🌸 Canvas桜粒子背景 */}
      <canvas ref={canvasRef} className="bg-particles" />

      {/* 🌸 パーセントカウンター付きオープニング幕 */}
      {loading && (
        <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
          <div className="loader-content">
            <p className="loader-sub">SAKURA SUITE</p>
            <div className="loader-counter">{counter}%</div>
            <div className="loader-bar-bg">
              <div className="loader-bar" style={{ width: `${counter}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 2 }}>
        {/* Hero */}
        <section className="hero">
          <Image
            src="/imgi_14_main_img01.jpg"
            alt="SAKURA SUITE"
            fill
            priority
            className="hero-image"
          />

          <div className="overlay" />

          <div className="hero-content">
            <Image
              src="/imgi_1_logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="logo"
            />

            <p className="sub">LUXURY HOTEL</p>

            <h1>SAKURA SUITE</h1>

            <p className="lead">
              Luxury Beyond Stay.
              <br />
              泊まるだけではない、
              <br />
              心が満たされる時間へ。
            </p>

            <a href="#concept" className="btn">
              Explore
            </a>
          </div>

          <div className="scroll">
            <span></span>
            SCROLL
          </div>
        </section>

        {/* Concept */}
        <section id="concept" className="concept reveal-on-scroll">
          <div className="container">
            <p className="eyebrow">
              CONCEPT
            </p>
            <h2>
              都会の喧騒から、
              <br />
              静寂へ。
            </h2>
            <p className="text">
              SAKURA SUITEは、
              上質な空間と落ち着いた時間を提供する
              ラグジュアリーホテルです。
              <br /><br />
              デザイン, 設備、サービス。
              そのすべてが、
              「また帰ってきたい」
              を生み出します。
            </p>
          </div>
        </section>

        {/* Gallery (Horizontal Sticky Scroll) */}
        <section ref={gallerySectionRef} className="gallery-horizontal">
          <div className="sticky-wrapper">
            <div ref={galleryTrackRef} className="horizontal-track">
              
              <div className="track-intro">
                <p className="eyebrow">PORTFOLIO</p>
                <h2>洗練を、凝縮した空間。</h2>
                <p className="intro-text">
                  隅々にまで行き届いた美意識と、
                  静謐な時間が織りなす
                  サクラスイートの真髄。
                </p>
              </div>

              <div className="gallery-card">
                <div className="img-container">
                  <Image
                    src="/imgi_15_main_img02.jpg"
                    alt="Sakura Suite Architecture"
                    width={900}
                    height={600}
                    className="gallery-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="gallery-card-info">
                  <span className="card-num">01</span>
                  <span className="card-title">SPACE & DESIGN</span>
                </div>
              </div>

              <div className="gallery-card">
                <div className="img-container">
                  <Image
                    src="/imgi_16_main_img03.jpg"
                    alt="Sakura Suite Relaxation"
                    width={900}
                    height={600}
                    className="gallery-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="gallery-card-info">
                  <span className="card-num">02</span>
                  <span className="card-title">SILENT TIME</span>
                </div>
              </div>

              <div className="gallery-card">
                <div className="img-container">
                  <Image
                    src="/imgi_2_cont_item_top_01.jpg"
                    alt="Sakura Suite Hospitality"
                    width={900}
                    height={600}
                    className="gallery-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="gallery-card-info">
                  <span className="card-num">03</span>
                  <span className="card-title">ELEGANT MOMENT</span>
                </div>
              </div>

            </div>

            <div className="gallery-progress-bar-bg">
              <div className="gallery-progress-bar" style={{ width: `${scrollProgress * 100}%` }}></div>
            </div>

          </div>
        </section>

        {/* Rooms */}
        <section className="rooms reveal-on-scroll">
          <div className="container">
            <p className="eyebrow">
              ROOMS
            </p>
            <h2>
              それぞれの時間に、
              <br />
              それぞれの空間を。
            </h2>

            <div className="room-grid">
              <div className="room-card">
                <Image
                  src="/imgi_14_main_img01.jpg"
                  alt="Suite"
                  width={1200}
                  height={800}
                />
                <div className="room-text">
                  <h3>Suite</h3>
                  <p>
                    最上級の広さと落ち着きを備えた、
                    ワンランク上の滞在。
                  </p>
                </div>
              </div>

              <div className="room-card">
                <Image
                  src="/imgi_15_main_img02.jpg"
                  alt="Deluxe"
                  width={1200}
                  height={800}
                />
                <div className="room-text">
                  <h3>Deluxe</h3>
                  <p>
                    上質なデザインと快適性を兼ね備えた
                    人気のお部屋。
                  </p>
                </div>
              </div>

              <div className="room-card">
                <Image
                  src="/imgi_16_main_img03.jpg"
                  alt="Standard"
                  width={1200}
                  height={800}
                />
                <div className="room-text">
                  <h3>Standard</h3>
                  <p>
                    シンプルで居心地の良い、
                    心安らぐ空間。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Data */}
        <section className="hotel-data reveal-on-scroll">
          <div className="container">
            <p className="eyebrow">
              HOTEL INFORMATION
            </p>
            <h2>
              ホテル概要
            </h2>

            <div className="data-grid">
              <div className="data-card">
                <span className="number">24</span>
                <h3>ROOMS</h3>
                <p>全24室</p>
              </div>
              <div className="data-card">
                <span className="number">24H</span>
                <h3>SERVICE</h3>
                <p>フロント対応</p>
              </div>
              <div className="data-card">
                <span className="number">FREE</span>
                <h3>PARKING</h3>
                <p>無料駐車場</p>
              </div>
              <div className="data-card">
                <span className="number">15:00</span>
                <h3>CHECK IN</h3>
                <p>チェックイン</p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section className="instagram reveal-on-scroll">
          <div className="container">
            <p className="eyebrow">
              INSTAGRAM
            </p>
            <h2>
              日々のサクラスイート
            </h2>
            <p className="insta-lead">
              最新情報や館内の雰囲気を
              Instagramでご紹介しています。
            </p>

            <div className="insta-grid">
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_001.jpg"
                  alt="Instagram 1"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_002.jpg"
                  alt="Instagram 2"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_003.jpg"
                  alt="Instagram 3"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_004.jpg"
                  alt="Instagram 4"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_005.jpg"
                  alt="Instagram 5"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="insta-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/s_006.jpg"
                  alt="Instagram 6"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            </div>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="btn"
            >
              Follow Instagram
            </a>
          </div>
        </section>

        {/* Access & Contact */}
        <section className="access-contact reveal-on-scroll">
          <div className="container">
            <p className="eyebrow">ACCESS & CONTACT</p>
            <h2>アクセス・お問い合わせ</h2>

            <div className="access-grid">
              {/* 左側：ホテル情報カード */}
              <div className="access-info-card">
                <div className="hotel-image-wrapper">
                  <Image
                    src="/imgi_16_main_img03.jpg"
                    alt="ホテル サクラスイート大阪"
                    width={800}
                    height={450}
                    className="hotel-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="hotel-details">
                  <h3>ホテル サクラスイート大阪</h3>
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <th>住所</th>
                        <td>〒532-0025 大阪市淀川区新北野1-7-4</td>
                      </tr>
                      <tr>
                        <th>部屋数・駐車</th>
                        <td>23室 / 提携無料駐車場有り</td>
                      </tr>
                      <tr>
                        <th>アクセス</th>
                        <td>
                          <span className="sub-text">電車でお越しの方...</span>
                          阪急十三駅より徒歩4分
                        </td>
                      </tr>
                      <tr>
                        <th>周辺情報</th>
                        <td>
                          <a href="https://maps.google.com/?q=%E3%83%9B%E3%83%86%E3%83%AB%20%E3%82%B5%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88%E5%A4%A7%E9%98%AA" target="_blank" className="text-link">周辺情報はこちら</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 右側：Googleマップ */}
              <div className="map-card">
                <iframe
                  src="https://maps.google.com/maps?q=%E3%83%9B%E3%83%86%E3%83%AB%E3%82%B5%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88%E5%A4%A7%E9%98%AA&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* お問い合わせカード (電話 & WEB) */}
            <div className="contact-grid">
              <div className="contact-card">
                <p className="contact-label">お電話から</p>
                <div className="contact-icon">tel</div>
                <a href="tel:06-6195-8777" className="tel-number">06-6195-8777</a>
              </div>

              <div className="contact-card">
                <p className="contact-label">WEBから</p>
                <div className="contact-icon">web</div>
                <a href="https://example.com/contact" target="_blank" className="btn contact-btn">WEBフォームはこちら</a>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}