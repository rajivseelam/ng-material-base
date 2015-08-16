/*
ng.module('app').run([
  'auth',
  function (auth) {
    auth.load();

    if (auth.isLoggedIn()) {

    } else {
      auth.login({
        contact_number: fizzz
      }).then(function () {
        console.log(auth.isLoggedIn());
      });
    }
  }
]);
*/