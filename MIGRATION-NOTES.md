# Migration from Chakra UI to Tailwind CSS

This document outlines the steps taken to migrate the QR Coupon Generator application from Chakra UI to Tailwind CSS.

## Why Migrate?

We migrated from Chakra UI to Tailwind CSS for the following reasons:
- Compatibility issues with Chakra UI v3
- More direct and flexible styling approach with Tailwind CSS
- Better performance with reduced bundle size
- More consistent class-based styling system
- Easier customization with Tailwind's utility-first approach

## Completed Changes

### Configuration Files
1. Added Tailwind CSS configuration:
   - Created `tailwind.config.js` with custom color themes
   - Created `postcss.config.js`
   - Updated `index.css` with Tailwind directives

### Components Converted
1. **Pages**:
   - `Home.js` - Dashboard that displays all coupons
   - `CouponCreator.js` - Form to create new coupons
   - `CouponDetails.js` - Detailed view of a single coupon
   - `CouponRedeem.js` - Customer-facing coupon redemption page
   - `NotFound.js` - 404 page

2. **Components**:
   - `CouponEditor/BasicInformation.js` - Form fields for coupon basic information
   - `CouponEditor/DesignCustomization.js` - Color pickers and design options 
   - `CouponEditor/TermsAndConditions.js` - Form fields for terms and dates
   - `CouponEditor/CouponPreview.js` - Live preview of the coupon being created
   - `QRCode/QRGenerator.js` - QR code generation and download component

### Major Pattern Changes

1. **Layout Components**:
   - Replaced `Container` with Tailwind's `container mx-auto max-w-*`
   - Replaced `Box` with `div` styled with Tailwind classes
   - Replaced `Flex` with `flex` and related utility classes

2. **Typography**:
   - Replaced `Heading` with `h1`, `h2`, etc. with appropriate text sizing classes
   - Replaced `Text` with `p` elements with text styling classes

3. **Form Controls**:
   - Replaced `FormControl` with custom form group divs
   - Added appropriate form styling with Tailwind

4. **Buttons & Interactive Elements**:
   - Replaced Chakra UI's `Button` with HTML buttons styled with Tailwind
   - Converted link buttons to proper Tailwind-styled links

5. **Color Handling**:
   - Implemented custom color scheme in Tailwind config
   - Used dynamic styling for custom color overrides

6. **Notifications/Toasts**:
   - Replaced Chakra UI toast system with custom toast component

## Theme Configuration

The Tailwind theme extends the default configuration with:

```javascript
// Primary color (blue)
primary: {
  '50': '#e3f2fd',
  '100': '#bbdefb',
  // ... more shades
  '500': '#2196f3', // Main primary color
  // ... more shades
},

// Secondary color (green)
secondary: {
  '50': '#e8f5e9',
  '100': '#c8e6c9',
  // ... more shades
  '500': '#4caf50', // Main secondary color
  // ... more shades
}
```

## Additional Notes

- Custom components using third-party libraries (like `react-color`'s `SketchPicker`) were maintained
- Form validation logic was preserved
- The application's functionality remains the same, only styling approaches changed
- QR code generation functionality was maintained
