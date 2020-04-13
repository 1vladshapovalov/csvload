# csvload

## Usage
1. Set up Mongo credentials and CSV files pathes (file to load data from and file used as CSV report) in https://github.com/1vladshapovalov/csvload/blob/master/config/default.json file.
2. Run 'npm install' and 'npm run build' commands.
3. For loading data run command 'npm run load'.
4. For running report generation use command 'npm run check'. Results can be found in file set as 'reportFilePath' option in https://github.com/1vladshapovalov/csvload/blob/master/config/default.json file.

## Steps took to implement the solution:
1. Loading from CSV to Mongo functionality.
2. Infrastructure for runninng checkers for report.
3. Adding checkers.