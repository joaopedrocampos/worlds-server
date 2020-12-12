HOOKS_FOLDER := hooks/
GIT_HOOKS_FOLDER := .git/hooks/

hook:
	ln -s -f ../../${HOOKS_FOLDER}pre-push ${GIT_HOOKS_FOLDER}
	ln -s -f ../../${HOOKS_FOLDER}pre-commit ${GIT_HOOKS_FOLDER}
