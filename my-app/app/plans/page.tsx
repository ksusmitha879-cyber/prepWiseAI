"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlanCard from "@/components/PlanCard";

type Plan = {
  id: string;
  subject: string;
  topics: string;
  exam_date: string;
  plan_content: string;
  created_at: string;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setPlans(data);
      setLoading(false);
    }
    fetchPlans();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Saved Plans</h1>

      {loading && <p className="text-gray-500 text-sm">Loading plans...</p>}

      {!loading && plans.length === 0 && (
        <p className="text-gray-500 text-sm">
          No saved plans yet. Generate one from the home page!
        </p>
      )}

      <div className="space-y-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            subject={plan.subject}
            examDate={plan.exam_date}
            planContent={plan.plan_content}
            createdAt={plan.created_at}
          />
        ))}
      </div>
    </div>
  );
}