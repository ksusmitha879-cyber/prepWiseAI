type PlanCardProps = {
  subject: string;
  examDate: string;
  planContent: string;
  createdAt?: string;
};

export default function PlanCard({
  subject,
  examDate,
  planContent,
  createdAt,
}: PlanCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{subject}</h3>
          <p className="text-xs text-gray-500">
            Exam: {new Date(examDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        {createdAt && (
          <span className="text-xs text-gray-400">
            Saved {new Date(createdAt).toLocaleDateString("en-IN")}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed
                      max-h-64 overflow-y-auto border-t border-gray-100 pt-3">
        {planContent}
      </div>
    </div>
  );
}