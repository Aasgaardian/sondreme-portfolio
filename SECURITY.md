# Security Best Practices

This document outlines security measures implemented in this project to protect against supply-chain attacks like Shai-Hulud 2.0.

## Protection Measures Implemented

### 1. Install Scripts Disabled (`.npmrc`)

```
ignore-scripts=true
```

**Why?** Prevents malicious `preinstall`, `postinstall`, and other lifecycle scripts from executing automatically during `npm install`.

**When you need scripts:** If a legitimate package requires install scripts (rare), run:
```bash
npm install --ignore-scripts=false [package-name]
```

### 2. Lockfile Enforcement

```
package-lock=true
```

**Why?** Ensures consistent installations across environments and prevents unexpected package updates.

**Best Practice:** Always commit `package-lock.json` to version control.

### 3. Version Pinning Strategy

Currently using **flexible ranges** (`^` prefix) which is standard practice:
- `^1.2.3` allows updates to `1.x.x` (minor and patch)
- Lockfile (`package-lock.json`) ensures exact versions are installed

**Trade-off:**
- ✅ Pros: Automatic security patches and bug fixes
- ⚠️ Cons: Slightly higher risk of supply-chain attacks

**Alternative (more secure):** Pin exact versions by removing `^` and `~` prefixes.

## Current Vulnerabilities

As of last audit, the project has **8 high severity vulnerabilities** in the `glob` package chain:

```
glob 10.2.0 - 10.4.5: Command injection via -c/--cmd
```

**Status:** These are in development dependencies (`@sanity/cli` chain) and don't affect production runtime.

**Risk Level:** Low - only affects build/dev tooling, not deployed application.

## Recommended Actions

### Regular Security Audits

```bash
# Run security audit
npm audit

# Fix non-breaking vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

### Before Installing New Packages

1. **Check package reputation:**
   - Age and download count on npmjs.com
   - GitHub stars and recent activity
   - Number of maintainers
   - Recent security advisories

2. **Review dependencies:**
   ```bash
   npm view [package-name] dependencies
   ```

3. **Check for install scripts:**
   ```bash
   npm view [package-name] scripts
   ```

### Supply Chain Attack Indicators

Watch for these red flags:
- New packages with few downloads
- Packages with suspicious install scripts
- Unexpected dependency additions in lockfile
- Unusual network activity during installation

## Environment Variables Security

### ✅ Properly Protected

These secrets are in `.env.local` (gitignored):
- `SANITY_API_READ_TOKEN` - Server-side only
- `RESEND_API_KEY` - Server-side only
- `TURNSTILE_SECRET_KEY` - Server-side only

### ✅ Safe to Expose (Public)

These are intentionally public:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Required for frontend
- `NEXT_PUBLIC_SANITY_DATASET` - Required for frontend
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Required for frontend

## Contact Form Security

Protected by multiple layers:
1. **Client-side validation** (React Hook Form)
2. **Cloudflare Turnstile** (bot protection)
3. **Server-side Turnstile verification** (API route)
4. **Input sanitization** (XSS prevention)
5. **Rate limiting** (via Cloudflare/Vercel)

## Deployment Security

### Vercel (Production)

- ✅ Environment variables isolated per deployment
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Edge caching for static assets

### Sanity Studio

- ✅ Authentication required for content editing
- ✅ Published at https://sondreme.sanity.studio/
- ✅ Project ID is public (safe by design)
- ✅ Write operations require valid tokens

## Incident Response

If you suspect a supply-chain attack:

1. **Stop immediately** - Don't install more packages
2. **Review recent installations** - Check git history of `package-lock.json`
3. **Check for suspicious scripts** - Look for unexpected postinstall hooks
4. **Scan for malware** - Run security tools on your system
5. **Rotate credentials** - Change API keys and tokens
6. **Update dependencies** - Get latest secure versions

## Resources

- [npm security best practices](https://docs.npmjs.com/security-best-practices)
- [Snyk vulnerability database](https://security.snyk.io/)
- [GitHub Advisory Database](https://github.com/advisories)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Last Updated

December 2, 2025
