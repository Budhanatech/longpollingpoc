import {DemoApplication} from './application';

export * from './application';

export async function main() {
  const app = new DemoApplication();
  await app.boot();
  await app.start();
  console.log('Application initialised...');

  return app;
}

if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
