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
									type: "integer",
									component: "slider",
									min: 2,
									max: 10,
									step: 1,
									defaultValue: 2
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
										return layout.positionCount >= 3;
									},
									defaultValue: ""
								},
								position4Value: {
									ref: "position4Value",
									label: "Position 4 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 4;
									},
									defaultValue: ""
								},
								position5Value: {
									ref: "position5Value",
									label: "Position 5 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 5;
									},
									defaultValue: ""
								},
								position6Value: {
									ref: "position6Value",
									label: "Position 6 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 6;
									},
									defaultValue: ""
								},
								position7Value: {
									ref: "position7Value",
									label: "Position 7 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 7;
									},
									defaultValue: ""
								},
								position8Value: {
									ref: "position8Value",
									label: "Position 8 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 8;
									},
									defaultValue: ""
								},
								position9Value: {
									ref: "position9Value",
									label: "Position 9 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 9;
									},
									defaultValue: ""
								},
								position10Value: {
									ref: "position10Value",
									label: "Position 10 Value",
									type: "string",
									expression: "optional",
									show: function(layout) {
										return layout.positionCount >= 10;
									},
									defaultValue: ""
								},
								defaultPosition: {
									ref: "defaultPosition",
									label: "Default Position",
									type: "integer",
									component: "slider",
									min: 1,
									max: function(layout) {
										return layout.positionCount || 2;
									},
									step: 1,
									defaultValue: 1
								}
							}
						}
					}
				}
			}
		},

		initialProperties: {
			variableName: "",
			positionCount: 2,
			position1Value: "",
			position2Value: "",
			position3Value: "",
			position4Value: "",
			position5Value: "",
			position6Value: "",
			position7Value: "",
			position8Value: "",
			position9Value: "",
			position10Value: "",
			defaultPosition: 1
		},

		paint: function($element, layout) {
			var app = qlik.currApp(this);
			var self = this;
			
			// Get settings
			var variableName = layout.variableName;
			var positionCount = parseInt(layout.positionCount) || 2;
			var defaultPosition = parseInt(layout.defaultPosition) || 1;
			
			// Get position values dynamically
			var positionValues = [];
			for (var i = 1; i <= positionCount; i++) {
				positionValues.push(layout['position' + i + 'Value'] || '');
			}
			
			// Store current position in element data
			if (!$element.data('currentPosition')) {
				$element.data('currentPosition', defaultPosition);
				
				// Set initial variable value
				if (variableName && positionValues[defaultPosition - 1]) {
					app.variable.setStringValue(variableName, positionValues[defaultPosition - 1]);
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
					var newValue = positionValues[newPosition - 1];
					
					if (variableName && newValue) {
						app.variable.setStringValue(variableName, newValue);
					}
					
					$element.data('currentPosition', newPosition);
					self.paint($element, layout);
				});
				
			} else {
				// Multi-position segmented control
				var $switch = $('<div class="qlik-switch-segmented"></div>');
				
				// Create segments dynamically
				for (var i = 1; i <= positionCount; i++) {
					var $segment = $('<div class="qlik-switch-segment" data-position="' + i + '"></div>');
					
					if (currentPosition === i) {
						$segment.addClass('active');
					}
					
					$switch.append($segment);
				}
				
				$container.append($switch);
				
				// Click handlers for segments
				$('.qlik-switch-segment', $switch).on('click', function() {
					var newPosition = parseInt($(this).data('position'));
					var newValue = positionValues[newPosition - 1];
					
					if (variableName && newValue) {
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
