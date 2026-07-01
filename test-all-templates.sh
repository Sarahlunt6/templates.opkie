#!/bin/bash
# Test script to scaffold all three templates

templates=("t1" "t2" "t3")

for template in "${templates[@]}"; do
  echo "Testing $template template..."
  
  # Update client-intake.json
  sed -i.bak "s/\"template\": \"[^\"]*\"/\"template\": \"$template\"/" client-intake.json
  sed -i.bak "s/\"client_slug\": \"[^\"]*\"/\"client_slug\": \"test-$template\"/" client-intake.json
  
  # Run scaffold
  npm run scaffold
  
  # Verify build
  if [ -d "../test-$template" ]; then
    echo "✅ $template scaffolded successfully"
    cd "../test-$template"
    npm run build > /dev/null 2>&1
    if [ $? -eq 0 ]; then
      echo "✅ $template build passed"
    else
      echo "❌ $template build failed"
    fi
    cd -
  else
    echo "❌ $template scaffold failed"
  fi
  
  echo ""
done

# Restore original
mv client-intake.json.bak client-intake.json
echo "All templates tested!"
