# Git Cheat Sheet #

| Scenario                              | Commands
|---------------------------------------|---------------------------------------------------------------
| Get the source code onto my machine   | `git clone https://github.com/lunky/competency-profiles.git`
| Do a fresh GET                        | `git pull`
| Check what files I've changed         | `git status`
| Change Branches                       | `git checkout <name_of_branch>`
| Undo changes to a specific file       | `git checkout -- <path_to_file>`
| Undo all changes in current branch    | `git checkout .`
| Commit changes locally                | `git add -A`, `git commit`
| Check what files are staged           | `git status`
| Check for updates                     | `git fetch`, `git status`
| Push changes to GitHub                | `git push`
| Setup mergetool                       | `git config --global merge.tool kdiff3`
| Setup difftool                        | `git config --global diff.tool kdiff3`
| Create a new branch                   | `git checkout -b <new_branch_name>`
| Merge others' changes with yours      | `git add -A`, `git commit`, `git fetch`, `git rebase`
| Cancel a rebase                       | `git rebase --cancel`
| Push a new branch to GitHub           | `git push -u origin <new_branch_name>`
| Merge changes from master             | `git rebase master`
| Merge changes into master             | `git merge <other_branch>`
| Stash changes                         | `git stash`
| Unstash changes                       | `git stash pop`