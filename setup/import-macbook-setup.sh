#!/usr/bin/env bash
set -euo pipefail

EXPORT_DIR="${1:-}"

if [ -z "$EXPORT_DIR" ] || [ ! -d "$EXPORT_DIR" ]; then
  echo "Usage: $0 /path/to/codex-macbook-setup-export"
  exit 1
fi

install_homebrew_if_needed() {
  if command -v brew >/dev/null 2>&1; then
    return
  fi

  echo "Homebrew is not installed. Installing Homebrew..."
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -x /usr/local/bin/brew ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
}

backup_and_copy() {
  local source_file="$1"
  local target_file="$2"

  if [ ! -f "$source_file" ]; then
    return
  fi

  if [ -f "$target_file" ]; then
    cp "$target_file" "$target_file.codex-backup-$(date +%Y%m%d%H%M%S)"
  fi

  cp "$source_file" "$target_file"
}

install_homebrew_if_needed

if [ -f "$EXPORT_DIR/Brewfile" ]; then
  brew bundle --file="$EXPORT_DIR/Brewfile"
fi

if [ -f "$EXPORT_DIR/npm-global-packages.txt" ] && command -v npm >/dev/null 2>&1; then
  while IFS= read -r package_name; do
    [ -z "$package_name" ] && continue
    npm install -g "$package_name"
  done < "$EXPORT_DIR/npm-global-packages.txt"
fi

if [ -f "$EXPORT_DIR/vscode-extensions.txt" ]; then
  if command -v code >/dev/null 2>&1; then
    while IFS= read -r extension; do
      [ -z "$extension" ] && continue
      code --install-extension "$extension"
    done < "$EXPORT_DIR/vscode-extensions.txt"
  else
    echo "VS Code 'code' command was not found. Open VS Code, run 'Shell Command: Install code command in PATH', then rerun this script."
  fi
fi

backup_and_copy "$EXPORT_DIR/.gitconfig" "$HOME/.gitconfig"
backup_and_copy "$EXPORT_DIR/.npmrc" "$HOME/.npmrc"
backup_and_copy "$EXPORT_DIR/.zshrc" "$HOME/.zshrc"

echo "Import complete. Open a new Terminal window before testing commands."
