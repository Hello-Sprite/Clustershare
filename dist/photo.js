/* Resize local photos before browser storage; never upload them or accept executable SVG. */
const ClusterPhoto = {
  async prepare(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 12000000)
      throw new Error('Choose a JPEG, PNG or WebP photo smaller than 12 MB.');
    const url = URL.createObjectURL(file);
    try {
      const image = new Image(); image.src = url;
      await image.decode();
      if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 60000000)
        throw new Error('This image is too large to process. Choose a smaller photo.');
      const scale = Math.min(1, 1000 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      for (const quality of [.82, .65, .45]) {
        const photo = canvas.toDataURL('image/jpeg', quality);
        if (photo.length <= 500000) return photo;
      }
      throw new Error('This photo needs too much browser storage. Choose a smaller image.');
    } catch (error) {
      throw new Error(error.message.includes('photo') || error.message.includes('image') ? error.message : 'This photo could not be read. Try another JPEG, PNG or WebP.');
    } finally { URL.revokeObjectURL(url); }
  }
};
