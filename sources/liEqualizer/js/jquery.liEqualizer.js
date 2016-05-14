/*
 * jQuery liEqualizer v 1.0
 *
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * http://masscode.ru/index.php/k2/item/52-liequalizer
 * Free to use
 * 
 * 10.01.2013
 */
(function ($) {
    var methods = {
        init: function (options) {
			var p = {
				row:7,			//кол-во столбцов
				col:6,			//кол-во колонок
				speed:20,		//скорость подсветки кубиков
				freq:400,		//частота сигнала
				on:true			//включено по умолчанию (true,false)
			};
			if (options) {
				$.extend(p, options); 
			}
			var eqWrap = $(this).addClass('eqWrap');
			for(c=0;c<p.col;c++){
				var eqColEl = $('<div>').addClass('eqCol').appendTo(eqWrap); 
				for(r=0;r<p.row;r++){
					$('<div>').addClass('eqItem').appendTo(eqColEl); 	
				}
			}
			var 
			eqCol = $('.eqCol',eqWrap),
			eqItem = $('.eqItem',eqWrap),
			randomNumber = function (m,n){
				m = parseInt(m);
				n = parseInt(n);
				return Math.floor( Math.random() * (n - m + 1) ) + m;
			},
			eqUp = function(colEl,val){
				var 
				speed = p.speed,
				v = p.row - val,
				i=p.row,
				j=0,
				flag2=true,
				eachItemUp = function(){
					$('.eqItem',colEl).eq(i-1).nextAll().stop().css({opacity:'1'});
					if($('.eqItem',colEl).eq(i-1).css('opacity') == 1){
						flag2 = false
					}else{
						flag2 = true	
					}
					$('.eqItem',colEl).eq(i-1).stop(true).animate({opacity:'1'},p.speed,function(){
						if($('.eqItem',colEl).index(this) == v){
							if(flag2){
								eqDown(colEl,val);
							}
						}else{
							i--;
							j++;
							if(i>v){
								eachItemUp()	
							}
						}
					})	
					
				}
				eachItemUp()
			},
			eqDown = function(colEl,val){
				var 
				v = p.row - val,
				i = (p.row-val),
				j = 0,
				speed = p.speed*2,
				eachItemDown = function(){
					if(i == (p.row-val)){
						$('.eqItem',colEl).eq(i).animate({opacity:'0'},speed*10)
						setTimeout(function(){
							i++;
							j++;
							if(i<p.row){
								eachItemDown();
							}		
						},speed)
					}else{
						$('.eqItem',colEl).eq(i).animate({opacity:'0'},speed,function(){
							i++;
							j++;
							if(i<p.row){
								eachItemDown();
							}	
						})
					}
				}
				eachItemDown();
			},
			eqInterval = function(){
				eqCol.each(function(){
					eqUp($(this),randomNumber(0,p.row))	
				})
			}
			eqInterval()
			if(p.on){
				var eqIntervalId = setInterval(eqInterval,p.freq)
				$(this).data({
					'eqIntId':eqIntervalId,
					'eqInt':eqInterval,
					'freq':p.freq,
					'on':p.on
				})
			}else{
				$(this).data({
					'eqIntId':eqIntervalId,
					'eqInt':eqInterval,
					'freq':p.freq,
					'on':p.on
				})
			}
		},start: function () {
			if(!$(this).data('on')){
				$(this).data('eqInt')();
				var eqIntervalId = setInterval($(this).data('eqInt'),$(this).data('freq'));
				$(this).data({
					'eqIntId':eqIntervalId,
					'on':true
				})
			}
		},
        stop: function () {
			if($(this).data('on')){
				clearInterval($(this).data('eqIntId'));
				$('.eqItem',$(this)).animate({opacity:0})
				$(this).data({
					'on':false
				})
			}
		}
	};
    $.fn.liEqualizer = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод ' + method + ' в jQuery.liEqualizer не существует');
        }
    };
})(jQuery); 