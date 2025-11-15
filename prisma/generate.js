#!/usr/bin/env node

// This script ensures Prisma client is generated properly on Vercel
const { exec } = require("child_process");

console.log("🔧 Running Prisma generate script...");

exec("npx prisma generate", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error during Prisma generation: ${error.message}`);
    process.exit(1);
  }

  if (stderr) {
    console.error(`⚠️ Prisma generation stderr: ${stderr}`);
  }

  console.log(`✅ Prisma client generated successfully:\n${stdout}`);
});
