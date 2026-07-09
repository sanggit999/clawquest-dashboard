import { useState, useEffect } from 'react';
import { useMinerDashboard } from '@/hooks/useMinerDashboard';
import { useConfig } from '@/hooks/useConfig';
import StatusCard from '@/components/StatusCard/StatusCard';
import RewardPanel from '@/components/RewardPanel/RewardPanel';
import EventLog from '@/components/EventLog/EventLog';
import ConfigPanel from '@/components/ConfigPanel/ConfigPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Pickaxe,
  Play,
  Square,
  Wifi,
  WifiOff,
  Loader2,
  AlertCircle,
  Sparkles,
  Shield,
  Cpu,
  Zap,
  Activity,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Layers,
} from 'lucide-react';

const App = () => {
  const { config, setConfig } = useConfig();
  const { status, isLoading, isConnected, isActing, error, startMining, stopMining } =
    useMinerDashboard(config);

  // States for interactive FAQ accordions
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State for the interactive Hero simulator
  const [simGold, setSimGold] = useState(12840);
  const [simHash, setSimHash] = useState(84.2);
  const [simLogs, setSimLogs] = useState<string[]>([
    '🤖 Khởi động hệ thống ClawQuest Miner...',
    '🔌 Kết nối tới RPC Node thành công.',
    '⛏️ Bắt đầu quét vùng đất địa tầng #4829...',
  ]);

  // Simulate active miner metrics in Hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setSimGold((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setSimHash((prev) => +(prev + (Math.random() - 0.5) * 2).toFixed(1));
      
      const actions = [
        '⛏️ Phát hiện mạch vàng chất lượng cao!',
        '⚡ Sử dụng Cuốc Sắt để tăng tốc độ khai thác.',
        '💎 Nhận thêm: 1x Hồng ngọc quý hiếm!',
        '🔋 Mức năng lượng hiện tại: 92% (Tối ưu)',
        '🔄 Đang đồng bộ hóa khối giao dịch mới...',
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setSimLogs((prev) => [randomAction, prev[0], prev[1]].slice(0, 3));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const canStart = isConnected && !!config.apiCode && !status?.running && !isActing;
  const canStop = isConnected && !!status?.running && !isActing;

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ── 1. STICKY HEADER / NAVBAR ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Pickaxe className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                ClawQuest Miner
              </h1>
              <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase mt-0.5">Automated Bot</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#hero" className="hover:text-foreground transition-colors">Tổng Quan</a>
            <a href="#features" className="hover:text-foreground transition-colors">Tính Năng</a>
            <a href="#dashboard" className="hover:text-foreground transition-colors">Bảng Cấu Hình</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Bảng Giá</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Hỏi Đáp</a>
          </nav>

          {/* Connection status & main CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex">
              <Badge variant={isConnected ? 'success' : 'destructive'} className="gap-1.5 px-3 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                {isConnected ? (
                  <Wifi className="h-3 w-3 animate-pulse" />
                ) : (
                  <WifiOff className="h-3 w-3" />
                )}
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            <a href="#dashboard">
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30 border border-emerald-500/20 font-semibold">
                Khởi chạy ngay
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION ────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 -z-10 h-72 w-72 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
              <span>Thế hệ Bot Khai thác Tự động Mới</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Tối ưu hóa hành trình{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 bg-clip-text text-transparent">
                Đào Vàng
              </span>{' '}
              tự động hóa 24/7
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Giải pháp tối ưu giúp bạn vận hành hệ thống khai thác mỏ vàng game tự động. Quản lý tài nguyên thông minh, tự động vượt rào cản, hồi phục năng lượng và phân tích hiệu suất chính xác theo thời gian thực.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-xl shadow-emerald-950/50">
                  <Pickaxe className="mr-2 h-5 w-5" />
                  Mở Bảng Điều Khiển
                </Button>
              </a>
              <a href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-slate-200">
                  Tìm hiểu tính năng
                </Button>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime Hoạt Động</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1,240+</div>
                <div className="text-xs text-muted-foreground">Miners Đang Chạy</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">25.4M</div>
                <div className="text-xs text-muted-foreground">Vàng Đã Khai Thác</div>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Interactive Simulator */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl shadow-2xl shadow-emerald-950/20">
              {/* Card Glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 -z-10" />

              {/* Title bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Simulator (Active)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs text-muted-foreground">Tốc Độ Đào (Hashrate)</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-baseline gap-1">
                    {simHash} <span className="text-xs font-normal text-muted-foreground">H/s</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs text-muted-foreground">Vàng Thu Hoạch</div>
                  <div className="text-2xl font-black text-amber-400 mt-1 flex items-baseline gap-1">
                    {simGold.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">Gold</span>
                  </div>
                </div>
              </div>

              {/* Realtime Wave Simulator */}
              <div className="py-2">
                <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
                  <span>Trạng thái phần cứng</span>
                  <span className="text-emerald-400">92% Power</span>
                </div>
                <div className="h-16 rounded-xl bg-black/40 border border-white/5 overflow-hidden flex items-end relative">
                  <svg className="w-full h-full text-emerald-500/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
                    <path d="M0,60 Q30,40 60,60 T120,60 L120,100 L0,100 Z" fill="currentColor" opacity="0.5" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Simulated Logs */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <div className="text-xs text-muted-foreground">Nhật ký hệ thống:</div>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  {simLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 bg-black/20 p-1.5 rounded border border-white/[0.02]">
                      <span className="text-emerald-500 font-bold">[{new Date().toLocaleTimeString()}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES SECTION ────────────────────────────────────────── */}
      <section id="features" className="py-20 border-b border-white/5 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Được thiết kế cho hiệu năng khai thác tối đa
            </h2>
            <p className="text-base text-muted-foreground">
              ClawQuest Miner tích hợp đầy đủ các thuật toán thông minh nhất giúp việc đào mỏ tự động trở nên vô cùng dễ dàng và tin cậy.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* feature 1 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tự Động Hóa Vòng Lặp</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tự động bắt đầu, dò mỏ, đào quặng và hồi phục năng lượng theo vòng lặp khép kín 24/7 mà không cần giám sát.
              </p>
            </div>

            {/* feature 2 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tối Ưu Năng Lượng</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Giải thuật thông minh tự động đổi cuốc sắt/vàng để phù hợp với lượng năng lượng còn lại, tránh lãng phí.
              </p>
            </div>

            {/* feature 3 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Chống Phát Hiện & Ban</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Áp dụng thời gian trễ ngẫu nhiên (random latency) giữa các lệnh bấm giả lập hành vi của con người thực tế.
              </p>
            </div>

            {/* feature 4 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phân Tích Realtime</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Biểu đồ thống kê lượng vàng khai thác được và tốc độ thực tế gửi trực tiếp về bảng điều khiển giám sát.
              </p>
            </div>

            {/* feature 5 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quản Lý Multi-Account</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mở rộng không giới hạn! Quản lý đồng thời hàng chục tài khoản bot khác nhau chỉ trên một dashboard duy nhất.
              </p>
            </div>

            {/* feature 6 */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tự Động Vượt Captcha</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tích hợp API giải mã captcha tự động giúp bot tiếp tục vận hành mượt mà khi gặp kiểm tra bảo mật đột xuất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. LIVE DASHBOARD & CONFIGURATION SECTION ────────────────────────────────────────── */}
      <section id="dashboard" className="py-20 bg-slate-950/40 border-b border-white/5 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-bold uppercase tracking-wider">
              Control Panel
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Bảng Cấu Hình & Giám Sát Realtime
            </h2>
            <p className="text-sm text-muted-foreground">
              Kết nối trực tiếp tới API endpoint của bạn bên dưới để thực hiện điều khiển bật/tắt và giám sát quá trình đào thực tế.
            </p>
          </div>

          {/* Global error banner */}
          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-slide-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Connection control buttons for active dashboard */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm font-semibold text-slate-200">
                Trạng thái: {isConnected ? 'Đã kết nối máy chủ' : 'Mất kết nối'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                id="stop-btn"
                size="sm"
                variant="destructive"
                disabled={!canStop}
                onClick={() => void stopMining()}
              >
                {isActing && !canStart ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Square className="h-3.5 w-3.5" />
                )}
                Dừng Bot
              </Button>

              <Button
                id="start-btn"
                size="sm"
                variant="success"
                disabled={!canStart}
                onClick={() => void startMining()}
              >
                {isActing && !canStop ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
                Bắt Đầu Đào
              </Button>
            </div>
          </div>

          {/* Loading skeleton */}
          {isLoading && !status && (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Dashboard grid */}
          {status && (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Left: Status */}
              <div className="md:col-span-2 space-y-6">
                <StatusCard status={status} />
                <EventLog events={status.events} />
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                <RewardPanel
                  rewards={status.lastRewardDetails}
                  playerStatus={status.lastPlayerStatus}
                />
                <ConfigPanel config={config} onSave={setConfig} />
              </div>
            </div>
          )}

          {/* No config state */}
          {!isLoading && !status && !error && (
            <div className="flex flex-col items-center justify-center gap-5 py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-950/20">
                <Pickaxe className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Chưa Cấu Hình Kết Nối</h3>
                <p className="text-sm text-muted-foreground max-w-sm mt-1 mx-auto">
                  Vui lòng điền thông tin **Backend URL** và **API Code** của bot đào mỏ của bạn bên dưới để đồng bộ dữ liệu.
                </p>
              </div>
              <div className="w-full max-w-md px-4">
                <ConfigPanel config={config} onSave={setConfig} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. PRICING SECTION ────────────────────────────────────────── */}
      <section id="pricing" className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Lựa chọn gói dịch vụ phù hợp
            </h2>
            <p className="text-base text-muted-foreground">
              Bắt đầu miễn phí hoặc nâng cấp lên gói Pro để mở khóa hiệu năng không giới hạn và các tính năng bảo mật nâng cao.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-stretch">
            {/* Starter Plan */}
            <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-slate-900/40 relative">
              <h3 className="text-xl font-bold text-white">Bản Starter</h3>
              <p className="text-xs text-muted-foreground mt-1">Phù hợp trải nghiệm cơ bản</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-muted-foreground">/ mãi mãi</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 flex-1 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Chạy tối đa 1 Account Miner</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Tự động đào vàng vòng lặp cơ bản</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Giám sát qua dashboard realtime</span>
                </li>
              </ul>

              <a href="#dashboard" className="w-full">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Sử dụng ngay</Button>
              </a>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col p-8 rounded-2xl border-2 border-emerald-500 bg-slate-950/80 relative shadow-xl shadow-emerald-950/30 transform lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
                Phổ biến nhất
              </div>
              <h3 className="text-xl font-bold text-white">Bản PRO</h3>
              <p className="text-xs text-emerald-400 mt-1">Tối đa hóa lợi nhuận đào</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$15</span>
                <span className="text-xs text-muted-foreground">/ tháng</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-200 flex-1 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Không giới hạn số lượng Account</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Tự động bypass Captcha nâng cao</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Smart switch dụng cụ cuốc mỏ</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Hỗ trợ kỹ thuật 24/7 ưu tiên</span>
                </li>
              </ul>

              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold">Nâng cấp Pro</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-slate-900/40 relative">
              <h3 className="text-xl font-bold text-white">Bản Farm</h3>
              <p className="text-xs text-muted-foreground mt-1">Dành cho chủ trang trại mỏ</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">Liên hệ</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 flex-1 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Tích hợp VPS riêng tự động hóa</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>API điều phối hàng loạt tài khoản</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Giải pháp Captcha trọn gói độc quyền</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Liên hệ Support</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION ────────────────────────────────────────── */}
      <section id="faq" className="py-20 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Các câu hỏi thường gặp
            </h2>
            <p className="text-base text-muted-foreground">
              Giải đáp thắc mắc nhanh của bạn về hệ thống bot đào mỏ tự động.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Bot ClawQuest Miner chạy trên nền tảng nào?',
                a: 'Bot được phát triển bằng Node.js tối ưu và có thể deploy chạy liên tục trên VPS Linux/Windows hoặc trực tiếp tại local máy cá nhân của bạn.',
              },
              {
                q: 'Làm thế nào để kết nối Dashboard này với Bot thực tế?',
                a: 'Rất đơn giản, bạn chỉ cần nhập link API Backend bot của bạn và mã xác thực API Code vào phần Bảng cấu hình ở phía trên. Dashboard sẽ tự động kết nối và đồng bộ hóa trạng thái.',
              },
              {
                q: 'Sử dụng bot này có an toàn và tránh bị khóa tài khoản không?',
                a: 'ClawQuest Miner được thiết kế với thuật toán giảm thiểu rủi ro cao, tự động chèn khoảng trễ ngẫu nhiên mô phỏng chính xác thao tác click chuột của con người giúp tránh các bộ quét tự động.',
              },
              {
                q: 'Tôi có thể quản lý nhiều tài khoản đào mỏ cùng lúc không?',
                a: 'Được. Gói Pro và Gói Farm hỗ trợ hệ thống điều khiển hàng chục tới hàng trăm luồng bot cùng lúc một cách mượt mà và trực quan nhất.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-white hover:bg-white/[0.02] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-5 w-5 text-emerald-400" />
                    {item.q}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-slide-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Pickaxe className="h-4 w-4 text-emerald-500" />
            <span className="font-bold text-slate-200">ClawQuest Miner</span>
            <span>— Tự động tối ưu hóa lợi nhuận.</span>
          </div>

          <div className="flex gap-6">
            <a href="#hero" className="hover:text-slate-200 transition-colors">Trang chủ</a>
            <a href="#features" className="hover:text-slate-200 transition-colors">Tính năng</a>
            <a href="#dashboard" className="hover:text-slate-200 transition-colors">Bảng điều khiển</a>
            <a href="#pricing" className="hover:text-slate-200 transition-colors">Bảng giá</a>
          </div>

          <div>
            © {new Date().getFullYear()} ClawQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
