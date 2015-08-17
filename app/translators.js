// Register response data translators here.
// Translators only handle data from successful requests
// Whether a translator is run on a request or not is
// determined by running the method translator.test(method, url, options).
// If the test method is not defined on a translator, it is
// instantiated by default to :
// translator.test = function (method, url, options) {
//   return method === this.method && this.pattern.test(url);
// }

ng.module('app').config([
  'apiProvider',
  function (apiProvider) {
    apiProvider
      .translator(['models', function (models) {
        var userBuilder = function (data) {
          return models.User({
            id             : data.id,
            name           : data.name,
            contact_number : data.contact_number,
            agent_type     : data.agent_type,
            cogent_agent_id: data.cogent_agent_id
          });
        };

        
        return {
          method: 'POST',
          pattern: '/agent_login',
          translate: function (data) {
            return {
              access_token: data.auth_token,
              user: userBuilder(data)
            };
          }
        };
      }])
    ;
  }
]);