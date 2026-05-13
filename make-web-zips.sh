#!/usr/bin/env bash
set -euo pipefail

# Create distribution archives from project root.
# - Standard: full project folder, but always exclude .emscripten_cache
# - Minimal: additionally exclude heavy/generated folders

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORK_DIR="$(mktemp -d)"
PROJECT_NAME="ft2-clone"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

echo "Creating standard archive..."
rsync -a \
  --exclude '.emscripten_cache/' \
  --exclude '.DS_Store' \
  "$ROOT_DIR/" "$WORK_DIR/$PROJECT_NAME/"

ditto -c -k --sequesterRsrc --keepParent \
  "$WORK_DIR/$PROJECT_NAME" \
  "$ROOT_DIR/../$PROJECT_NAME-web-package.zip"

echo "Creating minimal archive..."
rm -rf "$WORK_DIR/$PROJECT_NAME"
rsync -a \
  --exclude '.emscripten_cache/' \
  --exclude 'build-emscripten/' \
  --exclude 'release/' \
  --exclude 'vs2019_project/' \
  --exclude '.DS_Store' \
  "$ROOT_DIR/" "$WORK_DIR/$PROJECT_NAME/"

ditto -c -k --sequesterRsrc --keepParent \
  "$WORK_DIR/$PROJECT_NAME" \
  "$ROOT_DIR/../$PROJECT_NAME-web-package-minimal.zip"

echo "Done:"
ls -lh "$ROOT_DIR/../$PROJECT_NAME-web-package.zip" "$ROOT_DIR/../$PROJECT_NAME-web-package-minimal.zip"
