const steps = [
  "Registration",
  "Academic Details",
  "Documents Uploaded",
  "Verification",
  "Approval"
];

export default function AdmissionTimeline({thiscurrent=3}) {
  return (
    <div className="space-y-4">
      {steps.map((step,index)=>(
        <div
          key={step}
          className="flex items-center gap-3"
        >
          <span>
            {index <= current ? "✅" : "⭕"}
          </span>

          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}