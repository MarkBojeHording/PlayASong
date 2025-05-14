PlayASong
# PlayASong

## Deploying to Netlify

1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **On Netlify:**
   - Click "Add new site" > "Import an existing project".
   - Connect your repository.
   - Set the build command to `npm run build` (or `yarn build`).
   - Set the publish directory to `dist`.
3. **For client-side routing:**
   - The `public/_redirects` file is already set up to ensure SPA routing works.
4. **Deploy!**

Your site should now work with all routes and assets on Netlify.
