ng.module('app').config([
  'modelsProvider',
  function (modelsProvider) {
    modelsProvider
      .define(
        'User',
        ['id', 'name', 'contact_number', 'agent_type', 'cogent_agent_id']
      )
  }
]);