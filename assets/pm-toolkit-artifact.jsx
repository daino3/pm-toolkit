import React, { useMemo, useState } from "react";

const seed = {
  tasks: [
    { id: "T-1", title: "Review decline-resolution experiment", priority: "P0", status: "todo", due: "2026-07-30", project: "Decline Resolution" },
    { id: "T-2", title: "Respond to collateral feedback", priority: "P1", status: "in_progress", due: "2026-08-01", project: "RCS" },
    { id: "T-3", title: "Finalize H2 roadmap ranking", priority: "P1", status: "todo", due: "2026-08-04", project: "T&S Strategy" },
  ],
  projects: [
    { id: "P-1", title: "1-shot Decline Resolution", health: "yellow", owner: "Dain", target: "2026-09-15", next: "Resolve compliance comments", jira: "CARD-1234" },
    { id: "P-2", title: "RCS Enrollment", health: "red", owner: "Dain", target: "2026-08-29", next: "Confirm consent language", jira: "RCS-218" },
    { id: "P-3", title: "Interchange Recovery Efficiency", health: "green", owner: "Dain", target: "2026-10-01", next: "Validate support-cost assumptions", jira: "AUTH-778" },
  ],
  roadmap: [
    { id: "R-1", rank: 1, title: "Decline Resolution", impact: 5, confidence: 0.8, alignment: 3, effort: 5 },
    { id: "R-2", rank: 2, title: "Risk Policy Accuracy Model", impact: 4, confidence: 0.8, alignment: 3, effort: 3 },
    { id: "R-3", rank: 3, title: "RCS Messaging", impact: 3, confidence: 0.5, alignment: 2, effort: 3 },
  ],
  experiments: [
    { id: "E-1", name: "One-shot retry", status: "Running", impact: "+3.8% retry rate", confidence: "Directional", sample: "61%" },
    { id: "E-2", name: "Frozen-card copy", status: "Ready to read", impact: "+1.2% auth recovery", confidence: "Conclusive", sample: "100%" },
  ],
  approvals: [
    { id: "A-1", type: "Concept", title: "Decline Resolution", status: "Team Review", due: "2026-08-07", jira: "CON-449" },
    { id: "A-2", type: "Collateral", title: "RCS Enrollment", status: "Changes requested", due: "2026-07-31", jira: "COL-901" },
  ],
  goals: [
    { id: "G-1", title: "Define 2027 T&S strategic vision", progress: 42, status: "On track" },
    { id: "G-2", title: "Improve authorization recovery", progress: 68, status: "At risk" },
  ],
};

const tabs = ["Dashboard", "Tasks", "Roadmap", "Experiments", "Approvals", "Goals"];

function Badge({ children }) {
  return <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{children}</span>;
}

function Card({ title, action, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-slate-900">{title}</h2>{action}</div>
      {children}
    </section>
  );
}

