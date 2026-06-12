const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const total = await prisma.student.count();
  const forms = await prisma.admissionForm.count();
  const statuses = await prisma.admissionStatus.findMany();
  console.log("DB Stats:", { total, forms, statuses });
}
main().catch(console.error).finally(() => prisma.$disconnect());
