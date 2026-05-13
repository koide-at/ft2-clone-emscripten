#!/usr/bin/env bash
# Web build requires Emscripten (emcc). This script tries common setups automatically.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="${ROOT}/build-emscripten"

find_emcc() {
  command -v emcc 2>/dev/null && return 0
  # Typical emsdk layout (even when emsdk_env.sh was never sourced in this shell)
  local c
  for c in \
    "${HOME}/emsdk/upstream/emscripten/emcc" \
    "${HOME}/emsdk/emscripten/emcc" \
    "${ROOT}/emsdk/upstream/emscripten/emcc" \
    "/usr/local/emsdk/upstream/emscripten/emcc" \
    "/opt/emsdk/upstream/emscripten/emcc"
  do
    if [ -x "$c" ]; then
      echo "$c"
      return 0
    fi
  done
  return 1
}

EMCC_PATH="$(find_emcc || true)"

if [ -z "${EMCC_PATH}" ]; then
  # Try loading emsdk into this subshell only
  for envsh in \
    "${HOME}/emsdk/emsdk_env.sh" \
    "${ROOT}/emsdk/emsdk_env.sh" \
    "/usr/local/emsdk/emsdk_env.sh" \
    "/opt/emsdk/emsdk_env.sh"
  do
    if [ -f "$envsh" ]; then
      # shellcheck source=/dev/null
      source "$envsh"
      break
    fi
  done
  EMCC_PATH="$(find_emcc || true)"
fi

if [ -z "${EMCC_PATH}" ]; then
  cat >&2 << 'EOF'
emcc not found. Install the Emscripten SDK, then either:

  A) Add emcc to PATH (recommended), e.g. after one-time install:

       cd ~
       git clone https://github.com/emscripten-core/emsdk.git
       cd emsdk
       ./emsdk install latest
       ./emsdk activate latest
       source ./emsdk_env.sh   # add this line to ~/.zshrc if you want it permanent

  B) Re-run this script from a terminal where you already ran:

       source "$HOME/emsdk/emsdk_env.sh"

Then run ./make-web.sh again.

Docs: https://emscripten.org/docs/getting_started/downloads.html
EOF
  exit 1
fi

export PATH="$(dirname "${EMCC_PATH}"):${PATH}"

# Emscripten cache lock files sometimes fail in sandboxed environments.
# Prefer a cache directory inside this workspace.
if [ -z "${EM_CACHE:-}" ]; then
  export EM_CACHE="${ROOT}/.emscripten_cache"
fi
mkdir -p "${EM_CACHE}"

# Emscripten "root" is the directory that contains emcc (e.g. .../upstream/emscripten), NOT .../upstream.
# CMake expects: $EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake
EMSCRIPTEN="$(cd "$(dirname "${EMCC_PATH}")" && pwd)"
TOOLCHAIN="${EMSCRIPTEN}/cmake/Modules/Platform/Emscripten.cmake"

if [ ! -f "${TOOLCHAIN}" ]; then
  echo "Emscripten.cmake not found at:" >&2
  echo "  ${TOOLCHAIN}" >&2
  echo "emcc used: ${EMCC_PATH}" >&2
  echo "Reinstall or repair emsdk (./emsdk install latest && ./emsdk activate latest)." >&2
  exit 1
fi

export EMSCRIPTEN

cmake -S "${ROOT}" -B "${BUILD_DIR}" \
  -DCMAKE_BUILD_TYPE=Release \
  -DFT2_WEB_PTHREADS="${FT2_WEB_PTHREADS:-ON}" \
  -DFT2_WEB_DISKOP_DUMMY="${FT2_WEB_DISKOP_DUMMY:-OFF}" \
  -DCMAKE_TOOLCHAIN_FILE="${TOOLCHAIN}"

cmake --build "${BUILD_DIR}" --parallel

echo "Built: ${ROOT}/release/other/index.html"
echo "Serve with COOP/COEP headers, e.g.:"
echo "  python3 \"${ROOT}/serve_web.py\" --dir \"${ROOT}/release/other\""
