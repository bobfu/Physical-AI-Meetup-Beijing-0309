/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toBlob } from 'html-to-image';
import { 
  Mic, 
  Cpu, 
  Eye, 
  Zap, 
  MessageSquare, 
  Globe, 
  Users, 
  ArrowRight,
  Quote,
  Sparkles,
  Smartphone,
  Layers,
  ChevronRight,
  Megaphone,
  X,
  Copy,
  Check,
  Lightbulb,
  Database,
  Download
} from 'lucide-react';

const SectionHeader = ({ title, subtitle, number }: { title: string, subtitle?: string, number: string }) => (
  <div className="mb-16 relative">
    <div className="absolute -top-12 -left-4 text-9xl font-black text-black/5 select-none pointer-events-none font-mono">
      {number}
    </div>
    <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 mb-2 relative z-10">
      {title}
    </h2>
    {subtitle && <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">{subtitle}</p>}
    <div className="h-1.5 w-16 bg-zinc-900 mt-6"></div>
  </div>
);

const FullSpeakerSection = ({ name, role, background, content }: { name: string, role: string, background: string, content: { title: string, body: string }[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-24"
  >
    <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
      <div>
        <h3 className="text-3xl font-black text-zinc-900 mb-1">{name}</h3>
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">{role}</p>
        <div className="bg-zinc-50 border-l-2 border-zinc-200 p-4 text-sm text-zinc-600 leading-relaxed">
          <span className="font-bold text-zinc-400 mr-2">背景:</span> {background}
        </div>
      </div>
    </div>
    <div className="space-y-10">
      {content.map((item, idx) => (
        <div key={idx} className="relative pl-8 border-l border-zinc-100">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-900 -translate-x-1/2"></div>
          <h4 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">{item.title}</h4>
          <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap">{item.body}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const RoundTableTopic = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="mb-20">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-zinc-900 text-white rounded-lg">
        <Icon size={20} />
      </div>
      <h4 className="text-xl font-black tracking-tight">{title}</h4>
    </div>
    <div className="space-y-8">
      {children}
    </div>
  </div>
);

const QuoteBlock = ({ author, text, role }: { author: string, text: string, role?: string }) => (
  <div className="group relative bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
    <Quote className="absolute top-6 right-6 text-zinc-100 group-hover:text-zinc-200 transition-colors" size={48} />
    <div className="relative z-10">
      <p className="text-lg font-medium text-zinc-800 leading-relaxed mb-6">
        「{text}」
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-[10px] font-bold">
          {author[0]}
        </div>
        <div>
          <span className="text-sm font-black text-zinc-900">{author}</span>
          {role && <span className="text-xs text-zinc-400 ml-2 font-medium">({role})</span>}
        </div>
      </div>
    </div>
  </div>
);

const DemoItem = ({ title, author, description, icon: Icon }: { title: string, author: string, description: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem] flex flex-col h-full"
  >
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-zinc-900">
      <Icon size={24} />
    </div>
    <h4 className="text-xl font-bold text-zinc-900 mb-2">{title}</h4>
    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{author}</p>
    <p className="text-sm text-zinc-600 leading-relaxed flex-grow">{description}</p>
  </motion.div>
);

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('silicon-valley-2026');
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('bob_fu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportImage = async () => {
    if (contentRef.current === null) return;
    
    setIsExporting(true);
    const el = contentRef.current;

    try {
      // 1. 预热：给浏览器足够时间完成所有动画和图片解码
      // 不再改变宽度，保留用户当前的移动端视图
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. 执行极致高清捕捉
      const blob = await toBlob(el, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 6, // 极致 6 倍采样，确保移动端布局下依然拥有 2000px+ 的物理宽度
        filter: (node) => {
          // 排除不需要导出的 UI
          if (node instanceof HTMLElement) {
            if (node.classList.contains('no-export')) return false;
            // 隐藏所有固定定位的元素（进度条等）
            if (window.getComputedStyle(node).position === 'fixed') return false;
          }
          return true;
        },
        style: {
          transform: 'none',
          borderRadius: '0',
          margin: '0',
          padding: '0'
        }
      });

      if (!blob) throw new Error('Blob generation failed');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `Physical-AI-Recap-MobileHD-${activeTab}.png`;
      link.href = url;
      link.click();
      
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('Export failed:', err);
      alert('高清导出失败。由于 6 倍采样对内存要求极高，如果失败，请尝试稍微缩小浏览器窗口或刷新页面后再试。');
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'silicon-valley-2026', label: '硅谷站 2026' },
    { id: 'beijing-2026', label: '北京站 2026' }
  ];

  return (
    <div ref={contentRef} className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 text-center overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 p-12 opacity-5">
                <Users size={160} />
              </div>
              
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-white" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">加入超音速计划</h3>
              <p className="text-zinc-400 text-sm mb-8">
                请添加鲍勃微信了解详情，开启你的 Physical AI 创业之旅。
              </p>

              <button 
                onClick={handleCopy}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 group hover:bg-white/10 transition-all relative overflow-hidden"
              >
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">点击复制微信号</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-2xl font-mono font-bold text-white tracking-tight">bob_fu</p>
                  {copied ? (
                    <Check size={20} className="text-emerald-400" />
                  ) : (
                    <Copy size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  )}
                </div>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center backdrop-blur-sm"
                  >
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">已复制到剪贴板</span>
                  </motion.div>
                )}
              </button>

              <button 
                onClick={() => setShowContactModal(false)}
                className="w-full py-4 bg-white text-zinc-900 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
          {/* Hero Section */}
      <header className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
            <Sparkles size={14} className="text-zinc-400" />
            Physical AI Camp Recap
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'beijing-2026' ? (
              <motion.div
                key="beijing-hero"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-12">
                  VOICE <br />
                  AGENTS <br />
                  <span className="text-zinc-600">& PHYSICAL AI</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                  <p className="text-xl text-zinc-400 font-medium leading-tight">
                    Physical AI Camp 北京站：<br />
                    无所不在的语音智能体与物理 AI 的碰撞
                  </p>
                  <div className="flex flex-col gap-4 text-right">
                    <div className="text-sm text-zinc-500 font-mono">2026.03 BEIJING</div>
                    <div className="h-px w-24 bg-zinc-800 ml-auto"></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sv-hero"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-12 uppercase">
                  SILICON <br />
                  VALLEY <br />
                  <span className="text-zinc-600">& EDGE AI</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                  <p className="text-xl text-zinc-400 font-medium leading-tight">
                    Physical AI Meetup 硅谷站：<br />
                    Conversational AI, Visual Agent and Edge AI
                  </p>
                  <div className="flex flex-col gap-4 text-right">
                    <div className="text-sm text-zinc-500 font-mono">2026.03 SUNNYVALE</div>
                    <div className="h-px w-24 bg-zinc-800 ml-auto"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-screen-md mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-6 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab.id ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-screen-md mx-auto px-6 py-32">
        <AnimatePresence mode="wait">
          {activeTab === 'beijing-2026' ? (
            <motion.div
              key="beijing-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Overview */}
              <section className="mb-40">
                <SectionHeader number="01" title="活动概览" subtitle="Overview" />
                <div className="space-y-8 text-lg leading-relaxed text-zinc-800">
                  <p>
                    随着 2026 开年开源项目 <span className="font-bold border-b-2 border-zinc-900">OpenClaw</span> 的爆火，Voice Agent（语音智能体）正在经历从纯文本对话到 Go Visual（视觉化）、Go Physical（物理化） 乃至 Go Everywhere（无处不在） 的演进。个人 AI 开始真正进入并感知物理世界，与现实产生实时互动。
                  </p>
                  <p>
                    本次活动由 RTE 开发者社区主办，联合望京留创园共同举办。活动聚焦「无所不在的语音智能体」与「物理 AI」，邀请了来自 Intent Company、声网、矽递科技和盒智科技的技术与产品专家，以及 AI 眼镜产品经理 Neil，共同探讨 VisionClaw 的爆火逻辑、实时对话的延迟金标准、无屏硬件的交互设计、硬件开发的 API 化以及出海合规等核心议题。活动现场同时启动了旨在扶持硬件 AI 创业团队的「Physical AI Camp·超音速计划 2026」。
                  </p>
                  <div className="p-10 bg-zinc-900 rounded-[2.5rem] text-white relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <Zap size={200} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black mb-4 leading-tight">Physical AI Camp·<br />超音速计划 2026</h3>
                      <p className="text-zinc-400 text-sm mb-8 max-w-md">活动现场同时启动了旨在扶持硬件 AI 创业团队的专项计划。</p>
                      <button 
                        onClick={() => setShowContactModal(true)}
                        className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest bg-white text-zinc-900 px-6 py-3 rounded-full hover:bg-zinc-200 transition-all"
                      >
                        立即加入 <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part 1 */}
              <section className="mb-40">
                <SectionHeader number="02" title="主题分享" subtitle="Voice Agent Deep Dive" />
                
                <FullSpeakerSection 
                  name="xiaoan"
                  role="Intent Company 创始人"
                  background="xiaoan 曾在 Google XR 部门实习，擅长人机交互设计。他近期基于 OpenClaw 开发的 VisionClaw 演示视频在 X（原 Twitter）上获得了近百万次浏览，GitHub 收获 1.4K+ Star。"
                  content={[
                    {
                      title: "打通数字与物理世界的 Demo",
                      body: "xiaoan 现场展示了 VisionClaw 的工作流：通过佩戴智能眼镜，看向现实中的一瓶可乐并发出语音指令「帮我把它加入 Amazon 购物车」。系统通过眼镜的视觉识别商品，随后调用 OpenClaw 的自动化能力，在电脑浏览器后台直接完成加购。"
                    },
                    {
                      title: "爆火的节点与推力",
                      body: "项目开源是一个重要节点。他不仅展示了眼镜的结合，还接入了执行任务，这种「硬件+Agent」的范式引发了开发者社区的自发传播。此外，参与知名科技播客的录制也带来了巨大的流量破圈。"
                    },
                    {
                      title: "B 端场景的巨大想象力",
                      body: "项目爆火后，大量的 B 端企业主动寻求合作。例如建筑施工队希望通过眼镜自动识别工地现场的问题（如天花板损坏），并调用系统模板自动发送邮件给执行人；还有农场、兽医等行业，都迫切需要这种「实时感知+云端自动化处理」的工具。"
                    },
                    {
                      title: "Intent Company 的愿景",
                      body: "xiaoan 认为，未来的机会在于为与现实物理环境结合紧密的行业提供自动化引擎，真正将感知层（Perception）与异步执行层（Action）连接起来。"
                    }
                  ]}
                />

                <FullSpeakerSection 
                  name="姚光华 (Colin)"
                  role="声网 AI 产品线负责人"
                  background="声网 AI 产品线负责人，拥有丰富的实时互动产品经验，见证了实时互动（RTC）在游戏、教育、社交等领域的起伏变迁。"
                  content={[
                    {
                      title: "对话是人类最古老的操作系统",
                      body: "Colin 引用梅拉宾法则指出，日常沟通中语义信息只占 7%，但语气语调占 38%，肢体语言占 55%。目前 AI 仍受限于 ASR（语音转文本），无法真正听懂物理世界里的敲桌子、狗叫或摔门等动态声音。他认为，对话式智能体代表着计算机第一次以人类最自然的方式——自然语言，向人类开放交互接口。"
                    },
                    {
                      title: "RTC 架构与延迟的「北极星指标」",
                      body: "Colin 提到 2024 年 8 月曾与 OpenAI 深入交流传输层瓶颈，坚信传统的 Websocket 无法承载商用级实时对话，RTC 才是最佳方案。对于 Voice Agent，他强调延迟是关键的北极星指标。人类自然对话的反应时间约 200ms。而目前业界领先的产品（如 Tolan）明确要求 P90 响应延迟小于 1.5 秒，一旦超过 1 秒，交互就会产生强烈的机械感。"
                    },
                    {
                      title: "为什么当下依然首选「级联架构」",
                      body: "尽管全模态模型（Omni）是当前大模型发展的重要方向，但 Colin 认为目前商用首选仍是 ASR+LLM+TTS 的级联架构。其主要优势在于：\n1. 可观测性 (Observability)：每一个环节（ASR、LLM、TTS）的延迟和失败都清晰可见，便于开发者排查根因。\n2. 可调优性 (Tunability)：对于出海产品，可以低成本灵活替换不同语种的 ASR 或 TTS 模型，适应本地化需求。\n3. 高可用性 (Availability)：各模块之间可以设计冗余备份，保证系统的稳定性和不失控。"
                    },
                    {
                      title: "期待「妙控麦克风」",
                      body: "Colin 在用 Mac mini 运行 OpenClaw 时，深感通过键盘、鼠标、屏幕的传统交互方式与 Agent 的配合极其割裂。他预测未来最具革命性的硬件，将是彻底摒弃传统输入、专为语音设计的纯粹交互设备，正如他所期待的「妙控麦克风」。"
                    }
                  ]}
                />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mt-12 p-8 bg-zinc-900 text-white rounded-3xl border border-zinc-800 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Megaphone size={80} />
                  </div>
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-2xl">📣</span> 
                    <span>『特别预告：声网亮相 AWE 2026』</span>
                  </h4>
                  <div className="space-y-5 text-zinc-300 text-sm leading-relaxed relative z-10">
                    <p className="font-bold text-white text-base">本周（3 月 12 日 - 15 日），声网将在上海 AWE（中国家电及消费电子博览会）重磅参展。</p>
                    <div className="flex items-start gap-3">
                      <span className="text-zinc-500 mt-0.5">📍</span> 
                      <p><span className="font-bold text-zinc-100">展位信息：</span>上海新国际博览中心 E1 馆 1F81</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-zinc-500 mt-0.5">🛠️</span> 
                      <p>
                        <span className="font-bold text-zinc-100">现场体验：</span>
                        今天 Colin 提到的很多让智能硬件「活起来」的底层技术、对话式 AI 开发套件，包括真实落地的 AI 玩具和泛 IPC 方案，都会在现场实物展出。 如果你对 Physical AI 的落地实操感兴趣，或者刚好在上海，非常推荐去他们展台当面交流、上手体验！
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Part 2 */}
              <section className="mb-40">
                <SectionHeader number="03" title="圆桌讨论" subtitle="Practice & Insights" />
                
                <div className="mb-16 p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                  <div className="space-y-10">
                    <div>
                      <h5 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">对谈嘉宾</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
                          <p className="text-base font-black text-zinc-900 mb-1">姚光华 (Colin)</p>
                          <p className="text-xs text-zinc-500 font-medium">声网 AI 产品线负责人</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
                          <p className="text-base font-black text-zinc-900 mb-1">王静茜</p>
                          <p className="text-xs text-zinc-500 font-medium text-balance">矽递科技 AI 应用平台产品线负责人</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
                          <p className="text-base font-black text-zinc-900 mb-1">张昊</p>
                          <p className="text-xs text-zinc-500 font-medium">盒智科技联合创始人&CTO</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-zinc-200">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                          <Users size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-zinc-900">嘉宾主持：Neil</h4>
                          <p className="text-xs text-zinc-500">AI 眼镜产品经理</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        Neil 是一位 AI 眼镜领域的产品经理，他长期关注 AI 在物理世界的渗透，并致力于将 AI 能力从数字世界引入到可穿戴设备和智能硬件中。他认为，当前 AI 普遍缺乏对物理世界的感知，而 AI 眼镜作为一种「Always On」的载体，有潜力成为连接 AI 与物理世界的关键节点。
                      </p>
                    </div>
                  </div>
                </div>

                <RoundTableTopic title="OpenClaw 热潮与 Physical AI 的切入点" icon={Layers}>
                  <QuoteBlock 
                    author="张昊"
                    role="盒智科技"
                    text="OpenClaw 的突破意义在于它打破了我们过去对 AI 权限的『收敛』策略。当我们不再过多考虑数据保密、不再严格限制操作权限，而是将控制权大幅放给 AI 时，它就能展现出令人震惊的执行能力和可能性。它不仅是一个产品，更是一种全新的计算范式，极大填补了技术人员与非技术人员之间的协作鸿沟。"
                  />
                  <QuoteBlock 
                    author="王静茜"
                    role="矽递科技"
                    text="OpenClaw 目前更多扮演的是用户的『数字分身』，处理邮件和执行系统任务。但我们的探索方向是让 AI 真正感知物理世界。我们在公司内部正尝试为几十台 OpenClaw 设备装配机械臂、传感器、麦克风，让它们在工作群组里像团队成员一样沟通协作。当 AI 能够感知物理环境（如知道现场开了几盏灯，有多少人），并拥有『执行动作』的能力（如机械臂），才算得上是真正的 Physical AI。"
                  />
                </RoundTableTopic>

                <RoundTableTopic title="软硬件产品的设计差异与 AI 眼镜的潜力" icon={Eye}>
                  <div className="space-y-6">
                    <div className="p-8 bg-zinc-900 text-white rounded-[2rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Smartphone size={120} />
                      </div>
                      <h5 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Neil (AI 眼镜产品经理)</h5>
                      <p className="text-lg leading-relaxed mb-6">
                        「我一直认为，当前大部分 AI 都局限于『数字世界』，缺乏对真实物理环境的感知。我一直有个需求：做一款督促早睡的应用。但纯软件产品只能设置闹钟，它不知道你实际睡没睡。而 AI 眼镜（作为 Physical AI 的载体）能通过视觉感知你的状态，它不仅能通过语音『PUA』你，如果发现你没睡，甚至可以直接调用接口发送飞书或朋友圈动态来『曝光』你。这才是 AI 真正拥有感知和行动能力，并能与物理世界互动的真实体验。」
                      </p>
                    </div>
                    <QuoteBlock 
                      author="张昊"
                      role="盒智科技 CTO，无屏硬件交互挑战"
                      text="盒智科技在做一款极小的儿童 AI 口语训练硬件，没有屏幕。做纯软件产品时，开发者往往存在『交互惰性』，可以将所有功能堆砌在屏幕菜单里。但做无屏硬件，交互逻辑必须重构。它要求菜单层级极其扁平（最好只有一层），并且要设计精密的『二次确认』策略（如处理儿童发音不准或临时改变主意时的 AI 响应），这给工程和策略设计带来了巨大挑战。"
                    />
                    <QuoteBlock 
                      author="Colin"
                      text="软件产品更多地看重其解决问题的『内涵』和能力，即使没有华丽的 UI 也能发挥价值。但硬件产品，『颜值』和『手感』是其第一属性。产品的第一眼吸引力、握在手中的触感、物理反馈的顺畅度，这些都是软件产品经理转型做硬件时必须跨越的思维差异。"
                    />
                  </div>
                </RoundTableTopic>

                <RoundTableTopic title="硬件开发的「API 化」与模型成本取舍" icon={Cpu}>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 border border-zinc-200 rounded-3xl">
                      <h5 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                        <ChevronRight size={16} className="text-zinc-400" />
                        降低硬件开发者门槛 (王静茜)
                      </h5>
                      <p className="text-zinc-600 leading-relaxed">
                        过去，纯软件开发者面对电路板、底层芯片时会感到门槛很高。矽递科技正在推进硬件能力 API 化的进程，将麦克风阵列、视觉感知等物理能力封装成接口，使得软件开发者能够像调用云服务一样，简单地调用硬件能力，从而极大加速 AI 硬件的敏捷开发和 MVP 验证。
                      </p>
                    </div>
                    <div className="p-8 border border-zinc-200 rounded-3xl">
                      <h5 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                        <ChevronRight size={16} className="text-zinc-400" />
                        物美与价廉的平衡 (Colin)
                      </h5>
                      <p className="text-zinc-600 leading-relaxed">
                        做硬件产品，成本控制是永恒的议题。但在用户体验的临界点上，我更倾向于「选最好的」。例如在运行 OpenClaw 时，速度更快 but 理解力稍弱的模型，与理解力强但响应慢的模型，给用户带来的「爽感」是完全不同的。我们建议的策略是：先用最好的模型跑通体验的上限，再通过其他手段优化成本。
                      </p>
                    </div>
                    <div className="p-8 bg-zinc-50 rounded-3xl">
                      <h5 className="font-black text-zinc-900 mb-4">王静茜补充:</h5>
                      <p className="text-zinc-600 leading-relaxed">
                        很多时候，不必一开始就依赖昂贵的大模型 Token。现代端侧的 MCU 芯片已具备不错的 AI 算力。通过麦克风阵列的降噪和声纹定位等算法，在端侧完成数据的初步过滤，不仅能提高准确率，还能大幅降低对云端大模型资源的消耗。
                      </p>
                    </div>
                  </div>
                </RoundTableTopic>

                <RoundTableTopic title="AI 硬件出海的坑与建议" icon={Globe}>
                  <div className="space-y-6">
                    <QuoteBlock 
                      author="王静茜"
                      text="软件出海可以相对轻松地触及全球用户，但硬件出海则复杂得多。除了数据合规（如 GDPR）、不同国家市场对模型表现的一致性要求，更要面对物理层面的挑战：关税、供应链波动、Wi-Fi/4G 频段的全球合规性，以及各国准入认证（如 FCC、CE）。"
                    />
                    <QuoteBlock 
                      author="张昊"
                      text="AI 本质上是生产力放大器。面对资源分配不均（如对手方有更多资金投入跑 Token），创业者最终拼的是自己的行业 Know-how（行业知识积累）。不要轻易跨行做 AI 硬件，应在自己最熟悉的领域，利用 AI 来放大你原有的优势。"
                    />
                  </div>
                </RoundTableTopic>
              </section>

              {/* Part 3 */}
              <section className="mb-40">
                <SectionHeader number="04" title="Lightning Demo" subtitle="Ideas to Reality" />
                
                <p className="text-zinc-500 text-sm mb-12">在活动的最后阶段，四位开发者带着他们的软硬件项目进行了快速路演与演示：</p>
                
                <div className="grid grid-cols-1 gap-8">
                  <DemoItem 
                    title="AI 创业孵化支持"
                    author="酥鱼 (望京科技园·OPC智创社区)"
                    icon={Users}
                    description="作为本次活动的场地支持方，望京科技园介绍了其为 Physical Al 创业团队提供的具体扶持政策：社区提供专属政策顾问、免费接入主流 AI 大模型、多模态生成工具、云桌面与协同平台、实时 AI 资源、生态产品测试、免费3个月灵活办公工位、工商财税法全托管、行业大会 Startup 展示等一站式特色服务，他们旨在为 AI 创业者提供全方位的落地支持。"
                  />
                  <DemoItem 
                    title="儿童 AI 相机"
                    author="韩留杰 (jumpo.ai)"
                    icon={Smartphone}
                    description="韩留杰展示了一款专门面向 3-8 岁儿童的实体 AI 相机。这款产品的核心理念是鼓励孩子走出房间，探索现实世界，而不是沉溺于屏幕游戏。当孩子拍下花草或动物时，AI 会立刻进行语音解答和启发式对话（例如科普「狮子是唯一群居的猫科动物」），满足孩子的好奇心，并为他们提供探索世界的「第一步」。"
                  />
                  <DemoItem 
                    title="M5Stack 桌面小助手"
                    author="豪大 (One Person Company)"
                    icon={Cpu}
                    description="作为一名经验丰富的软件产品经理，豪大分享了他用 M5Stack 硬件「手搓」的桌面 AI 伴侣。这个小巧的设备不仅能与电脑端的 OpenClaw（开源项目）数据打通，进行语音转文字的实时对话，还集成了 3D 打印的「龙虾」外壳，能根据天气变化（AI 自动给角色戴上墨镜或口罩）进行视觉反馈，并提供了「敲木鱼」等互动功能，成为程序员工作之余的解压神器。"
                  />
                  <DemoItem 
                    title="AI 校园生活平台"
                    author="李昂 (大学生创业者)"
                    icon={MessageSquare}
                    description="工业设计专业的李昂展示了他为大学生设计的 AI 聚合平台。该平台的核心在于利用 AI Agent 来聚合信息，解决大学生在校园生活中面临的碎片化信息难题。例如，他开发的 Agent 可以 24 小时自动在校园二手交易平台上筛选并筛选出用户需要的二手书信息，从而将大学生从繁重的人工信息筛选中解放出来，实现「人力无法覆盖的任务」。平台旨在为大学生提供一个聚合信息、实现小生意交易和创业闭环的空间。"
                  />
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="sv-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Overview */}
              <section className="mb-40">
                <SectionHeader number="01" title="活动概览" subtitle="Overview" />
                <div className="space-y-8 text-lg leading-relaxed text-zinc-800">
                  <p>
                    <span className="font-bold border-b-2 border-zinc-900">Physical AI Meetup 硅谷站</span> 聚焦于 Conversational AI、Visual Agent 以及 Edge AI 的前沿探索。在硅谷 Sunnyvale，我们汇聚了多位深耕 AI 领域的专家，共同探讨 AI 如何从云端走向边缘，从数字世界深入物理世界。
                  </p>
                  <p>
                    本次活动深入讨论了 Proactive AI 的大趋势、多模态感官结合带来的自然记忆方式，以及在北美市场下的时代红利。通过主题分享与圆桌对谈，嘉宾们分享了关于感知层与执行层连接的深刻见解。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="p-10 bg-zinc-900 rounded-[2.5rem] text-white relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap size={200} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4 leading-tight">Physical AI Camp·<br />超音速计划 2026</h3>
                        <p className="text-zinc-400 text-sm mb-8 max-w-md">旨在扶持全球硬件 AI 创业团队的专项计划，欢迎硅谷创业者加入。</p>
                        <button 
                          onClick={() => setShowContactModal(true)}
                          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest bg-white text-zinc-900 px-6 py-3 rounded-full hover:bg-zinc-200 transition-all"
                        >
                          立即加入 <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="p-10 bg-white border border-zinc-200 rounded-[2.5rem] relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                        <Lightbulb size={200} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-6 leading-tight text-zinc-900">💡 灵感时刻</h3>
                        <div className="space-y-6">
                          <div className="border-l-2 border-zinc-900 pl-4">
                            <p className="text-sm text-zinc-600 mb-2">「大模型时代，硬件的核心使命不再只是『连接设备』，而是让智能体真正去『连接物理世界』。」</p>
                            <p className="text-xs font-bold text-zinc-900">— 冯晓东 (Agora)</p>
                          </div>
                          <div className="border-l-2 border-zinc-900 pl-4">
                            <p className="text-sm text-zinc-600 mb-2">「全球有超 200 亿台设备连上了网，但绝大多数依然没有自己的思考能力。单纯的 IoT 时代已经结束了。」</p>
                            <p className="text-xs font-bold text-zinc-900">— Diana Zhu (RiseLink)</p>
                          </div>
                          <div className="border-l-2 border-zinc-900 pl-4">
                            <p className="text-sm text-zinc-600 mb-2">「今天的时代红利极大，在北美，很多人并不在意你是不是采用了最 Cutting-edge（前沿）的技术，只要你把 PLG（产品驱动增长）做好，把产品实实在在地铺到用户面前解决特定需求，就能卖得很好。」</p>
                            <p className="text-xs font-bold text-zinc-900">— William Gao (HumanTouch)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Keynote Speeches */}
              <section className="mb-40">
                <SectionHeader number="02" title="主题演讲" subtitle="Keynote Speeches" />
                
                <div className="mb-20 p-10 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 p-12 opacity-10">
                    <Megaphone size={200} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-4 leading-tight">对话真实世界</h3>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                      物理智能（Physical AI） —— 落地与未来。三位重磅嘉宾深度分享大模型、边缘算力与感官生态的融合之道。
                    </p>
                  </div>
                </div>

                <div className="space-y-32">
                  <FullSpeakerSection 
                    name="Morgan Suo"
                    role="Senior GTM Manager @ MiniMax"
                    background="MiniMax 是全球领先的 AGI 创新企业，拥有涵盖大语言模型（M2.5）、视频生成（Hailuo-2.3）和原生语音（Speech-2.6）的全模态自研模型体系。"
                    content={[
                      {
                        title: "1. MiniMax：全模态大模型驱动 AGI 创新",
                        body: "其海螺视频模型在半年内生成超 3 亿视频；公司内部 70% 的代码由 AI 生成，展现了极高的生产级效率，致力于教模型在动态环境中学习如何推理。"
                      },
                      {
                        title: "2. 破局硬件交互困境：一站式音视频解决方案",
                        body: "传统硬件语音交互面临研发成本高（需自行缝合 ASR/TTS/LLM 等）和交互延迟高（首包响应慢、无情感）的痛点。MiniMax 提供一站式云端解决方案，使 ESP32 等低功耗硬件也能流畅运行复杂的 AI 逻辑，大幅降低了厂商的开发门槛并缩短了上线周期。"
                      },
                      {
                        title: "3. 极致拟人的交互体验：极速、极拟人、极智能",
                        body: "原生语音方案（如 Speech-2.8）支持「边想边说」技术，实时交互延迟低于 250 毫秒，能自然处理呼吸声、停顿并支持实时打断。系统仅需 10 秒音频即可实现 1:1 声音克隆，满足用户对亲友声音定制等情感化需求，让硬件从冷冰冰的指令机转变为有温度的伙伴。"
                      },
                      {
                        title: "4. 全场景赋能与价值重构",
                        body: "MiniMax 的能力已渗透至 AI 眼镜（Rokid）、PC、陪伴玩具（Fuzozo）及智能座舱（比亚迪、长城等）等赛道。硬件不再是孤立的工具，而是蜕变为具备感知、记忆和推理能力的「物理智能体」，通过自然对话与用户产生情感共鸣，重构硬件的商业价值。"
                      }
                    ]}
                  />

                  <FullSpeakerSection 
                    name="Diana Zhu"
                    role="Head of U.S., RiseLink"
                    background="RiseLink 认为行业正从传统的拼凑式芯片方案转向「单芯片集成（Single-die integration）」。设备必须具备本地思考能力，以边缘算力解决物理世界实时交互的痛点。"
                    content={[
                      {
                        title: "1. 告别传统 IoT，迎接边缘 AI 拐点",
                        body: "传统的云端模型面临 500ms 延迟、推理成本上升及用户隐私担忧等瓶颈。RiseLink 认为行业正从传统的拼凑式芯片方案转向「单芯片集成」。设备必须具备本地思考能力，以边缘算力解决物理世界实时交互的痛点。"
                      },
                      {
                        title: "2. BK7259：单芯片集成的「全能认知中心」",
                        body: "RiseLink 推出的 BK7259 芯片在单一芯片上集成了 ARM Ethos-U65 NPU、双核 Cortex-M55 以及 Wi-Fi 6/蓝牙协议。这种架构消除了 NPU 读写内存的瓶颈，并将功耗降至极低（如 0.3W），让开发者用一颗芯片即可同时驱动视觉、音频、马达控制和 AI 推理。"
                      },
                      {
                        title: "3. 赋能核心场景：家居、出行与穿戴",
                        body: "• 智能门锁：实现 <200ms 本地人脸识别，数据不出门，且无云端费用。\n• 个人出行：在 E-bike 上单芯片搞定 GPS、投屏和电机控制，适应户外极端环境。\n• 穿戴设备：为 AI 眼镜提供降噪与场景识别，解决续航痛点，实现全天候 AI 陪伴。"
                      },
                      {
                        title: "4. 携手生态伙伴，共建硬件开发社区",
                        body: "RiseLink 联合 Agora 推出 R2 平台，实现语音、视觉与控制的统一部署。通过提供底层开发套件和「智能设备配方（Recipes）」，结合线下 WorkShop，手把手帮助开发者将物理 AI 创意转化为可商用的产品。"
                      }
                    ]}
                  />

                  <FullSpeakerSection 
                    name="冯晓东"
                    role="Physical AI 产品线负责人, Agora"
                    background="Agora 认为未来是「对话式物理 AI」时代，终端交互将从简单的文本指令进化为更具灵魂、拟人化的实时沟通。设备不再只是工具，而是能够实时感知并回应物理世界的智能体。"
                    content={[
                      {
                        title: "1. 从 IoT 到 Physical AI：「LUI 颠覆 GUI」的时代",
                        body: "随着 AI 爆发，硬件重心从「连接」转向「交互」。Agora 认为未来是「对话式物理 AI」的时代，终端交互将从简单的文本指令进化为更具灵魂、拟人化的实时沟通。设备不再只是工具，而是能够实时感知并回应物理世界的智能体。"
                      },
                      {
                        title: "2. 「一体两面」软硬底座：TEN 框架与开源 RTOS",
                        body: "为打破开发壁垒，Agora 提供：\n• 软件端：TEN 开源框架，让开发者能用自然语言直接调控物理设备。\n• 硬件端：开源 RTOS 操作系统，抹平不同芯片与系统间的性能差异，提供标准化的基础设施。"
                      },
                      {
                        title: "3. 凤鸣 AI 引擎：解决 AI 的「听力」难题",
                        body: "物理环境复杂，AI 往往难以在嘈杂场景下精准识别。Agora 通过凤鸣 AI 引擎，提供极致的降噪、背景人声过滤和说话人检测（VAD），让 AI 能够精准判断何时倾听、何时回答，告别迟钝与抢话。"
                      },
                      {
                        title: "4. R2 套件进化：让 AI 「能听、能看、会动」",
                        body: "最新的 R2 套件引入了视频流大模型视觉理解，使 AI 能理解动态过程而非静态图片。同时，通过支持电机驱动赋予设备「肢体语言」（如 AI 认错时低头），极大地增强了桌面机器人和陪伴类产品的拟人化体验与情感连接。"
                      }
                    ]}
                  />
                </div>
              </section>

              {/* Round Table */}
              <section className="mb-40">
                <SectionHeader number="03" title="圆桌讨论" subtitle="Round Table" />
                
                <div className="mb-16 p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                  <h5 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Users size={18} /> 🎙️ 嘉宾与主持人简介
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <p className="text-lg font-black text-zinc-900 mb-2">主持人｜Cynthia Yang</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">Initiator @ RTE 开发者社区。致力于搭建桥梁与高速 Hub，链接全球不同背景、处于生态链各环节的 AI 创业者与技术创新者。</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <p className="text-lg font-black text-zinc-900 mb-2">嘉宾｜Kara 李欣航</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">同歌创投（歌尔股份产业资本）执行董事。专注早期 AI 软硬一体产品及前沿技术带来的新体验。</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <p className="text-lg font-black text-zinc-900 mb-2">嘉宾｜Troy Hua</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">EverMind VP。专注 AI 长期记忆（Long-term Memory），Benchmark 排名第一，探索 Multi-agent 场景下的记忆范式。</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <p className="text-lg font-black text-zinc-900 mb-2">嘉宾｜William Gao</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">HumanTouch Founder。深耕 Audio 方向，探索 AI 结合音频带来的巨大想象空间与 PLG 增长红利。</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-32">
                  <RoundTableTopic title="一、 开场与嘉宾背景：Why are we here？" icon={Users}>
                    <div className="space-y-8 text-zinc-700 leading-relaxed text-lg">
                      <div className="pl-6 border-l-4 border-zinc-200">
                        <p className="font-bold text-zinc-900 mb-2">Kara 李欣航：</p>
                        <p>我们是一家产业资本，专注于 AI 软硬一体的产品及前沿技术带来的新体验。像我现在佩戴的这款产品叫 Looki，它是一个多模态的 AI 智能硬件，给 AI 长了眼睛和耳朵。我们主要在早期为创业者提供资金与供应链支持。</p>
                      </div>
                      <div className="pl-6 border-l-4 border-zinc-200">
                        <p className="font-bold text-zinc-900 mb-2">Troy Hua：</p>
                        <p>EverMind 主要负责 AI 长期记忆。我们的 Benchmark 目前达到了第一名的水平。除了传统 RAG 场景外，我们也在探索 Multi-agent 场景下的记忆范式，希望能和不同领域的核心客户打造专门的 Showcase。</p>
                      </div>
                      <div className="pl-6 border-l-4 border-zinc-200">
                        <p className="font-bold text-zinc-900 mb-2">William Gao：</p>
                        <p>我从芝加哥搬到了硅谷，因为我发现 AI 实在太伟大了。目前我们在做的主要是基于 Audio 的方向，我们认为 Audio 进来之后，整个 AI 能做的事情会有巨大的想象空间。</p>
                      </div>
                    </div>
                  </RoundTableTopic>

                  <RoundTableTopic title="二、 核心探讨：什么是真正的主动式（Proactive）AI？" icon={Zap}>
                    <div className="space-y-10">
                      <p className="text-zinc-500 text-xl">「你的设备到底仅仅是 Always on（一直在线），还是可以做到 Proactive（主动式）？」</p>
                      <div className="grid grid-cols-1 gap-8">
                        <QuoteBlock 
                          author="William Gao"
                          text="目前大家在 Coding 场景下可能只消耗 100 个 Token，但在 Consumer 场景下可能是 1000 倍的量。如何进一步让它把 Output 变成一个长时间、相对复杂的 Agent Action？这是业界正在转变的方向，也是我们在做的事情。"
                        />
                        <QuoteBlock 
                          author="Troy Hua"
                          text="主动触发的『内容』质量，完全取决于 AI 能够获取并处理多长的 Context。我设想过一个场景：智能桌搭主动对主人说：『我今天在窗外看到一只鸟，我用你喜欢的水墨画风格把它画了下来。』 这需要一种类似『心跳』的机制让 AI 保持感知。"
                        />
                        <QuoteBlock 
                          author="Kara 李欣航"
                          text="当 AI 进入物理世界，能看能听以后，它带来的价值远远超出了我们今天的预期。比如你在旧金山圣帕特里克教堂附近想买巧克力，它能主动提醒你宫殿剧院旁边就有一家。或者在加州传出无人机袭击谣言时，它能根据你的位置给出最近的避难出口建议。它能主动想在你前面、帮在你前面，这是 Proactive AI 的大趋势。"
                        />
                      </div>
                    </div>
                  </RoundTableTopic>

                  <RoundTableTopic title="三、 演进之路：AI 硬件落地过程中的痛点与挑战是什么？" icon={Smartphone}>
                    <div className="p-10 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Cpu size={160} />
                      </div>
                      <div className="relative z-10">
                        <h5 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Kara 李欣航 (同歌创投)</h5>
                        <p className="text-2xl font-medium leading-relaxed mb-8">
                          「硬件端最大的挑战之一就是功耗。你需要在『场景、功耗、佩戴体验』这三者之间去做一个 Trade-off。」
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                          当下确实有很多完美形态还做不到，但这会随着底座能力的提升逐渐被解决。我们需要把硬件供应链的优势和软件大模型的能力结合起来。比如在特定传感器开启的情况下，如何保证电池续航，这是每一个硬件创业者都要面对的现实。
                        </p>
                      </div>
                    </div>
                  </RoundTableTopic>

                  <RoundTableTopic title="四、 底层支撑：如何为 Agent 设计高效的长期记忆？" icon={Layers}>
                    <div className="space-y-10">
                      <QuoteBlock 
                        author="Troy Hua"
                        text="我们尽量减少在工程化里强行进行『信息压缩』的人为干预，让模型具备更强的能力去处理海量数据。语言、视觉和其他感官的结合，会让记忆的方式越来越自然。"
                      />
                      <div className="p-10 border border-zinc-200 rounded-[2.5rem] bg-zinc-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Database size={100} />
                        </div>
                        <p className="text-lg text-zinc-600 leading-relaxed relative z-10">
                          我们提出了 <span className="font-bold text-zinc-900">Memory Sparse Attention</span> 架构，支持一亿 Token 的上下文操作，天然支持多模态数据，不需要转译成文本，在没有任何信息损失的情况下直接进入 AI。这意味着你可以对一整部电影甚至一整天的视频记录进行精准的问答。
                        </p>
                      </div>
                    </div>
                  </RoundTableTopic>

                  <RoundTableTopic title="五、 路线选择：为什么坚持做基于音频（Audio）的 AI 硬件？" icon={Mic}>
                    <div className="space-y-8">
                      <QuoteBlock 
                        author="William Gao"
                        text="核心痛点就是能耗。如果使用 Camera Module，耗电极高。为了做得很轻，我们最初选择了 Audio 赛道。Audio 消耗的能耗很低，但能做的事情极多。比如在办公场景下，它能自动帮你找到刚才开会提到的文件或邮件，并完成发送。"
                      />
                      <p className="text-zinc-600 text-lg leading-relaxed pl-6">
                        音频作为第一入口，具有极高的渗透率和低门槛。它能让 AI 像一个隐形的助手，时刻待命而不打扰用户。
                      </p>
                    </div>
                  </RoundTableTopic>

                  <RoundTableTopic title="六、 出海与生态：全球化背景下的创业机遇与破圈建议" icon={Globe}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-10 border border-zinc-200 rounded-[2.5rem] hover:border-zinc-900 transition-colors group">
                        <h5 className="font-black text-2xl text-zinc-900 mb-6 group-hover:translate-x-2 transition-transform">Kara 的建议</h5>
                        <p className="text-zinc-600 leading-relaxed">
                          北美是极好的市场，用户付费意愿强。下一代硬件的商业模式大概是 <span className="font-bold text-zinc-900">硬件 + 订阅</span>，要靠软件赚钱。同时一定要 Leverage 中国的供应链优势，这能带来数量级上的成本和效率差异。
                        </p>
                      </div>
                      <div className="p-10 border border-zinc-200 rounded-[2.5rem] hover:border-zinc-900 transition-colors group">
                        <h5 className="font-black text-2xl text-zinc-900 mb-6 group-hover:translate-x-2 transition-transform">Troy 的建议</h5>
                        <p className="text-zinc-600 leading-relaxed">
                          我更看好开源的 <span className="font-bold text-zinc-900">Local 模型</span>，因为隐私和响应速度对硬件来说至关重要。对于极度私密的数据，可以考虑结合 NAS 或联合开发的机器来确保数据不出本地。
                        </p>
                      </div>
                      <div className="p-10 border border-zinc-200 rounded-[2.5rem] hover:border-zinc-900 transition-colors group">
                        <h5 className="font-black text-2xl text-zinc-900 mb-6 group-hover:translate-x-2 transition-transform">William 的建议</h5>
                        <p className="text-zinc-600 leading-relaxed">
                          今天的时代红利极大，在北美，很多人并不在意你是否采用最前沿的技术，只要你把 <span className="font-bold text-zinc-900">PLG（产品驱动增长）</span> 做好，实实在在地解决特定需求，就能卖得很好。大公司还没填满所有的缝隙，这就是机会。
                        </p>
                      </div>
                    </div>
                    <div className="mt-12 p-12 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 p-12 opacity-10">
                        <Sparkles size={200} />
                      </div>
                      <h5 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Cynthia Yang (主持人总结)</h5>
                      <ul className="space-y-6 text-lg">
                        <li className="flex gap-4">
                          <span className="text-zinc-600 font-mono">01</span> 
                          <span className="text-zinc-300">Think global, day one native，结合业务侧优势和供应链红利。</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-zinc-600 font-mono">02</span> 
                          <span className="text-zinc-300">考虑到端云平衡，第一天就要想清楚硬件能耗与算力的分配比例。</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-zinc-600 font-mono">03</span> 
                          <span className="text-zinc-300">破圈。普通消费者需要的是「好用」，不要局限在纯技术圈子里。</span>
                        </li>
                      </ul>
                    </div>
                  </RoundTableTopic>
                </div>
              </section>

              {/* Lightning Demo */}
              <section className="mb-40">
                <SectionHeader number="04" title="Lightning Demo" subtitle="Ideas to Reality" />
                
                <p className="text-zinc-500 text-sm mb-12">在活动的最后阶段，五位开发者带着他们的软硬件项目进行了快速路演与演示：</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DemoItem 
                    title="探索 AI 硬件出海新范式"
                    author="Jinhui"
                    icon={Globe}
                    description="「轻硬件+重渠道」的商业模式创新。分享了针对 AI 硬件出海的「轻硬件」商业模式。区别于追求百万级销量的重资产投入，该模式主张利用深圳成熟的公版硬件，将重心放在北美市场的本土化销售（如 TikTok 渠道）与 100% US-native 的软件设计上。通过极低的硬件研发成本和敏捷的渠道策略，帮助初创团队快速跑通端到端的商业闭环。"
                  />
                  <DemoItem 
                    title="Olares：为 Agent 而生的个人云操作系统"
                    author="Hongfei"
                    icon={Database}
                    description="打造开箱即用的本地大模型运行算力中心。介绍了专为本地运行大模型和 Agent 打造的个人云操作系统 Olares。随着开源模型的爆发，用户对 24 小时运行本地 Agent 的物理设备需求激增。Olares 提供了一个基于容器架构的安全沙盒环境，内置应用市场，支持一键安装超过 250 个开源软件和 20 多个主流大模型，让开发者能以极低门槛部署属于自己的本地 AI 算力中心。"
                  />
                  <DemoItem 
                    title="Putopia：探测「多元宇宙」的 AI 收音机"
                    author="Ara"
                    icon={Mic}
                    description="结合实体交互与 AI 实时生成的创意硬件。展示了一款充满浪漫色彩与极客精神的创新 AI 硬件。这款设备没有触屏，用户需要通过转动物理旋钮来调频，探索由 AI 实时生成的、包含图文音多模态内容的「多元宇宙频道」。团队目前正在湾区招募首批内测玩家，希望通过这种充满仪式感的实体交互，与社区共创 AI 时代的情感连接与前沿故事。"
                  />
                  <DemoItem 
                    title="Omni 全模态大模型与极致实时交互"
                    author="陈景东"
                    icon={Zap}
                    description="探索多模态底层能力的极速端到端落地。分享了蚂蚁集团在全模态大模型（Omni）领域的最新进展。通过引入 MOE 架构，模型能以极小的激活参数实现高效的理解与表达，从而支撑极低延迟的实时交互。该模型在内部集成了强大的语音编辑能力，支持多音轨同步生成，并将视觉输出作为核心模块，致力于为各种终端 AI 硬件提供一个强大、高效的「交互大脑」。"
                  />
                  <DemoItem 
                    title="AI 赋能前沿医疗植入与脑机接口"
                    author="nianhang"
                    icon={Cpu}
                    description="海量脑波数据的精准解析与应用。探讨了 AI 在人体植入设备及脑神经治疗领域的前沿应用潜力。脑波采集会产生极其庞大且复杂的数据，传统的嵌入式硬件急需借助强大的 AI 算法进行深度解析。团队希望能借助大模型的能力，精准匹配患者的意念需求与真实物理状态，从而实现更自然、高效的脑机交互与智能设备控制。"
                  />
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="pt-20 border-t border-zinc-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300 mb-4">Physical AI Camp 2026</p>
              <h2 className="text-2xl font-black tracking-tighter">探索 AI 的物理边界</h2>
            </div>
            <div className="flex gap-4">
              {[Mic, Cpu, Globe].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center flex flex-col items-center gap-6">
            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
              Recap Page by AI Studio • Powered by RTE Developer Community
            </p>
            
            <button
              onClick={exportImage}
              disabled={isExporting}
              className="no-export flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-3 h-3 border border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
              ) : (
                <Download size={12} />
              )}
              {isExporting ? '正在生成高清长图...' : '导出高清长图'}
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Progress Indicator */}
      <div className="no-export fixed top-0 left-0 w-full h-1 z-50">
        <motion.div 
          className="h-full bg-zinc-900 origin-left"
          style={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
        />
      </div>
    </div>
  );
}
