export const REQUIRED_VARIABLES = ['GOOGLE_ANALYTICS_ID'];

/* eslint-disable */
console.log(process.env);
console.log(process.env.AIRTABLE_API_KEY);
console.log(process.env.ANOTHER_KEY);
console.log('env ' + process.env.REACT_APP_KEY);

export const PROCESS_ENV =
  process.env.NODE_ENV === 'development'
    ? { GOOGLE_ANALYTICS_ID: '', ...process.env }
    : process.env;

console.log(PROCESS_ENV);
console.log(process.env.GOOGLE_ANALYTICS_ID);

/* eslint-enable */

let findMissingVariable = variable =>
  Object.keys(PROCESS_ENV).indexOf(variable) === -1;

let missingVariables = REQUIRED_VARIABLES.filter(findMissingVariable);

if (missingVariables.length > 0) {
  let sep = '\n\t> ';
  throw new Error(
    `Missing environment variables: \n${sep}${missingVariables.join(sep)}\n`
  );
}

let toEnvironmentVariableJsonMap = variableName => ({
  [variableName]: JSON.stringify(PROCESS_ENV[variableName])
});

let shallowMerge = (previous, current) => ({ ...previous, ...current });

export const ENV = REQUIRED_VARIABLES.map(toEnvironmentVariableJsonMap).reduce(
  shallowMerge,
  {}
);
