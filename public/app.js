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
    
    // Update preview URL using the extracted GUID
    const guid = window.currentGuid;
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

// Extract GUID from either full URL or just the GUID
// Returns { guid, error } object
function extractGuid(input) {
    if (!input) return { guid: null, error: 'Please enter a GUID or IIIF URL' };
    
    // Check if it's a full URL (contains https://)
    if (input.includes('https://')) {
        // Extract GUID from URL: look for "ypm:" followed by the GUID (UUID format)
        const match = input.match(/ypm:([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
        if (match) {
            const guid = match[1];
            console.log('Extracted GUID from URL:', guid);
            return { guid, error: null };
        } else {
            const errorMsg = 'Could not extract GUID from URL. Expected format with ypm: prefix';
            console.error(errorMsg);
            return { guid: null, error: errorMsg };
        }
    }
    
    // Otherwise treat it as a direct GUID
    const guid = input.trim();
    console.log('Using direct GUID:', guid);
    return { guid, error: null };
}

const inputElement = document.getElementById('input-guid');

// Load and draw image from IIIF URL to canvas
function loadImageToCanvas() {
    
    if (!inputElement) {
        console.error('Input element with id "input-guid" not found');
        console.log('Available elements:', document.querySelectorAll('input'));
        return;
    }
    
    const inputValue = inputElement.value;
    const { guid, error } = extractGuid(inputValue);
    
    if (!guid) {
        const loader = document.getElementById('loader');
        loader.innerHTML = `<div style="text-align: center; color: #d32f2f; font-family: Mallory MP, sans-serif;"><p>${error}</p></div>`;
        return;
    }
    
    // Store the GUID for later use in preview URL generation
    window.currentGuid = guid;
    
    const imageUrl = `${imgUrlPrefix}${guid}/full/max/0/default.jpg`;
    console.log('Loading image from:', imageUrl);
    console.log('Extracted GUID:', guid);
    
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
        loader.innerHTML = '<div style="text-align: center; color: #d32f2f; font-family: Mallory MP, sans-serif;"><p>Error loading image</p><p style="font-size: 0.9em;">Please verify the image exists in Yale Collections and try again.</p></div>';
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