// GatherTix - Self-hosted ticketing platform for non-profits and community groups.
// Copyright (C) 2024 GatherTix Contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

/**
 * Object storage provider interface.
 *
 * Every storage backend (MinIO, S3, local filesystem) must implement this
 * contract. The active provider is selected at startup via the
 * `STORAGE_PROVIDER` environment variable.
 */

// ── Supporting Types ────────────────────────────────────────────────────────

/** Metadata returned after a successful upload. */
export interface UploadResult {
  /** Public or internal URL of the uploaded object. */
  url: string;
  /** Storage key (path) of the object. */
  key: string;
  /** Size in bytes. */
  sizeBytes: number;
}

// ── Interface ───────────────────────────────────────────────────────────────

export interface StorageProvider {
  /** Human-readable provider name (e.g. "minio", "s3", "local"). */
  readonly name: string;

  /**
   * Upload a file to the storage backend.
   *
   * @param key         Object key / path (e.g. "tickets/abc123.pdf").
   * @param data        Raw file content.
   * @param contentType MIME type (e.g. "application/pdf").
   * @returns           Public or internal URL of the uploaded object.
   */
  upload(key: string, data: Buffer, contentType: string): Promise<string>;

  /**
   * Generate a time-limited signed URL for private object access.
   *
   * @param key              Object key / path.
   * @param expiresInSeconds How long the URL remains valid.
   */
  getSignedUrl(key: string, expiresInSeconds: number): Promise<string>;

  /**
   * Delete an object from the storage backend.
   *
   * Implementations should treat "not found" as a no-op (idempotent delete).
   */
  delete(key: string): Promise<void>;
}
