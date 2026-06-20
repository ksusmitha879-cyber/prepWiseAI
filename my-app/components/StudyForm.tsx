"use client";

import { useState } from "react";
import PlanCard from "./PlanCard";
import { supabase } from "@/lib/supabase";

export default function StudyForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");

  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPlan(null);
    setSaved(false);

    if (!subject || !topics || !examDate) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      if (!res.ok) throw new Error("Failed to generate plan");

      const data = await res.json();
      setPlan(data.plan);
    } catch (err) {
      setError("Something went wrong generating your plan. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!plan) return;
    setSaving(true);

    const { error } = await supabase.from("plans").insert([
      {
        subject,
        topics,
        exam_date: examDate,
        plan_content: plan,
      },
    ]);

    setSaving(false);
    if (error) {
      setError("Could not save plan. Check Supabase connection.");
    } else {
      setSaved(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Data Structures"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topics
          </label>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g. Arrays, Linked Lists, Trees, Graphs"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-medium py-2.5
                     rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Generating Plan..." : "Generate Study Plan"}
        </button>
      </form>

      {plan && (
        <div className="mt-8">
          <PlanCard
            subject={subject}
            examDate={examDate}
            planContent={plan}
          />
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="mt-4 w-full bg-emerald-600 text-white font-medium py-2.5
                       rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {saved ? "✓ Saved!" : saving ? "Saving..." : "Save This Plan"}
          </button>
        </div>
      )}
    </div>
  );
}