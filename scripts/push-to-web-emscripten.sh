#!/usr/bin/env bash
# Sync this directory (ft2-clone repo root) to koide-at/ft2-clone-emscripten branch web-emscripten and push.
# Requires: git, rsync, GitHub auth for HTTPS or SSH (git push).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKDIR="${FT2_EMSCRIPTEN_PUSH_DIR:-${TMPDIR:-/tmp}/ft2-clone-emscripten-push}"
ORIGIN_URL="${FT2_FORK_URL:-https://github.com/koide-at/ft2-clone-emscripten.git}"

echo "Source: $ROOT"
echo "Workdir: $WORKDIR"

rm -rf "$WORKDIR"
git clone "$ORIGIN_URL" "$WORKDIR"
cd "$WORKDIR"

if git show-ref --verify --quiet refs/remotes/origin/web-emscripten; then
  git checkout web-emscripten
  git pull --ff-only origin web-emscripten || true
else
  git checkout -b web-emscripten
fi

rsync -a --delete --filter='protect .git/' \
  --exclude '.emscripten_cache/' \
  --exclude 'build-emscripten/' \
  --exclude 'build-emscripten*/' \
  --exclude 'release/other/index.html' \
  --exclude 'release/other/index.js' \
  --exclude 'release/other/index.wasm' \
  --exclude 'release/other/ft2-clone.html' \
  --exclude 'release/other/ft2-clone.js' \
  --exclude 'release/other/ft2-clone.wasm' \
  --exclude 'release/other/ft2-web-toolbar-icon.png' \
  --exclude 'WEB_GITHUB_WORKFLOW.md' \
  --exclude '.DS_Store' \
  "$ROOT/" "$WORKDIR/"

test -d .git

git add -A
if git diff --cached --quiet; then
  echo "Nothing to commit."
else
  git commit -m "Web port (Emscripten): sync from local tree"
fi

git push -u origin web-emscripten
echo "Done: pushed web-emscripten"
