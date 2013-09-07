Prism.languages.json = Prism.languages.extend('javascript');
Prism.languages.insertBefore('json', 'string', {
	'key': /("|')([^"']+)("|'):/
});
