import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThreeBackground from "@/components/ThreeBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CircleMask from "@/components/CircleMask";
import CursorParticles from "@/components/CursorParticles";
import VideoLoader from "@/components/VideoLoader";
import { Calendar, Gift, Trophy, Award, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, Suspense } from "react";

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative z-10 min-h-screen flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 bg-cover bg-center opacity-50"
        >
          <div 
            className="w-full h-[120%] bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/hero-visual.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'brightness(0.8) contrast(1.1)',
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="text-primary text-sm tracking-[0.3em] font-mono">REGENERATE CONTEST</div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>

          <h1 className="text-5xl md:text-9xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block"
            >
              THE
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block text-metallic-emerald"
            >
              Re;MAKE
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-4xl font-light text-metallic-emerald mb-8"
          >
            過去の作品を"今の技術"で再び創造せよ
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            SNS投稿コンテストとして開催。あなたの過去の作品を最新のAI技術で蘇らせ、
            新たな価値を創造するクリエイティブチャレンジ。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 btn-metallic-emerald text-white font-heading"
              onClick={() => {
                const entrySection = document.querySelector('#entry-section');
                entrySection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              エントリーする
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-emerald-400 text-metallic-emerald hover:bg-emerald-500/10 font-heading bg-transparent"
              onClick={() => {
                const detailsSection = document.querySelector('#details-section');
                detailsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              詳細を見る
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.section>
  );
}


function BigTextSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative z-10 py-32 px-4 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-2.png)' }}
        />
      </motion.div>
      <motion.div style={{ y }} className="container max-w-7xl">
        <h2 className="text-4xl md:text-9xl font-bold text-center leading-tight">
          <span className="block text-foreground/20">CREATIVE</span>
          <span className="block text-metallic-emerald">CHALLENGE</span>
          <span className="block text-foreground/20">FOR THE</span>
          <span className="block text-foreground">FUTURE</span>
        </h2>
      </motion.div>
    </motion.div>
  );
}

