export const drawRect = (detections, ctx) => {
    // Set a single color
    const color = '#FF0000'; // Replace with your desired color code

    // Loop through each prediction
    detections.forEach(prediction => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        // Set styling
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
}