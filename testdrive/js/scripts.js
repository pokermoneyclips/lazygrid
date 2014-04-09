$(document).ready(function () {
	
	// Create Grid Option Values
	var $lazygrid = [];
	var $lazytext = "gridspan_12_span";
	var $defaultclass = $lazytext + "12";
	for ( i=1; i < 13; i++) {
		$lazygrid.push($lazytext + i);
	}	
	
	// Create array to store options
	var $lazyoptions = []; // multi level array for our options
	var $lazyoptionpos = ['body-one', 'sidebar-one' , 'sidebar-two']; // store the grid spans here
	var $lazyoptionsposcount = $lazyoptionpos.length; // length of grid spans
	var $selectone = ' -- Select One -- ';
	
	for ( var l=0; l < $lazyoptionsposcount; l++) {
		$lazyoptions[l] = '<label for="' + $lazyoptionpos[l] + '">' + $lazyoptionpos[l] + '</label><select name="' + $lazyoptionpos[l] + '" id="' + $lazyoptionpos[l] + '-select"><option value="">' + $selectone + '</option>';	
		for ( var i=0; i < 12; i++) {
			$lazyoptions[l] += '<option value="' + $lazygrid[i] + '">' + $lazygrid[i] + '</option>';
		}
		$lazyoptions[l] += '</select>';			
		$($lazyoptions[l]).appendTo('#options');
		
		// Select List OnChange For Dropdowns
		$( '#' + $lazyoptionpos[l] + '-select' ).change(function() {
				lazyonchange($(this).attr('name'), this.value);
		});
	
		// Assign Default Class Onload
		$('#' + $lazyoptionpos[l]).addClass($defaultclass);		
	}
	
		
	// Fluid
	var $fluidupdown = '';

	// Adaptive Fluid Values
	var $adaptfluidselect = '#fluidadapt';
	var $adaptiveoption = 'adaptive';
	var $fluidoption = 'fluid';

	// Add default class on load of adaptive
	$('#wrapper').addClass( $adaptiveoption );
	
	// Select List OnChange For Adaptive or Responsive
	$( $adaptfluidselect ).change(function() {
		$('#wrapper').removeAttr( 'class' );
		lazyreset(this.value); // Reset value back to nothing
		
		if (this.value === $adaptiveoption) {
			$('#wrapper').addClass( $adaptiveoption );
			$('select[id$=-upordown]').remove(); // Remove the select list for up down on fluid
		}
		// Fluid Options
		else {
			$('#wrapper').addClass( $fluidoption );
			var $yesorno = [];
			for (var f=0; f < $lazyoptionsposcount; f++) {
				$yesorno[f] = '<select data-parent="' + $lazyoptionpos[f] + '" id="' + $lazyoptionpos[f] + '-upordown">';
				$yesorno[f] += '<option value="up">Up</option><option value="down">Down</option>';
				$yesorno[f] += '</select>';
				// Only Insert Select Lists if they dont exist already
				if ($('#' + $lazyoptionpos[f] + '-upordown').length == 0) {
					$($yesorno[f]).insertAfter('#' + $lazyoptionpos[f] + '-select');
				}

				// Select List OnChange For Dropdowns
				$( '#' + $lazyoptionpos[f] + '-upordown' ).change(function() {					
					lazyupdownchange($(this).attr('data-parent'), $(this).attr('id'), this.value);
				}); // End Change Function
			} // End For Loop
						
		}
	});
	
	// Up or Down Select Function
	function lazyupdownchange(parent, item, option) {
		var $gridselectopt = $('#' + parent + '-select').val();
		if (option === 'up') {
			$('#' + parent).removeAttr( 'class' );		
			$('#' + parent).attr('class',  $gridselectopt + '_up');
		}
		else { 
			$('#' + parent).removeAttr( 'class' );
			$('#' + parent).attr('class', $gridselectopt + '_down');
		}
	}
	
	// Add and remove classes on change
	function lazyonchange(item, option) {
		var $selectedoption = $($adaptfluidselect).val();
		var $updownselected = $('#' + item + '-upordown').val();				
		
		if (option === '') {
			$('#' + item).removeAttr( 'class' );
			$('#' + item).addClass($defaultclass);	
		}
		else {
			$('#' + item).removeAttr( 'class' );
			if ($selectedoption == $fluidoption) {
				$('#' + item).addClass( option + '_' + $updownselected );
			}
			else {
				$('#' + item).addClass( option );			
			}
		}
	}
	
	
	// Remove currently selected options back to nothing and fix classes
	function lazyreset(fluidadaptvalue) {
		
		if (fluidadaptvalue === $adaptiveoption) {
				$defaultclass = $lazytext + "12";
			}
		else if (fluidadaptvalue === $fluidoption) {
				$defaultclass = $defaultclass + '_up'; // Redefine Fluid Class to include up down
		}
			
		
		for ( var r=0; r < $lazyoptionsposcount; r++) {
			$('#' + $lazyoptionpos[r] + '-select').prop('selectedIndex',0);
			
			// Change Default Class on switch
			$('#' + $lazyoptionpos[r]).removeAttr( 'class' );
			$('#' + $lazyoptionpos[r]).addClass($defaultclass);	
		}
		
		// Remove the Sass code block
		$('#sassout code').remove();
	}


	// Give me the Sass click button
	$( '#sass' ).click(function() {	
		lazysass();
	});
	
	
	// Grab the values and print to screen
	function lazysass() {
		var $lazyscss = '<code><pre>';
	
		for (var s=0; s < $lazyoptionsposcount; s++) {
			var $count = []; // Grabs the value of our select options
			var $position = []; // Grabs the ID for our elements
			var $gridcount = []; // turns our select value into the number we want - spanNUMBERWEWANT
			var $upordown = []; // For either up or down
			var $fluidadapt = $($adaptfluidselect).val();
			$count[s] = $('#' + $lazyoptionpos[s] + '-select').val(); 
			$position[s] = '#' + $lazyoptionpos[s];
			$upordown[s] = $('#' + $lazyoptionpos[s] + '-upordown').val();
			
			
			$gridcount[s] = $count[s].slice(-2);
			$adaptpoint = "";
			
			if ($(window).width() > 960) {
				$adaptpoint = 960;
			}
			else if ($(window).width() > 881) {
				$adaptpoint = 881;
			}
			else if ($(window).width() > 801) {
				$adaptpoint = 801;
			}
			else {
				$adaptpoint = 721;
			}
			
					
			if ($gridcount[s].indexOf('n') == 0) {
				$gridcount[s] = $gridcount[s].slice(-1);
			}
			else {
				$gridcount[s] = $gridcount[s];
			}
			
			
			if ($fluidadapt == $adaptiveoption) {
				$lazyscss += '\n \//' + $position[s] + '\n @include mobile_grid(' + $gridcount[s] + ')\;';
				$lazyscss += '\n @include media_adapt(' + $gridcount[s] + ', ' + $adaptpoint + ')\;';
			}
			else {
				$lazyscss += '\n \//' + $position[s] + '\n @include percent_mobile(' + $gridcount[s] + ', ' + $upordown[s] + ')\;';
				$lazyscss += '\n @include percent_combine(' + $gridcount[s] + ', ' + $upordown[s] + ') { float: left\;} \;';
			}			
		}
		
		$lazyscss += '</pre></code>';
		
		if ($('#sassout code').length == 0) {
				$($lazyscss).appendTo('#sassout');
			}
			else {
				$('#sassout code').remove();
				$($lazyscss).appendTo('#sassout');			
			}
	}

		
});