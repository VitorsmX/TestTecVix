import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.SECRET_KEY || "C4E8125D")
  .digest();
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(hash?: string | null): string {
  if (!hash) return "";

  const parts = hash.split(":");
  if (parts.length !== 2) return hash;

  const [ivHex, encrypted] = parts;
  if (Buffer.from(ivHex, "hex").length !== 16) return hash;

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY),
    iv,
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
