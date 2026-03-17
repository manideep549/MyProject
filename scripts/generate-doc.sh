#!/bin/bash

echo "🚀 Generating Deployment Report..."

DATE=$(date)
COMMIT=$(git rev-parse --short HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)

OUTPUT="docs/deployments/deployment-$COMMIT.md"

echo "# 🚀 Deployment Report" > $OUTPUT
echo "" >> $OUTPUT
echo "**Date:** $DATE" >> $OUTPUT
echo "**Branch:** $BRANCH" >> $OUTPUT
echo "**Commit:** $COMMIT" >> $OUTPUT

echo "" >> $OUTPUT
echo "## 📦 Changed Components" >> $OUTPUT
echo '```' >> $OUTPUT
cat delta/package.xml >> $OUTPUT 2>/dev/null || echo "No delta found" >> $OUTPUT
echo '```' >> $OUTPUT

echo "" >> $OUTPUT
echo "## 🧪 Test Classes Executed" >> $OUTPUT
echo '```' >> $OUTPUT
echo "${TEST_CLASSES:-Not Provided}" >> $OUTPUT
echo '```' >> $OUTPUT

echo "" >> $OUTPUT
echo "## 🛡️ PMD Summary" >> $OUTPUT
echo '```' >> $OUTPUT
grep -i "violation" pmd-report.txt >> $OUTPUT 2>/dev/null || echo "No violations" >> $OUTPUT
echo '```' >> $OUTPUT

echo "" >> $OUTPUT
echo "## 🚀 Deployment Status" >> $OUTPUT
echo "**Status:** ${DEPLOY_STATUS:-UNKNOWN}" >> $OUTPUT

echo ""
echo "✅ Report generated at $OUTPUT"