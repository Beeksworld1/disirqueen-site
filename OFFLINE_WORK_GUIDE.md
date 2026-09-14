# The Bones of the Disir Queen — Offline Working Site

This branch contains the complete working website. The public `main` branch remains on the temporary Coming Soon page.

## Start the preview on Windows

1. Extract the complete downloaded folder.
2. Double-click `START_DISIR_QUEEN_OFFLINE.bat`.
3. Keep the black command window open.
4. The site should open at `http://localhost:8000`.
5. Press `Ctrl+C` in the command window when finished.

If Windows Firewall asks for permission, allow Python on **Private networks** so the site can be viewed on devices using the same Wi-Fi.

## View it on the TCL TV

1. Make sure the Windows computer and TCL TV are connected to the same Wi-Fi.
2. On the computer, open Command Prompt and run `ipconfig`.
3. Find the computer's **IPv4 Address**, such as `192.168.1.25`.
4. In BrowseHere on the TV, enter `http://192.168.1.25:8000`, replacing the example address with the computer's actual IPv4 address.

## Working rule

Make website revisions on the `offline-work` branch. Do not merge them into `main` until the full site is approved to replace the Coming Soon page.
