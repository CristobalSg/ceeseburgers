const IMAGE_SIZE = 800;

export type ProcessedImage = {
  blob: Blob;
  previewUrl: string;
};

export async function processImageToSquareWebp(file: File): Promise<ProcessedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen valido.");
  }

  const bitmap = await createImageBitmap(file);
  const cropSize = Math.min(bitmap.width, bitmap.height);
  const sourceX = Math.floor((bitmap.width - cropSize) / 2);
  const sourceY = Math.floor((bitmap.height - cropSize) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = IMAGE_SIZE;
  canvas.height = IMAGE_SIZE;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("No pudimos preparar la imagen en este navegador.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    bitmap,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    0,
    0,
    IMAGE_SIZE,
    IMAGE_SIZE
  );
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.9);
  });

  if (!blob) {
    throw new Error("No pudimos convertir la imagen a WebP.");
  }

  if (blob.type !== "image/webp") {
    throw new Error(
      "Este navegador no pudo exportar la imagen como WebP. Prueba con Chrome, Edge o una version reciente de Safari."
    );
  }

  return {
    blob,
    previewUrl: URL.createObjectURL(blob),
  };
}
