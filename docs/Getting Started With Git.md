This document gives a brief overview of the Git commands and workflows you are most likely to use while using Git on the 
competency-profiles project. Each heading presents a scenario and the solution using Git.

## Install Git onto my computer ##

1. Go to http://git-scm.com/
2. Install Git

If you are working in the Windows environment you may also find GitHub for Windows helpful. While it doesn't expose many of the 
powerful git commands, it does give a clear visual representation of what files you have checked out and a list of recent changes.
You can download it at https://windows.github.com/.

The following scenarios assume you have git installed and are using git from the command prompt or Git Bash (installed with Git).

## Get the source code onto my machine ##

 1. Open a cmd prompt
 2. Go to the directory you want to download the code into
 3. `git clone https://github.com/lunky/competency-profiles.git`

This will create a directory called competency-profiles and place all the source code in it. Optionally, if you want to place the
code in a directory with a different name, append the directory name as another argument:
    
    git clone https://github.com/lunky/competency-profiles.git mySpecialDir

## Do a fresh GET ##

 1. Go into the directory you cloned the repository to
 2. `git pull`
 
**NOTE:** You probably want to stash or commit all your changes locally before running this command so you can go back to your
current state if you need to. See below for an explanation.
 
**Some Background**
 
Git is a [distributed](http://git-scm.com/about/distributed) source control system. As a result, when you do a clone, you download
the entire source control repository on to your machine. Because of this doing a fresh GET is conceptually a little different than
it would be using TFS or SVN. You have to first download the state of the repository (i.e. get information about any new changes,
new branches, etc.), and then merge what changes you wish into your current branch. These two steps are reflected by the fact that
`git pull` is actually running two commands for you:

```
> get fetch
> get merge
```
 
Because all `git fetch` does is download source control repository updates without changing your branch, you can safely run this 
command without worrying about it messing up your files. `git merge`, on the other hand, may change your files when it merges them,
so be ready for this. You probably want to have all your files commited locally before you do a `git merge` or `git pull` so that
you can go back to this state if you need to.

## Check what files I've changed ##

    > git status
    
`git status` gives you the current status of your repository including any files you have modified, added, or deleted. If you have 
not made any changes your output will look like this:

```
D:\Code\GitRepos\mySpecialDir (master)
λ git status
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working directory clean
```

If you have made some changes you will get something like this:

```
D:\Code\GitRepos\mySpecialDir (master)
λ git status
On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md
        deleted:    competency-profile/seed.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        docs/New file.md

no changes added to commit (use "git add" and/or "git commit -a")
```
    
## Change Branches ##

    git checkout <name_of_branch>
    
In Git the `checkout` command is used to switch between branches. Switching branches does not change directories, but rather changes
the files in the current directory in place. As a result, if you have made any changes before checking out a new branch those 
changes will come along for the ride into the new branch.

## Undo the changes I have made to a specific file ##

    > git checkout -- <path_to_file>

When you use the `--` arguments in Git it indicates that a file path will follow. The above command is a special usage of the
`checkout` command since it does not indicate a branch that you want to change to. Instead it indicates that you want to restore 
the file(s) to the version that was last commited to the current branch (locally). 

**Note:** This is different behaviour than described above. When specifying a path instead of a branch the checkout command _does_
remove your changes from the file specified in `<path_to_file>` (which is what you want when undoing changes).

## Undo all the changes I have made in a branch ##

    > git checkout .
    
**NOTE:** Be careful with this command. You are throwing away any local changes and there is no way to get them back since you have
not commited them anywhere!

This command is shorthand for `git checkout -- .`. As described above, it indicates that you want to restore all files (represented
by the '.') to the version that was last commited to the current branch.

## Commit changes locally ##

```
> git add -A
> git commit
```

Commits in Git are done in two steps: 1) Staging and 2) Committing. Staging (done via the `git add` command) is a way of putting 
aside the files you want to commit,  in their current state, before actually commiting them. When you run the `commit` command, git
commits the files that you have staged in the state they were in when you run the `git add` command. This can lead to some 
unexpected results:

 1. Modify file A.txt with changes X
 2. `git add A.txt`
 3. Modify file A.txt with changes Y
 4. `git commit`
 
This flow will commit changes X, but not changes Y even though they occured before the `commit` command. 

In the sample above we use the argument `-A`. This tells the `add` command to add all the files in the current repository, including
new files and deletes.

**GitHub for Windows**

