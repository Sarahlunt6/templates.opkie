#!/bin/bash
# Quick verification script for scaffolded project

if [ -z "$1" ]; then
  echo "Usage: ./verify-scaffold.sh <client-slug>"
  exit 1
fi

PROJECT="../$1"

echo "🔍 Verifying scaffolded project: $1"
echo ""

# Check directory exists
if [ ! -d "$PROJECT" ]; then
  echo "❌ Project directory not found"
  exit 1
fi

echo "✅ Project directory exists"

# Check key files
files=("package.json" "README.md" "data/master.ts" "app/page.tsx" "app/layout.tsx")
for file in "${files[@]}"; do
  if [ -f "$PROJECT/$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
  fi
done

# Check for placeholder text that shouldn't be there
echo ""
echo "🔍 Checking for remaining placeholders..."
cd "$PROJECT"
if grep -r "Summit Dental" app/ data/ 2>/dev/null | grep -v node_modules; then
  echo "❌ Found 'Summit Dental' placeholders"
else
  echo "✅ No 'Summit Dental' placeholders found"
fi

if grep -r "Dr. Michael Roberts" app/ data/ 2>/dev/null | grep -v node_modules; then
  echo "❌ Found 'Dr. Michael Roberts' placeholders"
else
  echo "✅ No 'Dr. Michael Roberts' placeholders found"
fi

# Check git initialized
if [ -d ".git" ]; then
  echo "✅ Git repository initialized"
  commits=$(git log --oneline | wc -l)
  echo "   ($commits commit(s))"
else
  echo "❌ Git repository not initialized"
fi

# Check build artifacts
if [ -d ".next" ]; then
  echo "✅ Build artifacts present"
else
  echo "⚠️  Build artifacts missing (run npm run build)"
fi

echo ""
echo "Verification complete!"
