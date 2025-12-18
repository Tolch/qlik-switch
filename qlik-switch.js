define(["qlik", "jquery", "css!./style.css"], function(qlik, $) {
	'use strict';

	return {
		definition: {
			type: "items",
			component: "accordion",
			items: {
				settings: {
					uses: "settings",
					items: {
						variableSettings: {
							type: "items",
							label: "Variable Settings",
							items: {
								variableName: {
									ref: "variableName",
									label: "Variable Name",
									type: "string",
									expression: "optional",
									defaultValue: ""
								},
								positionCount: {
									ref: "positionCount",
									label: "Number of Positions",
									type: "string",
									component: "dropdown",
									options: [{
										value: "2",
										label: "2 Positions"
									}, {
										value: "3",
										label: "3 Positions"
									}],
									defaultValue: "2"
								},
								position1Value: {
									ref: "position1Value",
									label: "Position 1 Value",
									type: "string",
									expression: "optional",
									defaultValue: ""
								},
								position2Value: {
									ref: "position2Value",
									label: "Position 2 Value",
									type: "string",
									expression: "optional",
									defaultValue: ""
								},
								position3Value: {
									ref: "position3Value",
									label: "Position 3 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount === "3";
									},
									defaultValue: ""
								},
								defaultPosition: {
									ref: "defaultPosition",
									label: "Default Position",
									type: "string",
									component: "dropdown",
									options: function(layout) {
										var options = [{
											value: "1",
											label: "Position 1"
										}, {
											value: "2",
											label: "Position 2"
										}];
										
										if (layout.positionCount === "3") {
											options.push({
												value: "3",
												label: "Position 3"
											});
										}
										
										return options;
									},
									defaultValue: "1"
								}
							}
						}
					}
				}
			}
		},

		initialProperties: {
			variableName: "",
			positionCount: "2",
			position1Value: "",
			position2Value: "",
			position3Value: "",
			defaultPosition: "1"
		},

		paint: function($element, layout) {
			var app = qlik.currApp(this);
			var self = this;
			
			// Get settings
			var variableName = layout.variableName;
			var positionCount = parseInt(layout.positionCount);
			var position1Value = layout.position1Value;
			var position2Value = layout.position2Value;
			var position3Value = layout.position3Value;
			var defaultPosition = parseInt(layout.defaultPosition);
			
			// Store current position in element data
			if (!$element.data('currentPosition')) {
				$element.data('currentPosition', defaultPosition);
				
				// Set initial variable value
				if (variableName) {
					var initialValue = defaultPosition === 1 ? position1Value : 
									  defaultPosition === 2 ? position2Value : 
									  position3Value;
					app.variable.setStringValue(variableName, initialValue);
				}
			}
			
			var currentPosition = $element.data('currentPosition');
			
			// Clear existing content
			$element.empty();
			
			// Create switch container
			var $container = $('<div class="qlik-switch-container"></div>');
			
			if (positionCount === 2) {
				// Two position toggle switch
				var $switch = $('<div class="qlik-switch-toggle"></div>');
				var $slider = $('<div class="qlik-switch-slider"></div>');
				
				if (currentPosition === 2) {
					$slider.addClass('active-right');
				}
				
				$switch.append($slider);
				$container.append($switch);
				
				// Click handler for two-position switch
				$switch.on('click', function() {
					var newPosition = currentPosition === 1 ? 2 : 1;
					var newValue = newPosition === 1 ? position1Value : position2Value;
					
					if (variableName) {
						app.variable.setStringValue(variableName, newValue);
					}
					
					$element.data('currentPosition', newPosition);
					self.paint($element, layout);
				});
				
			} else {
				// Three position segmented control
				var $switch = $('<div class="qlik-switch-segmented"></div>');
				
				var $btn1 = $('<div class="qlik-switch-segment" data-position="1"></div>');
				var $btn2 = $('<div class="qlik-switch-segment" data-position="2"></div>');
				var $btn3 = $('<div class="qlik-switch-segment" data-position="3"></div>');
				
				if (currentPosition === 1) $btn1.addClass('active');
				if (currentPosition === 2) $btn2.addClass('active');
				if (currentPosition === 3) $btn3.addClass('active');
				
				$switch.append($btn1).append($btn2).append($btn3);
				$container.append($switch);
				
				// Click handlers for three-position switch
				$('.qlik-switch-segment', $switch).on('click', function() {
					var newPosition = parseInt($(this).data('position'));
					var newValue = newPosition === 1 ? position1Value : 
								  newPosition === 2 ? position2Value : 
								  position3Value;
					
					if (variableName) {
						app.variable.setStringValue(variableName, newValue);
					}
					
					$element.data('currentPosition', newPosition);
					self.paint($element, layout);
				});
			}
			
			$element.append($container);
			
			return qlik.Promise.resolve();
		}
	};
});
