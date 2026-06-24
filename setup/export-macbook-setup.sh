#!/usr/bin/env bash
set -euo pipefail

EXPORT_DIR="${1:-$HOME/Desktop/codex-macbook-setup-export}"
mkdir -p "$EXPORT_DIR"

run_if_available() {
  local command_name="$1"
  shift

  if command -v "$command_name" >/dev/null 2>&1; then
    "$@"
  fi
}

{
  echo "Generated: $(date)"
  echo "Machine: $(scutil --get ComputerName 2>/dev/null || hostname)"
  echo "macOS: $(sw_vers -productVersion 2>/dev/null || true)"
  echo "Shell: $SHELL"
  echo
  echo "Tool versions:"
  for tool in brew node npm python3 pip3 git code shopify; do
    if command -v "$tool" >/dev/null 2>&1; then
      printf '%s: ' "$tool"
      "$tool" --version 2>&1 | head -n 1
    else
      echo "$tool: not installed"
    fi
  done
} > "$EXPORT_DIR/versions.txt"

if command -v brew >/dev/null 2>&1; then
  brew bundle dump --force --file="$EXPORT_DIR/Brewfile"
fi

if command -v code >/dev/null 2>&1; then
  code --list-extensions > "$EXPORT_DIR/vscode-extensions.txt"
fi

if command -v npm >/dev/null 2>&1; then
  npm list -g --depth=0 --parseable 2>/dev/null \
    | sed '1d;s#^.*/node_modules/##' \
    | sort > "$EXPORT_DIR/npm-global-packages.txt"
fi

if command -v pip3 >/dev/null 2>&1; then
  pip3 freeze > "$EXPORT_DIR/python-packages.txt" || true
fi

for file in .zshrc .gitconfig .npmrc; do
  if [ -f "$HOME/$file" ]; then
    cp "$HOME/$file" "$EXPORT_DIR/$file"
  fi
done

cat > "$EXPORT_DIR/README.txt" <<EOF
Move this whole folder to the new computer, then run:

  ./setup/import-macbook-setup.sh "$EXPORT_DIR"

If this folder is not at the same path on the new computer, pass the path where
you placed it.
EOF

echo "Export complete: $EXPORT_DIR"