function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.section
      id="details-section"
      ref={ref}
      style={{ scale, opacity }}
      className="relative z-10 py-24 px-4 bg-card/30 backdrop-blur-sm"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-3.png)' }}
        />
      </motion.div>
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-center mb-16 text-metallic-emerald"
        >
          コンテスト概要
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed space-y-6"
        >
          <p className="text-xl text-foreground font-semibold">
            THE Re;MAKEは、過去の作品を現代の技術で再創造するクリエイティブコンテストです。
          </p>
          <p>
            あなたが過去に制作した作品のコンセプトを保ちながら、最新のAI技術を駆使して新しい作品へと昇華させてください。
            基本的には過去の作品をアップデートすることが目的ですが、そこから物語や要素を追加することも可能です。
          </p>
          <p>
            Viduにないリップシンクなどの機能は、他の生成AIを活用してもOK。
            ただし、投稿時に他の生成AIの宣伝は禁止です。また、他コンテストへ同じ動画を応募することも選考の対象外となります。
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function DetailsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative z-10 py-24 px-4 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-4.png)' }}
        />
      </motion.div>
      <motion.div style={{ x }} className="container max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-center mb-16 text-metallic-emerald"
        >
          開催情報
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calendar className="w-6 h-6 text-primary" />
                  投稿期間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-2">2025年12月1日 〜 12月28日</p>
                <p className="text-lg text-muted-foreground">約4週間の制作期間</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Gift className="w-6 h-6 text-primary" />
                  エントリー特典
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-accent mb-2">Viduクレジット 500</p>
                <p className="text-lg text-muted-foreground">エントリー者全員にプレゼント</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PrizesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative z-10 py-24 px-4 bg-card/30 backdrop-blur-sm">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-5.png)' }}
        />
      </motion.div>
      <div className="container max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-center mb-16 text-metallic-emerald"
        >
          賞品・特典
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Re;Vidu賞 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="bg-gradient-to-br from-primary/20 to-primary/20 border-primary transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:border-emerald-400 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Trophy className="w-8 h-8 text-primary" />
                  Re;Vidu賞
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-primary mb-2">100,000</p>
                <p className="text-lg text-muted-foreground">クレジット</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Re;Nobel賞 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="bg-gradient-to-br from-accent/20 to-primary/20 border-accent transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:border-emerald-400 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="w-8 h-8 text-accent" />
                  Re;Nobel賞
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-accent mb-2">50,000</p>
                <p className="text-lg text-muted-foreground">クレジット</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* プラットフォーム賞 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="bg-gradient-to-br from-cyan-400/20 to-primary/20 border-cyan-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:border-emerald-400 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="w-8 h-8 text-cyan-400" />
                  プラットフォーム賞
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-cyan-400 mb-2">10,000</p>
                <p className="text-lg text-muted-foreground">クレジット（各賞）</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary">
            <CardHeader>
              <CardTitle className="text-2xl text-center">特別特典</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-center text-foreground">
                優秀作品に選ばれた方々には、今後の案件からのお仕事をお願いさせていただく権利を付与
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function RulesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative z-10 py-24 px-4">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-6.png)' }}
        />
      </motion.div>
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-center mb-16 text-metallic-emerald"
        >
          参加ルール
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  OK - 許可されていること
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>✓ 過去の作品のコンセプトを保ちながら、最新技術でアップデート</p>
                <p>✓ 物語や要素を追加して作品を拡張</p>
                <p>✓ Viduにない機能（リップシンクなど）は他の生成AIを活用可能</p>
                <p>✓ 複数の生成AIツールを組み合わせた制作</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <XCircle className="w-6 h-6 text-red-500" />
                  NG - 禁止事項
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>✗ 過去の作品のコンセプトを大きく変更すること</p>
                <p>✗ 投稿時に他の生成AIサービスの宣伝を行うこと</p>
                <p>✗ 同じ動画を他のコンテストに応募すること（選考対象外）</p>
                <p>✗ 他者の作品を無断で使用すること</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NewChallengerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Sample challenge videos data
  const challengeVideos = [
    { id: 1, title: "クラシック映画のワンシーン", description: "1950年代の名作映画から印象的なシーンを再現" },
    { id: 2, title: "伝説のミュージックビデオ", description: "80年代のアイコニックなMVを現代風にアレンジ" },
    { id: 3, title: "歴史的スポーツの瞬間", description: "スポーツ史に残る名場面を再創造" },
    { id: 4, title: "アニメの名シーン", description: "懐かしのアニメシーンを実写風に" },
    { id: 5, title: "ドキュメンタリーの一コマ", description: "自然や動物の驚異的な瞬間を再現" },
    { id: 6, title: "広告の黄金時代", description: "記憶に残るCMを新しい視点で" },
    { id: 7, title: "ダンスパフォーマンス", description: "伝説的なダンスシーンを再解釈" },
    { id: 8, title: "ファッションショーの名場面", description: "ランウェイの歴史的瞬間を再現" },
    { id: 9, title: "アートインスタレーション", description: "有名なアート作品を動画で表現" },
    { id: 10, title: "ストリートカルチャー", description: "都市文化の象徴的シーンを再創造" }
  ];

  return (
    <section ref={ref} className="relative z-10 py-24 px-4 bg-card/20 backdrop-blur-sm">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-6.png)' }}
        />
      </motion.div>
      
      <div className="container max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6 text-metallic-emerald">
            New Challenger
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            動画生成が初めての方へ。Viduが選んだ10本のお題動画から1つを選んで、あなたの創造性でリメイクしてください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all hover:scale-105 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {video.id}
                    </div>
                    <CardTitle className="text-xl">{video.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{video.description}</p>
                  <Button variant="outline" className="w-full border-2 border-emerald-400 text-metallic-emerald hover:bg-emerald-500/10 bg-transparent">
                    お題を見る
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            お題動画の詳細は、エントリー後にメールでお送りします。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.section
      id="entry-section"
      ref={ref}
      style={{ scale, opacity }}
      className="relative z-10 py-32 px-4 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/cyber-bg-7.png)' }}
        />
      </motion.div>
      <div className="container max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-7xl font-bold mb-8 text-metallic-emerald"
        >
          エントリー受付中
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-muted-foreground mb-4"
        >
          過去の作品を、最新技術で再創造しませんか？
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-accent mb-12"
        >
          エントリー者全員に500クレジットプレゼント！
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="text-2xl px-16 py-8 btn-metallic-emerald text-white font-heading hover:scale-110 transition-transform"
            onClick={() => {
              toast.success('エントリーフォームは近日公開予定です', {
                description: '公式SNSで最新情報をチェックしてください',
              });
            }}
          >
            今すぐエントリー
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <VideoLoader onLoadComplete={() => setShowContent(true)} />
      {showContent && (
    <div className="min-h-screen relative overflow-hidden">
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      
      <CursorParticles />
      <ScrollProgress />
      
      <HeroSection />
      <BigTextSection />
      <OverviewSection />
      <CircleMask 
        imageSrc="/hero-visual.png"
        title="創造性の無限の可能性"
        subtitle="過去と現在、そして未来をつなぐクリエイティブな旅。最新のAI技術を駆使して、あなたの作品に新たな命を吹き込みましょう。"
      />
      <DetailsSection />
      <PrizesSection />
      <RulesSection />
      <NewChallengerSection />
      <CTASection />

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-border">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold heading mb-2">THE Re;MAKE</h3>
              <p className="text-sm text-muted-foreground">Cybernetic Creative Contest</p>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© 2025 THE Re;MAKE Project</p>
              <p>Powered by Vidu AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
      )}
    </>
  );
}
