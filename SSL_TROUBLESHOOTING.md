# SSL Certificate Troubleshooting for raav.co.in

If your SSL certificate shows as "Not Verified" in Vercel, follow these steps:

## Quick Fix Steps

### Step 1: Verify DNS Configuration in Vercel

1. Go to: https://vercel.com/sidhant-jains-projects/raav/settings/domains
2. Find your domain: `raav.co.in`
3. Check the DNS configuration shown

**You should see:**
- **Type**: CNAME or A Record
- **Name**: `@` or `www` or blank
- **Value**: Points to Vercel (e.g., `cname.vercel-dns.com` or an IP address)

### Step 2: Configure DNS at Your Domain Registrar

Go to your domain registrar (where you bought raav.co.in) and add these DNS records:

#### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: @ (or blank/root)
Value: cname.vercel-dns.com
```

#### Option B: A Records (If CNAME not supported for root)
```
Type: A
Name: @ (or blank/root)
Value: 76.76.21.21
```

#### For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify Domain in Vercel

1. Go to: Settings → Domains
2. Click on `raav.co.in`
3. Click **"Verify"** or **"Refresh"**
4. Wait for verification (can take a few minutes)

### Step 4: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- SSL certificate will be issued automatically once DNS is verified
- You can check propagation status at: https://www.whatsmydns.net/

## Common Issues & Solutions

### Issue 1: DNS Records Not Configured

**Symptoms:**
- Domain shows "Not Verified" in Vercel
- SSL certificate not issued

**Solution:**
- Add the DNS records at your domain registrar
- Make sure the records match what Vercel shows
- Wait for DNS propagation

### Issue 2: Wrong DNS Records

**Symptoms:**
- Domain configured but SSL still not verified
- DNS check fails

**Solution:**
- Double-check the records match Vercel's requirements exactly
- Remove any conflicting records
- Use the exact values shown in Vercel dashboard

### Issue 3: DNS Propagation Delay

**Symptoms:**
- Records added but still not working
- SSL pending

**Solution:**
- Wait 5-30 minutes for DNS propagation
- Check DNS propagation: https://www.whatsmydns.net/#CNAME/raav.co.in
- Refresh domain verification in Vercel

### Issue 4: Multiple DNS Providers

**Symptoms:**
- Conflicting DNS settings

**Solution:**
- Make sure you're editing DNS at your domain registrar
- Not at a separate DNS provider unless that's where your nameservers point

## Step-by-Step: Adding Domain to Vercel

1. **Go to Vercel Dashboard**
   - Navigate to: Settings → Domains

2. **Add Domain**
   - Enter: `raav.co.in`
   - Click "Add"

3. **Add www Subdomain (Optional)**
   - Enter: `www.raav.co.in`
   - Click "Add"

4. **Configure DNS**
   - Vercel will show you the DNS records to add
   - Copy the exact values shown

5. **Update DNS at Registrar**
   - Go to your domain registrar's DNS settings
   - Add the records Vercel provided
   - Save changes

6. **Verify**
   - Go back to Vercel
   - Click "Verify" on your domain
   - Wait for verification (usually 5-30 minutes)

## Checking DNS Configuration

### Using Command Line:
```bash
# Check CNAME record
dig raav.co.in CNAME

# Check A record
dig raav.co.in A

# Check nameservers
dig raav.co.in NS
```

### Using Online Tools:
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://mxtoolbox.com/DNSLookup.aspx

## SSL Certificate Status

Once DNS is properly configured:
1. Vercel automatically issues SSL certificate (Let's Encrypt)
2. Certificate is usually issued within **5-30 minutes** after DNS verification
3. You'll see "Valid" status in Vercel dashboard
4. Your site will be accessible via HTTPS

## Troubleshooting Checklist

- [ ] DNS records added at domain registrar
- [ ] Records match Vercel's requirements exactly
- [ ] Waited at least 5 minutes for DNS propagation
- [ ] Clicked "Verify" in Vercel dashboard
- [ ] Checked DNS propagation status online
- [ ] No conflicting DNS records
- [ ] Nameservers point to your registrar (not changed)

## Still Not Working?

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Contact Vercel Support**: https://vercel.com/support
3. **Check Domain Registrar**: Make sure DNS changes were saved
4. **Try Different Record Type**: If CNAME doesn't work, try A records

## Expected Timeline

- **DNS Propagation**: 5 minutes to 48 hours (usually 5-30 minutes)
- **SSL Certificate**: Issued automatically after DNS verification (5-30 minutes)
- **Total**: Usually resolved within 1 hour, can take up to 48 hours

## Quick Test

After configuring DNS, test if it's working:

```bash
# Check if domain resolves
ping raav.co.in

# Check SSL certificate
curl -I https://raav.co.in
```

Once DNS is verified, Vercel will automatically issue and configure the SSL certificate. No additional action needed!

