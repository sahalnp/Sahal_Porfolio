import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Code2, Flame, Play, RotateCcw } from "lucide-react";
import SketchReveal from "./SketchReveal";

interface TopicSkill {
  topic: string;
  count: number;
  highlight: string;
}

const TOPICS: TopicSkill[] = [
  { topic: "Arrays & Strings", count: 38, highlight: "Prefix sum, two-pointers, sliding window" },
  { topic: "Hash Tables & Maps", count: 24, highlight: "O(1) lookups, frequency counters" },
  { topic: "Trees & Binary Search", count: 18, highlight: "DFS, BFS, BST traversal & bounds" },
  { topic: "Linked Lists & Stack", count: 13, highlight: "Cycle detection, monotonic stacks" },
];

export const LeetCodeInteractiveCard: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);

  // Mini Two-Pointer simulation array: finding pair summing to 9
  const demoArray = [2, 3, 4, 6, 7, 9];
  const targetSum = 9; // 2 + 7 = 9 at index 0 and 4

  // Demo steps:
  // 0: L=0 (2), R=5 (9), Sum=11 > 9 -> move R left
  // 1: L=0 (2), R=4 (7), Sum=9 == target! -> Match found!
  const leftPointer = demoStep === 0 ? 0 : 0;
  const rightPointer = demoStep === 0 ? 5 : 4;
  const currentSum = demoArray[leftPointer] + demoArray[rightPointer];

  const handleRunDemo = () => {
    setIsPlayingDemo(true);
    setDemoStep(0);
    setTimeout(() => {
      setDemoStep(1);
      setTimeout(() => {
        setIsPlayingDemo(false);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="w-full">
      <div className="sketch-border bg-card/95 p-6 md:p-8 relative backdrop-blur-xs">
        {/* Top Scotch Tape */}
        <div className="absolute -top-3.5 left-12 w-24 h-6 bg-accent/40 rounded-sm transform -rotate-2 z-20 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-dashed border-ink/15 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xl">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hand font-bold text-2xl text-foreground">
                  LeetCode Algorithmic Milestones
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20">
                  @sahalnp
                </span>
              </div>
              <p className="font-sketch text-sm text-pencil">
                Data structures, algorithmic thinking & problem solving
              </p>
            </div>
          </div>

          <a
            href="https://leetcode.com/u/sahalnp/"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 sketch-border-light bg-background hover:bg-pencil-hover transition-colors font-bold text-foreground"
          >
            <span>View LeetCode Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-6">
          {/* Total Solved */}
          <div className="p-3.5 rounded-lg border border-ink/10 bg-background/60">
            <div className="font-mono text-xs text-pencil">Total Solved</div>
            <div className="font-hand text-3xl md:text-4xl font-bold text-foreground mt-0.5">
              93<span className="text-primary text-xl">+</span>
            </div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <span>● Active Streak</span>
            </div>
          </div>

          {/* Easy */}
          <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Easy Solved
            </div>
            <div className="font-hand text-3xl md:text-4xl font-bold text-foreground mt-0.5">
              71
            </div>
            <div className="w-full bg-emerald-500/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "76%" }} />
            </div>
          </div>

          {/* Medium */}
          <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
              Medium Solved
            </div>
            <div className="font-hand text-3xl md:text-4xl font-bold text-foreground mt-0.5">
              20
            </div>
            <div className="w-full bg-amber-500/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "22%" }} />
            </div>
          </div>

          {/* Hard & 50 Days Badge */}
          <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-rose-600 dark:text-rose-400 font-bold">
                Hard Solved
              </div>
              <div className="font-hand text-2xl font-bold text-foreground mt-0.5">
                2 <span className="font-mono text-[11px] text-muted-foreground font-normal">Complex DP</span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>50 Days Badge 2025</span>
            </div>
          </div>
        </div>

        {/* Interactive Topic Inspector & Mini-Visualizer Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Topic Pills List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="font-hand font-bold text-base text-foreground mb-2 flex items-center gap-1.5">
              <span>🎯 Focus Categories:</span>
            </div>
            {TOPICS.map((t, idx) => (
              <button
                key={t.topic}
                onClick={() => setSelectedTopic(idx)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  selectedTopic === idx
                    ? "bg-primary/10 border-primary text-foreground shadow-xs font-bold"
                    : "bg-background/40 border-ink/10 text-muted-foreground hover:bg-background/80"
                }`}
              >
                <div>
                  <div className="font-hand text-base text-foreground">{t.topic}</div>
                  <div className="font-mono text-[11px] text-pencil">{t.highlight}</div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-background border border-ink/10 font-bold">
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mini Interactive Algorithmic Visualizer */}
          <div className="lg:col-span-7 bg-background/80 sketch-border-light p-4 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-hand font-bold text-base text-foreground">
                    Interactive Logic: Two-Sum Two-Pointer
                  </span>
                </div>
                <span className="font-mono text-[11px] text-pencil">
                  Target: <strong className="text-primary">{targetSum}</strong>
                </span>
              </div>

              {/* Array items visualizer */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-4">
                {demoArray.map((val, idx) => {
                  const isLeft = idx === leftPointer;
                  const isRight = idx === rightPointer;
                  const isMatched = demoStep === 1 && (isLeft || isRight);

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="font-mono text-[10px] text-pencil mb-1">
                        {isLeft && <span className="text-primary font-bold">L ▼</span>}
                        {isRight && <span className="text-amber-500 font-bold">R ▼</span>}
                        {!isLeft && !isRight && <span className="opacity-0">▼</span>}
                      </div>
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-md flex items-center justify-center font-mono font-bold text-sm sm:text-base border-2 transition-all ${
                          isMatched
                            ? "bg-emerald-500 text-white border-emerald-600 scale-110 shadow-md"
                            : isLeft || isRight
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-background border-ink/20 text-muted-foreground"
                        }`}
                      >
                        {val}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">
                        idx {idx}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step Commentary */}
              <div className="p-2.5 rounded bg-card sketch-border-light font-mono text-xs text-pencil mt-2">
                <span className="text-primary font-bold">Step {demoStep + 1}: </span>
                {demoStep === 0 ? (
                  <span>
                    Array[0] ({demoArray[leftPointer]}) + Array[5] ({demoArray[rightPointer]}) = 11 &gt; 9. Decrement right pointer!
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Array[0] ({demoArray[leftPointer]}) + Array[4] ({demoArray[rightPointer]}) = 9 == Target! Match found in O(N) time!
                  </span>
                )}
              </div>
            </div>

            {/* Visualizer Trigger */}
            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-ink/10">
              <button
                onClick={handleRunDemo}
                disabled={isPlayingDemo}
                className="hand-drawn-border py-1.5 px-3 bg-primary text-primary-foreground font-hand font-bold text-sm hover:bg-primary/90 flex items-center gap-1.5 disabled:opacity-50 transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isPlayingDemo ? "Evaluating..." : "Run Step Demo"}</span>
              </button>

              <button
                onClick={() => setDemoStep(0)}
                disabled={isPlayingDemo}
                className="p-1.5 rounded hover:bg-pencil-hover text-pencil transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeInteractiveCard;
