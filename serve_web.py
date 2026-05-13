#!/usr/bin/env python3
"""Minimal HTTP server with Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy
headers for SharedArrayBuffer (Emscripten pthread builds)."""
from __future__ import annotations

import argparse
import http.server
import os


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--dir", default=".", help="directory to serve")
    p.add_argument("--port", type=int, default=8765)
    args = p.parse_args()
    os.chdir(os.path.abspath(args.dir))
    server = http.server.HTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Serving {os.getcwd()} at http://127.0.0.1:{args.port}/")
    print("Open http://127.0.0.1:{}/index.html (or the site root / — same page).".format(args.port))
    server.serve_forever()


if __name__ == "__main__":
    main()
