/* JQUERY CODES
-------------------------------------------------*/
$(document).ready(function() {

	$.fn.animateRotate = function(angle, duration, easing, complete) {
	  var args = $.speed(duration, easing, complete);
	  var step = args.step;
	  return this.each(function(i, e) {
		args.complete = $.proxy(args.complete, e);
		args.step = function(now) {
		  $.style(e, 'transform', 'rotate(' + now + 'deg)');
		  if (step) return step.apply(e, arguments);
		};

		$({deg: 0}).animate({deg: angle}, args);
	  });
	};
	
	$("#main-page").css("background-color", "#e74c3c");
	$("#main-page").css("height", "100vh");
	$("#main-page").css("width", "100%");
	$("#main-page").fadeIn();
	$(".maincontent").fadeIn();
	
	$(".mainlink").on("click", function() {
		var address = $("#bitcoin-address").val();
		var awel = address.charAt(0);
		//console.log(awel);
		awel = parseInt(awel);
		if(awel === 1 || awel === 3){
			var v = check(address);
			if(v == false){
				$('#bitcoin-address').val('');
				$('#bitcoin-address').attr("placeholder","Wrong Bitcoin Address , Please Try a Valid One");
			}else{
			
				$(".maincontent").fadeOut();
				$("#main-page").animate({
					width: "25px",
					height: "375px"
				}, function() {
					$(this).animateRotate(90);
				});
			
				setTimeout(function() {
					$("#main-page").fadeOut();		 
				}, 1500);
			
				setTimeout(function() {
					$("#next-page").animateRotate(0, 0);
					$("#next-page").css("height", "25px");
					$("#next-page").css("width", "375px");
					$("#next-page").fadeIn();
					$("#next-page").animate({
						backgroundColor: "#27ae60"
					}, function() {
						$(this).animate({
							height: "100vh"
						}, function() {
							$(this).animate({
								width: "100%"
							}, function() {
								$(".nextcontent").fadeIn(300);
							});
						});
					});
				}, 800);
				
				$.getJSON('http://btc.blockr.io/api/v1/address/info/'+address+'', function(data){
					result= data.data.balance.toString();;
					content=" <span class='back'><strong >"+result+"</strong> Bitcoin</span>";
					$("#balance").empty();
					$(content).appendTo("#balance");
				});
			}
		}
		else{
			$('#bitcoin-address').val('');
			$('#bitcoin-address').attr("placeholder","Please Try a Valid Bitcoin Address");
		}
	});
	
	function check(address) {
		var decoded = base58_decode(address);     
		if (decoded.length != 25) return false;
		var cksum = decoded.substr(decoded.length - 4); 
		var rest = decoded.substr(0, decoded.length - 4);  
		var good_cksum = hex2a(sha256_digest(hex2a(sha256_digest(rest)))).substr(0, 4);
        if (cksum != good_cksum) return false;
			return true;
	}

	function base58_decode(string) {
		var table = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
		var table_rev = new Array();
		var i;
		for (i = 0; i < 58; i++) {
			table_rev[table[i]] = int2bigInt(i, 8, 0);
		} 
  
		var l = string.length;
		var long_value = int2bigInt(0, 1, 0);  
		var num_58 = int2bigInt(58, 8, 0);
		var c;
		for(i = 0; i < l; i++) {
			c = string[l - i - 1];
			long_value = add(long_value, mult(table_rev[c], pow(num_58, i)));
		}

		var hex = bigInt2str(long_value, 16);  
    
		var str = hex2a(hex);  
  
		var nPad;
		for (nPad = 0; string[nPad] == table[0]; nPad++);  
			var output = str;
			if (nPad > 0) output = repeat("\0", nPad) + str;
		return output;
	}

	function hex2a(hex) {
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	function a2hex(str) {
		var aHex = "0123456789abcdef";
		var l = str.length;
		var nBuf;
		var strBuf;
		var strOut = "";
		for (var i = 0; i < l; i++) {
		  nBuf = str.charCodeAt(i);
		  strBuf = aHex[Math.floor(nBuf/16)];
		  strBuf += aHex[nBuf % 16];
		  strOut += strBuf;
		}
		return strOut;
	}

	function pow(big, exp) {
		if (exp == 0) return int2bigInt(1, 1, 0);
		var i;
		var newbig = big;
		for (i = 1; i < exp; i++) {
			newbig = mult(newbig, big);
		}
		
		return newbig;
	}

	function repeat(s, n){
		var a = [];
		while(a.length < n){
			a.push(s);
		}
		return a.join('');
	}
		
	$(".nextlink").on("click", function() {
		$('#bitcoin-address').val('');
		$('#bitcoin-address').attr("placeholder","Enter Your Bitcoin Address");
		$(".nextcontent").fadeOut();
		$("#next-page").animate({
			width: "25px",
			height: "375px"
		}, function() {
			$(this).animateRotate(-90);
		});
		
		setTimeout(function() {
			$("#next-page").fadeOut();			
		}, 1500);
		
		setTimeout(function() {
		$("#main-page").animateRotate(0, 0);
		$("#main-page").css("height", "25px");
		$("#main-page").css("width", "375px");
			$("#main-page").fadeIn();
			$("#main-page").animate({
				height: "100vh"
			}, function() {
				$(this).animate({
					width: "100%"
				}, function() {
					$(".maincontent").fadeIn(300);
				});
			});
		}, 1400);
	});
});
