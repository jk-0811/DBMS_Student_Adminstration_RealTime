import { QRCodeCanvas } from "qrcode.react";

export default function StudentQRCode({ student }) {
  if (!student) return null;

  return (
    <QRCodeCanvas
      value={JSON.stringify({
        id: student.id,
        name: student.fullName,
        email: student.email
      })}
      size={220}
    />
  );
}