export default function PMToolkit() {
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState(seed);
  const [taskTitle, setTaskTitle] = useState("");
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleString());

  const attention = useMemo(() => [
    ...data.projects.filter(p => p.health !== "green").map(p => ({ title: p.title, detail: `${p.health.toUpperCase()} · ${p.next}` })),
    ...data.approvals.filter(a => a.status !== "Approved").map(a => ({ title: a.title, detail: `${a.type} · ${a.status} · due ${a.due}` })),
  ].slice(0, 5), [data]);

  function toggleTask(id) {
    setData(d => ({ ...d, tasks: d.tasks.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t) }));
  }

  function addTask() {
    if (!taskTitle.trim()) return;
    setData(d => ({ ...d, tasks: [{ id: `T-${Date.now()}`, title: taskTitle.trim(), priority: "P2", status: "todo", due: "", project: "Unassigned" }, ...d.tasks] }));
    setTaskTitle("");
  }

  function addRoadmap() {
    if (!roadmapTitle.trim()) return;
    setData(d => ({ ...d, roadmap: [...d.roadmap, { id: `R-${Date.now()}`, rank: d.roadmap.length + 1, title: roadmapTitle.trim(), impact: 3, confidence: 0.5, alignment: 2, effort: 3 }] }));
    setRoadmapTitle("");
  }

  function moveRoadmap(index, direction) {
    const next = [...data.roadmap];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setData(d => ({ ...d, roadmap: next.map((x, i) => ({ ...x, rank: i + 1 })) }));
  }

  const score = r => ((r.impact * r.confidence * r.alignment) / r.effort).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div><h1 className="text-xl font-bold">PM Toolkit</h1><p className="text-xs text-slate-500">Last refreshed {lastRefresh}</p></div>
          <button onClick={() => setLastRefresh(new Date().toLocaleString())} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Refresh connectors</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-[190px_1fr] gap-6 px-6 py-6">
        <nav className="space-y-1">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${tab === t ? "bg-slate-900 text-white" : "hover:bg-white"}`}>{t}</button>)}</nav>
        <main>
          {tab === "Dashboard" && <div className="space-y-5">
            <div className="grid grid-cols-4 gap-3">{[
              ["Open tasks", data.tasks.filter(t => t.status !== "completed").length],
              ["At-risk projects", data.projects.filter(p => p.health !== "green").length],
              ["Running experiments", data.experiments.filter(e => e.status === "Running").length],
              ["Open approvals", data.approvals.filter(a => a.status !== "Approved").length],
            ].map(([k,v]) => <div key={k} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-bold">{v}</div><div className="text-sm text-slate-500">{k}</div></div>)}</div>
            <div className="grid grid-cols-2 gap-5">
              <Card title="Attention required">{attention.map((x,i) => <div key={i} className="border-b border-slate-100 py-2 last:border-0"><div className="font-medium">{x.title}</div><div className="text-sm text-slate-500">{x.detail}</div></div>)}</Card>
              <Card title="Today's priorities">{data.tasks.filter(t => t.status !== "completed").slice(0,5).map(t => <label key={t.id} className="flex gap-3 border-b border-slate-100 py-2 last:border-0"><input type="checkbox" checked={t.status === "completed"} onChange={() => toggleTask(t.id)} /><span><span className="font-medium">{t.title}</span><span className="block text-xs text-slate-500">{t.priority} · {t.project}</span></span></label>)}</Card>
              <Card title="In-flight projects">{data.projects.map(p => <div key={p.id} className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0"><div><div className="font-medium">{p.title}</div><div className="text-xs text-slate-500">{p.jira} · next: {p.next}</div></div><Badge>{p.health}</Badge></div>)}</Card>
              <Card title="Experiments">{data.experiments.map(e => <div key={e.id} className="border-b border-slate-100 py-2 last:border-0"><div className="flex justify-between"><span className="font-medium">{e.name}</span><Badge>{e.status}</Badge></div><div className="text-sm text-slate-500">{e.impact} · {e.confidence}</div></div>)}</Card>
            </div>
          </div>}

          {tab === "Tasks" && <Card title="Tasks" action={<div className="flex gap-2"><input value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Quick add task" className="rounded-lg border px-3 py-2 text-sm"/><button onClick={addTask} className="rounded-lg bg-slate-900 px-3 text-sm text-white">Add</button></div>}>{data.tasks.map(t => <label key={t.id} className="flex items-center justify-between border-b py-3 last:border-0"><span className="flex gap-3"><input type="checkbox" checked={t.status === "completed"} onChange={()=>toggleTask(t.id)}/><span className={t.status === "completed" ? "line-through text-slate-400" : ""}>{t.title}</span></span><span className="flex gap-2"><Badge>{t.priority}</Badge><Badge>{t.project}</Badge></span></label>)}</Card>}

          {tab === "Roadmap" && <Card title="Stack-ranked roadmap" action={<div className="flex gap-2"><input value={roadmapTitle} onChange={e=>setRoadmapTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addRoadmap()} placeholder="Add roadmap item" className="rounded-lg border px-3 py-2 text-sm"/><button onClick={addRoadmap} className="rounded-lg bg-slate-900 px-3 text-sm text-white">Add</button></div>}><div className="grid grid-cols-[55px_1fr_90px_100px] border-b pb-2 text-xs font-semibold uppercase text-slate-500"><span>Rank</span><span>Initiative</span><span>Score</span><span>Move</span></div>{data.roadmap.map((r,i)=><div key={r.id} className="grid grid-cols-[55px_1fr_90px_100px] items-center border-b py-3 last:border-0"><span className="font-bold">#{r.rank}</span><span>{r.title}</span><span>{score(r)}</span><span className="flex gap-1"><button onClick={()=>moveRoadmap(i,-1)} className="rounded border px-2">↑</button><button onClick={()=>moveRoadmap(i,1)} className="rounded border px-2">↓</button></span></div>)}</Card>}

          {tab === "Experiments" && <div className="grid grid-cols-2 gap-4">{data.experiments.map(e=><Card key={e.id} title={e.name} action={<Badge>{e.status}</Badge>}><p className="text-2xl font-bold">{e.impact}</p><p className="mt-1 text-sm text-slate-500">Evidence: {e.confidence} · Sample progress: {e.sample}</p><button className="mt-4 rounded-lg border px-3 py-2 text-sm">Summarize experiment</button></Card>)}</div>}

          {tab === "Approvals" && <Card title="Concept & collateral tracker">{data.approvals.map(a=><div key={a.id} className="grid grid-cols-[100px_1fr_180px_120px] border-b py-3 last:border-0"><Badge>{a.type}</Badge><span><span className="font-medium">{a.title}</span><span className="block text-xs text-slate-500">{a.jira}</span></span><span>{a.status}</span><span>Due {a.due}</span></div>)}</Card>}

          {tab === "Goals" && <Card title="Goal progress">{data.goals.map(g=><div key={g.id} className="border-b py-4 last:border-0"><div className="mb-2 flex justify-between"><span className="font-medium">{g.title}</span><Badge>{g.status}</Badge></div><div className="h-2 rounded bg-slate-100"><div className="h-2 rounded bg-slate-800" style={{width:`${g.progress}%`}}/></div><div className="mt-1 text-right text-xs text-slate-500">{g.progress}%</div></div>)}</Card>}
        </main>
      </div>
    </div>
  );
}
