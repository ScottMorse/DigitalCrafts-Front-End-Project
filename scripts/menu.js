const allSubMenus = Array.from(document.querySelectorAll('.dropdown-menu .dropdown-submenu'))

$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $('.dropdown-submenu .dropdown-menu').each((index,ul) => $(ul).hide())
      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
  });
});