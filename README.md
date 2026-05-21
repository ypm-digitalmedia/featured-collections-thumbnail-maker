# YPM Featured Collections Thumbnail Maker

A web application for cropping Yale IIIF collection images into fixed 456×255 pixel thumbnails with a 912×510 preview output.

## Features

- **Flexible Input**: Accept either a GUID or a full IIIF URL from Yale Collections
- **Fixed Aspect Ratio**: Enforces 456:255 aspect ratio for consistent thumbnail dimensions
- **Real-time Preview**: Live crop box preview with adjustable cropping region
- **IIIF URL Generation**: Automatically generates IIIF-formatted preview URLs at 912×510 resolution
- **Responsive Design**: Full-height layout that adapts to any screen size
- **Error Handling**: User-friendly error messages for invalid images
- **Recenter Functionality**: Reset crop box to default position with one click

## Installation

### Prerequisites

- Node.js (v14 or higher) and npm

### Setup

1. **Clone or download this repository** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the application** (bundles ES6 imports):
   ```bash
   npm run build
   ```

## Usage

### Development Mode

Run the development server with watch mode:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Building for Production

Build the bundled JavaScript once:

```bash
npm run build
```

Or use watch mode during development:

```bash
npm run dev
```

### Using the App

1. **Load an Image**:
   - Enter either a GUID (e.g., `896df44c-3130-47bc-8a8c-e8c0b539b0ea`) or a full IIIF URL
   - Click "Load Image"

2. **Adjust the Crop Box**:
   - Drag to reposition the crop region
   - Resize from the edges/corners
   - The aspect ratio is locked at 456:255

3. **Preview the Result**:
   - Click "Preview" to open the generated IIIF URL in a new tab
   - The preview shows the cropped region at 912×510 resolution

4. **Reset Position**:
   - Click "Recenter Image" to reset the crop box to its default position

## Deployment

This application can be deployed as a **static website** - only the `/public` folder is needed.

### Static Hosting Options

- **GitHub Pages**: Upload contents of `/public` folder
- **Netlify**: Drag and drop `/public` folder
- **Vercel**: Import repository and set `public` as build output
- **AWS S3 + CloudFront**: Upload `/public` contents to S3 bucket
- **Any web server**: Serve contents of `/public` folder as static files

### Pre-deployment Checklist

- Run `npm run build` to create optimized bundle
- Ensure `/public` folder contains:
  - `index.html`
  - `styles.css`
  - `bundle.js` (after running build)
  - `img/` folder with icons and SVG files
  - `fonts/` folder with Mallory MP font files

## Technical Details

### Stack

- **Server**: Express.js 5.2.1 (Node.js)
- **Bundler**: esbuild 0.28.0
- **UI Framework**: Bootstrap 5.3.0 (CSS only)
- **Image Cropping**: Cropper.js 1.5.13
- **Fonts**: Mallory MP font family (OTF format)

### Key Configuration

- **IIIF Server**: Yale Collections at `https://images.collections.yale.edu/iiif/2/`
- **Fixed Crop Aspect Ratio**: 456:255
- **Minimum Crop Box Size**: 456×255 pixels
- **Preview Output Resolution**: 912×510 pixels
- **Image Source Pattern**: `ypm:{GUID}`

### Project Structure

```
featured-collections-thumbnail-maker/
├── package.json              # Dependencies and scripts
├── server.js                 # Express server configuration
├── README.md                 # This file
├── public/
│   ├── index.html            # Main application page
│   ├── app.js                # Application logic
│   ├── styles.css            # Styling and layout
│   ├── bundle.js             # Bundled JavaScript (generated)
│   ├── fonts/                # Mallory MP font files
│   │   ├── MalloryMP-Light.otf
│   │   ├── MalloryMP-Book.otf
│   │   ├── MalloryMP-Medium.otf
│   │   ├── MalloryMP-Bold.otf
│   │   └── MalloryMP-Black.otf
│   └── img/                  # Icons and images
│       ├── favicon.ico
│       ├── touch-icon-228.png
│       └── ripples.svg
└── node_modules/             # Dependencies (generated)
```

## Troubleshooting

### Image won't load
- Verify the GUID or URL is correct
- Check that Yale IIIF server is accessible
- Ensure the image exists in the Yale Collections

### Crop box appears frozen
- Click "Recenter Image" to reset
- Try loading a different image

### App won't start
- Ensure Node.js and npm are installed: `node --version` and `npm --version`
- Run `npm install` to install dependencies
- Check that port 3000 is not in use

## License

Yale University - Digital Collections
