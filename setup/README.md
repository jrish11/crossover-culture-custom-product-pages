# Matching Your MacBook Coding Setup

This folder has two scripts:

- `export-macbook-setup.sh`: run this on your MacBook.
- `import-macbook-setup.sh`: run this on this computer with the exported folder.

## Step 1: On Your MacBook

From this project folder, run:

```bash
chmod +x setup/export-macbook-setup.sh
./setup/export-macbook-setup.sh
```

That creates a folder on your MacBook Desktop named:

```text
codex-macbook-setup-export
```

Move that folder to this computer using iCloud Drive, AirDrop, or a USB drive.

## Step 2: On This Computer

From this project folder, run:

```bash
chmod +x setup/import-macbook-setup.sh
./setup/import-macbook-setup.sh /path/to/codex-macbook-setup-export
```

The import script installs Homebrew if needed, installs Homebrew packages from
the MacBook export, installs global npm packages, installs VS Code extensions if
the `code` command is available, and copies common config files with backups.

It does not copy SSH private keys or passwords.
