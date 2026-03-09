/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Check
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
        <div className="bg-zinc-50 border-l-2 border-zinc-200 p-4 text-sm text-zinc-600 leading-relaxed italic">
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
      <p className="text-lg font-medium text-zinc-800 leading-relaxed mb-6 italic">
        “{text}”
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

  const handleCopy = () => {
    navigator.clipboard.writeText('bob_fu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
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
      <header className="relative min-h-screen flex flex-col justify-center px-6 py-20 overflow-hidden bg-zinc-950">
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-6 py-32">
        {/* Overview */}
        <section className="mb-40">
          <SectionHeader number="01" title="活动概览" subtitle="Overview" />
          <div className="space-y-8 text-lg leading-relaxed text-zinc-800">
            <p>
              随着 2026 开年开源项目 <span className="font-bold border-b-2 border-zinc-900">OpenClaw</span> 的爆火，Voice Agent（语音智能体）正在经历从纯文本对话到 Go Visual（视觉化）、Go Physical（物理化） 乃至 Go Everywhere（无处不在） 的演进。个人 AI 开始真正进入并感知物理世界，与现实产生实时互动。
            </p>
            <p>
              本次活动由 RTE 开发者社区主办，联合望京留创园共同举办。活动聚焦“无所不在的语音智能体”与“物理 AI”，邀请了来自 Intent Company、声网、矽递科技和盒智科技的技术与产品专家，以及 AI 眼镜产品经理 Neil，共同探讨 VisionClaw 的爆火逻辑、实时对话的延迟金标准、无屏硬件的交互设计、硬件开发的 API 化以及出海合规等核心议题。活动现场同时启动了旨在扶持硬件 AI 创业团队的「Physical AI Camp·超音速计划 2026」。
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
                body: "xiaoan 现场展示了 VisionClaw 的工作流：通过佩戴智能眼镜，看向现实中的一瓶可乐并发出语音指令“帮我把它加入 Amazon 购物车”。系统通过眼镜的视觉识别商品，随后调用 OpenClaw 的自动化能力，在电脑浏览器后台直接完成加购。"
              },
              {
                title: "爆火的节点与推力",
                body: "项目开源是一个重要节点。他不仅展示了眼镜的结合，还接入了执行任务，这种“硬件+Agent”的范式引发了开发者社区的自发传播。此外，参与知名科技播客的录制也带来了巨大的流量破圈。"
              },
              {
                title: "B 端场景的巨大想象力",
                body: "项目爆火后，大量的 B 端企业主动寻求合作。例如建筑施工队希望通过眼镜自动识别工地现场的问题（如天花板损坏），并调用系统模板自动发送邮件给执行人；还有农场、兽医等行业，都迫切需要这种“实时感知+云端自动化处理”的工具。"
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
                title: "RTC 架构与延迟的“北极星指标”",
                body: "Colin 提到 2024 年 8 月曾与 OpenAI 深入交流传输层瓶颈，坚信传统的 Websocket 无法承载商用级实时对话，RTC 才是最佳方案。对于 Voice Agent，他强调延迟是关键的北极星指标。人类自然对话的反应时间约 200ms。而目前业界领先的产品（如 Tolan）明确要求 P90 响应延迟小于 1.5 秒，一旦超过 1 秒，交互就会产生强烈的机械感。"
              },
              {
                title: "为什么当下依然首选“级联架构”",
                body: "尽管全模态模型（Omni）是当前大模型发展的重要方向，但 Colin 认为目前商用首选仍是 ASR+LLM+TTS 的级联架构。其主要优势在于：\n1. 可观测性 (Observability)：每一个环节（ASR、LLM、TTS）的延迟和失败都清晰可见，便于开发者排查根因。\n2. 可调优性 (Tunability)：对于出海产品，可以低成本灵活替换不同语种的 ASR 或 TTS 模型，适应本地化需求。\n3. 高可用性 (Availability)：各模块之间可以设计冗余备份，保证系统的稳定性和不失控。"
              },
              {
                title: "期待“妙控麦克风”",
                body: "Colin 在用 Mac mini 运行 OpenClaw 时，深感通过键盘、鼠标、屏幕的传统交互方式与 Agent 的配合极其割裂。他预测未来最具革命性的硬件，将是彻底摒弃传统输入、专为语音设计的纯粹交互设备，正如他所期待的“妙控麦克风”。"
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
              <span>【特别预告：声网亮相 AWE 2026】</span>
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
                  今天 Colin 提到的很多让智能硬件“活起来”的底层技术、对话式 AI 开发套件，包括真实落地的 AI 玩具和泛 IPC 方案，都会在现场实物展出。 如果你对 Physical AI 的落地实操感兴趣，或者刚好在上海，非常推荐去他们展台当面交流、上手体验！
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
                <p className="text-sm text-zinc-600 leading-relaxed italic">
                  Neil 是一位 AI 眼镜领域的产品经理，他长期关注 AI 在物理世界的渗透，并致力于将 AI 能力从数字世界引入到可穿戴设备和智能硬件中。他认为，当前 AI 普遍缺乏对物理世界的感知，而 AI 眼镜作为一种“Always On”的载体，有潜力成为连接 AI 与物理世界的关键节点。
                </p>
              </div>
            </div>
          </div>

          <RoundTableTopic title="OpenClaw 热潮与 Physical AI 的切入点" icon={Layers}>
            <QuoteBlock 
              author="张昊"
              role="盒智科技"
              text="OpenClaw 的突破意义在于它打破了我们过去对 AI 权限的‘收敛’策略。当我们不再过多考虑数据保密、不再严格限制操作权限，而是将控制权大幅放给 AI 时，它就能展现出令人震惊的执行能力和可能性。它不仅是一个产品，更是一种全新的计算范式，极大填补了技术人员与非技术人员之间的协作鸿沟。"
            />
            <QuoteBlock 
              author="王静茜"
              role="矽递科技"
              text="OpenClaw 目前更多扮演的是用户的‘数字分身’，处理邮件和执行系统任务。但我们的探索方向是让 AI 真正感知物理世界。我们在公司内部正尝试为几十台 OpenClaw 设备装配机械臂、传感器、麦克风，让它们在工作群组里像团队成员一样沟通协作。当 AI 能够感知物理环境（如知道现场开了几盏灯，有多少人），并拥有‘执行动作’的能力（如机械臂），才算得上是真正的 Physical AI。"
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
                  “我一直认为，当前大部分 AI 都局限于‘数字世界’，缺乏对真实物理环境的感知。我一直有个需求：做一款督促早睡的应用。但纯软件产品只能设置闹钟，它不知道你实际睡没睡。而 AI 眼镜（作为 Physical AI 的载体）能通过视觉感知你的状态，它不仅能通过语音‘PUA’你，如果发现你没睡，甚至可以直接调用接口发送飞书或朋友圈动态来‘曝光’你。这才是 AI 真正拥有感知和行动能力，并能与物理世界互动的真实体验。”
                </p>
              </div>
              <QuoteBlock 
                author="张昊"
                role="盒智科技 CTO，无屏硬件交互挑战"
                text="盒智科技在做一款极小的儿童 AI 口语训练硬件，没有屏幕。做纯软件产品时，开发者往往存在‘交互惰性’，可以将所有功能堆砌在屏幕菜单里。但做无屏硬件，交互逻辑必须重构。它要求菜单层级极其扁平（最好只有一层），并且要设计精密的‘二次确认’策略（如处理儿童发音不准或临时改变主意时的 AI 响应），这给工程和策略设计带来了巨大挑战。"
              />
              <QuoteBlock 
                author="Colin"
                text="软件产品更多地看重其解决问题的‘内涵’和能力，即使没有华丽的 UI 也能发挥价值。但硬件产品，‘颜值’和‘手感’是其第一属性。产品的第一眼吸引力、握在手中的触感、物理反馈的顺畅度，这些都是软件产品经理转型做硬件时必须跨越的思维差异。"
              />
            </div>
          </RoundTableTopic>

          <RoundTableTopic title="硬件开发的“API 化”与模型成本取舍" icon={Cpu}>
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
                  做硬件产品，成本控制是永恒的议题。但在用户体验的临界点上，我更倾向于“选最好的”。例如在运行 OpenClaw 时，速度更快但理解力稍弱的模型，与理解力强但响应慢的模型，给用户带来的“爽感”是完全不同的。我们建议的策略是：先用最好的模型跑通体验的上限，再通过其他手段优化成本。
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
          
          <p className="text-zinc-500 text-sm mb-12 italic">在活动的最后阶段，四位开发者带着他们的软硬件项目进行了快速路演与演示：</p>
          
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
              description="韩留杰展示了一款专门面向 3-8 岁儿童的实体 AI 相机。这款产品的核心理念是鼓励孩子走出房间，探索现实世界，而不是沉溺于屏幕游戏。当孩子拍下花草或动物时，AI 会立刻进行语音解答和启发式对话（例如科普“狮子是唯一群居的猫科动物”），满足孩子的好奇心，并为他们提供探索世界的“第一步”。"
            />
            <DemoItem 
              title="M5Stack 桌面小助手"
              author="豪大 (One Person Company)"
              icon={Cpu}
              description="作为一名经验丰富的软件产品经理，豪大分享了他用 M5Stack 硬件“手搓”的桌面 AI 伴侣。这个小巧的设备不仅能与电脑端的 OpenClaw（开源项目）数据打通，进行语音转文字的实时对话，还集成了 3D 打印的“龙虾”外壳，能根据天气变化（AI 自动给角色戴上墨镜或口罩）进行视觉反馈，并提供了“敲木鱼”等互动功能，成为程序员工作之余的解压神器。"
            />
            <DemoItem 
              title="AI 校园生活平台"
              author="李昂 (大学生创业者)"
              icon={MessageSquare}
              description="工业设计专业的李昂展示了他为大学生设计的 AI 聚合平台。该平台的核心在于利用 AI Agent 来聚合信息，解决大学生在校园生活中面临的碎片化信息难题。例如，他开发的 Agent 可以 24 小时自动在校园二手交易平台上筛选并筛选出用户需要的二手书信息，从而将大学生从繁重的人工信息筛选中解放出来，实现“人力无法覆盖的任务”。平台旨在为大学生提供一个聚合信息、实现小生意交易和创业闭环的空间。"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-zinc-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300 mb-4">Physical AI Camp Beijing 2026</p>
              <h2 className="text-2xl font-black tracking-tighter">无所不在的语音智能体</h2>
            </div>
            <div className="flex gap-4">
              {[Mic, Cpu, Globe].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
              Recap Page by AI Studio • Powered by RTE Developer Community
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <motion.div 
          className="h-full bg-zinc-900 origin-left"
          style={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
        />
      </div>
    </div>
  );
}
