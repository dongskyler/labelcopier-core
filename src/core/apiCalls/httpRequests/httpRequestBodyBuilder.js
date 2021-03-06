export const buildHttpRequestBodyForLabels = () => {
  const body = {
    name: 'type: feature request',
    color: '001122',
    description: 'Suggestion to new features',
  };
  return body;
};

export const buildHttpRequestBodyForMilestones = () => {
  const body = {
    title: 'Backlog',
    state: 'open',
    description: 'Work not yet planned for a specific release',
    due_on: '2030-04-01T09:00:00Z',
  };
  return body;
};

export const buildHttpRequestBody = (entryType) => {
  const httpRequestBodyBuilders = {
    labels: buildHttpRequestBodyForLabels(),
    milestones: buildHttpRequestBodyForMilestones(),
  };
  const body = httpRequestBodyBuilders[entryType];
  return JSON.stringify(body);
};
