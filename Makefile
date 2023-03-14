install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx -n --experimental-vm-modules jest
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
