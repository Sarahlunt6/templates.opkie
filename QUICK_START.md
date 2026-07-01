# Quick Start - 5 Minutes to Deployment

## 1. Fill Client Data (2 min)

```bash
cd ~/Documents/GitHub/templates.opkie
cp client-intake.EXAMPLE.json client-intake.json
# Edit client-intake.json with real data
```

**Required fields:**
- `client_slug` - folder name (e.g., "smithfamilydental")
- `template` - "t1", "t2", or "t3"
- `practice.name` - practice name
- `booking_link` - online booking URL

## 2. Scaffold Site (2 min)

```bash
npm run scaffold
cd ../[client-slug]
```

## 3. Deploy to Vercel (1 min)

```bash
vercel --prod
```

---

## That's It!

Your site is live at `https://[client-slug].vercel.app`

## ✅ SEO Optimizations (Automatic)

Every scaffolded site automatically includes:
- ✅ Schema.org structured data (LocalBusiness/Dentist)
- ✅ Meta description with CTA ("Call [phone] to schedule...")
- ✅ Google Maps embed with NAP details
- ✅ SEO checklist for remaining manual tasks

See [SEO_AUTOMATION_COMPLETE.md](SEO_AUTOMATION_COMPLETE.md) for details.

## Next Steps

1. **Add to GitHub:**
   ```bash
   gh repo create [client-slug] --public --source=. --remote=origin
   git push -u origin main
   ```

2. **Replace Images:**
   - `public/images/team/doctor-portrait.png`
   - `public/images/office-exterior.jpg`

3. **Add Real Testimonials:**
   - Edit `data/master.ts`
   - Replace `[Patient Name]` placeholders

4. **Custom Domain:**
   - Add domain in Vercel dashboard
   - Update DNS records

---

## Template Previews

- **T1**: Premium editorial (luxury practices)
- **T2**: High-tech precision (implant specialists)
- **T3**: Therapeutic minimal (holistic care)

---

## Full Documentation

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.
