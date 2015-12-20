# grunt-file-missing

> Check files and folders for existence.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-missing --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-missing');
```

## FileMissing task
_Run this task with the `grunt fileMissing` command._

### Examples

Will fail if either or both are missing:

```js
fileMissing: {
  scripts: {
    options{
      files: ['a.js', 'b.js']
    }
  }
},
```

**Will not fail**, instead, if one or more files missing, will run `missing` callback function for each missing file, otherwise will run `exists` callback function for files array:

```js
fileMissing: {
	test_fixtures: {
    options{
      files: ['test/fixtures/*.txt'],
      missing: function(file){ console.log(file, 'is missing!'); },
      exists: function(files){ console.log('All these files exist:', files); }
    }
  }
},
```