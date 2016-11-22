'use strict';
/** Header */


(function(){
  eu.header = {
    settings:{
      target:'.mod-header'
    },
    init:function(){
      this.dropDownLinks();
    },
    dropDownLinks : function(){
      var logo = $('header .logo'),
          brands = $('header .sub-brands'),
          search = $('header .search-cta'),
          searchBar = $('header .search-bar'),
          burgerMenu = $('header .burger-menu'),
          mobDropDown = $('header .mob-nav-links'),
          languageSel = $('header .language-sel');  

          //Logo drop down clicks
          logo.on('click', function(){
            if(brands.hasClass('active')){
              brands.removeClass('active');
              $(this).removeClass('active icn-up-arrow').addClass('icn-down-arrow');              
            }else{
              brands.addClass('active');
              $(this).removeClass('icn-down-arrow').addClass('active icn-up-arrow');

              //Hide search when logo dropdonw is opne 
              if(search.hasClass('active')){
                search.click();
              } 

              //Hide menu if its open
              if(mobDropDown.hasClass('active')){
                burgerMenu.click();
              }

            }            
          });

          //Search drop down clicks
          search.on('click', function(){
            if($(this).hasClass('active')){
              $(this).removeClass('active icn-search-fill').addClass('icn-search');
              searchBar.removeClass('active');
            }else{

              //Hide logo dropdown 
              if(brands.hasClass('active')){
                logo.click();
              }

              //Hide menu if its open
              if(mobDropDown.hasClass('active')){
                burgerMenu.click();
              }

              $(this).addClass('active icn-search-fill').removeClass('icn-search');
              searchBar.addClass('active');              
            }
          });

          //Search clear button 
          searchBar.find('input').on('keyup', function(){
              if($(this).val() != ''){
                searchBar.find('.clear').addClass('active');
              }else{
                searchBar.find('.clear').removeClass('active');
              }
          });

          $(searchBar.find('.clear')).on('click', function(){
              searchBar.find('input').val('');
              $(this).removeClass('active');
          });

          //Mobile menu
          burgerMenu.on('click', function(){
            if(mobDropDown.hasClass('active')){
              $(this).removeClass('active icn-close-fill').addClass('icn-burger');
              mobDropDown.removeClass('active');
            }else{

              //Hide logo dropdown 
              if(brands.hasClass('active')){
                logo.click();
              }
              //Hide search when logo dropdonw is opne 
              if(search.hasClass('active')){
                search.click();
              } 

              $(this).addClass('icn-close-fill').removeClass('icn-burger');
              mobDropDown.addClass('active');
            }
          });

          //Language selector
          languageSel.find('li.last').on('click', function(){
             if(languageSel.hasClass('active')){
              languageSel.removeClass('active');
              $('.nav-overlay').removeClass('active');
              $('.nav-overlay-top').removeClass('active');
              
             }else{
              languageSel.addClass('active');
              $('.nav-overlay').addClass('active');
              $('.nav-overlay-top').addClass('active');
             }
          });
    }
  };
}(eu));

