# Qlik Sense Variable Switch Extension

A custom Qlik Sense visualization extension that provides an interactive switch control to toggle between 2-10 variable values.

## Overview

The Variable Switch extension allows users to dynamically change a Qlik variable's value by clicking a visual switch control. It supports a two-position toggle slider for 2 positions, and a segmented control for 3 or more positions (up to 10), making it ideal for scenarios like switching between years, quarters, regions, or any other categorical values.

## Features

- **Two Position Mode**: Classic toggle slider (left/right)
- **Multi-Position Mode**: Segmented control for 3-10 positions
- **Flexible Configuration**: Choose any number of positions from 2 to 10
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

1. **Package the extension files** (exclude .git folder):
   - **Option A - Manual**: Create a zip file containing only these files:
     - `qlik-switch.qext`
     - `qlik-switch.js`
     - `style.css`
   - **Option B - Command line** (from project directory):
     ```bash
     zip -r qlik-switch.zip qlik-switch.qext qlik-switch.js style.css
     ```
2. Open Qlik Management Console (QMC)
3. Navigate to **Extensions** in the left menu
4. Click **Import** and select the zip file
5. The extension will be available in your Qlik Sense hub

**Important**: Do not zip the entire folder - only include the extension files listed above. The `.git` folder and other repository files should not be included in the package.

## Configuration

### Property Panel Settings

Once added to a sheet, configure the extension using the property panel:

#### Variable Settings

1. **Variable Name** (Required)
   - The name of the Qlik variable to control
   - Example: `vYear`, `vQuarter`, `vRegion`
   - Note: Variable should exist in your app (create it in Variable Overview first)

2. **Number of Positions** (Required)
   - Use the slider to select between 2 and 10 positions
   - Default: 2
   - The property panel will dynamically show value input fields based on this number

3. **Position Values** (Required)
   - Position 1 Value, Position 2 Value, etc.
   - Only the number of position fields matching your selection will be visible
   - Each field supports expressions
   - Example: `2023`, `'North'`, `=Year(Today())`

4. **Default Position** (Required)
   - Use the slider to select which position should be active on load
   - Range adjusts dynamically from 1 to your selected number of positions
   - Default: 1

## Usage Examples

### Example 1: Year Selector (2 Positions)

**Configuration:**
- Variable Name: `vYear`
- Number of Positions: `2`
- Position 1 Value: `2023`
- Position 2 Value: `2024`
- Default Position: `1`

**Result:** Toggle between 2023 and 2024, starting with 2023

### Example 2: Time Period Selector (3 Positions)

**Configuration:**
- Variable Name: `vPeriod`
- Number of Positions: `3`
- Position 1 Value: `Last Year`
- Position 2 Value: `This Year`
- Position 3 Value: `Next Year`
- Default Position: `2`

**Result:** Three-way switch for time periods, starting with "This Year"

### Example 3: Quarter Selector (4 Positions)

**Configuration:**
- Variable Name: `vQuarter`
- Number of Positions: `4`
- Position 1 Value: `Q1`
- Position 2 Value: `Q2`
- Position 3 Value: `Q3`
- Position 4 Value: `Q4`
- Default Position: `1`

**Result:** Four-way segmented control for quarters, starting with Q1

### Example 4: Weekday Selector (7 Positions)

**Configuration:**
- Variable Name: `vWeekday`
- Number of Positions: `7`
- Position 1-7 Values: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`
- Default Position: `1`

**Result:** Seven-way segmented control for days of the week

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
- Make sure "Number of Positions" is set to 3 or higher
- Position value fields appear dynamically based on the count

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
- Multi-position segmented control (3-10 positions)
- Dynamic position count selection (2-10)
- Configurable variable and values
- Default position selection
- Expression support for values

## License

This extension is provided as-is without warranty.

## Author

[Luke T
](https://www.linkedin.com/in/tolchard/)

## Support

For issues, questions, or feature requests, please refer to the repository's issue tracker.