If you want to maintain the flow you have used with TFS or SVN in the past, the [GitHub for Windows](https://windows.github.com/)
tool is helpful here. This tool combines the staging and commit steps into one, so you don't need to stage your files and then 
commit them in a separate step. It also gives you a nice UI to type your commit comment into so you don't need to pull out your
long lost VIM skills (although you can change this editor if you wish).

## Check what files I have staged ##

    git status
    
If you have used `git add` to stage files for commit and you want to see what they are, `git status` will give you output similar
to this (note the _Changes to be committed_ section):

```
D:\Code\GitRepos\mySpecialDir (master)
λ git status
On branch master
Your branch is up-to-date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   docs/New file.md
        deleted:    gulp.config.js
```

## Check if there are any changes I need to merge in from GitHub ##

``` 
> git fetch
> git status
```

`git fetch` will download any changes from GitHub into the local repository, without changing anything in your branch. This will tell
your copy of the repo if there are any changes upstream that you don't have in your current branch. Running `git status` will give 
you this information:

```
D:\Code\GitRepos\mySpecialDir (master)
λ git status
On branch master
Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working directory clean
```

## Push changes to GitHub ##

    git push
    
This command assumes the branch you are on already exists in GitHub (see _Push a new branch to GitHub_ below if you want to push 
changes in a branch that is not already in GitHub). If there are changes on GitHub that you do not have, this command will fail and 
ask you to do a `git pull` first.

## Setup mergetool ##

 1. Install [Kdiff3](http://kdiff3.sourceforge.net/)
 2. `git config --global merge.tool kdiff3`
 
**NOTE:** If this doesn't work, make sure kdiff3 is in your path.
    
Setting up the mergetool in Git is a necessary evil. If you don't you'll be editing files manually the first time you have to do a
merge, and you won't like it. Probably. Unless you're a glutton for punishment.

Kdiff3 is probably the easier diff/merge tool to setup in Git since it just requires installing it and one line of configuration.
If you like Diffmerge, its not [too bad](http://adventuresincoding.com/2010/04/how-to-setup-git-to-use-diffmerge) either:

```
> git config --global merge.tool diffmerge
> git config --global mergetool.diffmerge.cmd "diffmerge --merge --result=\$MERGED \$LOCAL \$BASE \$REMOTE"
> git config --global mergetool.diffmerge.trustExitCode true
```

But Kdiff3 is still better :). 

## Setup Difftool ##

    git config --global diff.tool kdiff3
    
Or fine, use Diffmerge:

```
> git config --global diff.tool diffmerge
> git config --global difftool.diffmerge.cmd "diffmerge \$LOCAL \$REMOTE"
```

## Create a new branch ##

    git checkout -b <new_branch_name>

Remember that the `checkout` command changes branches for you? This one creates a new branch for you and then checks it out (hence
the `-b`). If you just want to create a new branch and not check it out use:

    git branch <new_branch_name>

## Merge others' changes with yours ##

```
> git add -A
> git commit
> git fetch
> git rebase
```

That's a lot of commands, but its the safest and the cleanest. The first two commits any changes you have pending. You don't want to
have any files pending when you're doing a merge. The `git fetch` lets your local repo know of any changes that it doesn't have.
The `git rebase` is a way of merging in changes that essentially replays your changes on top of everyone else's changes. It's like 
you undid all your local changes, did a fresh get, and then reapplied your changes (but without the hassle of doing it manually).

Rebasing is dangerous because it can make merging complicated for everyone else if you rebase the wrong thing. In this context,
however, it works very nicely and is not dangerous. The rule for rebasing is: **don't rebase anything that has been pushed to other
users**. Since you haven't given any of your new work to other users at this stage, the rebase is safe.

If you're too scared for a rebase, use the normal merge:

```
> git add -A
> git commit
> git fetch
> git merge
```

And since `git pull` is the same as `git fetch` and `git merge` you can just do:

```
> git add -A
> git commit
> git pull
```

**When there's trouble**
If you've made changes in the same file as someone else, there's a good change you'll need to pull up your merge tool to smooth 
the merge out. This is where you're glad that you setup your merge tool as described above. If git tells you there's a merge conflict
run

    git mergetool
    
This will fire up KDiff3 (or whatever you setup as your merge tool) and ask you to figure out the differences. Once you're happy with
the result, just save and close. If you did the rebase option above, you'll need to tell it to keep going:

    git rebase --continue
    
## Cancel a rebase ##

    git rebase --cancel
    
A rebase temporarily removes all your changes, restores the branch to what is on GitHub, and then reapplies your changes one by one.
If there are more than one commits that are applied you might figure out a merge on one commit, move to the next and realize that
you messed up the last one. Have no fear, `git rebase --cancel` will bring you back to where you started and you can give it 
another whirl.

## Push a new branch to GitHub ##

    git push -u origin <new_branch_name>
    
This command assumes new_branch_name already exists and you have changes in it you want to push to GitHub. The `-u` sets "upstream"
or "tracking" information so your local branch can track what's going on with the branch on GitHub.

## Merge changes from a different branch locally ##

    git rebase <another_branch>
    
Imagine this flow:

 1. Create a new local branch
 2. Do some work in this branch and commit changes
 3. Somebody else does work in master and pushes it to GitHub
 4. You do a `git pull` in master to get their changes

Now how do you get these changes into your branch? `git rebase <another_branch>`! This command will temporarily remove all your
changes from the new branch, pull in the new changes from master, and then reapply your changes to this.

## Stash changes ##

    git stash
    
Sometimes you want to get rid of your current changes but you want to get them back at some point. `git stash` takes all your changes
and stashes them away in a stack of commits, leaving your working directory clean from any changes. When you're ready to get your
changes back, just run:
    
    git stash pop
