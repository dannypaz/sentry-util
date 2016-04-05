(function(){
  'use strict';

  function toggleLoading() {
    var spinner = document.getElementById('spinner');

    if (spinner.className == 'spinner show') {
      spinner.setAttribute('class','spinner hide');
    } else {
      spinner.setAttribute('class','spinner show');
    }
  };

  var button = document.getElementById('getPages');
  button.addEventListener('click', toggleLoading, false);
})();
