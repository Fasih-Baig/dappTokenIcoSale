rsync --rsync-path=/src/ docs/
git add .
git commit -m "Compiles assets for Github Pages"
git push -u origin master