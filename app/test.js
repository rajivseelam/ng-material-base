/*
ng.module('app').run([
  'auth',
  function (auth) {
    auth.load();

    if (auth.isLoggedIn()) {

    } else {
      auth.login({
        contact_number: 8882288822
      }).then(function () {
        console.log(auth.isLoggedIn());
      });
    }
  }
]);
*/