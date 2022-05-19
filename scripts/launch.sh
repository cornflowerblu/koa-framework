set -e
npx prisma migrate deploy
echo "Migration Complete"
node server.js