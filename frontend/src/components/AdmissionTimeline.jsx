const steps = [
 "Registration",
 "Academic Details",
 "Documents Uploaded",
 "Verification",
 "Approval"
];

export default function AdmissionTimeline({ current }) {

 return (
   <div>

     {steps.map((step,index)=>(
       <div key={step}>
         {index <= current ? "✅" : "⭕"}
         {step}
       </div>
     ))}

   </div>
 );
 
<AdmissionTimeline current={3}/>

}