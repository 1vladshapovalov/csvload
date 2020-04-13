import { Args } from './args';
import { Checker } from './checker';
import { CSVReader } from './csvreader';
import { Loader } from './loader';

(async () => {
  const args = new Args(process.argv);
  const action = args.getAction();
  if (action === 'loadFromCSV') {
    const loader = new Loader();
    new CSVReader().read(loader);
  } else if (action === 'generateReport') {
    const checker = new Checker();
    new CSVReader().read(checker);
  } else {
    throw new Error('action not found');
  }
})();

process.on('uncaughtException', error => {
  console.error('uncaughtException' + error);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  console.error('unhandledRejection' + error);
  process.exit(1);
});
