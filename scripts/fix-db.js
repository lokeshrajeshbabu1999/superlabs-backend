const { execSync } = require('child_process');

/**
 * rescue-db.js
 * A script to help resolve Prisma migration locks (P3009) on Render.
 */

const FAILED_MIGRATION = '20260421081143_init_postgresql';

function run(command) {
  try {
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.stdout || error.message);
    return false;
  }
}

async function fix() {
  console.log('--- Database Migration Rescue Starting ---');

  // 1. Try to resolve the specific failed migration
  console.log(`Attempting to mark ${FAILED_MIGRATION} as applied...`);
  const resolved = run(`npx prisma migrate resolve --applied ${FAILED_MIGRATION}`);

  if (resolved) {
    console.log('Successfully marked migration as resolved.');
  } else {
    console.log('Could not resolve automatically. This might be because the record is already resolved or connection issues.');
  }

  // 2. Run standard deploy to finish up
  console.log('Running standard migration deploy...');
  const deployed = run('npx prisma migrate deploy');

  if (deployed) {
    console.log('Database is now up to date!');
  } else {
    console.log('Migration deploy still failing. You may need to reset the database manually if data is not critical.');
    console.log('Command: npx prisma migrate reset --force');
  }

  console.log('--- Database Migration Rescue Finished ---');
}

fix();
