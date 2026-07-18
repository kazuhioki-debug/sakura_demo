'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#ffffff] font-sans antialiased selection:bg-amber-700 selection:text-white">
      
      {/* 共通簡易ヘッダー */}
      <header className="sticky top-0 z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-light tracking-[0.2em] text-white">SAKURA SUITE</div>
        <nav className="hidden md:flex space-x-8 text-xs uppercase tracking-widest text-gray-400">
          <a href="#concept" className="hover:text-white transition-colors">Concept</a>
          <a href="#styles" className="hover:text-white transition-colors">Styles</a>
          <a href="#why" className="hover:text-white transition-colors">Why Us</a>
          <a href="#rooms" className="hover:text-white transition-colors">Rooms</a>
          <a href="#lounge" className="hover:text-white transition-colors">Lounge</a>
          <a href="#access" className="hover:text-white transition-colors">Access</a>
        </nav>
        <div className="flex space-x-4">
          <Link href="/faq" className="text-xs text-gray-400 hover:text-white transition-colors self-center">FAQ</Link>
          <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors self-center">Contact</Link>
        </div>
      </header>

      {/* MAIN VISUAL (現状のまま使用を想定した仮エリア) */}
      <section className="h-[80vh] flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#111111] px-4">
        <div className="text-center">
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 block mb-4">Luxury Hotel & Spa Osaka</span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] leading-none mb-4 text-white">
            SAKURA SUITE
          </h1>
          <p className="text-xs md:text-sm tracking-[0.15em] text-gray-500 font-light">サクラスイート大阪</p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
          <span className="text-[10px] tracking-widest uppercase text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Ⅰ. CONCEPT */}
      <section id="concept" className="py-24 md:py-32 px-6 max-w-4xl mx-auto text-center border-t border-white/5">
        <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-4">Ⅰ / Concept</span>
        <h2 className="text-2xl md:text-4xl font-light tracking-wide mb-12 text-white">「邸宅のような、やすらぎを」</h2>
        <div className="text-sm md:text-base text-gray-400 font-light leading-loose space-y-6 max-w-2xl mx-auto">
          <p>ホテル サクラスイートは、従来のビジネスホテルが持つ<br className="hidden md:inline"/>「簡素さ」や「機能優先」という印象から一歩離れ、<br className="hidden md:inline"/>邸宅のような奥行きと、包み込まれるような心地よさを大切に設計されたホテルです。</p>
          <p>一日の緊張をほどき、<br />仕事の合間にも、旅の途中にも、<br />自分の時間に静かに戻れる場所であること。</p>
          <p>上質でありながら気取らず、<br />落ち着きの中に確かな快適さがある――<br />それが、サクラスイートが目指すこれからのホテルのかたちです。</p>
        </div>
      </section>

      {/* Ⅱ. RECOMMENDED PLAN -> STAY STYLES */}
      <section id="styles" className="py-24 bg-[#161616] px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅱ / Signature Stay Styles</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">おすすめの滞在スタイル</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* スタイル1 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-none overflow-hidden p-6 flex flex-col justify-between group hover:border-amber-700/30 transition-all duration-500">
              <div>
                <div className="h-48 bg-[#252525] mb-6 flex items-center justify-center text-gray-600 text-xs tracking-widest">[ IMAGE: STANDARD STAY ]</div>
                <h3 className="text-lg font-light tracking-wide mb-3 text-white">① スタンダードステイ</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  サクラスイート大阪を、もっともシンプルに味わう基本の滞在。上質な客室、クラブラウンジでのひととき、和洋朝食ビュッフェまで、快適さを一通り揃えたスタンダードプランです。
                </p>
              </div>
              <a href="https://d-reserve.jp/GSEA002F01400/GSEA002A01?hotelCode=0000001894&pl=PL00032081" target="_blank" rel="noopener noreferrer" className="block text-center text-xs tracking-widest bg-transparent border border-white/20 hover:border-white py-3 text-gray-300 hover:text-white transition-all">
                この滞在を見る
              </a>
            </div>

            {/* スタイル2 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-none overflow-hidden p-6 flex flex-col justify-between group hover:border-amber-700/30 transition-all duration-500">
              <div>
                <div className="h-48 bg-[#252525] mb-6 flex items-center justify-center text-gray-600 text-xs tracking-widest">[ IMAGE: WEEKDAY STAY ]</div>
                <h3 className="text-lg font-light tracking-wide mb-3 text-white">② 平日限定ステイ</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  静けさに包まれる平日だからこそ叶う、落ち着いたご滞在。ビジネスにも、自分時間にも寄り添う、平日だけのゆとりあるサクラスイート体験をご用意しました。
                </p>
              </div>
              <a href="https://d-reserve.jp/GSEA002F01400/GSEA002A01?hotelCode=0000001894&pl=PL00058579" target="_blank" rel="noopener noreferrer" className="block text-center text-xs tracking-widest bg-transparent border border-white/20 hover:border-white py-3 text-gray-300 hover:text-white transition-all">
                この滞在を見る
              </a>
            </div>

            {/* スタイル3 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-none overflow-hidden p-6 flex flex-col justify-between group hover:border-amber-700/30 transition-all duration-500">
              <div>
                <div className="h-48 bg-[#252525] mb-6 flex items-center justify-center text-gray-600 text-xs tracking-widest">[ IMAGE: BEAUTY STAY ]</div>
                <h3 className="text-lg font-light tracking-wide mb-3 text-white">③ ビューティーステイ</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  美と癒しに満たされる、整うための滞在。ミラブル・ReFaに加え、ナノケアやレッグリフレを備え、心も身体もゆるやかにリセットする時間をお楽しみください。
                </p>
              </div>
              <a href="https://d-reserve.jp/GSEA002F01400/GSEA002A01?hotelCode=0000001894&pl=PL00058591" target="_blank" rel="noopener noreferrer" className="block text-center text-xs tracking-widest bg-transparent border border-white/20 hover:border-white py-3 text-gray-300 hover:text-white transition-all">
                この滞在を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ⅲ. WHY GUESTS CHOOSE SAKURASUITE */}
      <section id="why" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅲ / Why Guests Choose Sakurasuite</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">サクラスイートが選ばれる理由</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#222] border border-white/10 mx-auto flex items-center justify-center text-amber-600 font-light text-lg">01</div>
              <h3 className="text-lg font-light tracking-wide text-white">上質な眠りを追求した客室</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed px-4">全室にシモンズ社製ベッドを採用。しなやかな寝心地が、心と身体をやさしく解きほぐします。</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#222] border border-white/10 mx-auto flex items-center justify-center text-amber-600 font-light text-lg">02</div>
              <h3 className="text-lg font-light tracking-wide text-white">滞在の質を高める設備とアメニティ</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed px-4">ミラブルシャワーやReFaをはじめ、細部まで快適さにこだわった設備を整えました。</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#222] border border-white/10 mx-auto flex items-center justify-center text-amber-600 font-light text-lg">03</div>
              <h3 className="text-lg font-light tracking-wide text-white">朝と夜を彩る特別な空間</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed px-4">朝は和洋ビュッフェ、夜はクラブラウンジ。一日の始まりと終わりを、穏やかに包み込みます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ⅳ. ROOMS & FACILITIES */}
      <section id="rooms" className="py-24 bg-[#161616] px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅳ / Guest Rooms & Facilities</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">客室・設備</h2>
            <p className="text-xs text-gray-400 font-light tracking-widest mt-2">― 落ち着きと快適さを、すべての滞在に。</p>
          </div>

          {/* 簡易ポイント表示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 border-b border-white/5 pb-12">
            <div className="bg-[#111] p-6 border border-white/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600 block mb-1">Sleep Quality</span>
              <h4 className="text-sm font-normal text-white mb-2">シモンズ社製ベッド</h4>
              <p className="text-xs text-gray-400 font-light">体をしっかり支え、心地よい眠りを。</p>
            </div>
            <div className="bg-[#111] p-6 border border-white/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600 block mb-1">Bath & Beauty</span>
              <h4 className="text-sm font-normal text-white mb-2">ミラブル × ReFa</h4>
              <p className="text-xs text-gray-400 font-light">清潔感と快適さを高めるバスアメニティ。</p>
            </div>
            <div className="bg-[#111] p-6 border border-white/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600 block mb-1">Comfort</span>
              <h4 className="text-sm font-normal text-white mb-2">機能性を備えた客室設備</h4>
              <p className="text-xs text-gray-400 font-light">無料Wi-Fi・大型テレビ・VOD対応。</p>
            </div>
          </div>

          {/* 客室タイプ（一言紹介） */}
          <div className="space-y-4 max-w-2xl mx-auto text-sm font-light">
            <div className="flex justify-between items-center p-4 bg-[#1c1c1c] border-l-2 border-amber-600">
              <span className="text-white">Superior Double / スーペリアダブル</span>
              <span className="text-xs text-gray-400">シンプルで使いやすい、落ち着いた空間。</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#1c1c1c] border-l-2 border-amber-600">
              <span className="text-white">Superior Twin / スーペリアツイン</span>
              <span className="text-xs text-gray-400">ゆとりある設計で、快適な滞在を。</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#1c1c1c] border-l-2 border-amber-600">
              <span className="text-white">Deluxe Twin / デラックスツイン</span>
              <span className="text-xs text-gray-400">より広さを求める方におすすめの客室。</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ⅴ. BREAKFAST & CLUB LOUNGE */}
      <section id="lounge" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅴ / Breakfast & Club Lounge</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">朝食・クラブラウンジ</h2>
            <p className="text-xs text-gray-400 font-light tracking-widest mt-2">― 一日の始まりと終わりに、余白のある時間を。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-12">
            <div className="bg-[#161616] p-8 border border-white/5">
              <h3 className="text-lg font-light text-white mb-4">朝食ビュッフェ</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">一日の心地よいスタートを彩る多彩な和洋メニュー。</p>
              <div className="text-sm font-mono text-amber-600">5:45 ～ 10:00</div>
            </div>
            <div className="bg-[#161616] p-8 border border-white/5">
              <h3 className="text-lg font-light text-white mb-4">クラブラウンジ</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">ご宿泊のお客様限定。アルコールや軽食を穏やかな空間で。</p>
              <div className="text-sm font-mono text-amber-600">17:00 ～ 21:00</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ⅵ. ACCESS */}
      <section id="access" className="py-24 bg-[#161616] px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅵ / Access</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">アクセス</h2>
            <p className="text-xs text-gray-400 font-light tracking-widest mt-2">― 都市に近く、静かに滞在できる場所。</p>
          </div>

          {/* PC時は左右、SP時は上下配置のモック */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-64 bg-[#222] border border-white/5 flex items-center justify-center text-gray-500 text-xs tracking-widest">
              [ GOOGLE MAP AREA ]
            </div>
            <div className="space-y-6 text-sm font-light">
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>阪急「十三駅」</span><span className="text-white font-normal">徒歩5分</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>大阪梅田</span><span className="text-white font-normal">電車で約4分</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>新大阪</span><span className="text-white font-normal">約15分</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>大阪国際空港（伊丹）</span><span className="text-white font-normal">車で約25分</span>
                </li>
              </ul>
              <div className="bg-[#111] p-4 border border-white/5 text-xs">
                <span className="text-amber-600 font-normal block mb-1">■ 駐車場</span>
                <p className="text-gray-400 leading-relaxed">24時間無料 ／ 予約不要（向かいの提携ホテル駐車場）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ⅶ. INSTAGRAM (NEWS代わりの新設仕様枠) */}
      <section className="py-24 px-6 border-t border-white/5 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80 block mb-2">Ⅶ / Official Instagram</span>
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-white mb-6">最新情報はInstagramから</h2>
        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-12 font-light">
          館内の日常やイベント、最新のご案内は公式Instagramにてリアルタイムに発信しています。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="aspect-square bg-[#161616] border border-white/5 flex items-center justify-center text-gray-600 text-xs">[ Feed 1 ]</div>
          <div className="aspect-square bg-[#161616] border border-white/5 flex items-center justify-center text-gray-600 text-xs">[ Feed 2 ]</div>
          <div className="aspect-square bg-[#161616] border border-white/5 flex items-center justify-center text-gray-600 text-xs">[ Feed 3 ]</div>
          <div className="aspect-square bg-[#161616] border border-white/5 flex items-center justify-center text-gray-600 text-xs">[ Feed 4 ]</div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-[#0b0b0b] text-gray-500 text-xs py-12 px-6 border-t border-white/5 text-center tracking-widest font-light">
        <p className="mb-4 text-gray-400">SAKURA SUITE OSAKA</p>
        <p>&copy; 2026 SAKURA SUITE. All Rights Reserved.</p>
      </footer>

    </div>
  );
}