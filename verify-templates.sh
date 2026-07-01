#!/bin/bash
# Template Verification Script
# Verifies that all three templates can be scaffolded and built successfully

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          Template Scaffold Verification Script             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

TEMPLATES=("t1" "t2" "t3")
TEMPLATE_NAMES=("T1 Prestige Leader" "T2 Clinical Innovator" "T3 Spatial Sanctuary")
SUCCESS_COUNT=0
FAIL_COUNT=0

# Cleanup function
cleanup() {
  echo ""
  echo "🧹 Cleaning up test projects..."
  rm -rf ../verify-t1-test ../verify-t2-test ../verify-t3-test
  if [ -f client-intake-backup.json ]; then
    mv client-intake-backup.json client-intake.json
  fi
}

# Set up trap for cleanup on exit
trap cleanup EXIT

# Backup current intake
if [ -f client-intake.json ]; then
  cp client-intake.json client-intake-backup.json
fi

echo "📋 Testing all templates..."
echo ""

for i in "${!TEMPLATES[@]}"; do
  TEMPLATE="${TEMPLATES[$i]}"
  TEMPLATE_NAME="${TEMPLATE_NAMES[$i]}"

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔍 Testing: $TEMPLATE_NAME ($TEMPLATE)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  # Create test intake
  cat > client-intake.json << EOF
{
  "client_slug": "verify-${TEMPLATE}-test",
  "template": "$TEMPLATE",
  "practice": {
    "name": "Test Practice $TEMPLATE",
    "tagline_override": null,
    "phone": "(555) 000-0000",
    "phone_link": "tel:+15550000000",
    "address": {
      "street": "123 Test St",
      "city": "Test City",
      "state": "TX",
      "zip": "00000"
    },
    "hours": {
      "monday": "9-5", "tuesday": "9-5", "wednesday": "9-5",
      "thursday": "9-5", "friday": "9-5", "saturday": "Closed", "sunday": "Closed"
    }
  },
  "doctor": {
    "name": "Dr. Test, DDS",
    "title": "Test Dentist",
    "years_experience": 10,
    "credentials": ["Test Credential"],
    "bio_short": "Test bio"
  },
  "booking_link": "https://test.com",
  "brand": {
    "accent_color": "#2563eb",
    "logo_path": "/images/logo.svg"
  },
  "membership": {
    "individual_price": 299,
    "couple_price": 549,
    "family_price": 899,
    "no_insurance_savings_plan_price": 249
  },
  "stats": {
    "google_rating": 5.0,
    "review_count": 100,
    "patients_served": 1000,
    "satisfaction_rate": 98
  },
  "vercel": {
    "project_name": "verify-${TEMPLATE}-test",
    "domain": null
  }
}
EOF

  # Run scaffold
  echo "📦 Scaffolding..."
  if npm run scaffold > /dev/null 2>&1; then
    echo "   ✅ Scaffold successful"

    # Check if files exist
    if [ -d "../verify-${TEMPLATE}-test" ]; then
      echo "   ✅ Project directory created"

      # Check for required files
      REQUIRED_FILES=(
        "package.json"
        "next.config.js"
        "tailwind.config.js"
        "app/page.tsx"
        "data/master.ts"
      )

      ALL_FILES_EXIST=true
      for FILE in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "../verify-${TEMPLATE}-test/$FILE" ]; then
          echo "   ❌ Missing: $FILE"
          ALL_FILES_EXIST=false
        fi
      done

      if [ "$ALL_FILES_EXIST" = true ]; then
        echo "   ✅ All required files present"

        # Test build
        echo "   🔨 Testing build..."
        cd "../verify-${TEMPLATE}-test"
        if npm run build > /dev/null 2>&1; then
          echo "   ✅ Build successful"
          SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
          echo ""
          echo "   ✨ $TEMPLATE_NAME: PASSED"
        else
          echo "   ❌ Build failed"
          FAIL_COUNT=$((FAIL_COUNT + 1))
        fi
        cd -  > /dev/null
      else
        echo "   ❌ Missing required files"
        FAIL_COUNT=$((FAIL_COUNT + 1))
      fi
    else
      echo "   ❌ Project directory not created"
      FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
  else
    echo "   ❌ Scaffold failed"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi

  echo ""
done

# Final results
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 VERIFICATION RESULTS"
echo ""
echo "   ✅ Passed: $SUCCESS_COUNT/3"
echo "   ❌ Failed: $FAIL_COUNT/3"
echo ""

if [ $SUCCESS_COUNT -eq 3 ]; then
  echo "🎉 All templates verified successfully!"
  echo ""
  echo "✨ Ready for production use!"
  echo ""
  exit 0
else
  echo "⚠️  Some templates failed verification"
  echo ""
  echo "Please review the errors above and fix the issues."
  echo ""
  exit 1
fi
