// Import super-image-cropper
import { SuperImageCropper } from 'super-image-cropper';

// Global cropper instance
let cropperInstance = null;
const imgUrlPrefix = 'https://images.collections.yale.edu/iiif/2/ypm:';

// Update debug info display and preview URL
function updateDebugInfo() {
    if (!cropperInstance) return;
    
    const imageData = cropperInstance.getImageData();
    const cropData = cropperInstance.getData();
    
    const debugInfo = `Source Image:
  Width: ${imageData.naturalWidth}px
  Height: ${imageData.naturalHeight}px

Crop Bounding Box:
  Top-Left: (${Math.round(cropData.x)}, ${Math.round(cropData.y)})
  Top-Right: (${Math.round(cropData.x + cropData.width)}, ${Math.round(cropData.y)})
  Bottom-Left: (${Math.round(cropData.x)}, ${Math.round(cropData.y + cropData.height)})
  Bottom-Right: (${Math.round(cropData.x + cropData.width)}, ${Math.round(cropData.y + cropData.height)})
  Width: ${Math.round(cropData.width)}px
  Height: ${Math.round(cropData.height)}px`;
    
    document.getElementById('debug-info').textContent = debugInfo;
    
    // Update preview URL
    const guid = document.getElementById('input-guid').value;
    const x = Math.round(cropData.x);
    const y = Math.round(cropData.y);
    const width = Math.round(cropData.width);
    const height = Math.round(cropData.height);

    // double-size the output dimensions to ensure quality when resized to 456x255
    const targetOutputWidth = 912;
    const targetOutputHeight = 510;
    
    const previewUrl = `${imgUrlPrefix}${guid}/${x},${y},${width},${height}/${targetOutputWidth},${targetOutputHeight}/0/default.jpg`;
    document.getElementById('output-url').value = previewUrl;
}

// Recenter the image in the cropper
function recenterImage() {
    if (!cropperInstance) return;
    cropperInstance.reset();
}

const inputElement = document.getElementById('input-guid');

// Load and draw image from IIIF URL to canvas
function loadImageToCanvas() {
    
    if (!inputElement) {
        console.error('Input element with id "input-guid" not found');
        console.log('Available elements:', document.querySelectorAll('input'));
        return;
    }
    
    const guid = inputElement.value;
    
    if (!guid) {
        console.error('GUID input is empty');
        return;
    }
    
    const imageUrl = `${imgUrlPrefix}${guid}/full/max/0/default.jpg`;
    console.log('Loading image from:', imageUrl);
    
    const imgElement = document.getElementById('canvas');
    
    imgElement.onload = () => {
        imgElement.style.display = 'block';
        console.log('Image loaded');
        
        // Reset loader to original spinner state
        const loader = document.getElementById('loader');
        loader.innerHTML = '<img src="/img/ripples.svg" alt="Loading...">';
        
        // Initialize Cropper with fixed aspect ratio 456:255
        if (cropperInstance) {
            cropperInstance.destroy();
        }
        
        cropperInstance = new window.Cropper(imgElement, {
            aspectRatio: 456 / 255,
            minCropBoxWidth: 456,
            minCropBoxHeight: 255,
            autoCropArea: 0.8,
            responsive: true,
            restore: true,
            guides: true,
            center: true,
            highlight: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
            crop: updateDebugInfo,
            ready: () => {
                // Update debug info on initialization and whenever crop changes
                updateDebugInfo();
                
                // Hide the loader only after cropper is fully initialized
                document.getElementById('loader').classList.add('hidden');
                
                console.log('Cropper initialized with 456:255 aspect ratio');
            }
        });
    };
    
    imgElement.onerror = () => {
        console.error('Failed to load image from:', imageUrl);
        const loader = document.getElementById('loader');
        loader.innerHTML = '<div style="text-align: center; color: #d32f2f; font-family: Mallory MP, sans-serif;"><p>Error loading image</p><p style="font-size: 0.9em;">Please check the GUID and try again.</p></div>';
    };
    
    imgElement.crossOrigin = 'anonymous';
    imgElement.src = imageUrl;
}

// Wait a bit to ensure DOM is fully loaded
setTimeout(() => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadImageToCanvas);
    } else {
        loadImageToCanvas();
    }
    
    // Set up load image button
    const loadBtn = document.getElementById('load-image');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            document.getElementById('loader').classList.remove('hidden');
            loadImageToCanvas();
        });
    }
    
    // Set up recenter button
    const recenterBtn = document.getElementById('recenter-btn');
    if (recenterBtn) {
        recenterBtn.addEventListener('click', recenterImage);
    }
    
    // Set up preview button
    const previewBtn = document.getElementById('preview-image');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            const previewUrl = document.getElementById('output-url').value;
            if (previewUrl) {
                window.open(previewUrl, '_blank');
            }
        });
    }
}, 100);