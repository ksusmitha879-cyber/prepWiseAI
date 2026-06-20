
import StudyForm from "@/components/StudyForm";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Generate Your Study Plan</h1>
      <p className="text-gray-500 mb-8">
        Enter your subject, topics, and exam date — AI builds a day-by-day
        plan for you.
      </p>
      <StudyForm />
    </div>
  );
}