import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function getClient(): S3Client {
  return new S3Client({
    endpoint: getEnv("ARVAN_S3_ENDPOINT"),
    region: getEnv("ARVAN_S3_REGION"),
    credentials: {
      accessKeyId: getEnv("ARVAN_S3_ACCESS_KEY"),
      secretAccessKey: getEnv("ARVAN_S3_SECRET_KEY"),
    },
    // Arvan (and most S3-compatible providers) require path-style URLs
    // instead of AWS's virtual-hosted-style bucket subdomains.
    forcePathStyle: true,
  });
}

function getExtension(filename: string): string {
  const match = /\.([a-zA-Z0-9]+)$/.exec(filename);
  return match ? match[1].toLowerCase() : "";
}

function generateObjectKey(originalName: string, folder: string): string {
  const extension = getExtension(originalName);
  const uniqueName = `${Date.now()}-${crypto.randomUUID()}`;
  const safeFolder = folder.replace(/^\/+|\/+$/g, "");
  return `${safeFolder}/${uniqueName}${extension ? `.${extension}` : ""}`;
}

/**
 * Uploads a single file to ArvanCloud Object Storage and returns its
 * public URL. `folder` groups objects under a prefix, e.g. "portfolio"
 * or "content".
 */
export async function uploadImageToArvan(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const objectKey = generateObjectKey(file.name, folder);
  const bucket = getEnv("ARVAN_S3_BUCKET");
  const publicBaseUrl = getEnv("ARVAN_S3_PUBLIC_BASE_URL").replace(/\/+$/, "");

  const client = getClient();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
      ACL: "public-read",
    })
  );

  return `${publicBaseUrl}/${objectKey}`;
}
