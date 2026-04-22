const { execSync } = require('child_process');

/**
 * fix-db.js
 * A robust script to help resolve Prisma migration locks (P3009) and synchronization issues on Render.
 */

const FAILED_MIGRATION = '20260421081143_init_postgresql';

function run(command) {
  try {
    console.log(`\n[FIX-DB] Running: ${command}`);
    const output = execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
    return true;
  } catch (error) {
    // In case of error, the output is already shown because of stdio: 'inherit'
    return false;
  }
}

async function fix() {
  console.log('=============================================');
  console.log('   DATABASE MIGRATION RESCUE STARTING       ');
  console.log('=============================================\n');

  // 1. Check current migration status
  console.log('[1/4] Checking migration status...');
  run('npx prisma migrate status');

  // 2. Try to resolve the specific failed migration
  console.log(`\n[2/4] Attempting to mark ${FAILED_MIGRATION} as applied...`);
  const resolved = run(`npx prisma migrate resolve --applied ${FAILED_MIGRATION}`);

  if (resolved) {
    console.log('>> SUCCESS: Marked migration as resolved.');
  } else {
    console.log('>> NOTE: Resolution failed or already applied. Checking for other issues...');
    // Try rolled-back as a fallback if it was never partially applied
    console.log(`\n[2b/4] Attempting to mark ${FAILED_MIGRATION} as rolled back (fallback)...`);
    run(`npx prisma migrate resolve --rolled-back ${FAILED_MIGRATION}`);
  }

  // 3. Try standard deploy
  console.log('\n[3/4] Running standard migration deploy...');
  const deployed = run('npx prisma migrate deploy');

  if (deployed) {
    console.log('>> SUCCESS: Database is now up to date via migrations!');
  } else {
    // 4. Nuclear Fallback: db push
    // This is useful if migrations are fundamentally stuck but the schema is valid.
    console.log('\n[4/4] MIGRATION FAILED - Attempting "db push" as a final fallback...');
    console.log('This will sync the database schema regardless of the migration history.');
    const pushed = run('npx prisma db push --skip-generate');
    
    if (pushed) {
      console.log('>> SUCCESS: Database schema synchronized via db push!');
    } else {
      console.log('\n!! CRITICAL: All attempts to synchronize database failed !!');
      console.log('Please check your DATABASE_URL and connection settings on Render.');
    }
  }

  console.log('\n=============================================');
  console.log('   DATABASE MIGRATION RESCUE FINISHED       ');
  console.log('=============================================\n');
}

fix();
