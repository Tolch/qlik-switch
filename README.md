# Qlik Sense Variable Switch Extension

A custom Qlik Sense visualization extension that provides an interactive switch control to toggle between 2 or 3 variable values.

## Overview

The Variable Switch extension allows users to dynamically change a Qlik variable's value by clicking a visual switch control. It supports both a two-position toggle slider and a three-position segmented control, making it ideal for scenarios like switching between years, quarters, or any other categorical values.

## Features

- **Two Position Mode**: Classic toggle slider (left/right)
- **Three Position Mode**: Segmented control (left/middle/right)
- **Configurable Values**: Set custom values for each position
- **Default Position**: Choose which position is active on load
- **Expression Support**: Use expressions in value fields
- **Automatic Variable Update**: Variable is set immediately on load and when clicked

## Installation

### Manual Installation

1. **Download the Extension**: Download or clone this repository
2. **Locate Your Extensions Folder**:
   - **Qlik Sense Desktop**: `C:\Users\[username]\Documents\Qlik\Sense\Extensions` (Windows) or `~/Documents/Qlik/Sense/Extensions` (Mac)
   - **Qlik Sense Server**: Import via QMC (Qlik Management Console)
3. **Copy Files**: Copy the entire `qlik-switch` folder to your extensions directory
4. **Restart**: Restart Qlik Sense Desktop or refresh your browser for Qlik Sense Server

### Server Installation (QMC)

1. Zip the `qlik-switch` folder
2. Open Qlik Management Console (QMC)
3. Navigate to **Extensions** in the left menu
4. Click **Import** and select the zip file
5. The extension will be available in your Qlik Sense hub

## Configuration

### Property Panel Settings

Once added to a sheet, configure the extension using the property panel:

#### Variable Settings

1. **Variable Name** (Required)
   - The name of the Qlik variable to control
   - Example: `vYear`, `vQuarter`, `vRegion`
   - Note: Variable should exist in your app (create it in Variable Overview first)

2. **Number of Positions**
   - Choose between 2 or 3 positions
   - Default: 2 Positions

3. **Position 1 Value** (Required)
   - The value to assign when Position 1 is selected
   - Supports expressions
   - Example: `2023`, `'North'`, `=Year(Today())`

4. **Position 2 Value** (Required)
   - The value to assign when Position 2 is selected
   - Example: `2024`, `'South'`, `=Year(Today())-1`

5. **Position 3 Value** (Conditional)
   - Only visible when "3 Positions" is selected
   - The value to assign when Position 3 is selected
   - Example: `2025`, `'East'`

6. **Default Position**
   - Which position should be active when the sheet loads
   - Default: Position 1
   - Options adjust based on Number of Positions selected

## Usage Examples

### Example 1: Year Selector (2 Positions)

**Configuration:**
- Variable Name: `vYear`
- Number of Positions: `2 Positions`
- Position 1 Value: `2023`
- Position 2 Value: `2024`
- Default Position: `Position 1`

**Result:** Toggle between 2023 and 2024, starting with 2023

### Example 2: Time Period Selector (3 Positions)

**Configuration:**
- Variable Name: `vPeriod`
- Number of Positions: `3 Positions`
- Position 1 Value: `Last Year`
- Position 2 Value: `This Year`
- Position 3 Value: `Next Year`
- Default Position: `Position 2`

**Result:** Three-way switch for time periods, starting with "This Year"

### Example 3: Region Filter (3 Positions with Expressions)

**Configuration:**
- Variable Name: `vRegion`
- Number of Positions: `3 Positions`
- Position 1 Value: `North`
- Position 2 Value: `South`
- Position 3 Value: `East`
- Default Position: `Position 1`

**Result:** Select regions, starting with "North"

## Using Variables in Your App

Once the switch sets a variable value, use it in your expressions:

### In Charts
```
Sum({<Year={'$(vYear)'}>} Sales)
```

### In Set Analysis
```
Sum({<Region={'$(vRegion)'}>} Revenue)
```

### In Calculated Dimensions
```
=If(Year = $(vYear), 'Current Year', 'Other Year')
```

## Best Practices

1. **Create Variables First**: Create your variable in Qlik's Variable Overview before using the extension
2. **Test Values**: Verify your position values work correctly in your data model
3. **Use Quotes for Text**: When assigning text values, ensure they match your data format
4. **Meaningful Names**: Use descriptive variable names for clarity
5. **Default Position**: Set the default position to the most commonly used value

## Troubleshooting

### Switch Doesn't Appear
- Check that all three files (`qlik-switch.qext`, `qlik-switch.js`, `style.css`) are in the extensions folder
- Restart Qlik Sense Desktop or refresh your browser
- Clear browser cache

### Variable Not Updating
- Verify the variable exists in Variable Overview
- Check variable name spelling (case-sensitive)
- Ensure position values are valid for your use case

### Position 3 Options Not Showing
- Make sure "Number of Positions" is set to "3 Positions"
- The Position 3 settings appear dynamically

### Extension Shows Error
- Verify Qlik Sense version is 3.0 or higher
- Check browser console for JavaScript errors
- Ensure all files are properly formatted

## Technical Details

### File Structure
```
qlik-switch/
├── qlik-switch.qext    # Extension manifest
├── qlik-switch.js      # Main JavaScript logic
└── style.css           # Styling
```

### Dependencies
- Qlik Sense 3.0 or higher
- jQuery (included with Qlik Sense)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Version History

### Version 1.0.0 (Initial Release)
- Two-position toggle switch
- Three-position segmented control
- Configurable variable and values
- Default position selection
- Expression support for values

## License

This extension is provided as-is without warranty.

## Author

Luke Tolchard

## Support

For issues, questions, or feature requests, please refer to the repository's issue tracker.
