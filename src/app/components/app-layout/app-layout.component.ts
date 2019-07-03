import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, AfterViewInit {


  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {

    // Menu Trigger
    $('#menuToggle').on('click', function(event) {
      var windowWidth = $(window).width();
      if (windowWidth<1010) {
        $('body').removeClass('open');
        if (windowWidth<760){
          //debugger
          $('#left-panel').slideToggle();
        } else {
          $('#left-panel').toggleClass('open-menu');
        }
      } else {

        $('body').toggleClass('open');
        $('#left-panel')
            .removeClass('open-menu');
      }

    });


    $(".menu-item-has-children.dropdown").each(function() {
      $(this).on('click', function() {
        var $temp_text = $(this).children('.dropdown-toggle').html();
        $(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>');
      });
    });


    // Load Resize
    $(window).on("load resize", function(event) {
      var windowWidth = $(window).width();
      if (windowWidth<1010) {
        $('body').addClass('small-device');
      } else {
        $('body').removeClass('small-device');
        $('#left-panel').css('display', '');
      }

    });
  }

}
