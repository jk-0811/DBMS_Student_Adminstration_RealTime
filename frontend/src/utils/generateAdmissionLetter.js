import jsPDF from "jspdf";

export const generateAdmissionLetter = (student) => {

 const doc = new jsPDF();

 doc.setFontSize(18);

 doc.text(
   "UNIVERSITY ADMISSION LETTER",
   20,
   20
 );

 doc.setFontSize(12);

 doc.text(
   `Student Name: ${student.fullName}`,
   20,
   40
 );

 doc.text(
   `Course: ${student.admissionForm.course}`,
   20,
   50
 );

 doc.text(
   `Branch: ${student.admissionForm.branch}`,
   20,
   60
 );

 doc.text(
   `Admission Status: Approved`,
   20,
   70
 );

 doc.save("AdmissionLetter.pdf");
};

<button
 onClick={() => generateAdmissionLetter(student)}
>
 Download Letter
</button>